import { CANCELATION, INTERVALPOLICY } from '@app/config/policy'
import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography
} from '@mui/material'

import React from 'react'

type CancelData = {
  free_cancel: boolean
  interval: string
  cancelation: string
}

type CancelBookingProps = {
  value: CancelData
  onChange: (value: CancelData) => void
}

const CancelBooking: React.FC<CancelBookingProps> = ({ value, onChange }) => {
  return (
    <>
      <Card>
        <CardContent>
          <Grid
            container
            direction="column"
            sx={{ width: { md: 600, sm: '100%' } }}
            spacing={1}>
            <Grid item>
              <Typography variant="h5">การยกเลิการจอง</Typography>
            </Grid>

            <Grid item>
              <Typography>
                มีกำหนดเวลาที่ผู้เข้าพักสามารถยกเลิกการจองโดยไม่ต้องเสียค่าธรรมเนียมหรือไม่
              </Typography>
            </Grid>
            <Grid item>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="มีกำหนดเวลาที่ผู้เข้าพักสามารถยกเลิกการจองโดยไม่ต้องเสียค่าธรรมเนียมหรือไม่"
                  value={`${value.free_cancel}`}
                  onChange={(e) => {
                    onChange({
                      ...value,
                      free_cancel: e.target.value === 'true' ? true : false
                    })
                  }}>
                  <FormControlLabel
                    value={'true'}
                    control={<Radio />}
                    label="ใช่"
                  />
                  <FormControlLabel
                    value={'false'}
                    control={<Radio />}
                    label="ไม่"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            {value.free_cancel === true && (
              <>
                <Grid item>
                  <Typography>
                    ผู้เข้าพักสามารถยกเลิกการจองโดยไม่มีค่าธรรมเนียมได้จนถึงช่วงใด
                  </Typography>
                </Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <Select
                      displayEmpty
                      autoFocus
                      value={value.cancelation}
                      onChange={(e) => {
                        onChange({ ...value, cancelation: e.target.value })
                      }}>
                      <MenuItem value="" disabled>
                        โปรดเลือก
                      </MenuItem>
                      {INTERVALPOLICY.map((v, k) => (
                        <MenuItem key={`cancel-policy-${k}`} value={v.value}>
                          {v.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}
            <Grid item>
              <Typography>
                ผู้เข้าพักจะถูกเรียกเก็บค่าธรรมเนียมเท่าไรหากยกเลิกการจอง
              </Typography>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <Select
                  disabled={
                    value.free_cancel === true
                      ? value.cancelation === ''
                        ? true
                        : false
                      : false
                  }
                  autoFocus
                  value={value.interval}
                  onChange={(e) => {
                    onChange({ ...value, interval: e.target.value })
                  }}
                  displayEmpty>
                  <MenuItem value="" disabled>
                    โปรดเลือก
                  </MenuItem>
                  {CANCELATION.map((v, k) => (
                    <MenuItem key={`cancel-policy-${k}`} value={v.value}>
                      {v.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default CancelBooking
