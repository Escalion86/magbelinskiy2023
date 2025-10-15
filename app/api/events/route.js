import { NextResponse } from 'next/server'
import Events from '@models/Events'
import dbConnect from '@server/dbConnect'

export const GET = async () => {
  await dbConnect()
  const events = await Events.find({}).sort({ eventDate: -1, createdAt: -1 }).lean()
  return NextResponse.json({ success: true, data: events }, { status: 200 })
}

export const POST = async (req) => {
  const body = await req.json()
  await dbConnect()
  const event = await Events.create(body)
  return NextResponse.json({ success: true, data: event }, { status: 201 })
}
