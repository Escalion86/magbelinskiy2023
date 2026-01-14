import { NextResponse } from 'next/server'
import Services from '@models/Services'
import dbConnect from '@server/dbConnect'

export const PUT = async (req, { params }) => {
  const { id } = await params
  const body = await req.json()
  await dbConnect()
  const service = await Services.findByIdAndUpdate(id, body, {
    new: true,
  })
  if (!service)
    return NextResponse.json(
      { success: false, error: 'Услуга не найдена' },
      { status: 404 }
    )
  return NextResponse.json({ success: true, data: service }, { status: 200 })
}

export const DELETE = async (req, { params }) => {
  const { id } = await params
  await dbConnect()
  const deleted = await Services.findByIdAndDelete(id)
  if (!deleted)
    return NextResponse.json(
      { success: false, error: 'Услуга не найдена' },
      { status: 404 }
    )
  return NextResponse.json({ success: true }, { status: 200 })
}
