import { Container, Grid } from '@mui/material'

import React from 'react'
import SummaryCard from '../card/summart'

const Breadcrumbs = () => {
  return (
    <>
      <Container
        maxWidth="lg"
        style={{
          position: 'relative',
          zIndex: 1200,
          padding: 0,
          marginTop: 10,
          marginBottom: 10
        }}>
        <Grid container spacing={2} direction="row">
          <Grid item md={2} xs={6}>
            <SummaryCard title="Hotel" count="0" />
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
      </Container>
    </>
  )
}

export default Breadcrumbs
