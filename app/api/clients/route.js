import { NextResponse } from 'next/server'
import Clients from '@models/Clients'
import dbConnect from '@server/dbConnect'

export const GET = async () => {
  await dbConnect()
  const clients = await Clients.find({}).sort({ firstName: 1 }).lean()
  return NextResponse.json({ success: true, data: clients }, { status: 200 })
}

export const POST = async (req) => {
  const body = await req.json()
  await dbConnect()
  const client = await Clients.create(body)
  return NextResponse.json({ success: true, data: client }, { status: 201 })
}
