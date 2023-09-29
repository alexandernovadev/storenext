import { Button, CircularProgress, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

interface FormData {
  code: string
}

interface Props {
  handleNext: () => void
  email: string
}

export const FormCode = ({ handleNext,email }: Props) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm<FormData>({ shouldUnregister: false })
  const codeW = watch('code')


  console.log("email  ",email);
  
  const [isLoading, setisLoading] = useState(false)
  const [isValidCode, setIsValidCode] = useState(true)

  const onSubmitCode = async ({ code }: FormData) => {
    console.log('here code')
    setisLoading(true)
    setIsValidCode(true)
    try {
      const response = await fetch('/api/forgetpass/verifycode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: codeW }),
      })
      if (response.ok) {
        handleNext()
      } else {
        setIsValidCode(false)
      }
    } catch (error) {
      console.log('dataR ', error)
    } finally {
      console.log('FINAL')
      setisLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitCode)} noValidate>
      <Typography variant="body1" component="h1" sx={{ py: 4 }}>
        Escribe el código que te enviamos al correo
      </Typography>
      <TextField
        {...register('code', {
          required: 'El campo de código es requerido',
        })}
        label="Código"
        variant="filled"
        fullWidth
        error={!!errors.code}
        helperText={errors.code?.message}
        sx={{ mb: 2 }}
        disabled={isLoading}
      />

      {!isValidCode && (
        <span style={{ color: 'red' }}>El code no es valido</span>
      )}
      <Button type="submit" color="primary" fullWidth disabled={isLoading}>
        Verificar Código &nbsp;&nbsp;&nbsp;
        {isLoading && <CircularProgress color="warning" size={20} />}
      </Button>
    </form>
  )
}
