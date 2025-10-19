import { Schema } from 'mongoose'

const requestsSchema = {
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Clients',
    default: null,
  },
  clientName: {
    type: String,
    required: [true, 'Укажите имя клиента'],
    trim: true,
  },
  clientPhone: {
    type: String,
    required: [true, 'Укажите телефон клиента'],
  },
  contactChannels: {
    type: [String],
    default: [],
  },
  eventDate: {
    type: Date,
    default: null,
  },
  location: {
    type: String,
    default: '',
  },
  contractSum: {
    type: Number,
    default: 0,
  },
  comment: {
    type: String,
    default: '',
  },
  yandexAim: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['new', 'in_progress', 'converted', 'canceled'],
    default: 'new',
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Events',
    default: null,
  },
}

export default requestsSchema
