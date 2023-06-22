import { Box, Button, Chip, Grid, Typography } from '@mui/material'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'

import { ShopLayout } from '../../components/layouts'
import { ProductSlideshow, SizeSelector } from '../../components/products'
import { ItemCounter } from '../../components/ui/ItemCounter'

import { ICartProduct, IProduct, ISize } from '../../interfaces'
import { dbProducts } from '@/database'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { CartContext } from '@/context'

interface Props {
  product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const { addProductToCart } = useContext(CartContext)
  const { push } = useRouter()

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 3,
  })

  const onSelectedSize = (size: ISize) => {
    setTempCartProduct({ ...tempCartProduct, size })
  }

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct({ ...tempCartProduct, quantity })
  }

  const onAddProduct = () => {
    addProductToCart(tempCartProduct)
    push('/cart')

    // console.log(' Product : ', tempCartProduct.quantity)
  }

  return (
    <ShopLayout title={product.title} description={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            {/* titulos */}
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography
              variant="subtitle1"
              component="h2"
            >{`$${product.price}`}</Typography>

            {/* Cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updateQuantity={onUpdateQuantity}
                maxValue={product.inStock}
              />
              <SizeSelector
                onSelectedSize={onSelectedSize}
                selectedSize={tempCartProduct.size}
                sizes={product.sizes}
              />
            </Box>
            {/* Agregar al carrito */}
            {product.inStock !== 0 ? (
              tempCartProduct.size ? (
                <Button
                  onClick={onAddProduct}
                  color="secondary"
                  className="circular-btn"
                >
                  Agregar al carrito
                </Button>
              ) : (
                <Button color="primary" variant="outlined">
                  * Seleccione una talla *
                </Button>
              )
            ) : (
              <Chip
                label="No hay disponibles"
                color="error"
                variant="outlined"
              />
            )}

            {/* Descripción */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripción</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductSlugs()

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string }
  const product = await dbProducts.getProductBySlug(slug)

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      product,
    },
    revalidate: 86400,
  }
}

export default ProductPage
