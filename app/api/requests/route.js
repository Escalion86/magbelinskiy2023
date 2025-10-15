import { NextResponse } from 'next/server'
import Requests from '@models/Requests'
import Clients from '@models/Clients'
import dbConnect from '@server/dbConnect'

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
  const location =
    body.location ??
    [body.town, body.address]
      .filter((value) => typeof value === 'string' && value.trim().length > 0)
      .join(', ')
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
    location: location ?? '',
    contractSum: Number(contractSum) || 0,
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
