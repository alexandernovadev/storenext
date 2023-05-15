import { db, seedDatabase } from '@/database'
import { Product } from '@/models'
import User from '@/models/User'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({ message: 'No tiene acceso a este API' })
  }

  await db.connect()

  await User.deleteMany()
  await User.insertMany(seedDatabase.initialData.users)

  await Product.deleteMany()
  await Product.insertMany(seedDatabase.initialData.products)
  await db.disconnect()

  return res.status(201).json({ message: 'Data created :D' })
}
