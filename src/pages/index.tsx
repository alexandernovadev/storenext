import { ShopLayout } from '@/components/layouts'
import { ProductList } from '@/components/products'
import { FullScreenLoading } from '@/components/ui/FullScreenLoading'
import { useProducts } from '@/hooks'
import { Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';


const Home = () => {
  const { products, isError, isLoading } = useProducts('/products')
  const { t } = useTranslation();

  return (
    <ShopLayout title={'ShopNext'} description={'Search the best products'}>
      <>
        <Typography variant="h1" component="h1" sx={{ py: 2 }}>
          {t('welcome')}
        </Typography>

        <Typography variant="h2" sx={{ mb: 1 }}>
        {t('products')}
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
