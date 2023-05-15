import { ShopLayout } from '@/components/layouts'
import { ProductList } from '@/components/products'
import { FullScreenLoading } from '@/components/ui/FullScreenLoading'
import { initialData } from '@/database/seed-data'
import { useProducts } from '@/hooks'
import { Typography } from '@mui/material'
import React from 'react'

const Home = () => {
  const { products, isError, isLoading } = useProducts('/products')

  return (
    <ShopLayout title={'ShopNext'} description={'Search the best products'}>
      <>
        <Typography variant="h1" component="h1" sx={{ py: 2 }}>
          Tienda
        </Typography>

        <Typography variant="h2" sx={{ mb: 1 }}>
          All products
        </Typography>

        {isLoading ? (
          <FullScreenLoading />
        ) : (
          <ProductList products={products} />
        )}
      </>
    </ShopLayout>
  )
}

export default Home
