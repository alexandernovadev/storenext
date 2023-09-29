// Ejemplo de nombre de archivo: pages/api/send-mail.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' }) // 405 Method Not Allowed
  }

  // Recuperar el email del cuerpo de la solicitud
  const { email, code } = req.body
  if (!email && !code) {
    return res.status(400).json({ message: 'Email and Code is required' }) // 400 Bad Request
  }

  try {
    // Configuración de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // O cualquier otro servicio de correo
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Configuración del correo
    const mailOptions = {
      from: 'titoantifa69@gmail.com',
      to: 'alexsk88.dev@gmail.com',
      subject: 'Recuperación de Contraseña',
      html: `
      <h1>Recuperación de Contraseña</h1>
      <p>Para recuperar tu contraseña, por favor digita este numero es la App</p>
      <b>${code}</b>
    `,
    }

    // Envía el correo
    await transporter.sendMail(mailOptions)

    // Responde con un estado 200 OK
    return res.status(200).json({ message: 'Email sent successfully' })
  } catch (error) {
    console.error('Error sending email', error)
    return res.status(500).json({ message: 'Internal Server Erro' + error }) // 500 Internal Server Error
  }
}
