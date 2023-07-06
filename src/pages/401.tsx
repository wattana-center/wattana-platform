import { Container, Grid, Typography } from '@mui/material'
import { useAuthUser, withAuthUser } from 'next-firebase-auth'
import { useEffect, useRef, useState } from 'react'

import ROUTESPATH from '@app/config/routes-path'

function Custom401() {
  const authUser = useAuthUser()

  const [counter, setCounter] = useState(0)
  const timer = useRef<NodeJS.Timeout>()

  const autoSignout = async () => {
    await authUser.signOut()
  }

  useEffect(() => {
    autoSignout()
  }, [authUser])

  useEffect(() => {
    timer.current = setInterval(() => {
      setCounter((c) => c + 1)
    }, 1000)

    // clear on component unmount
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      clearInterval(timer.current!)
    }
  }, [timer, setCounter])

  useEffect(() => {
    if (counter === 10) {
      window.location.href = ROUTESPATH.AUTHEN.SING_IN
    }
  }, [counter])

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
              We will find someone who give you access.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" textAlign="center">
              Thank you.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" textAlign="center">
              Auto redirect login page {counter} / 10 s
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default withAuthUser()(Custom401)
