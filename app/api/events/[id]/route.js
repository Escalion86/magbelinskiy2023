import { NextResponse } from 'next/server'
import Events from '@models/Events'
import dbConnect from '@server/dbConnect'

const EVENT_STATUSES = new Set([
  'canceled',
  'active',
  'closed',
])

export const PUT = async (req, { params }) => {
  const { id } = await params
  const body = await req.json()
  await dbConnect()

  const update = {}
  if (body.eventDate !== undefined)
    update.eventDate = body.eventDate ? new Date(body.eventDate) : null
  if (body.clientId !== undefined) update.clientId = body.clientId
  if (body.location !== undefined) update.location = body.location ?? ''
  if (body.contractSum !== undefined)
    update.contractSum = Number(body.contractSum) || 0
  if (body.description !== undefined) update.description = body.description ?? ''
  if (body.calendarImportChecked !== undefined)
    update.calendarImportChecked = Boolean(body.calendarImportChecked)
  if (body.colleagueId !== undefined) update.colleagueId = body.colleagueId
  if (body.isTransferred !== undefined) {
    update.isTransferred = Boolean(body.isTransferred)
    if (!update.isTransferred) update.colleagueId = null
  }
  if (body.status && EVENT_STATUSES.has(body.status)) update.status = body.status

  const event = await Events.findByIdAndUpdate(id, update, { new: true })
  if (!event)
    return NextResponse.json(
      { success: false, error: 'Мероприятие не найдено' },
      { status: 404 }
    )

  return NextResponse.json({ success: true, data: event }, { status: 200 })
}

export const DELETE = async (req, { params }) => {
  const { id } = await params
  await dbConnect()
  const deleted = await Events.findByIdAndDelete(id)
  if (!deleted)
    return NextResponse.json(
      { success: false, error: 'Мероприятие не найдено' },
      { status: 404 }
    )
  return NextResponse.json({ success: true }, { status: 200 })
}
