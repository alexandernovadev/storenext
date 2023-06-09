import NextLink from 'next/link'

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from '@mui/material'

import { ShopLayout } from '../../components/layouts/ShopLayout'
import { CartList, OrderSummary } from '../../components/cart'
import { useContext, useState } from 'react'
import { CartContext } from '@/context'
import { countries } from '@/utils'
import { useRouter } from 'next/router'

const SummaryPage = () => {
  const { shippingAddress, numberOfItems, createOrder } =
    useContext(CartContext)
  const router = useRouter()
  const [isPosting, setIsPosting] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')

  // Buscar el país correspondiente en la lista
  const country = countries.find((c) => c.code === shippingAddress?.country)

  // Si se encontró el país, usar su nombre, si no, usar una cadena vacía
  const countryName = country ? country.name : ''

  const onCreateOrder = async () => {
    setIsPosting(true)

    const { hasError, message } = await createOrder()

    if (hasError) {
      setIsPosting(false)
      setErrorMessage(message)
      return
    }

    router.replace(`/orders/${message}`)
  }

  return (
    <ShopLayout title="Resumen de orden" description={'Resumen de la orden'}>
      <Typography variant="h1" component="h1">
        Resumen de la orden
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resumen ({numberOfItems} producto{numberOfItems > 1 ? 's' : ''})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>
                <NextLink href="/checkout/address" passHref>
                  Editar
                </NextLink>
              </Box>

              <Typography>
                {shippingAddress?.firstName} {shippingAddress?.lastName}{' '}
              </Typography>
              <Typography>
                {shippingAddress?.city} ,{shippingAddress?.zip}
              </Typography>
              <Typography>{countryName}</Typography>
              <Typography>{shippingAddress?.address}</Typography>
              <Typography>{shippingAddress?.phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  Editar
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  onClick={onCreateOrder}
                  disabled={isPosting}
                >
                  Confirmar Orden
                </Button>
                <Chip
                  color="error"
                  label={errorMessage}
                  sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default SummaryPage
