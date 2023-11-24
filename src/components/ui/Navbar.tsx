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
  styled,
} from '@mui/material'
import React, { useContext, useEffect, useMemo, useState } from 'react'

import NextLink from 'next/link'
import {
  ClearOutlined,
  Height,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@mui/icons-material'
import logoshop from '../../assets/logoshop.png'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { CartContext, UiContext } from '@/context'
import { LogoMainTwo } from '@/assets/LogoMainTwo'
import MenuIcon from '@mui/icons-material/Menu'
import logo from '@/assets/logotemp.png'

import { useTranslation } from 'react-i18next'

const routesCategory = [
  {
    href: '/category/men',
    name: 'Hombres',
    key: 'man',
  },
  {
    href: '/category/women',
    name: 'Mujeres',
    key: 'women',
  },
  {
    href: '/category/kid',
    name: 'Niños',
    key: 'kids',
  },
]

export const Navbar = () => {
  const router = useRouter()
  const { t } = useTranslation()

  const { i18n } = useTranslation()
  const [language, setLanguage] = useState()

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


  useEffect(() => {
    const language = localStorage.getItem('language')
    if (language) {
      i18n.changeLanguage(language)
      // @ts-ignore
      setLanguage(language)
    }
  }, [])
  const StyledBox = styled(Box)(({ theme }) => ({
    height: '100%',
    margin: '80px auto',
    maxWidth: '1080px',
    width: '1080px',
    padding: '0px 30px',
    display: 'flex',
    justifyContent: 'space-between',

    [theme.breakpoints.down('lg')]: {
      width: '100vw',
      justifyContent: 'space-between',
      maxWidth: '100%',
    },
  }))

  const SelectLanguage = () => {
    const changeLanguage = (lng: string) => {
      i18n.changeLanguage(lng)
      localStorage.setItem('language', lng)
      // @ts-ignore
      setLanguage(lng)
    }
    return (
      <Box sx={{ display: { xs: 'none', sm: 'flex' , gap:2} }}>
        <Button
          onClick={() => changeLanguage('es')}
          
          sx={{
            '&:hover': {
              backgroundColor: 'gray',
              color: 'white',
            },
            backgroundColor: language === 'es' ? 'black' : undefined,
            color:language === 'es' ? 'white' : undefined,
          }}
        >
          ES
        </Button>
        <Button
          onClick={() => changeLanguage('en')}
          sx={{
            '&:hover': {
              backgroundColor: 'black',
              color: 'white',
            },
            backgroundColor: language === 'en' ? 'black' : undefined,
            color:language === 'en' ? 'white' : undefined,

          }}
        >
          EN
        </Button>
      </Box>
    )
  }
  return (
    <AppBar>
      <Toolbar>
        <StyledBox>
          <Box sx={{}}>
            <NextLink href="/">
              <Image src={logo} width={180} alt="Picture of the author" />
            </NextLink>
          </Box>

          <Box
            sx={{
              display: isSearchVisible ? 'none' : { xs: 'none', lg: 'flex' },
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {routesCategory.map(({ href, name, key }) => (
              <NextLink
                href={href}
                key={String(href)}
                style={{ marginLeft: 3 }}
              >
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
                  {t(`options.${key}`)}
                </Button>
              </NextLink>
            ))}
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
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
                <Badge
                  badgeContent={numberOfItems > 9 ? '9+' : numberOfItems}
                  color="secondary"
                >
                  <ShoppingCartOutlined />
                </Badge>
              </IconButton>
            </NextLink>

            <SelectLanguage />

            <IconButton onClick={toggleSideMenu}>
              <MenuIcon />
            </IconButton>
          </Box>
        </StyledBox>
      </Toolbar>
    </AppBar>
  )
}
