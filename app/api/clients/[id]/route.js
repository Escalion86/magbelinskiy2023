import { NextResponse } from 'next/server'
import Clients from '@models/Clients'
import dbConnect from '@server/dbConnect'

export const PUT = async (req, { params }) => {
  const { id } = await params
  const body = await req.json()
  await dbConnect()
  const client = await Clients.findByIdAndUpdate(id, body, {
    new: true,
  })
  if (!client)
    return NextResponse.json(
      { success: false, error: 'Клиент не найден' },
      { status: 404 }
    )
  return NextResponse.json({ success: true, data: client }, { status: 200 })
}

export const DELETE = async (req, { params }) => {
  const { id } = await params
  await dbConnect()
  const deleted = await Clients.findByIdAndDelete(id)
  if (!deleted)
    return NextResponse.json(
      { success: false, error: 'Клиент не найден' },
      { status: 404 }
    )
  return NextResponse.json({ success: true }, { status: 200 })
}
