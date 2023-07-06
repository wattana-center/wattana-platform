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

import React from 'react'
import { Settings } from '@app/apis/interface/business-register-interface'

type CardAcceptanceProps = {
  settings: Settings
  onChange: (settings: Settings) => void
}

const CardAcceptance: React.FC<CardAcceptanceProps> = ({
  settings,
  onChange
}) => {
  return (
    <>
      <Card>
        <CardContent>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Typography variant="h5">
                ตัวเลือกการชำระเงินของผู้เข้าพัก
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                ที่พักของท่านสามารถเรียกชำระจากบัตรเครดิตได้ใช่ไหม?
              </Typography>
            </Grid>
            <Grid item>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="ผู้เข้าพักสามารถจองโดยไม่ต้องแจ้งข้อมูลที่อยู่"
                  value={`${settings.cc_acceptance}`}
                  onChange={(e) => {
                    onChange({
                      ...settings,
                      cc_acceptance: e.target.value === 'true' ? true : false
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

export default CardAcceptance
