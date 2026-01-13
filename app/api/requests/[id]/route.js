import { NextResponse } from 'next/server'
import Requests from '@models/Requests'
import Events from '@models/Events'
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
  return undefined
}

const REQUEST_STATUSES = new Set([
  'new',
  'in_progress',
  'converted',
  'canceled',
])

export const PUT = async (req, { params }) => {
  const { id } = await params
  const body = await req.json()

  await dbConnect()

  const request = await Requests.findById(id)
  if (!request)
    return NextResponse.json(
      { success: false, error: 'Заявка не найдена' },
      { status: 404 }
    )

  if (body.convertToEvent) {
    if (request.eventId)
      return NextResponse.json(
        { success: false, error: 'Заявка уже преобразована в мероприятие' },
        { status: 400 }
      )

    const eventData = body.eventData ?? {}

    const normalizedContractSum =
      typeof eventData.contractSum === 'number' &&
      !Number.isNaN(eventData.contractSum)
        ? eventData.contractSum
        : request.contractSum

    const isTransferred = Boolean(eventData.isTransferred)

    const event = await Events.create({
      requestId: request._id,
      clientId: eventData.clientId ?? request.clientId,
      eventDate: eventData.eventDate ?? request.eventDate,
      requestDate: request.createdAt,
      dateEnd: eventData.dateEnd ?? null,
      location: eventData.location ?? request.location,
      contractSum: normalizedContractSum,
      status: eventData.status ?? 'planned',
      isByContract: Boolean(eventData.isByContract),
      isTransferred,
      colleagueId: isTransferred ? eventData.colleagueId ?? null : null,
      calendarImportChecked: Boolean(eventData.calendarImportChecked),
      title:
        eventData.title ??
        (request.clientName
          ? `Мероприятие для ${request.clientName}`
          : 'Мероприятие'),
      description: eventData.description ?? request.comment ?? '',
    })

    const updatedRequest = await Requests.findByIdAndUpdate(
      id,
      {
        status: 'converted',
        eventId: event._id,
      },
      { new: true }
    )

    const client = request.clientId
      ? await Clients.findById(request.clientId)
      : null

    return NextResponse.json(
      {
        success: true,
        data: {
          request: updatedRequest,
          event,
          client,
        },
      },
      { status: 200 }
    )
  }

  const update = {}

  if (body.clientName !== undefined) update.clientName = body.clientName
  if (body.clientPhone !== undefined) {
    const normalizedPhone = normalizePhone(body.clientPhone)
    update.clientPhone = normalizedPhone
    if (request.clientId && normalizedPhone) {
      await Clients.findByIdAndUpdate(request.clientId, {
        $set: { phone: Number(normalizedPhone) },
      })
    }
  }

  const contacts = sanitizeContacts(body.contactChannels)
  if (contacts !== undefined) {
    update.contactChannels = contacts
    if (request.clientId)
      await Clients.findByIdAndUpdate(request.clientId, {
        $set: { priorityContact: contacts[0] ?? null },
      })
  }

  if (body.eventDate !== undefined)
    update.eventDate = body.eventDate ? new Date(body.eventDate) : null
  if (body.location !== undefined) update.location = body.location ?? ''
  if (body.contractSum !== undefined)
    update.contractSum = Number(body.contractSum) || 0
  if (body.comment !== undefined) update.comment = body.comment ?? ''
  if (body.yandexAim !== undefined) update.yandexAim = body.yandexAim ?? ''

  if (body.status && REQUEST_STATUSES.has(body.status)) {
    update.status = body.status
  }

  const updatedRequest = await Requests.findByIdAndUpdate(id, update, {
    new: true,
  })

  let client = null
  if (request.clientId) {
    if (body.clientName !== undefined) {
      await Clients.findByIdAndUpdate(request.clientId, {
        $set: { firstName: body.clientName },
      })
    }
    client = await Clients.findById(request.clientId)
  }

  return NextResponse.json(
    { success: true, data: { request: updatedRequest, client } },
    { status: 200 }
  )
}

export const DELETE = async (req, { params }) => {
  const { id } = await params
  await dbConnect()
  const deleted = await Requests.findByIdAndDelete(id)
  if (!deleted)
    return NextResponse.json(
      { success: false, error: 'Заявка не найдена' },
      { status: 404 }
    )
  return NextResponse.json({ success: true }, { status: 200 })
}
