import { Container, Grid, Typography } from '@mui/material'

import { CONTACT_ERROR } from '@app/config/common'

export default function Custom404() {
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
            {/* <img src="/error/not-found.png" style={{}}></img> */}
          </Grid>
          <Grid item>
            <Typography variant="h5" textAlign="center">
              <b>Sorry, Error 404</b>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" textAlign="center">
              We couldn't process your request. Please go back to the previous
              page and try again.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" textAlign="center">
              If you have any questions, kindly contact to {CONTACT_ERROR}
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
