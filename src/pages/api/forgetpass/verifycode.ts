// pages/api/verify-code.ts
import { db } from '@/database'
import { ResetPassword } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') return res.status(405).end() // Método no permitido si no es POST

  const { email, code } = req.body

  if (!email || !code)
    return res.status(400).json({ message: 'Email y code son requeridos' })

  await db.connect()

  try {
    const resetPassword = await ResetPassword.findOne({ email, code })

    console.log(resetPassword);
    
    if (!resetPassword)
      return res
        .status(404)
        .json({ message: 'Código no válido o ya ha sido utilizado' })

    const now = new Date()
    const expirationTime =
      new Date(resetPassword.createdAt).getTime() + Number(resetPassword.expire)

    if (now.getTime() > expirationTime) {
      resetPassword.isValid = false
      await resetPassword.save()
      return res.status(400).json({ message: 'expired' })
    }

    return res.status(200).json({ message: 'continue' })
  } catch (error) {
    console.error('Error verificando código:', error)
    return res.status(500).json({ message: 'Error interno del servidor' })
  } finally {
    await db.disconnect()
  }
}
