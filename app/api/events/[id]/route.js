import { NextResponse } from 'next/server'
import Events from '@models/Events'
import dbConnect from '@server/dbConnect'

const EVENT_STATUSES = new Set([
  'planned',
  'in_progress',
  'completed',
  'canceled',
])

export const PUT = async (req, { params }) => {
  const { id } = params
  const body = await req.json()
  await dbConnect()

  const update = {}
  if (body.eventDate !== undefined)
    update.eventDate = body.eventDate ? new Date(body.eventDate) : null
  if (body.location !== undefined) update.location = body.location ?? ''
  if (body.contractSum !== undefined)
    update.contractSum = Number(body.contractSum) || 0
  if (body.comment !== undefined) update.comment = body.comment ?? ''
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
  const { id } = params
  await dbConnect()
  await Events.findByIdAndDelete(id)
  return NextResponse.json({ success: true }, { status: 200 })
}
