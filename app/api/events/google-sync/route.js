import { NextResponse } from 'next/server'
import Clients from '@models/Clients'
import Events from '@models/Events'
import SiteSettings from '@models/SiteSettings'
import { parseGoogleEvent } from '@helpers/googleCalendarParsers'
import dbConnect from '@server/dbConnect'
import {
  getCalendarClient,
  listCalendarEvents,
} from '@server/googleCalendarClient'

const DEFAULT_TIME_MIN = '2000-01-01T00:00:00.000Z'
const EMPTY_CLIENT_NAME = 'Клиент из Google Calendar'

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const normalizePhoneNumber = (phone) => {
  if (!phone) return null
  const digits = String(phone).replace(/[^\d]/g, '')
  if (!digits) return null
  const numeric = Number(digits)
  return Number.isNaN(numeric) ? null : numeric
}

const pickPriorityContact = (contactChannels = [], clientPhone = null) => {
  const firstNonPhone = contactChannels.find((item) => item && !/^\+\d+$/.test(item))
  if (firstNonPhone) return firstNonPhone
  if (clientPhone) return `+${clientPhone}`
  return contactChannels.find(Boolean) ?? null
}

const findExistingClient = async (numericPhone, priorityContact) => {
  const conditions = []
  if (numericPhone) conditions.push({ phone: numericPhone })
  if (priorityContact)
    conditions.push({
      priorityContact: new RegExp(`^${escapeRegExp(priorityContact)}$`, 'i'),
    })

  if (!conditions.length) return null
  return Clients.findOne(conditions.length === 1 ? conditions[0] : { $or: conditions })
}

const ensureSiteSettings = async () => {
  const current = await SiteSettings.findOne()
  if (current) return current
  return SiteSettings.create({})
}

const ensureClientFromCalendar = async (clientName, clientPhone, contactChannels) => {
  const numericPhone = normalizePhoneNumber(clientPhone)
  const priorityContact = pickPriorityContact(contactChannels, clientPhone)

  const existingClient = await findExistingClient(numericPhone, priorityContact)
  if (existingClient) {
    const update = {}
    if (numericPhone && !existingClient.phone) update.phone = numericPhone
    if (priorityContact && !existingClient.priorityContact)
      update.priorityContact = priorityContact
    if (
      clientName &&
      existingClient.firstName === EMPTY_CLIENT_NAME &&
      clientName !== existingClient.firstName
    )
      update.firstName = clientName

    if (Object.keys(update).length) {
      existingClient.set(update)
      await existingClient.save()
    }

    return existingClient
  }

  if (!numericPhone) return null

  const createPayload = {
    firstName: clientName || EMPTY_CLIENT_NAME,
    phone: numericPhone,
  }
  if (priorityContact) createPayload.priorityContact = priorityContact

  return Clients.create(createPayload)
}

const formatCalendarDate = (date) => {
  if (!date) return null
  if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) return date
  const parsed = new Date(date)
  return Number.isNaN(parsed.getTime()) ? String(date) : parsed.toISOString()
}

const buildDescriptionFromCalendar = (parsedEvent, calendarEvent) => {
  const details = []
  const addLine = (label, value) => {
    if (!value) return
    details.push(`${label}: ${value}`)
  }

  addLine('Тема', calendarEvent?.summary)
  addLine('Описание календаря', calendarEvent?.description)
  addLine('Локация', calendarEvent?.location)
  addLine(
    'Начало',
    formatCalendarDate(
      calendarEvent?.start?.dateTime ?? calendarEvent?.start?.date ?? null
    )
  )
  addLine(
    'Окончание',
    formatCalendarDate(calendarEvent?.end?.dateTime ?? calendarEvent?.end?.date ?? null)
  )
  addLine('Статус', calendarEvent?.status)
  if (Array.isArray(calendarEvent?.attendees)) {
    const attendees = calendarEvent.attendees
      .map((attendee) =>
        [attendee?.displayName, attendee?.email].filter(Boolean).join(' / ')
      )
      .filter(Boolean)
    if (attendees.length) addLine('Участники', attendees.join('; '))
  }
  addLine('Организатор', calendarEvent?.organizer?.email)
  addLine(
    'Контакты',
    parsedEvent?.contactChannels?.length
      ? parsedEvent.contactChannels.join(', ')
      : null
  )
  addLine('Google ID', calendarEvent?.id)
  addLine('iCal UID', calendarEvent?.iCalUID)
  addLine('Ссылка', calendarEvent?.htmlLink)

  const descriptionHeader =
    details.length > 0 ? ['--- Данные из Google Calendar ---', ...details].join('\n') : ''
  const baseDescription = parsedEvent?.description?.trim() ?? ''

  return [baseDescription, descriptionHeader].filter(Boolean).join('\n\n')
}

const buildEventUpdate = (parsedEvent, googleEventId, clientId, calendarEvent) => {
  const setPayload = {
    googleCalendarId: googleEventId,
    title: parsedEvent.title,
    description: buildDescriptionFromCalendar(parsedEvent, calendarEvent),
    location: parsedEvent.location,
    status: parsedEvent.status,
    importedFromCalendar: true,
    calendarImportChecked: false,
  }

  if (parsedEvent.dateStart) setPayload.dateStart = parsedEvent.dateStart
  if (parsedEvent.dateEnd) setPayload.dateEnd = parsedEvent.dateEnd
  if (parsedEvent.eventDate) setPayload.eventDate = parsedEvent.eventDate
  if (parsedEvent.contractSum !== null && parsedEvent.contractSum !== undefined)
    setPayload.contractSum = parsedEvent.contractSum
  if (parsedEvent.comment) setPayload.comment = parsedEvent.comment
  if (parsedEvent.clientData && Object.keys(parsedEvent.clientData).length > 0)
    setPayload.clientData = parsedEvent.clientData
  if (clientId) setPayload.clientId = clientId

  return {
    $set: setPayload,
  }
}

export const POST = async (req) => {
  const body = await req.json().catch(() => ({}))
  const calendarId = body.calendarId ?? process.env.GOOGLE_CALENDAR_ID
  const forceFullSync = Boolean(body.forceFullSync)

  if (!calendarId)
    return NextResponse.json(
      { success: false, error: 'Укажите GOOGLE_CALENDAR_ID или calendarId' },
      { status: 400 }
    )

  const calendar = await getCalendarClient()
  if (!calendar)
    return NextResponse.json(
      {
        success: false,
        error:
          'Не найден файл google_calendar_token.json. Положите файл с ключами в корень проекта или укажите GOOGLE_CALENDAR_CREDENTIALS_PATH.',
      },
      { status: 500 }
    )

  await dbConnect()

  const settings = await ensureSiteSettings()
  const storedSyncToken = settings?.custom?.get('googleCalendarSyncToken')
  const syncToken = forceFullSync ? null : body.syncToken ?? storedSyncToken ?? null
  const timeMin = body.timeMin ?? (syncToken ? undefined : DEFAULT_TIME_MIN)
  const timeMax = body.timeMax ?? undefined

  let googleEvents
  try {
    googleEvents = await listCalendarEvents(calendar, {
      calendarId,
      syncToken,
      timeMin,
      timeMax,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `Не удалось загрузить события Google Calendar: ${error?.message ?? error}`,
      },
      { status: 502 }
    )
  }

  if (googleEvents.nextSyncToken) {
    settings.custom.set('googleCalendarSyncToken', googleEvents.nextSyncToken)
    await settings.save()
  }

  const results = []
  const calendarItems = Array.isArray(googleEvents.items) ? googleEvents.items : []

  for (const item of calendarItems) {
    const parsed = parseGoogleEvent(item)
    const client = await ensureClientFromCalendar(
      parsed.clientName,
      parsed.clientPhone,
      parsed.contactChannels
    )

    const update = buildEventUpdate(parsed, item.id, client?._id, item)

    const dbResult = await Events.findOneAndUpdate(
      { googleCalendarId: item.id },
      update,
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
        rawResult: true,
      }
    )

    results.push({
      googleId: item.id,
      eventId: dbResult.value?._id ?? null,
      action: dbResult.lastErrorObject?.updatedExisting ? 'updated' : 'created',
      title: parsed.title,
    })
  }

  return NextResponse.json(
    {
      success: true,
      data: {
        imported: results.length,
        nextSyncToken: googleEvents.nextSyncToken,
        results,
      },
    },
    { status: 200 }
  )
}
