import { NextResponse } from 'next/server'
import Transactions from '@models/Transactions'
import Events from '@models/Events'
import dbConnect from '@server/dbConnect'

export const GET = async () => {
  await dbConnect()
  const transactions = await Transactions.find({})
    .sort({ date: -1, createdAt: -1 })
    .lean()
  return NextResponse.json(
    { success: true, data: transactions },
    { status: 200 }
  )
}

export const POST = async (req) => {
  const body = await req.json()
  await dbConnect()

  if (!body.eventId || !body.clientId)
    return NextResponse.json(
      { success: false, error: 'Укажите мероприятие и клиента' },
      { status: 400 }
    )

  const transaction = await Transactions.create({
    eventId: body.eventId,
    clientId: body.clientId,
    requestId: body.requestId ?? null,
    amount: Number(body.amount) || 0,
    type: body.type ?? 'expense',
    date: body.date ? new Date(body.date) : new Date(),
    comment: body.comment ?? '',
  })

  if (body.contractSum !== undefined && body.eventId) {
    await Events.findByIdAndUpdate(body.eventId, {
      $set: { contractSum: Number(body.contractSum) || 0 },
    })
  }

  return NextResponse.json({ success: true, data: transaction }, { status: 201 })
}
