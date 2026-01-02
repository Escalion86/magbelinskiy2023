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

const ensureSiteSettings = async () => {
  const current = await SiteSettings.findOne()
  if (current) return current
  return SiteSettings.create({})
}

const findOrCreateClient = async (clientName, clientPhone, contactChannels) => {
  const numericPhone = clientPhone ? Number(clientPhone) : null
  if (!numericPhone || Number.isNaN(numericPhone)) return null

  const primaryContact =
    contactChannels.find((item) => item.includes('@')) ??
    contactChannels.find((item) => item.startsWith('+')) ??
    null

  const update = {
    $setOnInsert: {
      firstName: clientName || 'Клиент из Google Calendar',
      phone: numericPhone,
    },
  }

  if (primaryContact) update.$set = { priorityContact: primaryContact }

  const client = await Clients.findOneAndUpdate({ phone: numericPhone }, update, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  })

  return client
}

const buildEventUpdate = (parsedEvent, googleEventId, clientId) => {
  const setPayload = {
    googleCalendarId: googleEventId,
    title: parsedEvent.title,
    description: parsedEvent.description,
    location: parsedEvent.location,
    status: parsedEvent.status,
    importedFromCalendar: true,
    calendarImportChecked: false,
  }

  if (parsedEvent.dateStart) setPayload.dateStart = parsedEvent.dateStart
  if (parsedEvent.dateEnd) setPayload.dateEnd = parsedEvent.dateEnd
  if (parsedEvent.eventDate) setPayload.eventDate = parsedEvent.eventDate
  if (parsedEvent.clientName) setPayload.clientName = parsedEvent.clientName
  if (parsedEvent.clientPhone) setPayload.clientPhone = parsedEvent.clientPhone
  if (parsedEvent.contactChannels.length > 0)
    setPayload.contactChannels = parsedEvent.contactChannels
  if (parsedEvent.contractSum !== null && parsedEvent.contractSum !== undefined)
    setPayload.contractSum = parsedEvent.contractSum
  if (parsedEvent.comment) setPayload.comment = parsedEvent.comment
  if (parsedEvent.clientData && Object.keys(parsedEvent.clientData).length > 0)
    setPayload.clientData = parsedEvent.clientData
  if (clientId) setPayload.clientId = clientId

  return {
    $set: setPayload,
    $setOnInsert: {
      googleCalendarId: googleEventId,
      eventDate: parsedEvent.eventDate ?? parsedEvent.dateStart ?? null,
      status: parsedEvent.status,
      importedFromCalendar: true,
      calendarImportChecked: false,
    },
  }
}

export const POST = async (req) => {
  const body = await req.json().catch(() => ({}))
  const calendarId = body.calendarId ?? process.env.GOOGLE_CALENDAR_ID

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
  const syncToken = body.syncToken ?? storedSyncToken ?? null
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
    const client = await findOrCreateClient(
      parsed.clientName,
      parsed.clientPhone,
      parsed.contactChannels
    )

    const update = buildEventUpdate(parsed, item.id, client?._id)

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
