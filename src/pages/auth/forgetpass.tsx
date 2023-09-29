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
  Breadcrumbs,
  Link,
} from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { generateCodeRandPass } from '@/utils/createRandNumbeCode'
import { FormEmail } from '@/components/forgetpass/FormEmail'
import { FormCode } from '@/components/forgetpass/FormCode'
import { FormPass } from '@/components/forgetpass/FormPass'
import Image from 'next/image'
import logotemp from '@/assets/logotemp.png'
import NextLink from 'next/link'

interface FormData {
  email: string
  code: string
  password: string
}

const ForgetpasswordPage = () => {
  const [activeStep, setActiveStep] = useState(0)
  const steps = ['Enter Email', 'Verify Code', 'Reset Password']

  const [mail, setMail] = useState('')

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
        return <FormEmail handleNext={handleNext} setMail={setMail} />
      case 1:
        return <FormCode email={mail} handleNext={handleNext} />
      case 2:
        const hasNumber = /\d/

        return <FormPass />
      default:
        return <>Error Steps</>
    }
  }

  return (
    <AuthLayout title={'Recuperar Contraseña'}>
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={2} paddingTop={8}>
          <Grid item xs={12}>
            <Box sx={{ width: 350, padding: '10px 20px' }}>
              <Grid>
                <Image src={logotemp} alt="" />
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Breadcrumbs aria-label="breadcrumb">
          
            <NextLink
                  href={`/auth/login`}
                  passHref
                  className="breadcuma_anchor"
                >
                  Login
                </NextLink>
              <Typography color="text.primary">
             
                  Forget my password
              </Typography>
            </Breadcrumbs>
          </Grid>
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
          <StepContent stepIndex={activeStep} />
        </Grid>
      </Box>
    </AuthLayout>
  )
}

export default ForgetpasswordPage
