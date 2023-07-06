import { Container, Fade, Toolbar } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { NextPage } from 'next'
import SignupForm from '@app/components/authentication/SignupForm'

type SignupPageProps = {
  res: any
}

const SignupPage: NextPage<SignupPageProps> = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 500)
  }, [])

  return (
    <>
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
              <SignupForm />
            </div>
          </Fade>
        </Container>
      </div>
    </>
  )
}

export default SignupPage
