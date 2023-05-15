import { ShopLayout } from '@/components/layouts'
import { Typography } from '@mui/material'
import React from 'react'

const SettingsPage = () => {
  return (
    <ShopLayout title={'ShopNext'} description={'Search the best products'}>
      <>
        <Typography variant="h1" component="h1" sx={{ py: 2 }}>
          Settings
        </Typography>

        <Typography variant="h2" sx={{ mb: 1 }}>
          Aqui cambiar tema , ver version y cjhat gpt me dira que mass
        </Typography>
      </>
    </ShopLayout>
  )
}

export default SettingsPage
