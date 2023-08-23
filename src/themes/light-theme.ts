import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1E1E1E',
      light: '#3e3e3e',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#3A64D8',
      light: '#6983f3',
      dark: '#0040a5',
      contrastText: '#ffffff',
    },
    error: {
      main: '#f44336',
      light: '#f6685e',
      dark: '#aa2e25',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ff9800',
      light: '#ffc947',
      dark: '#c66900',
      contrastText: '#ffffff',
    },
    info: {
      main: '#fff',
      light: '#ffffff',
      dark: '#cccccc',
      contrastText: '#1E1E1E',
    },
    success: {
      main: '#4caf50',
      light: '#80e27e',
      dark: '#087f23',
      contrastText: '#ffffff',
    },
    tonalOffset: 0.2,
    contrastThreshold: 3,
    common: {
      black: '#000',
      white: '#fff',
    },
    grey: {
      '50': '#fafafa',
      '100': '#f5f5f5',
      '200': '#eeeeee',
      '300': '#e0e0e0',
      '400': '#bdbdbd',
      '500': '#9e9e9e',
      '600': '#757575',
      '700': '#616161',
      '800': '#424242',
      '900': '#212121',
      A100: '#d5d5d5',
      A200: '#aaaaaa',
      A400: '#303030',
      A700: '#0d0d0d',
    },
    text: {
      primary: '#000000',
      secondary: '#888888',
      disabled: '#bbbbbb',
    },
    divider: '#e0e0e0',
    action: {
      active: '#1E1E1E',
      hover: '#3e3e3e',
      hoverOpacity: 0.08,
      selected: '#e8e8e8',
      disabled: '#f5f5f5',
      disabledBackground: '#e0e0e0',
      focus: '#3A64D8',
      focusOpacity: 0.12,
    },
    background: {
      paper: '#ffffff',
      default: '#f5f5f5',
    },
    getContrastText: (background: string) => {
      /* 
        Esta función devolverá un color de texto que contraste 
        con el color de fondo proporcionado.
        Por ahora, solo devuelve un valor de ejemplo.
        Puedes usar una función real para calcular el 
        contraste si lo necesitas.
      */
      return '#000000'
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1080,
      xl: 1920,
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: 'fixed',
      },
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          height: 60,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 30,
          fontWeight: 600,
        },
        h2: {
          fontSize: 20,
          fontWeight: 400,
        },
        subtitle1: {
          fontSize: 18,
          fontWeight: 600,
        },
      },
    },

    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'small',
        disableElevation: true,
        color: 'info',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: 10,
          ':hover': {
            backgroundColor: 'rgba(0,0,0,1)',
            color: '#e1e1e1',
            transition: 'all 0.3s ease-in-out',
          },
        },
      },
    },

    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
          borderRadius: '10px',
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          ':hover *': {
            color: '#e1e1e1',
          },
        },
      },
    },
  },
})
