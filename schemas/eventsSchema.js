import { Schema } from 'mongoose'

const eventsSchema = {
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
    default: 'active',
  },
  isTransferred: {
    type: Boolean,
    default: false,
  },
  colleagueId: {
    type: Schema.Types.ObjectId,
    ref: 'Clients',
    default: null,
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
  importedFromCalendar: {
    type: Boolean,
    default: false,
  },
  calendarImportChecked: {
    type: Boolean,
    default: false,
  },
  contractSum: {
    type: Number,
    default: 0,
  },
  isByContract: {
    type: Boolean,
    default: false,
  },
  clientData: {
    type: {},
    default: {},
  },
}

export default eventsSchema
