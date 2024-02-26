const eventsSchema = {
  directionId: {
    type: String,
    default: null,
  },
  clientId: {
    type: String,
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
  status: {
    type: String,
    default: 'request',
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
  clientData: {
    type: {},
    default: {},
  },
}

export default eventsSchema
