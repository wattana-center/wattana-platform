import { Card, Grid, MenuItem, TextField, Typography } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'

import { BusinessResponseGet } from '@app/apis/interface/business-interface'

type CommonInfoProps = {
  data: BusinessResponseGet
  setData: Dispatch<SetStateAction<BusinessResponseGet>>
}

const CommonInfo: React.FC<CommonInfoProps> = ({ data, setData }) => {
  const handleOnChangeName = (value: string) => {
    setData({
      ...data,
      name: value
    })
  }

  const handleOnChangeRemake = (value: string) => {
    setData({
      ...data,
      remark: value
    })
  }

  const handleOnChangeDescription = (value: string) => {
    setData({
      ...data,
      description: value
    })
  }

  const handleChangeStar = (value: string) => {
    setData({
      ...data,
      stars: parseInt(value)
    })
  }

  const handleChangeCommission = (value: string) => {
    setData({
      ...data,
      commission: parseInt(value)
    })
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
                <Typography>
                  ลูกค้าจะเห็นชื่อดังกล่าวนี้เมื่อค้นหาที่พัก
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  fullWidth
                  onChange={(e) => handleOnChangeName(e.target.value)}
                  value={data.name}></TextField>
              </Grid>

              <Grid item>
                <Typography>สังเกต</Typography>
              </Grid>
              <Grid item>
                <TextField
                  multiline
                  variant="outlined"
                  rows={4}
                  fullWidth
                  onChange={(e) => handleOnChangeRemake(e.target.value)}
                  value={data.remark}></TextField>
              </Grid>

              <Grid item>
                <Typography>ข้อมูลเพิ่มเติมที่พัก</Typography>
              </Grid>
              <Grid item>
                <TextField
                  multiline
                  variant="outlined"
                  rows={4}
                  fullWidth
                  onChange={(e) => handleOnChangeDescription(e.target.value)}
                  value={data.description}></TextField>
              </Grid>

              <Grid item>
                <Typography>ระดับดาว</Typography>
              </Grid>
              <Grid item>
                <TextField
                  select
                  variant="outlined"
                  fullWidth
                  value={`${data.stars}`}
                  onChange={(e) => handleChangeStar(e.target.value)}>
                  <MenuItem value={`0`}>กรุณาเลือกระดับดาว</MenuItem>
                  <MenuItem value={`1`}>1</MenuItem>
                  <MenuItem value={`2`}>2</MenuItem>
                  <MenuItem value={`3`}>3</MenuItem>
                  <MenuItem value={`4`}>4</MenuItem>
                  <MenuItem value={`5`}>5</MenuItem>
                </TextField>
              </Grid>

              <Grid item>
                <Typography>คอมมิชชั่น</Typography>
              </Grid>
              <Grid item>
                <TextField
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 10 } }}
                  variant="outlined"
                  fullWidth
                  value={`${data.commission}`}
                  onChange={(e) =>
                    handleChangeCommission(e.target.value)
                  }></TextField>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default CommonInfo
