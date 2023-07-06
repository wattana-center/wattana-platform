import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'

import { Policies } from '@app/apis/interface/business-register-interface'
import React from 'react'

type RequirementsProps = {
  policies: Policies
  onChange: (policies: Policies) => void
}

const Requirements: React.FC<RequirementsProps> = ({ policies, onChange }) => {
  return (
    <>
      <Card>
        <CardContent>
          <Grid
            container
            direction="column"
            sx={{ width: { md: 600, sm: '100%' } }}>
            <Grid item>
              <Typography variant="h5">ข้อกำหนดของที่พัก</Typography>
            </Grid>
            <Grid item>
              <Typography>อนุญาตให้ผู้เข้าพักสูบบุหรี่ไหม?</Typography>
            </Grid>
            <Grid item>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="อนุญาตให้ผู้เข้าพักสูบบุหรี่ไหม?"
                  value={`${policies.smoking_allowed}`}
                  onChange={(e) => {
                    onChange({
                      ...policies,
                      smoking_allowed: e.target.value === 'true' ? true : false
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
            <Grid item>
              <Typography>อนุญาตให้ผู้เข้าพักจัดงาน/ปาร์ตี้ไหม?</Typography>
            </Grid>
            <Grid item>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="อนุญาตให้ผู้เข้าพักจัดงาน/ปาร์ตี้ไหม?"
                  value={`${policies.parties_allowed}`}
                  onChange={(e) => {
                    onChange({
                      ...policies,
                      parties_allowed: e.target.value === 'true' ? true : false
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
            <Grid item>
              <Typography>
                ที่พักของท่านมีกำหนดช่วงเวลางดส่งเสียงดังไหม?
              </Typography>
            </Grid>
            <Grid item>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="อนุญาตให้ผู้เข้าพักจัดงาน/ปาร์ตี้ไหม?"
                  value={`${policies.quiet_hours}`}
                  onChange={(e) => {
                    onChange({
                      ...policies,
                      quiet_hours: e.target.value === 'true' ? true : false
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
            <Grid item>
              <Typography>อนุญาตให้นำสัตว์เลี้ยงเข้าพักไหม?</Typography>
            </Grid>
            <Grid item>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="อนุญาตให้ผู้เข้าพักจัดงาน/ปาร์ตี้ไหม?"
                  value={`${policies.pets_allowed}`}
                  onChange={(e) => {
                    onChange({
                      ...policies,
                      pets_allowed: e.target.value === 'true' ? true : false
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
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default Requirements
