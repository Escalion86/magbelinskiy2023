import { NextResponse } from 'next/server'
import Transactions from '@models/Transactions'
import dbConnect from '@server/dbConnect'

const TRANSACTION_TYPES = new Set(['income', 'expense'])

export const PUT = async (req, { params }) => {
  const { id } = await params
  const body = await req.json()
  await dbConnect()

  const update = {}
  if (body.amount !== undefined) update.amount = Number(body.amount) || 0
  if (body.date !== undefined) update.date = body.date ? new Date(body.date) : new Date()
  if (body.comment !== undefined) update.comment = body.comment ?? ''
  if (body.type && TRANSACTION_TYPES.has(body.type)) update.type = body.type

  const transaction = await Transactions.findByIdAndUpdate(id, update, {
    new: true,
  })

  if (!transaction)
    return NextResponse.json(
      { success: false, error: 'Транзакция не найдена' },
      { status: 404 }
    )

  return NextResponse.json({ success: true, data: transaction }, { status: 200 })
}

export const DELETE = async (req, { params }) => {
  const { id } = await params
  await dbConnect()
  const deleted = await Transactions.findByIdAndDelete(id)
  if (!deleted)
    return NextResponse.json(
      { success: false, error: 'Транзакция не найдена' },
      { status: 404 }
    )
  return NextResponse.json({ success: true }, { status: 200 })
}
