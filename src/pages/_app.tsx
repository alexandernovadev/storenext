import { AuthProvider, CartProvider, UiProvider } from '@/context'
import '@/styles/globals.css'
import { lightTheme } from '@/themes'
// import { darkgreenTheme } from '@/themes/darkgreen-theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import '../i18n';
import { useEffect } from 'react'
import i18n from '../i18n'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {

  useEffect(() => {
    const language = localStorage.getItem('language')
    if (language) {
      i18n.changeLanguage(language)
    }
  }, [])
  

  return (
    <SessionProvider session={session}>
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
        }}
      >
        <SWRConfig
          value={{
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json()),
          }}
        >
          <AuthProvider>
            <CartProvider>
              <UiProvider>
                <ThemeProvider theme={lightTheme}>
                  <CssBaseline />
                  {/*@ts-ignore*/}
                  <Component {...pageProps} />
                </ThemeProvider>
              </UiProvider>
            </CartProvider>
          </AuthProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
  )
}
