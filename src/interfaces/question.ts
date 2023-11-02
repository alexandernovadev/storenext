export interface IQuestion {
  name: string
  desc: string
  options: IOption[]
  correct: string
}

export interface IOption {
  name: string
  id: string
}

// Exam Interface
export interface IExam {
  usuario: string
  fechaHoraInicio: Date
  fechaHoraFin: Date
  ipUsuario: string
  puntajeObtenido: number
  timeLimit: number
  timeUser: number

  // questions: IQuestion[];
  questions: []
}
