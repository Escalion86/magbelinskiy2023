import { NextResponse } from 'next/server'
import Colleagues from '@models/Colleagues'
import dbConnect from '@server/dbConnect'

export const GET = async () => {
  await dbConnect()
  const colleagues = await Colleagues.find({}).sort({ name: 1 }).lean()
  return NextResponse.json(
    { success: true, data: colleagues },
    { status: 200 }
  )
}

export const POST = async (req) => {
  const body = await req.json()
  await dbConnect()
  const colleague = await Colleagues.create(body)
  return NextResponse.json({ success: true, data: colleague }, { status: 201 })
}
