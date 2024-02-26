const requestsSchema = {
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
  phone: {
    type: Number,
    required: [true, 'Введите Телефон'],
    default: null,
  },
  official: { type: Boolean, default: false },
  comment: {
    type: String,
    default: '',
  },
}

export default requestsSchema
