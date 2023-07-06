import { Card, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from '@app/helpers/useSelector'

import { JoinActions } from '@app/redux-store/businessRegister'
import React from 'react'

const CommonInfo = () => {
  const busunessRegister = useSelector((state) => state.busunessRegister.data)
  const dispatch = useDispatch()

  const handleOnChangeName = (value: string) => {
    dispatch(
      JoinActions.set({
        ...busunessRegister,
        name: value
      })
    )
  }

  const handleChangeStar = (value: string) => {
    dispatch(
      JoinActions.set({
        ...busunessRegister,
        stars: parseInt(value)
      })
    )
  }

  return (
    <>
      <Card>
        <Grid container p={2} spacing={1}>
          <Grid item md={6} xs={12}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h6">ที่พักของท่านชื่อ</Typography>
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  fullWidth
                  onChange={(e) => handleOnChangeName(e.target.value)}
                  value={busunessRegister.name}></TextField>
              </Grid>
              <Grid item>
                <Typography>
                  ลูกค้าจะเห็นชื่อดังกล่าวนี้เมื่อค้นหาที่พัก
                </Typography>
              </Grid>
              <Grid item>
                <Typography>ระดับดาว</Typography>
              </Grid>
              <Grid item>
                <TextField
                  select
                  variant="outlined"
                  fullWidth
                  value={`${busunessRegister.stars}`}
                  onChange={(e) => handleChangeStar(e.target.value)}>
                  <MenuItem value={`0`}>กรุณาเลือกระดับดาว</MenuItem>
                  <MenuItem value={`1`}>1</MenuItem>
                  <MenuItem value={`2`}>2</MenuItem>
                  <MenuItem value={`3`}>3</MenuItem>
                  <MenuItem value={`4`}>4</MenuItem>
                  <MenuItem value={`5`}>5</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default CommonInfo
