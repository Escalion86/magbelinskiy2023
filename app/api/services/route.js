import { NextResponse } from 'next/server'
import Services from '@models/Services'
import dbConnect from '@server/dbConnect'

export const GET = async () => {
  await dbConnect()
  const services = await Services.find({})
    .sort({ index: 1, title: 1 })
    .lean()
  return NextResponse.json({ success: true, data: services }, { status: 200 })
}

export const POST = async (req) => {
  const body = await req.json()
  await dbConnect()
  const service = await Services.create(body)
  return NextResponse.json({ success: true, data: service }, { status: 201 })
}
