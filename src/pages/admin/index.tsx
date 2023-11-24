import { useState, useEffect } from 'react'
import useSWR from 'swr'
import {
  AttachMoneyOutlined,
  CreditCardOffOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GroupOutlined,
  CategoryOutlined,
  CancelPresentationOutlined,
  ProductionQuantityLimitsOutlined,
  AccessTimeOutlined,
} from '@mui/icons-material'

import { AdminLayout } from '../../components/layouts'
import { Button, Grid, Typography } from '@mui/material'
import { SummaryTile } from '../../components/admin'
import { DashboardSummaryResponse } from '../../interfaces'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'

import { usePDF } from 'react-to-pdf'

ChartJS.register(ArcElement, Tooltip, Legend)

const DashboardPage = () => {
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' })

  const dataPie = {
    labels: [
      'Ordenes totales',
      'Ordenes pagadas',
      'Ordenes pendientes',
      'Clientes',
      'Productos',
      'Sin existencias',
      'Bajo inventario',
    ],

    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const { data, error } = useSWR<DashboardSummaryResponse>(
    '/api/admin/dashboard',
    {
      refreshInterval: 30 * 1000, // 30 segundos
    },
  )

  const [refreshIn, setRefreshIn] = useState(30)

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Tick')
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!error && !data) {
    return <></>
  }

  if (error) {
    console.log(error)
    return <Typography>Error al cargar la información</Typography>
  }

  const {
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
    notPaidOrders,
  } = data!

  const dataBar = {
    labels: [
      'Ordenes totales',
      'Ordenes pagadas',
      'Ordenes pendientes',
      'Clientes',
      'Productos',
      'Sin existencias',
      'Bajo inventario',
    ],
    datasets: [
      {
        label: 'Cantidad',
        data: [
          numberOfOrders,
          paidOrders,
          notPaidOrders,
          numberOfClients,
          numberOfProducts,
          productsWithNoInventory,
          lowInventory,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(199, 199, 199, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(159, 159, 159, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    scales: {
      x: {
        type: 'category', // Establece el tipo de escala como categoría
        labels: [
          'Ordenes totales',
          'Ordenes pagadas',
          'Ordenes pendientes',
          'Clientes',
          'Productos',
          'Sin existencias',
          'Bajo inventario',
        ],
      },
      y: {
        beginAtZero: true, // Configura la escala del eje Y según sea necesario
      },
    },
  }

  return (
    <AdminLayout
      title="Dashboard"
      subTitle="Estadisticas generales"
      icon={<DashboardOutlined />}
    >
      <div>
        <Button onClick={() => toPDF()}>Download PDF</Button>
      </div>

      <div ref={targetRef} style={{padding:20}}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mis estadisticas
        </Typography>
        <Grid container spacing={2}>
          <SummaryTile
            title={numberOfOrders}
            subTitle="Ordenes totales"
            icon={
              <CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} />
            }
          />
          <SummaryTile
            title={paidOrders}
            subTitle="Ordenes pagadas"
            icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
          />
          <SummaryTile
            title={notPaidOrders}
            subTitle="Ordenes pendientes"
            icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
          />
          <SummaryTile
            title={numberOfClients}
            subTitle="Clientes"
            icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
          />
          <SummaryTile
            title={numberOfProducts}
            subTitle="Productos"
            icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
          />
          <SummaryTile
            title={productsWithNoInventory}
            subTitle="Sin existencias"
            icon={
              <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />
            }
          />
          <SummaryTile
            title={lowInventory}
            subTitle="Bajo inventario"
            icon={
              <ProductionQuantityLimitsOutlined
                color="warning"
                sx={{ fontSize: 40 }}
              />
            }
          />
          <SummaryTile
            title={refreshIn}
            subTitle="Actualización en:"
            icon={
              <AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />
            }
          />
          <div
            style={{
              display: 'flex',
              height: '800px',
              padding: '20px',
            }}
          >
            <h1>Behavior from last Quarter</h1>
            <Pie data={dataPie} />
          </div>
        </Grid>
      </div>
    </AdminLayout>
  )
}

export default DashboardPage
