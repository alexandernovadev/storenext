import NextLink from 'next/link'
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import { AuthLayout } from '@/components/layouts'
import { useForm } from 'react-hook-form'
import { validations } from '@/utils'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '@/context'
import { ErrorOutline } from '@mui/icons-material'
import { getProviders, signIn } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { authOptions } from '../api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'

interface FormData {
  email: string
  password: string
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const router = useRouter()
  const destinaion = router.query.p?.toString() || '/'

  const { loginUser } = useContext(AuthContext)

  const [showError, setShowError] = useState(false)

  const [providers, setProviders] = useState<any>({})

  useEffect(() => {
    getProviders().then((prov) => setProviders(prov))
  }, [])

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false)

    // const isValidLogin = await loginUser(email, password)

    // if (!isValidLogin) {
    //   setShowError(true)
    //   setTimeout(() => setShowError(false), 3000)
    //   return
    // }

    // // Pantalla que el usuario estaba
    // router.replace(destinaion)

    await signIn('credentials', { email, password })
  }
  return (
    <AuthLayout title={'Ingresar'}>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Iniciar Sesión
              </Typography>
              <Chip
                label="No reconocemos ese usuario / contraseña"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('email', {
                  required: 'El campo es requerido',
                  validate: (val) => validations.isEmail(val),
                  // validate:  validations.isEmail,ASI deberia estar but
                  // i need to notice how the validate send value
                })}
                label="Correo"
                variant="filled"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('password', {
                  required: 'El password es requerido',
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
                Ingresar
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href={`/auth/register?p=${destinaion}`} passHref>
                ¿No tienes cuenta?
              </NextLink>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            display="flex"
            flexDirection="column"
            justifyContent="end"
          >
            <Divider sx={{ width: '100%', mb: 2 }} />
            {Object.values(providers).map((provider: any) => {
              if (provider.id === 'credentials')
                return <div key="credentials"></div>

              return (
                <Button
                  key={provider.id}
                  variant="outlined"
                  fullWidth
                  color="primary"
                  sx={{ mb: 1 }}
                  onClick={() => signIn(provider.id)}
                >
                  {provider.name}
                </Button>
              )
            })}
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const session = await getServerSession(req, res, authOptions)
  // const session = await getSession({ req })

  const { p = '/' } = query

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default LoginPage
