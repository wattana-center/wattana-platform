import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css'

import {
  Card,
  CardContent,
  Container,
  Grid,
  Icon,
  Stack,
  Typography
} from '@mui/material'

import { BusinessResponseGet } from '@app/apis/interface/business-interface'
import Image from 'next/image'
import SummaryCard from '@app/components/card/summart'
import SummaryTopRooms from '@app/components/summaryTopRooms'
import { makeStyles } from '@mui/styles'

type ManageMainProps = {
  data: BusinessResponseGet
}

const useStyles = makeStyles(() => ({
  image: {
    borderRadius: 5
  }
}))

const ManageMain: React.FC<ManageMainProps> = ({ data }) => {
  const classes = useStyles()

  return (
    <>
      <Container maxWidth="lg" style={{ marginTop: 10 }}>
        <Grid container direction="column" spacing={1}>
          <Grid item container spacing={2} direction="row">
            <Grid item md={2} xs={6}>
              <SummaryCard title="Follow" count={`${data.follow_summary}`} />
            </Grid>
            <Grid item md={2} xs={6}>
              <SummaryCard title="Today" count="0" />
            </Grid>
            <Grid item md={2} xs={6}>
              <SummaryCard title="Tomorrow" count="0" />
            </Grid>
            <Grid item md={2} xs={6}>
              <SummaryCard title="This month" count="0" />
            </Grid>
            <Grid item md={2} xs={6}>
              <SummaryCard title="Next month" count="0" />
            </Grid>
            <Grid item md={2} xs={6}>
              <SummaryCard title="Summary Reservation" count="0" />
            </Grid>
          </Grid>

          <Grid item container>
            <Card style={{ width: '100%' }}>
              <CardContent>
                <Stack alignItems="center" spacing={4} direction="column">
                  <div style={{ width: '50%' }}>
                    <Image
                      width="100"
                      height="100"
                      layout="responsive"
                      className={classes.image}
                      src={`${
                        data.images
                          ? data.images[0].src
                          : '/image/assets/no_image_available.jpeg'
                      }`}
                      alt="Picture of the author"
                    />
                  </div>
                  <Stack spacing={1}>
                    <Typography>{data.name}</Typography>
                    <Stack alignItems="center" spacing={1}>
                      <Typography>
                        <Icon>location_on</Icon>
                        {''}
                        {data.address} {data.address_more}, {data.city}
                      </Typography>
                    </Stack>
                    <Typography>{data.description}</Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item container></Grid>

          {/* End column */}
        </Grid>
        <SummaryTopRooms />
      </Container>
    </>
  )
}

export default ManageMain
