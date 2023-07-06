import { Button, Divider, Grid, TextField, Typography } from '@mui/material'

import AuthStyle from './AuthStyle'
import ROUTESPATH from '@app/config/routes-path'
import React from 'react'
import { useRouter } from 'next/router'

type HandleEmailProps = {
  email: string
  setEmail: (val: string) => void
  onHandleSubmit: () => void
  helperText?: string
}

const HandleEmail = (props: HandleEmailProps) => {
  const { email, setEmail, onHandleSubmit, helperText = '' } = props
  const classes = AuthStyle()
  const router = useRouter()
  return (
    <Grid
      container
      direction="column"
      className={classes.root}
      justifyContent="center">
      <Grid item>
        <Typography variant="h6">
          เข้าสู่ระบบเพื่อจัดการที่พักของท่าน
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: '20px' }}>
        <Typography variant="body1">ชื่อผู้ใช้</Typography>
      </Grid>
      <Grid item>
        <TextField
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onHandleSubmit()
            }
          }}
          fullWidth
          placeholder={`หรือที่เรียกกันว่า "ชื่อเข้าสู่ระบบ" และ "ID เข้าสู่ระบบ"`}
          margin="none"
          size="small"
          variant="outlined"
          error={helperText == '' ? false : true}
          helperText={helperText != '' ? helperText : ''}
        />
      </Grid>
      <Grid item style={{ marginTop: '20px' }}>
        <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={() => onHandleSubmit()}>
          ถัดไป
        </Button>
      </Grid>
      <Grid item>
        <Button fullWidth size="large">
          เข้าสู่ระบบไม่ได้หรือ?
        </Button>
      </Grid>
      <Divider style={{ margin: '10px 0' }} />
      <Grid item>
        <Typography variant="body1" textAlign="center">
          หากมีข้อสงสัยเกี่ยวกับที่พักของท่านหรือเอกซ์ทราเน็ต โปรดไปที่
          <a>ศูนย์ช่วยเหลือที่พักคู่ค้า</a>ของเราเพื่อดูข้อมูลเพิ่มเติม
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: '20px' }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => {
            router.push(ROUTESPATH.AUTHEN.SIGN_UP)
          }}>
          สร้างแอคเคาท์สำหรับคู่ค้า
        </Button>
      </Grid>
    </Grid>
  )
}

export default HandleEmail
