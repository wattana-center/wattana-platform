import { Divider, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
  fetchSignInMethodsForEmail,
  getAuth,
  signInWithEmailAndPassword
} from 'firebase/auth'

import AuthStyle from './AuthStyle'
import HandleEmail from './HandleEmail'
import HandlePassword from './HandlePassword'
import ROUTESPATH from '@app/config/routes-path'
import useEncryption from '@app/helpers/useEncryption'
import { useRouter } from 'next/router'
import useSweetAlert2 from '@app/helpers/useSweetAlert2'
import validator from 'validator'

type LoginProps = {
  redirectUrl?: string
  email?: string
}

const Login = (props: LoginProps) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [mode, setMode] = useState(0)
  const [helperText, setHelperText] = useState({
    email: '',
    password: ''
  })

  const router = useRouter()
  const encryp = useEncryption()
  const alert = useSweetAlert2()
  const classes = AuthStyle()
  const auth = getAuth()
  const onHandleSubmitEmail = () => {
    if (!validator.isEmail(email)) {
      setHelperText({ ...helperText, email: 'รูปแบบอีเมลไม่ถูกต้อง' })
      return
    }

    fetchSignInMethodsForEmail(auth, email)
      .then((signInMethods) => {
        if (signInMethods.length) {
          const op = {
            email: email,
            redirectUrl: props.redirectUrl
          }
          const value = encryp.encrypt(JSON.stringify(op))
          router.push(`${ROUTESPATH.AUTHEN.SING_IN}/verify?token=${value}`)
        } else {
          alert.fire({
            title: 'ไม่สามารถเข้าสู่ระบบได้',
            text: 'อีเมล ไม่ถูกต้องกรุณาลองใหม่อีกครั้ง',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
          })
        }
      })
      .catch(() => {
        alert.fire({
          title: 'ไม่สามารถเข้าสู่ระบบได้',
          text: 'อีเมล ไม่ถูกต้องกรุณาลองใหม่อีกครั้ง',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes!'
        })
      })
  }

  const onHandleSubmitPassword = () => {
    if (password.length < 1) {
      setHelperText({ ...helperText, password: 'รหัสผ่านไม่ถูกต้อง' })
      return
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        if (res.user?.emailVerified) {
        } else {
          alert
            .fire({
              title: 'โปรดยืนยันอีเมล',
              text: 'ท่านยังไม่ได้ยืนยันอีเมล กรุณายืนยันอีเมลตามที่อยู่อีเมลที่ได้สมัครไว้!',
              icon: 'warning',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes!'
            })
            .then(() => {
              auth.signOut()
              router.push(ROUTESPATH.AUTHEN.SING_IN)
            })
        }
      })
      .catch(() => {
        alert
          .fire({
            title: 'ไม่สามารถเข้าสู่ระบบได้',
            text: 'อีเมล หรือ รหัสผ่านไม่ถูกต้องกรุณาลองใหม่อีกครั้ง',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
          })
          .then(() => {
            router.push(ROUTESPATH.AUTHEN.SING_IN)
          })
      })
  }

  useEffect(() => {
    if (props.email) {
      setEmail(props.email)
      setMode(1)
    }
  }, [props])

  return (
    <>
      {mode === 0 ? (
        <HandleEmail
          email={email}
          setEmail={setEmail}
          onHandleSubmit={onHandleSubmitEmail}
          helperText={helperText.email}
        />
      ) : (
        <HandlePassword
          email={email}
          password={password}
          setPassword={setPassword}
          onHandleSubmit={onHandleSubmitPassword}
          helperText={helperText.password}
        />
      )}

      <Grid
        container
        direction="column"
        className={classes.sub}
        justifyContent="center"
        spacing={1}>
        <Divider style={{ margin: '20px 0' }} />
        <Grid item>
          <Typography variant="body1" textAlign="center">
            เมื่อเข้าสู่ระบบหรือสร้างแอคเคาท์จะถือว่าท่านยอมรับ
            <a>ข้อกำหนดและเงื่อนไขและแถลงการณ์เกี่ยวกับความเป็นส่วนตัว</a>ของเรา
          </Typography>
        </Grid>
        <Divider style={{ margin: '20px 0' }} />
        <Grid item>
          <Typography variant="body1" textAlign="center">
            สงวนลิขสิทธิ์. ลิขสิทธิ์ (2021 - 2022) - ID9Property.com™
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default Login
