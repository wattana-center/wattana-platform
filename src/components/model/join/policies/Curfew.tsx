import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material'
import {
  convertStringToTime,
  dateMaxTime,
  dateZeroTime,
  formatAMPM
} from '@app/utils/time'

import { MobileTimePicker } from '@mui/lab'
import { Policies } from '@app/apis/interface/business-register-interface'
import React from 'react'
import { useEffect } from 'react'

type CurfewProps = {
  policies: Policies
  onChange: (policies: Policies) => void
}

const Curfew: React.FC<CurfewProps> = ({ policies, onChange }) => {
  const [curfewStart, setCurfewStart] = React.useState<Date | null>(
    new Date('2018-01-01T17:00:00.000Z')
  )
  const [curfewEnd, setCurfewEnd] = React.useState<Date | null>(
    new Date('2018-01-01T16:59:00.000Z')
  )

  const onHandleCurfew = (checked: boolean) => {
    if (!checked) {
      setCurfewStart(dateZeroTime())
      setCurfewEnd(dateMaxTime())
    }
    onChange({
      ...policies,
      has_curfew: checked,
      curfew_start: formatAMPM(dateZeroTime()),
      curfew_end: formatAMPM(dateMaxTime())
    })
  }

  const onHandleChangeCurfewStart = (value: Date | null) => {
    setCurfewStart(value)
  }

  const onHandleChangeCurfewEnd = (value: Date | null) => {
    setCurfewEnd(value)
  }

  useEffect(() => {
    if (curfewEnd != null) {
      onChange({
        ...policies,
        curfew_end: formatAMPM(curfewEnd)
      })
    }
  }, [curfewEnd])

  useEffect(() => {
    if (curfewStart != null) {
      onChange({
        ...policies,
        curfew_start: formatAMPM(curfewStart)
      })
    }
  }, [curfewStart])

  useEffect(() => {
    if (policies.curfew_start !== '') {
      setCurfewStart(convertStringToTime(policies.curfew_start))
    }
    if (policies.curfew_end !== '') {
      setCurfewEnd(convertStringToTime(policies.curfew_end))
    }
  }, [])

  return (
    <>
      <Card>
        <CardContent>
          <Grid
            container
            direction="column"
            sx={{ width: { md: 600, sm: '100%' } }}>
            <Grid item>
              <Typography variant="h5">เวลาเข้าออกที่พัก</Typography>
            </Grid>
            <Grid item>
              <Typography>
                นโยบาย "เวลาที่ห้ามเข้าออกที่พัก"
                คือการกำหนดว่าลูกค้าสามารถเข้าออกที่พักของท่านได้ในช่วงใดบ้าง
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                ที่พักของท่านมีกำหนดเวลาที่ห้ามเข้าออกที่พักหรือไม่?
              </Typography>
            </Grid>
            <Grid item>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="ที่พักของท่านมีการจำกัดอายุผู้เข้าพักหรือไม่?"
                  value={`${policies.has_curfew}`}
                  onChange={(e) => {
                    onHandleCurfew(e.target.value === 'true' ? true : false)
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

            {}

            <Grid item container spacing={1} alignItems="center">
              <Grid item xs>
                <MobileTimePicker
                  disabled={policies.has_curfew !== true ? true : false}
                  value={curfewStart}
                  onChange={(newValue) => {
                    onHandleChangeCurfewStart(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item>
                <Typography>ถึง</Typography>
              </Grid>
              <Grid item xs>
                <MobileTimePicker
                  disabled={policies.has_curfew !== true ? true : false}
                  value={curfewEnd}
                  onChange={(newValue) => {
                    onHandleChangeCurfewEnd(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default Curfew
