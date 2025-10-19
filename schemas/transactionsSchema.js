import { Schema } from 'mongoose'

const transactionsSchema = {
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Events',
    required: true,
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Clients',
    required: true,
  },
  requestId: {
    type: Schema.Types.ObjectId,
    ref: 'Requests',
    default: null,
  },
  amount: {
    type: Number,
    required: [true, 'Укажите сумму транзакции'],
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    default: 'expense',
  },
  date: {
    type: Date,
    default: () => Date.now(),
  },
  comment: {
    type: String,
    default: '',
  },
}

export default transactionsSchema
