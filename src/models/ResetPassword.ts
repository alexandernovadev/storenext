import mongoose, { Schema, model, Model } from 'mongoose'

interface IResetPassword extends mongoose.Document {
  email: string
  expire: Date
  createdAt: Date
  isValid: boolean
  code: string
}

const resetPasswordSchema = new Schema(
  {
    email: { type: String, required: true },
    expire: { type: Date, required: true },
    isValid: { type: Boolean, default: true },
    code: { type: String, required: true },
  },
  {
    timestamps: { createdAt: 'createdAt' },
  },
)

// Crear el modelo usando el schema
const ResetPassword: Model<IResetPassword> =
  mongoose.models.ResetPassword || model('ResetPassword', resetPasswordSchema)

export default ResetPassword
