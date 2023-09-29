import { AuthLayout } from '@/components/layouts'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

interface FormData {
  email: string
}
const ForgetpasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const router = useRouter()
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const onSubmit = async ({ email }: FormData) => {
    setLoading(true); 
    setError(null); 

    // 1 Buscar si el email existe en user
    // 2 if so, make a code, with date and expraction '1h'
    // 3 send email
    //  if send email, show input to put code
    //  the input , is sending , after show y are equal. and dont expere
    // if is correct the code, and valite was well, 
    // then,  show two inputs, to changue the password
    // Se cambia el pass y se redirije a login
    
    try {
      const response = await fetch('/api/forgetpass/sendmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }), 
      });

      console.log(response);

      console.log('Correo enviado exitosamente');
      
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <AuthLayout title={'Recuperar Contraseña'}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2} paddingTop={8}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Recuperar Contraseña
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('email', {
                  required: 'El campo de correo es requerido',
                  // You can add email validation as well
                })}
                label="Correo"
                variant="filled"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" color="primary" fullWidth>
                Enviar enlace de recuperación
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default ForgetpasswordPage
