import { generateCodeRandPass } from '@/utils/createRandNumbeCode'
import { Button, CircularProgress, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

interface FormData {
  email: string
}

interface Props {
  handleNext: () => void
  setMail: Function
}

export const FormEmail = ({ handleNext, setMail }: Props) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormData>()

  const [isLoading, setisLoading] = useState(false)
  const [isValidEmail, setIsValidEmail] = useState(true)
  const onSubmitEmail = async ({ email }: FormData) => {
    setisLoading(true)
    setIsValidEmail(true)
    try {
      const response = await fetch('/api/forgetpass/verifymail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      console.log(data.valid)

      if (data.valid) {
        let fecha = new Date()

        // Agregar una hora a la fecha
        // (1 hora = 60 minutos = 3600 segundos = 3600000 milisegundos)
        fecha.setTime(fecha.getTime() + 3600000)

        let code = generateCodeRandPass()

        const createCode = await fetch('/api/forgetpass/makeresetcode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            expire: fecha,
            code,
          }),
        })

        if (createCode.ok) {
          const responseSend = await fetch('/api/forgetpass/sendmail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, code }),
          })

          const dataSenmail = await responseSend.json()
          setMail(email)
          handleNext()

          console.log('dataSenmail ', dataSenmail)
        }
      } else {
        setIsValidEmail(false)
      }
    } catch (error) {
      console.error('Error al enviar el correo:', error)
    } finally {
      setisLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitEmail)} noValidate>
      <Typography variant="body1" component="h1" sx={{ py: 4 }}>
        Escribe el correo con el que te encuentras registrado
      </Typography>
      <TextField
        {...register('email', {
          required: 'El campo de correo es requerido',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Correo inválido',
          },
        })}
        label="Correo"
        variant="filled"
        fullWidth
        helperText={errors.email?.message}
        sx={{ mb: 2 }}
        disabled={isLoading}
      />

      {!isValidEmail && (
        <span style={{ color: 'red' }}>
          El correo no se encuentra registrado
        </span>
      )}

      <Button type="submit" color="primary" fullWidth disabled={isLoading}>
        Enviar correo de recuperación &nbsp;&nbsp;&nbsp;
        {isLoading && <CircularProgress color="warning" size={20} />}
      </Button>
    </form>
  )
}
