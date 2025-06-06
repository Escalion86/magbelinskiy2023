const requestsSchema = {
  phone: {
    type: Number,
    default: null,
  },
  source: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    default: null,
  },
  audience: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
  customType: {
    type: String,
    default: '',
  },
  spectators: {
    type: String,
    default: '',
  },
  town: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  official: { type: Boolean, default: false },
  comment: {
    type: String,
    default: '',
  },
  yandexAim: {
    type: String,
    default: '',
  },
  contact: {
    type: String,
    default: '',
  },
}

export default requestsSchema
