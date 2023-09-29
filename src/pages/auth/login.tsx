import NextLink from 'next/link'
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { validations } from '@/utils'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '@/context'
import { ErrorOutline } from '@mui/icons-material'
import { getProviders, getSession, signIn } from 'next-auth/react'
// import { GetServerSideProps } from 'next'
// import { authOptions } from '../api/auth/[...nextauth]'
// import { getServerSession } from 'next-auth/next'
import logotemp from '@/assets/logotemp.png'
import { AuthLayout } from '@/components/layouts/AuthLayout/AuthLayout'
import Image from 'next/image'
import ReCAPTCHA from 'react-google-recaptcha'

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
  const [isCheckCaptcha, setIsCheckCaptcha] = useState(false)

  useEffect(() => {
    getProviders().then((prov) => setProviders(prov))
  }, [])

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false)
    await signIn('credentials', { email, password })
  }
  const handleChange = (e: any) => {
    setIsCheckCaptcha(true)
  }

  return (
    <AuthLayout title={'Ingresar'}>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid>
            <Image src={logotemp} alt="" />
          </Grid>
          <Grid container spacing={2} paddingTop={8}>
            <Grid item xs={12}>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography color="text.primary">Login</Typography>
                <NextLink
                  href={`/auth/register?p=${destinaion}`}
                  passHref
                  className="breadcuma_anchor"
                >
                  Crear Cuenta
                </NextLink>
              </Breadcrumbs>
            </Grid>
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
                sx={{ mb: 2 }}
              />

              {/*@ts-ignore*/}
              <ReCAPTCHA
                sitekey="6LfaaWAoAAAAAInGTswtHeku1gYfGXBX70LhLzEI"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                disabled={
                  !isCheckCaptcha || !!errors.password || !!errors.email
                }
              >
                Ingresar
              </Button>
            </Grid>

            <Grid
              item
              xs={12}
              display="flex"
              alignItems="end"
              flexDirection={'column'}
            >
              <NextLink
                href={`/auth/forgetpass`}
                passHref
                className="breadcuma_anchor"
              >
                Olvide mi contraseña
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

// export const getServerSideProps: GetServerSideProps = async ({
//   req,
//   res,
//   query,
// }) => {
//   const session = await getServerSession(req, res, authOptions)
//   // const session = await getSession({ req })

//   const { p = '/' } = query

//   if (session) {
//     return {
//       redirect: {
//         destination: p.toString(),
//         permanent: false,
//       },
//     }
//   }

//   return {
//     props: {},
//   }
// }

export default LoginPage
