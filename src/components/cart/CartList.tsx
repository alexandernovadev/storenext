import { FC, useContext } from 'react'
import NextLink from 'next/link'
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material'

import { ItemCounter } from '../ui'
import { CartContext } from '@/context'
import { ICartProduct, IOrderItem } from '@/interfaces'

interface Props {
  editable?: boolean
  products?: IOrderItem[]
}

export const CartList: FC<Props> = ({ editable = false, products }) => {
  const { cart, removeCartProduct, updateCartQuantity } =
    useContext(CartContext)

  const onNewCartQuantityValue = (
    product: ICartProduct,
    newQuantityValue: number,
  ) => {
    product.quantity = newQuantityValue
    updateCartQuantity(product)
  }

  const productsToShow = products ? products : cart

  return (
    <>
      {productsToShow.map((product, i) => (
        <Grid container spacing={2} key={`${product.slug}-${i}`} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            {/* TODO: llevar a la página del producto */}
            <NextLink href={`/product/${product.slug}`} passHref>
              <CardActionArea>
                <CardMedia
                  image={`/products/${product.image}`}
                  component="img"
                  sx={{ borderRadius: '5px' }}
                />
              </CardActionArea>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Talla: <strong>{product.size}</strong>
              </Typography>

              {editable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  maxValue={10}
                  updateQuantity={(value: number) =>
                    onNewCartQuantityValue(product as ICartProduct, value)
                  }
                />
              ) : (
                <Typography variant="h5">
                  {product.quantity} item{product.quantity > 1 ? 's' : ''}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">{`$${product.price}`}</Typography>

            {editable && (
              <Button
                variant="text"
                color="secondary"
                onClick={() => removeCartProduct(product as ICartProduct)}
              >
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  )
}
