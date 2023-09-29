import { Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'

interface FormData {
  password: string
}

export const FormPass = () => {
  const hasNumber = /\d/

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm<FormData>({ shouldUnregister: false })

  const onSubmitPassword = async ({ password }: FormData) => {
    // Logic for submitting new password
    console.log('here password')
  }

  return (
    <form onSubmit={handleSubmit(onSubmitPassword)} noValidate>
      <Typography variant="body1" component="h1" sx={{ pt: 4 }}>
        Escribe una nueva contraseña
      </Typography>
      <TextField
        {...register('password', {
          required: 'El campo de contraseña es requerido',
          minLength: {
            value: 5,
            message: 'La contraseña debe tener al menos 5 caracteres',
          },
          validate: (value) =>
            hasNumber.test(value) ||
            'La contraseña debe contener al menos un número',
        })}
        label="Contraseña"
        variant="filled"
        fullWidth
        sx={{ mb: 2 }}
        type="password"
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button type="submit" color="primary" fullWidth>
        Resetear Contraseña
      </Button>
    </form>
  )
}
