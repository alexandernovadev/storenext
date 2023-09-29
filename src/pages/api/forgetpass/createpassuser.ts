// pages/api/create-password.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import User from '../../../models/User'; // Asegúrate de que la ruta sea correcta
import { db } from '@/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') return res.status(405).end(); // Método no permitido si no es PATCH
  
  const { email, newPassword } = req.body;
  
  if (!email || !newPassword) return res.status(400).json({ message: 'Email y newPassword son requeridos' });

  await db.connect();

  try {
    const user = await User.findOne({ email });
    
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    user.password = bcrypt.hashSync(newPassword);
    await user.save();

    return res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    console.error('Error actualizando la contraseña:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
    await db.disconnect();
  }
}
