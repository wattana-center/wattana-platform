import {
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
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
import { useState } from 'react'

type GuestInformationProps = {
  policies: Policies
  onChange: (policies: Policies) => void
}

const GuestInformation: React.FC<GuestInformationProps> = ({
  policies,
  onChange
}) => {
  const [checkInStart, setCheckInStart] = React.useState<Date | null>(
    new Date('2018-01-01T17:00:00.000Z')
  )
  const [checkInEnd, setCheckInEnd] = React.useState<Date | null>(
    new Date('2018-01-01T16:59:00.000Z')
  )

  const [checkOutStart, setCheckOutStart] = React.useState<Date | null>(
    new Date('2018-01-01T17:00:00.000Z')
  )
  const [checkOutEnd, setCheckOutEnd] = React.useState<Date | null>(
    new Date('2018-01-01T16:59:00.000Z')
  )

  const [checkIn24h, setCheckIn24h] = useState<boolean>(false)
  const [checkOut24h, setCheckOut24h] = useState<boolean>(false)

  const onHandleCheckIn24h = (checked: boolean) => {
    setCheckIn24h(checked)
    if (checked) {
      setCheckInStart(dateZeroTime())
      setCheckInEnd(dateMaxTime())
    }

    onChange({
      ...policies,
      checkin_start: formatAMPM(dateZeroTime()),
      checkin_end: formatAMPM(dateMaxTime())
    })
  }

  const onHandleCheckOut24h = (checked: boolean) => {
    setCheckOut24h(checked)
    if (checked) {
      setCheckOutStart(dateZeroTime())
      setCheckOutEnd(dateMaxTime())
    }

    onChange({
      ...policies,
      checkout_start: formatAMPM(dateZeroTime()),
      checkout_end: formatAMPM(dateMaxTime())
    })
  }

  const onHandleChangeCheckInStart = (value: Date | null) => {
    setCheckInStart(value)
  }

  const onHandleChangeCheckInEnd = (value: Date | null) => {
    setCheckInEnd(value)
  }

  const onHandleChangeCheckOutStart = (value: Date | null) => {
    setCheckOutStart(value)
  }

  const onHandleChangeCheckOutEnd = (value: Date | null) => {
    setCheckOutEnd(value)
  }

  useEffect(() => {
    if (checkInStart != null) {
      onChange({
        ...policies,
        checkin_start: formatAMPM(checkInStart)
      })
    }
  }, [checkInStart])

  useEffect(() => {
    if (checkInEnd != null) {
      onChange({
        ...policies,
        checkin_end: formatAMPM(checkInEnd)
      })
    }
  }, [checkInEnd])

  useEffect(() => {
    if (checkOutStart != null) {
      onChange({
        ...policies,
        checkout_start: formatAMPM(checkOutStart)
      })
    }
  }, [checkOutStart])

  useEffect(() => {
    if (checkOutEnd != null) {
      onChange({
        ...policies,
        checkout_end: formatAMPM(checkOutEnd)
      })
    }
  }, [checkOutEnd])

  useEffect(() => {
    if (policies.checkin_start !== '') {
      setCheckInStart(convertStringToTime(policies.checkin_start))
    }
    if (policies.checkin_end !== '') {
      setCheckInEnd(convertStringToTime(policies.checkin_end))
    }
    if (policies.checkout_start !== '') {
      setCheckOutStart(convertStringToTime(policies.checkout_start))
    }
    if (policies.checkout_end !== '') {
      setCheckOutEnd(convertStringToTime(policies.checkout_end))
    }

    if (policies.checkin_start === '0:00' && policies.checkin_end === '23:59') {
      setCheckIn24h(true)
    }

    if (
      policies.checkout_start === '0:00' &&
      policies.checkout_end === '23:59'
    ) {
      setCheckOut24h(true)
    }
  }, [])

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
              <Typography variant="h5">เวลาเช็คอิน/เช็คเอาท์</Typography>
            </Grid>

            {/* CheckIn */}
            <Grid
              item
              container
              justifyContent="space-between"
              alignItems="center">
              <Grid item>
                <Typography>ช่วงเวลาที่ผู้เข้าพักสามารถเช็คอิน</Typography>
              </Grid>
              <Grid item>
                <FormGroup>
                  <FormControlLabel
                    checked={checkIn24h}
                    control={
                      <Checkbox
                        onChange={(e) => {
                          onHandleCheckIn24h(e.target.checked)
                        }}
                      />
                    }
                    label="เช็คอินได้ตลอด 24 ชั่วโมง"
                  />
                </FormGroup>
              </Grid>
            </Grid>
            <Grid item container spacing={1} alignItems="center">
              <Grid item xs>
                <MobileTimePicker
                  disabled={checkIn24h === true ? true : false}
                  value={checkInStart}
                  onChange={(newValue) => {
                    onHandleChangeCheckInStart(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item>
                <Typography>ถึง</Typography>
              </Grid>
              <Grid item xs>
                <MobileTimePicker
                  disabled={checkIn24h === true ? true : false}
                  value={checkInEnd}
                  onChange={(newValue) => {
                    onHandleChangeCheckInEnd(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
            </Grid>

            {/* Checkout */}
            <Grid
              item
              container
              justifyContent="space-between"
              alignItems="center">
              <Grid item>
                <Typography>ช่วงเวลาที่ผู้เข้าพักสามารถเช็คเอาท์</Typography>
              </Grid>
              <Grid item>
                <FormGroup>
                  <FormControlLabel
                    checked={checkOut24h}
                    control={
                      <Checkbox
                        onChange={(e) => {
                          onHandleCheckOut24h(e.target.checked)
                        }}
                      />
                    }
                    label="เช็คเอาท์ได้ตลอด 24 ชั่วโมง"
                  />
                </FormGroup>
              </Grid>
            </Grid>
            <Grid item container spacing={1} alignItems="center">
              <Grid item xs>
                <MobileTimePicker
                  disabled={checkOut24h === true ? true : false}
                  value={checkOutStart}
                  onChange={(newValue) => {
                    onHandleChangeCheckOutStart(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item>
                <Typography>ถึง</Typography>
              </Grid>
              <Grid item xs>
                <MobileTimePicker
                  disabled={checkOut24h === true ? true : false}
                  value={checkOutEnd}
                  onChange={(newValue) => {
                    onHandleChangeCheckOutEnd(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
            </Grid>

            {/* Guest Information */}
            <Grid item sx={{ mt: 2 }}>
              <Typography variant="h5">ข้อมูลผู้เข้าพัก</Typography>
            </Grid>

            {/* always_require_booker_address */}
            <Grid item>
              <Typography>
                ผู้เข้าพักสามารถจองโดยไม่ต้องแจ้งข้อมูลที่อยู่?
              </Typography>
            </Grid>
            <Grid item>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="ผู้เข้าพักสามารถจองโดยไม่ต้องแจ้งข้อมูลที่อยู่"
                  value={`${policies.always_require_booker_address}`}
                  onChange={(e) => {
                    onChange({
                      ...policies,
                      always_require_booker_address:
                        e.target.value === 'true' ? true : false
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

            {/* always_require_booker_contact_number */}
            <Grid item>
              <Typography>
                ผู้เข้าพักสามารถจองโดยไม่ต้องแจ้งหมายเลขโทรศัพท์?
              </Typography>
            </Grid>
            <Grid item>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="ผู้เข้าพักสามารถจองโดยไม่ต้องแจ้งหมายเลขโทรศัพท์"
                  value={`${policies.always_require_booker_contact_number}`}
                  onChange={(e) => {
                    onChange({
                      ...policies,
                      always_require_booker_contact_number:
                        e.target.value === 'true' ? true : false
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

            {/* has_age_restriction */}
            <Grid item>
              <Typography>
                ที่พักของท่านมีการจำกัดอายุผู้เข้าพักหรือไม่?
              </Typography>
            </Grid>
            <Grid item>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="ที่พักของท่านมีการจำกัดอายุผู้เข้าพักหรือไม่?"
                  value={`${policies.has_age_restriction}`}
                  onChange={(e) => {
                    onChange({
                      ...policies,
                      has_age_restriction:
                        e.target.value === 'true' ? true : false
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

            {policies.has_age_restriction && (
              <Grid
                item
                container
                direction="row"
                justifyContent="space-between"
                spacing={1}>
                <Grid item xs container direction="column">
                  <Grid item>
                    <Typography>อายุไม่ต่ำกว่า</Typography>
                  </Grid>
                  <Grid item>
                    <TextField fullWidth />
                  </Grid>
                </Grid>
                <Grid item xs container direction="column">
                  <Grid item>
                    <Typography>อายุไม่เกิน</Typography>
                  </Grid>
                  <Grid item>
                    <TextField fullWidth />
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default GuestInformation
