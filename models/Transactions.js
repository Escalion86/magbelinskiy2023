import mongoose from 'mongoose'
import transactionsSchema from '@schemas/transactionsSchema'

const TransactionsSchema = new mongoose.Schema(transactionsSchema, {
  timestamps: true,
})

export default mongoose.models.Transactions ||
  mongoose.model('Transactions', TransactionsSchema)
