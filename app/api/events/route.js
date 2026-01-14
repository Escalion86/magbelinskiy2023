import { NextResponse } from 'next/server'
import Events from '@models/Events'
import dbConnect from '@server/dbConnect'
import { updateEventInCalendar } from '@server/CRUD'

export const GET = async () => {
  await dbConnect()
  const events = await Events.find({}).sort({ eventDate: -1, createdAt: -1 }).lean()
  return NextResponse.json({ success: true, data: events }, { status: 200 })
}

export const POST = async (req) => {
  const body = await req.json()
  await dbConnect()
  const event = await Events.create(body)
  let responseEvent = event
  if (!event?.importedFromCalendar) {
    try {
      await updateEventInCalendar(event, req)
      const refreshed = await Events.findById(event._id).lean()
      if (refreshed) responseEvent = refreshed
    } catch (error) {
      console.log('Google Calendar create error', error)
    }
  }
  return NextResponse.json({ success: true, data: responseEvent }, { status: 201 })
}
