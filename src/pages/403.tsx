import { Container, Grid, Typography } from '@mui/material'

import { CONTACT_ERROR } from '@app/config/common'

export default function Custom403() {
  return (
    <>
      <Container maxWidth="lg" fixed>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={1}
          style={{ minHeight: '85vh' }}>
          <Grid item textAlign="center">
            {/* <img src="/error/warning.png" style={{ width: 250 }}></img> */}
          </Grid>
          <Grid item>
            <Typography variant="h5" textAlign="center">
              <b>Sorry, You don’t have permission.</b>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" textAlign="center">
              Please contact {CONTACT_ERROR}. We will find someone who give you
              access.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" textAlign="center">
              Thank you.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
