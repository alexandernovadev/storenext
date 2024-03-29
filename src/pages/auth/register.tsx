import NextLink from 'next/link'
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Grid,
  TextField,
  Typography,
} from '@mui/material'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { AuthContext } from '@/context'
import { validations } from '@/utils'
import { ErrorOutline } from '@mui/icons-material'
import logotemp from '@/assets/logotemp.png'
import Image from 'next/image'

import { AuthLayout } from '@/components/layouts/AuthLayout/AuthLayout'

interface FormData {
  name: string
  email: string
  password: string
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const router = useRouter()
  const destinaion = router.query.p?.toString() || '/'

  const { registerUser } = useContext(AuthContext)

  const [showError, setShowError] = useState(false)

  const onRegisterUser = async ({ name, email, password }: FormData) => {
    setShowError(false)

    const registerAuth = await registerUser(name, email, password)

    if (registerAuth.hasError) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    // Todo: navegar a la pantalla que el usuario estaba
    router.replace(destinaion)
  }

  return (
    <AuthLayout title={'Ingresar'}>
      <form onSubmit={handleSubmit(onRegisterUser)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid>
            <Image src={logotemp} alt="aa" />
          </Grid>
          <Grid container spacing={2} paddingTop={8}>
            <Grid item xs={12}>
              <Breadcrumbs aria-label="breadcrumb">
                <NextLink
                  href={`/auth/login?p=${destinaion}`}
                  passHref
                  className="breadcuma_anchor"
                >
                  Login
                </NextLink>
                <Typography color="text.primary">Crear Cuenta</Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Crear cuenta
              </Typography>
              <Chip
                label="Error here"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('name', {
                  required: 'El nombre es requerido',
                  minLength: {
                    value: 6,
                    message: 'Debe tener al menos 6 caracteres',
                  },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
                label="Nombre completo"
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('email', {
                  required: 'El email es requerido',
                  validate: validations.isEmail,
                })}
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                label="Correo"
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('password', {
                  required: 'El passwords es requerido',
                  minLength: {
                    value: 6,
                    message: 'Debe tener al menos 6 caracteres',
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
              >
                Registrar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage
