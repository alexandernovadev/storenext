import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from '@mui/material'
import React, { useContext, useMemo, useState } from 'react'

import NextLink from 'next/link'
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@mui/icons-material'
import logoshop from '../../assets/logoshop.png'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { CartContext, UiContext } from '@/context'

const routesCategory = [
  {
    href: '/category/men',
    name: 'Hombres',
  },
  {
    href: '/category/women',
    name: 'Mujeres',
  },
  {
    href: '/category/kid',
    name: 'Niños',
  },
]

export const Navbar = () => {
  const router = useRouter()

  const { toggleSideMenu } = useContext(UiContext)
  const { numberOfItems } = useContext(CartContext)

  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return
    router.push(`/search/${searchTerm}`)
  }

  const isActive = useMemo(() => {
    return (url: string) => (router.pathname === url ? 'primary' : 'info')
  }, [router.pathname])

  return (
    <AppBar>
      <Toolbar>
        <NextLink
          href="/"
          style={{
            textDecoration: 'none',
            color: 'black',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Image
            src={logoshop}
            width={30}
            height={35}
            alt="Picture of the author"
          />
          <Typography variant="h1" component={'h1'}>
            Store
          </Typography>
        </NextLink>

        <Box flex={1} />

        <Box
          sx={{
            display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' },
          }}
          className="fadeIn"
        >
          {routesCategory.map(({ href, name }) => (
            <NextLink href={href} key={String(href)} style={{ marginLeft: 3 }}>
              <Button
                color={isActive(href)}
                sx={{
                  '&:hover': {
                    backgroundColor:
                      isActive(href) === 'primary' ? 'black' : undefined,
                    color: isActive(href) === 'primary' ? 'white' : undefined,
                  },
                }}
              >
                {name}
              </Button>
            </NextLink>
          ))}
        </Box>

        <Box flex={1} />
        {/* Pantallas pantallas grandes */}
        {isSearchVisible ? (
          <Input
            sx={{ display: { xs: 'none', sm: 'flex' } }}
            className="fadeIn"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
            type="text"
            placeholder="Buscar..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            onClick={() => setIsSearchVisible(true)}
            className="fadeIn"
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            <SearchOutlined />
          </IconButton>
        )}

        {/* Pantallas pequeñas */}
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined />
        </IconButton>
        <NextLink href="/cart">
          <IconButton>
            <Badge badgeContent={numberOfItems > 9 ? '9+':numberOfItems } color="secondary">
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
        </NextLink>

        <Button onClick={toggleSideMenu}>Menú</Button>
      </Toolbar>
    </AppBar>
  )
}
