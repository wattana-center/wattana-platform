import { Container, Grid, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useAuthUser, withAuthUser } from 'next-firebase-auth'

import { GetServerSideProps } from 'next'
import ROUTESPATH from '@app/config/routes-path'
import UsersApi from '@app/apis/users-api'

const ConfirmEmail = () => {
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
      <Toolbar />
      <Container
        maxWidth="lg"
        style={{
          paddingTop: 20,
          background: '#fff',
          height: '100%',
          flex: '1'
        }}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={1}
          style={{ minHeight: '85vh' }}>
          <Grid item>
            <Typography>ลงทะเบียนเรียบร้อย</Typography>
          </Grid>
          <Grid item>
            <Typography>Auto redirect login page {counter} / 10 s</Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const usersApi = new UsersApi({})
  const token = query?.token as string

  if (token) {
    try {
      const response = await usersApi.confirmEmail(token)

      if (response.status === 200) {
        return {
          props: {
            res: response.data
          }
        }
      }
    } catch (_) {
      return {
        notFound: true
      }
    }
  }

  return {
    notFound: true
  }
}

export default withAuthUser()(ConfirmEmail)
