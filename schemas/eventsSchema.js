import { Schema } from 'mongoose'

const eventsSchema = {
  directionId: {
    type: String,
    default: null,
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Clients',
    default: null,
  },
  requestId: {
    type: Schema.Types.ObjectId,
    ref: 'Requests',
    default: null,
  },
  title: {
    type: String,
    default: 'Новое мероприятие',
  },
  description: {
    type: String,
    default: 'Описание мероприятия',
  },
  clientName: {
    type: String,
    default: '',
  },
  clientPhone: {
    type: String,
    default: '',
  },
  contactChannels: {
    type: [String],
    default: [],
  },
  eventDate: {
    type: Date,
    default: null,
  },
  requestDate: {
    type: Date,
    default: null,
  },
  dateStart: {
    type: Date,
    default: null,
  },
  dateEnd: {
    type: Date,
    default: null,
  },
  address: {
    type: Map,
    of: String,
  },
  location: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: 'planned',
  },
  images: {
    type: Array,
    default: [],
  },
  tags: {
    type: Array,
    default: [String],
  },
  report: {
    type: String,
    default: '',
  },
  reportImages: {
    type: Array,
    default: [],
  },
  googleCalendarId: {
    type: String,
    default: null,
  },
  contractSum: {
    type: Number,
    default: 0,
  },
  clientData: {
    type: {},
    default: {},
  },
  comment: {
    type: String,
    default: '',
  },
}

export default eventsSchema
