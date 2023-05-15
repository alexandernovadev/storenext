import { ShopLayout } from '@/components/layouts'
import { ProductList } from '@/components/products'
import { dbProducts } from '@/database'
import { IProduct } from '@/interfaces'
import { Box, Typography } from '@mui/material'
import { GetServerSideProps } from 'next'
import React from 'react'

interface Props {
  products: IProduct[]
  foundProducts: boolean
  query: string
}

const SearchPage = ({ products, foundProducts, query }: Props) => {
  return (
    <ShopLayout
      title={'Buscar Product'}
      description={'Search the best products'}
    >
      <>
        <Typography variant="h1" component="h1" sx={{ py: 2 }}>
          Buscar Producto
        </Typography>

        <Typography variant="h2" sx={{ mb: 1 }}>
          My pants
        </Typography>

        {foundProducts ? (
          <Typography variant="h2" sx={{ mb: 1 }} textTransform="capitalize">
            Término: {query}
          </Typography>
        ) : (
          <Box display="flex">
            <Typography variant="h2" sx={{ mb: 1 }}>
              No encontramos ningún produto
            </Typography>
            <Typography
              variant="h2"
              sx={{ ml: 1 }}
              color="secondary"
              textTransform="capitalize"
            >
              {query}
            </Typography>
          </Box>
        )}

        <ProductList products={products} />
      </>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string }

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    }
  }

  // y no hay productos
  let products = await dbProducts.getProductsByTerm(query)
  const foundProducts = products.length > 0

  /* TODO: retornar otros productos, 
  pero leo cookies y le doy loyou want */
  if (!foundProducts) {
    // products = await dbProducts.getAllProducts();
    products = await dbProducts.getProductsByTerm('shirt')
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  }
}

export default SearchPage
