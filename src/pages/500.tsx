import { Container, Grid, Typography } from '@mui/material'

import { CONTACT_ERROR } from '@app/config/common'

export default function Custom500() {
  return (
    <>
      <Container maxWidth="lg" fixed>
        {/* <div
          style={{
            ...theme.mixins.toolbar
          }}></div> */}
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={1}
          style={{ minHeight: '85vh' }}>
          <Grid item textAlign="center">
            {/* <img src="/error/500.png" style={{ width: 250 }}></img> */}
          </Grid>
          <Grid item>
            <Typography variant="h5" textAlign="center">
              <b>Sorry, Website under construction.</b>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" textAlign="center">
              Our service is temporarily unavailable.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" textAlign="center">
              Our service is temporarily unavailable. Please try again later. If
              you have any questions, kindly contact to {CONTACT_ERROR}. Thank
              you.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
