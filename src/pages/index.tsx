import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css'

import { Alert, AlertTitle, Container, Stack, Toolbar } from '@mui/material'
import { AuthAction, withAuthUser } from 'next-firebase-auth'

import Breadcrumbs from '@app/components/breadcrumbs'
import { NextPage } from 'next'
import React from 'react'
import dynamic from 'next/dynamic'

const SummaryCost = dynamic(() => import('@app/components/summaryCost/index'))
const SummaryReservation = dynamic(
  () => import('@app/components/summaryReservation')
)

const Home: NextPage = () => {
  return (
    <>
      <Toolbar />
      <Breadcrumbs />
      <Container
        maxWidth="lg"
        style={{
          paddingTop: 20,
          background: '#fff',
          height: '100%',
          flex: '1 1 0%'
        }}>
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="info">
            <AlertTitle>Version 1.0.0</AlertTitle>
            พัฒนาระบบให้สอดคล่องกับการทำงาน —{' '}
            <strong>ดูรายละเอียดที่นี้!</strong>
          </Alert>
        </Stack>

        <SummaryReservation />

        <SummaryCost />

        {/* <Typography variant="h5">บริการของเรา</Typography>
        <Grid container spacing={2} style={{ marginTop: 10 }}>
          <Grid item xs={12} sm={4}>
            <ServiceItem
              title="ระบบจัดการห้องพักที่ยอดเยี่ยม"
              description="ออกแบบการจัดการห้องพักเพื่อตอบสนองการใช้งานของผู้ใช้"
              actionUrl=""
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ServiceItem
              title="ปรับราคา ตามใจคุณ"
              description=""
              actionUrl=""
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ServiceItem title="สรุปยอดขาย" description="" actionUrl="" />
          </Grid>
        </Grid> */}
      </Container>
    </>
  )
}

// type ServiceItemProps = {
//   title: string
//   description: string
//   actionUrl: string
// }

// const ServiceItem = (props: ServiceItemProps) => {
//   return (
//     <>
//       <Card style={{ height: '100%' }}>
//         <CardActionArea style={{ height: '100%' }}>
//           <Grid
//             container
//             style={{ padding: 14, height: '100%' }}
//             direction="row"
//             justifyContent="space-between"
//             alignItems="stretch">
//             <Grid item xs={12}>
//               <Typography variant="h6">{props.title}</Typography>
//             </Grid>
//             <Grid item xs={12}>
//               <Typography variant="body1">{props.description}</Typography>
//             </Grid>
//             <Grid item xs={12} container alignItems="flex-end">
//               <Link href={props.actionUrl}>
//                 <Typography variant="body1">อ่านเพิ่มเติม</Typography>
//               </Link>
//             </Grid>
//           </Grid>
//         </CardActionArea>
//       </Card>
//     </>
//   )
// }

// export const getServerSideProps = withAuthUserTokenSSR()()

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(Home)
