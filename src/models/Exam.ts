import { IExam } from '@/interfaces/question';
import mongoose, { Model, model } from 'mongoose'

const examSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
  },
  fechaHoraInicio: {
    type: Date,
    required: true,
  },
  fechaHoraFin: {
    type: Date,
    required: true,
  },
  ipUsuario: {
    type: String,
    required: true,
  },
  puntajeObtenido: {
    type: Number,
    required: true,
  },
  questions: {
    type: Array,
  },
})


const Exam: Model<IExam> =
  mongoose.models.Exam || model('Exam', examSchema);


export { Exam }
