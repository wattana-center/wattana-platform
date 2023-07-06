import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import AuthStyle from './AuthStyle'

type HandlePasswordProps = {
  email: string
  password: string
  setPassword: (val: string) => void
  onHandleSubmit: () => void
  helperText?: string
}

const HandlePassword = (props: HandlePasswordProps) => {
  const classes = AuthStyle()

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const {
    email,
    password,
    setPassword,
    onHandleSubmit,
    helperText = ''
  } = props
  return <>
    <Grid
      container
      direction="column"
      className={classes.root}
      justifyContent="center">
      <Grid item>
        <Typography variant="h6">ระบุรหัสผ่านของท่าน</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">
          โปรดระบุรหัสผ่านของ {email} สำหรับใช้เข้าสู่ระบบ ID9Property.com
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: 20 }}>
        <Typography variant="body1">รหัสผ่าน</Typography>
      </Grid>
      <Grid item>
        <TextField
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          fullWidth
          margin="none"
          size="small"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword()}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="large">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
          error={helperText == '' ? false : true}
          helperText={helperText != '' ? helperText : ''}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onHandleSubmit()
            }
          }}
        />
      </Grid>

      <Grid item style={{ marginTop: 20 }}>
        <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={() => onHandleSubmit()}>
          เข้าสู่ระบบ
        </Button>
      </Grid>
      <Grid item>
        <Button fullWidth size="large">
          ลืมรหัสผ่านหรือ?
        </Button>
      </Grid>
    </Grid>
  </>;
}

export default HandlePassword
