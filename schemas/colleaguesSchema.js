import { Schema } from 'mongoose'

const colleaguesSchema = {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: Number,
    default: null,
  },
  whatsapp: {
    type: Number,
    default: null,
  },
  telegram: {
    type: String,
    default: '',
  },
}

export default colleaguesSchema
