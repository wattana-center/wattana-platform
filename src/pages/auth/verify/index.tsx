import { AuthAction, withAuthUser } from 'next-firebase-auth'
import { Container, Fade, Grid, Toolbar } from '@mui/material'
import React, { useEffect, useState } from 'react'

import Login from '@app/components/authentication/Login'
import useEncryption from '@app/helpers/useEncryption'
import { useRouter } from 'next/router'

type Request = {
  email: string
  redirectUrl: string
}

const Auth = () => {
  const [show, setShow] = useState(false)
  const [request, setRequest] = useState<Request>()
  const router = useRouter()
  const encryp = useEncryption()

  const { token } = router.query

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 500)
  }, [])

  useEffect(() => {
    if (typeof token === 'string') {
      setRequest(JSON.parse(encryp.decrypt(token)))
    }
  }, [])

  return (
    <>
      <Toolbar />
      <Grid
        container
        direction="column"
        style={{
          paddingTop: 20,
          background: '#fff',
          height: '100%',
          flex: '1 1 0%'
        }}>
        <Grid item>
          <Container maxWidth="lg">
            <Fade in={show}>
              <div>{request && <Login email={request.email} />}</div>
            </Fade>
          </Container>
        </Grid>
      </Grid>
    </>
  )
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER
})(Auth)
