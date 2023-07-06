import {
  AccountCircle,
  LockOpenOutlined,
  PhoneEnabled
} from '@mui/icons-material'
import {
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Link,
  Paper,
  TextField,
  Typography
} from '@mui/material'

import AuthStyle from './AuthStyle'
// import LocalSwal from '@app/libs/sweetalert2'
import ROUTESPATH from '@app/config/routes-path'
import React from 'react'
import UsersApi from '@app/apis/users-api'
// import SignStyles from './SignStyles'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import WattanaTheme from '@app/config/theme'
// import { WSignApi } from '@app/apis/w-sign.api'
// import { createUserWithEmailAndPassword } from '@app/firebase/firebase.client'
import { useRouter } from 'next/router'
import useSweetAlert2 from '@app/helpers/useSweetAlert2'
import validator from 'validator'

const SignupForm = () => {
  const classes = AuthStyle()
  const router = useRouter()
  const alert = useSweetAlert2()

  const [account, setAccount] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    phoneNumber: ''
  })
  const [showPassword, setShowPassword] = React.useState(false)
  const [texterror, setTexterror] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayNmae: '',
    phoneNumber: ''
  })

  const handleTextFieldOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value
    const name = e.target.name
    setAccount((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const vEmail = validateEmail(account.email)
    const vPassword = validatePassword(account.password)
    const vConfirm = validateConfirmPassword(
      account.password,
      account.confirmPassword
    )

    if (vEmail && vPassword && vConfirm) {
      const usersApi = new UsersApi({})
      usersApi
        .register({
          display_name: account.email,
          password: account.password,
          primary_email: account.email,
          phone_number: '+66' + account.phoneNumber
        })
        .then(() => {
          alert
            .fire({
              icon: 'success',
              title: 'แสดงผล',
              text: 'เราได้ทำการส่งจดหมายยืนยันไปที่อีเมลที่ท่านได้ลงทะเบียน \n กรุณายืนยันอีเมลตามลิงค์ที่แนบในจดหมาย'
            })
            .then(() => {
              router.push(ROUTESPATH.AUTHEN.SING_IN)
            })
        })
        .catch((error) => {
          console.log(error)
          try {
            if (error.data.message.search('PHONE_NUMBER_EXISTS') > -1) {
              alert.fire({
                icon: 'error',
                title: `Oops...`,
                text: `Something went wrong! \n PHONE_NUMBER_EXISTS`
              })
            } else if (error.data.message.search('EMAIL_EXISTS') > -1) {
              alert.fire({
                icon: 'error',
                title: `Oops...`,
                text: `Something went wrong! \n EMAIL_EXISTS`
              })
            } else {
              alert.fire({
                icon: 'error',
                title: `Oops...`,
                text: `Something went wrong! \n ${error.message}`
              })
            }
          } catch (error) {
            alert.fire({
              icon: 'error',
              title: `Oops...`,
              text: `Something went wrong!`
            })
          }
        })
    }
  }

  const validateEmail = (value: string): boolean => {
    if (!validator.isEmail(value)) {
      setTexterror((prev) => ({ ...prev, email: 'อีเมลล์ไม่ถูกต้อง' }))
      return false
    } else {
      setTexterror((prev) => ({ ...prev, email: '' }))
      return true
    }
  }

  const validatePassword = (value: string) => {
    if (value.length < 1) {
      setTexterror((prev) => ({ ...prev, password: 'กรุณากรอกรหัสผ่าน' }))
      return false
    } else {
      setTexterror((prev) => ({ ...prev, password: '' }))
      return true
    }
  }

  const validateConfirmPassword = (password: string, confirm: string) => {
    if (password !== confirm) {
      setTexterror((prev) => ({
        ...prev,
        confirmPassword: 'กรุณากรอกรหัสผ่านให้ตรงกัน'
      }))
      return false
    } else {
      setTexterror((prev) => ({ ...prev, confirmPassword: '' }))
      return true
    }
  }

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <Grid
          container
          direction="column"
          className={classes.root}
          justifyContent="center"
          spacing={1}>
          <Grid item>
            <Typography variant="h6">สร้างแอคเคาท์สำหรับคู่ค้า</Typography>
          </Grid>

          <Grid item style={{ marginTop: '20px' }}>
            <Typography variant="body1">ชื่อผู้ใช้</Typography>
          </Grid>
          <Grid item>
            <TextField
              name="email"
              value={account.email}
              onChange={handleTextFieldOnChange}
              helperText={texterror.email}
              error={texterror.email !== ''}
              fullWidth
              placeholder="Email"
              variant="outlined"
              margin="none"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              name="password"
              value={account.password}
              onChange={handleTextFieldOnChange}
              helperText={texterror.password}
              error={texterror.password !== ''}
              fullWidth
              placeholder="Password"
              variant="outlined"
              margin="none"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOpenOutlined />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              name="confirmPassword"
              value={account.confirmPassword}
              onChange={handleTextFieldOnChange}
              helperText={texterror.confirmPassword}
              error={texterror.confirmPassword !== ''}
              fullWidth
              placeholder="Confirm Password"
              variant="outlined"
              margin="none"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOpenOutlined />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item>
            <Paper
              variant="outlined"
              square
              component="form"
              sx={{
                p: WattanaTheme.spacing(1, 2),
                display: 'flex',
                alignItems: 'center',
                borderRadius: WattanaTheme.spacing(0.5),
                backgroundColor: '#fafafa'
              }}>
              <InputAdornment position="start">
                <PhoneEnabled />
              </InputAdornment>
              <Typography>+66</Typography>
              <Divider
                sx={{ height: 28, m: 0.5, ml: 2, mr: 1 }}
                orientation="vertical"
              />
              {/* 001 default_cost */}
              <InputBase
                name="phoneNumber"
                placeholder="Phone Number"
                value={account.phoneNumber}
                onChange={handleTextFieldOnChange}
                sx={{ ml: 1, flex: 1 }}
                inputProps={{
                  min: 1
                }}
              />
            </Paper>
          </Grid>
          <Grid item>
            <Link href={''}>
              <Button variant="contained" fullWidth size="large" type="submit">
                Sign Up
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Link href={ROUTESPATH.AUTHEN.SING_IN}>
              <Button variant="contained" fullWidth size="large">
                Back
              </Button>
            </Link>
          </Grid>
          <Divider style={{ margin: '20px 0' }} />
          <Grid item>
            <Typography variant="body1" textAlign="center">
              เมื่อเข้าสู่ระบบหรือสร้างแอคเคาท์จะถือว่าท่านยอมรับ
              <a>ข้อกำหนดและเงื่อนไขและแถลงการณ์เกี่ยวกับความเป็นส่วนตัว</a>
              ของเรา
            </Typography>
          </Grid>
          <Divider style={{ margin: '20px 0' }} />
          <Grid item>
            <Typography variant="body1" textAlign="center">
              สงวนลิขสิทธิ์. ลิขสิทธิ์ (2021 - 2022) - ID9Property.com™
            </Typography>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default SignupForm
