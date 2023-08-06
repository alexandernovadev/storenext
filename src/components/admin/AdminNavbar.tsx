import { useContext } from 'react'
import NextLink from 'next/link'

import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material'

import { UiContext } from '../../context'
import { LogoMainTwo } from '@/assets/LogoMainTwo'

export const AdminNavbar = () => {
  const { toggleSideMenu } = useContext(UiContext)

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Box display="flex" alignItems="center">
      
          <LogoMainTwo 
            style={{
              position:'relative',
              width:'160px',
              top:'8px'
            }}/>
   
          </Box>
        </NextLink>

        <Box flex={1} />

        <Button onClick={toggleSideMenu}>Menú</Button>
      </Toolbar>
    </AppBar>
  )
}
