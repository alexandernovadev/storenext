// pages/api/edit-reset-password.ts
import { db } from '@/database'
import { ResetPassword } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PATCH') return res.status(405).end() // Método no permitido si no es PATCH

  const { id, isValid } = req.body

  if (!id || isValid === undefined)
    return res.status(400).json({ message: 'id e isValid son requeridos' })

  await db.connect()

  try {
    const resetPassword = await ResetPassword.findById(id)

    if (!resetPassword)
      return res.status(404).json({ message: 'ResetPassword no encontrado' })

    resetPassword.isValid = isValid
    await resetPassword.save()

    return res
      .status(200)
      .json({ message: 'ResetPassword editado exitosamente' })
  } catch (error) {
    console.error('Error editando ResetPassword:', error)
    return res.status(500).json({ message: 'Error interno del servidor' })
  } finally {
    await db.disconnect()
  }
}
