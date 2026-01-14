import { Schema } from 'mongoose'

const servicesSchema = {
  title: {
    type: String,
    required: [true, 'Укажите название услуги'],
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  duration: {
    type: Number,
    default: 0,
  },
}

export default servicesSchema
