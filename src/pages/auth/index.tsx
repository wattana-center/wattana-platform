import { AuthAction, withAuthUser } from 'next-firebase-auth'
import { Container, Fade, Toolbar } from '@mui/material'
import React, { useEffect, useState } from 'react'

import Login from '@app/components/authentication/Login'

const Auth = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 500)
  }, [])

  return (
    <div
      style={{
        background: '#fff',
        height: '100%',
        flex: '1 1 0%'
      }}>
      <Toolbar />
      <Container maxWidth="lg">
        <Fade in={show}>
          <div>
            <Login />
          </div>
        </Fade>
      </Container>
    </div>
  )
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER
})(Auth)
