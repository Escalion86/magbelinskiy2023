import mongoose from 'mongoose'
import colleaguesSchema from '@schemas/colleaguesSchema'

const ColleaguesSchema = new mongoose.Schema(colleaguesSchema, {
  timestamps: true,
})

export default mongoose.models.Colleagues ||
  mongoose.model('Colleagues', ColleaguesSchema)
