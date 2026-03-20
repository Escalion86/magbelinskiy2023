import { NextResponse } from 'next/server'
import Requests from '@models/Requests'
import Clients from '@models/Clients'
import SiteSettings from '@models/SiteSettings'
import Users from '@models/Users'
import dbConnect from '@server/dbConnect'
import formatDate from '@helpers/formatDate'
import formatAddress from '@helpers/formatAddress'
import telegramPost from '@server/telegramApi'
import { getCalendarClient } from '@server/googleCalendarClient'
import getTenantContext from '@server/getTenantContext'

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

const parseBody = async (req) => {
  const contentType = (req.headers.get('content-type') || '').toLowerCase()
  if (contentType.includes('application/json')) {
    return { body: await req.json(), isFormSubmit: false }
  }

  if (
    contentType.includes('application/x-www-form-urlencoded') ||
    contentType.includes('multipart/form-data')
  ) {
    const formData = await req.formData()
    return {
      body: Object.fromEntries(formData.entries()),
      isFormSubmit: true,
    }
  }

  try {
    return { body: await req.json(), isFormSubmit: false }
  } catch (error) {
    return { body: {}, isFormSubmit: false }
  }
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

const extractContactByType = (contacts, type) => {
  if (!Array.isArray(contacts)) return ''
  const prepared = contacts
    .map((item) => String(item || '').trim())
    .filter(Boolean)
    .map((item) => item.toLowerCase())

  if (type === 'telegram') {
    const found = prepared.find(
      (item) =>
        item.includes('telegram') || item.includes('t.me') || item.includes('@')
    )
    return found || ''
  }

  if (type === 'whatsapp') {
    const found = prepared.find(
      (item) => item.includes('whatsapp') || item.includes('wa.me')
    )
    return found || ''
  }

  return ''
}

const sendPublicLeadToArtistCRM = async ({
  clientName,
  phone,
  comment,
  eventDate,
  contractSum,
  address,
  source,
  contacts,
}) => {
  const baseUrl = process.env.PUBLIC_LEADS_API_BASE_URL
  const apiKey = process.env.PUBLIC_LEADS_API_KEY
  if (!baseUrl || !apiKey) return

  const endpoint = `${baseUrl.replace(/\/+$/, '')}/api/public/lead`
  const payload = {
    name: clientName || undefined,
    phone: phone || undefined,
    comment: comment || undefined,
    eventDate: eventDate ? new Date(eventDate).toISOString() : undefined,
    contractSum: Number(contractSum) || undefined,
    town: address?.town || undefined,
    address: formatAddress(address, null) || undefined,
    source: source || 'site_form',
    telegram: extractContactByType(contacts, 'telegram') || undefined,
    whatsapp: extractContactByType(contacts, 'whatsapp') || undefined,
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Public-Api-Key': apiKey,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      let details = ''
      try {
        details = await response.text()
      } catch (error) {}
      console.log('Public Leads API error', {
        status: response.status,
        endpoint,
        details,
      })
    }
  } catch (error) {
    console.log('Public Leads API request failed', {
      message: error?.message,
      endpoint,
    })
  }
}

const WRITE_SCOPE = ['https://www.googleapis.com/auth/calendar']
const { GOOGLE_CALENDAR_ID } = process.env
const DEFAULT_TIME_ZONE = 'Asia/Krasnoyarsk'

const getSiteTimeZone = async (tenantId) => {
  if (!tenantId) return DEFAULT_TIME_ZONE
  const settings = await SiteSettings.findOne({ tenantId })
    .select('timeZone')
    .lean()
  return settings?.timeZone || DEFAULT_TIME_ZONE
}

const getDefaultTenantId = async () => {
  if (process.env.PUBLIC_TENANT_ID) return process.env.PUBLIC_TENANT_ID
  const user = await Users.findOne({
    role: { $in: ['admin', 'dev'] },
  })
    .sort({ createdAt: 1 })
    .select('_id')
    .lean()
  return user?._id ?? null
}

const formatDateInTimeZone = (date, timeZone) => {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date)
  } catch (error) {
    return date.toISOString().slice(0, 10)
  }
}

const base64Url = (value) =>
  Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')

const buildCalendarLink = (googleEventId) => {
  if (!googleEventId || !GOOGLE_CALENDAR_ID) return null
  const payload = `${googleEventId} ${GOOGLE_CALENDAR_ID}`
  return `https://www.google.com/calendar/event?eid=${base64Url(payload)}`
}

const buildRequestCalendarPayload = (request, timeZone = DEFAULT_TIME_ZONE) => {
  const hasEventDate = Boolean(request.eventDate)
  const fallbackDate = request.createdAt ? new Date(request.createdAt) : new Date()
  const startDate = hasEventDate ? new Date(request.eventDate) : fallbackDate
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000)
  const location = formatAddress(request.address, null)
  const addressTitle = formatAddress(
    request.address,
    request.location ?? 'Адрес не указан'
  )
  const phone = request.clientPhone ? `+${request.clientPhone}` : ''
  const contacts =
    request.contactChannels?.length > 0
      ? request.contactChannels.join(', ')
      : ''
  const descriptionParts = [
    request.clientName ? `Клиент: ${request.clientName}` : null,
    phone ? `Телефон: ${phone}` : null,
    contacts ? `Контакты: ${contacts}` : null,
    request.contractSum
      ? `Сумма: ${Number(request.contractSum).toLocaleString('ru-RU')}`
      : null,
    request.comment ? `Комментарий: ${request.comment}` : null,
  ].filter(Boolean)

  const payload = {
    summary: `(Заявка) ${addressTitle}`,
    description: descriptionParts.join('\n'),
    location,
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 10 },
      ],
    },
  }

  if (hasEventDate) {
    payload.start = {
      dateTime: startDate.toISOString(),
      timeZone,
    }
    payload.end = {
      dateTime: endDate.toISOString(),
      timeZone,
    }
  } else {
    const allDayDate = formatDateInTimeZone(startDate, timeZone)
    payload.start = { date: allDayDate }
    const nextDay = new Date(startDate)
    nextDay.setDate(nextDay.getDate() + 1)
    payload.end = { date: formatDateInTimeZone(nextDay, timeZone) }
  }

  return payload
}

const createRequestCalendarEvent = async (request, timeZone) => {
  const calendarId = GOOGLE_CALENDAR_ID
  if (!calendarId) return null
  const calendar = await getCalendarClient(WRITE_SCOPE)
  if (!calendar) return null

  const resource = buildRequestCalendarPayload(request, timeZone)
  try {
    const response = await calendar.events.insert({
      calendarId,
      resource,
    })
    console.log('Google Calendar request create response', {
      status: response?.status,
      id: response?.data?.id,
      htmlLink: response?.data?.htmlLink,
    })
    return response?.data?.id ?? null
  } catch (error) {
    console.log('Google Calendar request create failed', {
      message: error?.message,
      status: error?.code ?? error?.response?.status,
      errors: error?.errors ?? error?.response?.data?.error?.errors,
      calendarId,
    })
    throw error
  }
}

export const GET = async () => {
  const { tenantId } = await getTenantContext()
  if (!tenantId) {
    return NextResponse.json(
      { success: false, error: 'Не авторизован' },
      { status: 401 }
    )
  }
  await dbConnect()
  const requests = await Requests.find({ tenantId })
    .sort({ createdAt: -1 })
    .lean()
  const prepared = requests.map((request) => ({
    ...request,
    calendarLink: buildCalendarLink(request.googleCalendarId),
  }))

  return NextResponse.json({ success: true, data: prepared }, { status: 200 })
}

export const POST = async (req) => {
  const { body, isFormSubmit } = await parseBody(req)
  const getRedirectUrl = (status) =>
    new URL(`/?request=${status}#zakaz`, req.url)
  const formSuccessResponse = () =>
    NextResponse.redirect(getRedirectUrl('success'), 303)
  const formErrorResponse = (message) =>
    NextResponse.redirect(
      new URL(
        `/?request=error&message=${encodeURIComponent(message)}#zakaz`,
        req.url
      ),
      303
    )
  const errorResponse = (message, status = 400) =>
    isFormSubmit
      ? formErrorResponse(message)
      : NextResponse.json({ success: false, error: message }, { status })
  const successResponse = (data) =>
    isFormSubmit
      ? formSuccessResponse()
      : NextResponse.json({ success: true, data }, { status: 201 })

  const { tenantId: sessionTenantId } = await getTenantContext()
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
  const servicesIds = Array.isArray(body.servicesIds) ? body.servicesIds : []

  const referer = req.headers.get('referer') ?? ''
  const isCabinetRequest = referer.includes('/cabinet')
  await dbConnect()
  const tenantId = isCabinetRequest
    ? sessionTenantId
    : await getDefaultTenantId()

  if (!tenantId) {
    return errorResponse('Не удалось определить владельца заявки')
  }

  if (!rawPhone) {
    return errorResponse('Укажите телефон клиента')
  }
  if (isCabinetRequest && !body.clientId) {
    return errorResponse('Укажите клиента')
  }
  if (isCabinetRequest && !eventDate) {
    return errorResponse('Укажите дату мероприятия')
  }
  if (isCabinetRequest && servicesIds.length === 0) {
    return errorResponse('Укажите услугу')
  }

  const timeZone = await getSiteTimeZone(tenantId)

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
  if (!isCabinetRequest) {
    sendTelegramMassage(
      messageParts.join('\n'),
      normalizedPhone ? `tel:+${normalizedPhone}` : undefined
    )
  }
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
      ? await Clients.findOne({ phone: phoneAsNumber, tenantId })
      : null

  if (!client) {
    client = await Clients.create({
      tenantId,
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
    tenantId,
    clientId: client?._id ?? null,
    clientName,
    clientPhone: normalizedPhone,
    contactChannels: contacts,
    eventDate: eventDate ? new Date(eventDate) : null,
    address,
    contractSum: numericContractSum,
    comment: comment ?? '',
    yandexAim,
    servicesIds,
  })

  let googleCalendarId = null
  let calendarLink = null
  try {
    googleCalendarId = await createRequestCalendarEvent(request, timeZone)
    calendarLink = buildCalendarLink(googleCalendarId)
  } catch (error) {
    console.log('Google Calendar request create error', error)
  }

  if (googleCalendarId) {
    await Requests.findByIdAndUpdate(request._id, { googleCalendarId })
    request.googleCalendarId = googleCalendarId
  }
  request.calendarLink = calendarLink

  if (!isCabinetRequest) {
    await sendPublicLeadToArtistCRM({
      clientName,
      phone: displayPhone || (normalizedPhone ? `+${normalizedPhone}` : ''),
      comment,
      eventDate,
      contractSum: numericContractSum,
      address,
      source: body.source || yandexAim || 'site_form',
      contacts,
    })
  }

  return successResponse({
    request,
    client,
  })
}
