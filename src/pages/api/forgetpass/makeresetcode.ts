import { db } from '@/database'
import { ResetPassword } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') return res.status(405).end() // Método no permitido si no es POST

  const { email, expire, code } = req.body

  if (!email || !expire || !code)
    return res
      .status(400)
      .json({ message: 'Email, expire y code son requeridos' })

  await db.connect()

  try {
    const resetPassword = new ResetPassword({
      email,
      expire,
      code,
      isValid: true,
    })
    await resetPassword.save()

    return res
      .status(201)
      .json({ message: 'ResetPassword creado exitosamente' })
  } catch (error) {
    console.error('Error creando ResetPassword:', error)
    return res.status(500).json({ message: 'Error interno del servidor' })
  } finally {
    await db.disconnect()
  }
}
