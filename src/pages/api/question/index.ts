// pages/api/exam.ts

import { db } from '@/database'
import { IExam } from '@/interfaces/question'
import { Exam } from '@/models/Exam'
import { NextApiRequest, NextApiResponse } from 'next'

const createExam = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect()

    const {
      usuario,
      fechaHoraInicio,
      fechaHoraFin,
      ipUsuario,
      puntajeObtenido,
      questions,
    } = req.body

    const exam: IExam = {
      usuario,
      fechaHoraInicio,
      fechaHoraFin,
      ipUsuario,
      puntajeObtenido,
      questions,
    }

    const newExam = new Exam(exam)
    await newExam.save()
    await db.disconnect()
    return res
      .status(201)
      .json({ message: 'Exam created successfully', data: newExam })
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message })
  }
}

const editExam = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect()

    const examId = req.query.id

    const {
      usuario,
      fechaHoraInicio,
      fechaHoraFin,
      ipUsuario,
      puntajeObtenido,
      questions,
    } = req.body

    const updatedExam = await Exam.findByIdAndUpdate(
      examId,
      {
        usuario,
        fechaHoraInicio,
        fechaHoraFin,
        ipUsuario,
        puntajeObtenido,
        questions,
      },
      { new: true },
    )

    if (!updatedExam) {
      await db.disconnect()
      return res.status(404).json({ message: 'Exam not found' })
    }

    await db.disconnect()
    return res
      .status(200)
      .json({ message: 'Exam updated successfully', data: updatedExam })
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message })
  }
}

const getExam = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect()

    const examId = req.query.id

    const exam = await Exam.findById(examId)

    if (!exam) {
      await db.disconnect()
      return res.status(404).json({ message: 'Exam not found' })
    }

    await db.disconnect()
    return res
      .status(200)
      .json({ message: 'Exam retrieved successfully', data: exam })
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message })
  }
}

//_________________________________

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return createExam(req, res)
    case 'PUT':
      return editExam(req, res)
    case 'GET':
      return getExam(req, res)
    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}
