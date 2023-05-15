import { CartContext } from '@/context'
import { formatNumberToMiles } from '@/utils'
import { Grid, Typography } from '@mui/material'
import { useContext } from 'react'

export const OrderSummary = () => {
  const { total, tax, subTotal, numberOfItems } = useContext(CartContext)

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          {numberOfItems} item{numberOfItems > 1 ? 's' : ''}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{formatNumberToMiles(subTotal)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>
          Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{formatNumberToMiles(tax)}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }} display="flex" justifyContent="end">
        <Typography variant="subtitle1">
          {formatNumberToMiles(total)}
        </Typography>
      </Grid>
    </Grid>
  )
}
