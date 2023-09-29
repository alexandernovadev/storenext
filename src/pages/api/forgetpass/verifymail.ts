// pages/api/validate-email.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { User } from '@/models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { email } = req.body

  if (!email) {
    return res.status(400).json({ message: 'Email is required' })
  }

  await db.connect()

  try {
    const user = await User.findOne({ email })

    // Enviar la respuesta basada en si el usuario existe o no.
    return res.status(200).json({ valid: !!user })
  } catch (error) {
    console.error('Error validating email', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  } finally {
    await db.disconnect()
  }
}
