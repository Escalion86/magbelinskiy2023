import { NextResponse } from 'next/server'
import Requests from '@models/Requests'
import Clients from '@models/Clients'
import dbConnect from '@server/dbConnect'
import formatDate from '@helpers/formatDate'
import formatAddress from '@helpers/formatAddress'
import telegramPost from '@server/telegramApi'

const normalizePhone = (phone) =>
  typeof phone === 'string'
    ? phone.replace(/[^0-9]/g, '')
    : typeof phone === 'number'
    ? String(phone)
    : ''

const sanitizeContacts = (contacts) => {
  if (Array.isArray(contacts))
    return contacts.map((item) => String(item).trim()).filter(Boolean)
  if (typeof contacts === 'string')
    return contacts
      .split(/[\n,;]/)
      .map((item) => item.trim())
      .filter(Boolean)
  return []
}

const DEFAULT_ADDRESS = {
  town: '',
  street: '',
  house: '',
  entrance: '',
  floor: '',
  flat: '',
  comment: '',
  link2Gis: '',
  linkYandexNavigator: '',
  link2GisShow: true,
  linkYandexShow: true,
}

const normalizeAddress = (rawAddress, legacyLocation) => {
  const normalized = {
    ...DEFAULT_ADDRESS,
    ...(rawAddress && typeof rawAddress === 'object' ? rawAddress : {}),
  }

  const hasMainFields =
    normalized.town ||
    normalized.street ||
    normalized.house ||
    normalized.flat

  if (legacyLocation && !normalized.comment && !hasMainFields) {
    normalized.comment = legacyLocation
  }

  return normalized
}

const sendTelegramMassage = async (text, url) =>
  await telegramPost(
    `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
    {
      chat_id: 261102161,
      text,
      parse_mode: 'html',
      // reply_markup: url
      //   ? JSON.stringify({
      //       inline_keyboard: [
      //         [
      //           {
      //             text: 'Позвонить клиенту',
      //             url,
      //           },
      //         ],
      //       ],
      //     })
      //   : undefined,
    },
    (data) => console.log('data', data),
    (data) => console.log('error', data),
    true
  )

export const GET = async () => {
  await dbConnect()
  const requests = await Requests.find({}).sort({ createdAt: -1 }).lean()

  return NextResponse.json({ success: true, data: requests }, { status: 200 })
}

export const POST = async (req) => {
  const body = await req.json()
  const clientName = (body.clientName ?? body.name ?? '').trim() || 'Не указан'
  const rawPhone = body.clientPhone ?? body.phone ?? ''
  const contactChannels =
    body.contactChannels ?? body.contact ?? body.priorityContact ?? ''
  const eventDate = body.eventDate ?? body.date ?? null
  const legacyLocation =
    body.location ??
    [body.town, body.address]
      .filter((value) => typeof value === 'string' && value.trim().length > 0)
      .join(', ')
  const address = normalizeAddress(body.address, legacyLocation)
  const contractSum = body.contractSum ?? body.price ?? 0
  const comment = body.comment ?? ''
  const yandexAim = body.yandexAim ?? ''

  if (!rawPhone) {
    return NextResponse.json(
      {
        success: false,
        error: 'Укажите телефон клиента',
      },
      { status: 400 }
    )
  }

  await dbConnect()

  const normalizedPhone = normalizePhone(rawPhone)
  const contacts = sanitizeContacts(contactChannels)
  const numericContractSum = Number(contractSum) || 0
  const formattedAddress = formatAddress(address, null)
  const displayPhone =
    typeof rawPhone === 'string' && rawPhone.trim().length > 0
      ? rawPhone.trim()
      : normalizedPhone
      ? `+${normalizedPhone}`
      : ''

  const messageParts = [
    `Новая заявка${process.env.DOMAIN ? ` с ${process.env.DOMAIN}` : ''}`,
    '',
    clientName ? `<b>Имя клиента:</b> ${clientName}` : null,
    displayPhone ? `<b>Телефон:</b> ${displayPhone}` : null,
    contacts.length > 0 ? `<b>Способы связи:</b> ${contacts.join(', ')}` : null,
    eventDate
      ? `<b>Дата мероприятия:</b> ${formatDate(eventDate, false, true)}`
      : null,
    formattedAddress ? `<b>Локация:</b> ${formattedAddress}` : null,
    numericContractSum
      ? `<b>Договорная сумма:</b> ${numericContractSum.toLocaleString(
          'ru-RU'
        )} ₽`
      : null,
    comment ? `<b>Комментарий:</b> ${comment}` : null,
    yandexAim ? `<b>Яндекс цель:</b> ${yandexAim}` : null,
  ].filter(Boolean)
  // const telegramResult = await
  sendTelegramMassage(
    messageParts.join('\n'),
    normalizedPhone ? `tel:+${normalizedPhone}` : undefined
  )
  // if (!telegramResult?.ok) {
  //   return NextResponse.json(
  //     {
  //       success: false,
  //       error: 'Не удалось отправить уведомление в Telegram',
  //     },
  //     { status: 502 }
  //   )
  // }

  const phoneAsNumber = normalizedPhone ? Number(normalizedPhone) : null

  let client =
    phoneAsNumber !== null
      ? await Clients.findOne({ phone: phoneAsNumber })
      : null

  if (!client) {
    client = await Clients.create({
      firstName: clientName,
      phone: phoneAsNumber,
      priorityContact: contacts[0] ?? null,
    })
  } else {
    const updates = {}
    if (!client.firstName && clientName) updates.firstName = clientName
    if (!client.priorityContact && contacts[0])
      updates.priorityContact = contacts[0]
    if (Object.keys(updates).length > 0) {
      client = await Clients.findByIdAndUpdate(client._id, updates, {
        new: true,
      })
    }
  }

  const request = await Requests.create({
    clientId: client?._id ?? null,
    clientName,
    clientPhone: normalizedPhone,
    contactChannels: contacts,
    eventDate: eventDate ? new Date(eventDate) : null,
    address,
    contractSum: numericContractSum,
    comment: comment ?? '',
    yandexAim,
  })

  return NextResponse.json(
    {
      success: true,
      data: {
        request,
        client,
      },
    },
    { status: 201 }
  )
}
