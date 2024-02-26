import mongoose from 'mongoose'
import requestsSchema from '@schemas/requestsSchema'

const RequestsSchema = new mongoose.Schema(requestsSchema, { timestamps: true })

export default mongoose.models.Requests ||
  mongoose.model('Requests', RequestsSchema)
