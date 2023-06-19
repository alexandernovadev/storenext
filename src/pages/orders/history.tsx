import NextLink from 'next/link'

import { Typography, Grid, Chip, Link } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import { ShopLayout } from '../../components/layouts'
import { GetServerSideProps, NextPage } from 'next'
import { dbOrders } from '@/database'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { IOrder } from '@/interfaces'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Nombre Completo', width: 300 },

  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Muestra información si está pagada la orden o no',
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No pagada" variant="outlined" />
      )
    },
  },
  {
    field: 'orden',
    headerName: 'Ver orden',
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink href={`/orders/${params.row.orderId}`} passHref>
          Ver orden
        </NextLink>
      )
    },
  },
]

interface OrderProps {
  orders: IOrder[]
}

interface RowData {
  id: string
  paid: boolean
  fullname: string
}

const HistoryPage: NextPage<OrderProps> = ({ orders }) => {
  const rows = orders.map((order, idx) => ({
    id: idx + 1,
    paid: order.isPaid,
    fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
    orderId: order._id,
  }))

  return (
    <ShopLayout
      title={'Historial de ordenes'}
      description={'Historial de ordenes del cliente'}
    >
      <Typography variant="h1" component="h1">
        Historial de ordenes
      </Typography>

      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} />
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default HistoryPage

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const session = await getServerSession(req, res, authOptions)

  // Validate if order belogns to user
  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/history`,
        permanent: false,
      },
    }
  }

  // @ts-ignore
  const orders = await dbOrders.getOrdersByUser(session?.user._id.toString())

  console.log({ orders })

  // if (!orders) {
  //   return {
  //     redirect: {
  //       destination: '/orders/history',
  //       permanent: false,
  //     },
  //   }
  // }

  // // @ts-ignore
  // if (order.user !== session.user._id) {
  //   return {
  //     redirect: {
  //       destination: '/orders/history',
  //       permanent: false,
  //     },
  //   }
  // }

  return {
    props: {
      orders,
    },
  }
}
