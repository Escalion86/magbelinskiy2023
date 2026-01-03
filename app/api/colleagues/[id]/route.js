import { NextResponse } from 'next/server'
import Colleagues from '@models/Colleagues'
import dbConnect from '@server/dbConnect'

export const PUT = async (req, { params }) => {
  const { id } = params
  const body = await req.json()
  await dbConnect()
  const colleague = await Colleagues.findByIdAndUpdate(id, body, {
    new: true,
  })
  if (!colleague)
    return NextResponse.json(
      { success: false, error: 'Коллега не найден' },
      { status: 404 }
    )
  return NextResponse.json({ success: true, data: colleague }, { status: 200 })
}

export const DELETE = async (req, { params }) => {
  const { id } = params
  await dbConnect()
  await Colleagues.findByIdAndDelete(id)
  return NextResponse.json({ success: true }, { status: 200 })
}
