import { AuthLayout } from '@/components/layouts'
import {
  Box,
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Typography,
  TextField,
} from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { generateCodeRandPass } from '@/utils/createRandNumbeCode'

interface FormData {
  email: string
  code: string
  password: string
}

const ForgetpasswordPage = () => {
  const methods = useForm<FormData>({ shouldUnregister: false })
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = methods
  const emailWatched = watch('email')
  const coeWatched = watch('code')

  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const steps = ['Enter Email', 'Verify Code', 'Reset Password']
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [isValidCode, setIsValidCode] = useState(true)

  const onSubmitEmail = async ({ email }: FormData) => {
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

        // Agregar una hora a la fecha (1 hora = 60 minutos = 3600 segundos = 3600000 milisegundos)
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
          handleNext()

          console.log('dataSenmail ', dataSenmail)
        }
      } else {
        setIsValidEmail(false)
      }
    } catch (error) {
      console.error('Error al enviar el correo:', error)
    } finally {
      // setLoading(false)
    }
  }

  const onSubmitCode = async ({ code }: FormData) => {
    // Logic for submitting code
    console.log('here code')
    setIsValidCode(true)

    try {
      const response = await fetch('/api/forgetpass/verifycode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailWatched, code: coeWatched }),
      })
      if (response.ok) {
        handleNext()
      } else {
        setIsValidCode(false)
      }
    } catch (error) {
      console.log('dataR ', error)
      setIsValidCode(false)
    } finally {
      console.log('FINAL')
    }
  }

  const onSubmitPassword = async ({ password }: FormData) => {
    // Logic for submitting new password
    console.log('here password')
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const StepContent = ({ stepIndex }: { stepIndex: number }) => {
    switch (stepIndex) {
      // Implement your form rendering logic based on the stepIndex
      // Here you render your form based on the stepIndex
      case 0:
        return (
          <form onSubmit={handleSubmit(onSubmitEmail)} noValidate>
            <Typography variant="body1" component="h1" sx={{ py: 4 }}>
              Escribe el correo con el que te encuentras registrado
            </Typography>
            <TextField
              {...register('email', {
                required: 'El campo de correo es requerido',
              })}
              label="Correo"
              variant="filled"
              fullWidth
              helperText={errors.email?.message}
              sx={{ mb: 2 }}
            />
            {!isValidEmail && (
              <span style={{ color: 'red' }}>
                El correo no se encuentra registrado
              </span>
            )}
            <Button type="submit" color="primary" fullWidth>
              Enviar correo de recuperación
            </Button>
          </form>
        )
      case 1:
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
              helperText={errors.code?.message}
              sx={{ mb: 2 }}
            />

            {!isValidCode && (
              <span style={{ color: 'red' }}>El code no es valido</span>
            )}
            <Button type="submit" color="primary" fullWidth>
              Verificar Código
            </Button>
          </form>
        )
      case 2:
        const hasNumber = /\d/

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
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button type="submit" color="primary" fullWidth>
              Resetear Contraseña
            </Button>
          </form>
        )
      default:
        return <>Eror Step </>
    }
  }

  return (
    <AuthLayout title={'Recuperar Contraseña'}>
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={2} paddingTop={8}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1" sx={{ py: 4 }}>
              Recuperar Contraseña
            </Typography>
          </Grid>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <FormProvider {...methods}>
            <StepContent stepIndex={activeStep} />
          </FormProvider>
        </Grid>
      </Box>
    </AuthLayout>
  )
}

export default ForgetpasswordPage
