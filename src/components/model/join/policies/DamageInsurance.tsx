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

import GroupTextField from '@app/components/items/GroupTextField'
import { Policies } from '@app/apis/interface/business-register-interface'
import React from 'react'

type DamageInsurance = {
  policies: Policies
  onChange: (policies: Policies) => void
}

const DamageInsurance: React.FC<DamageInsurance> = ({ policies, onChange }) => {
  return (
    <>
      <Card>
        <CardContent>
          <Grid
            container
            direction="column"
            sx={{ width: { md: 600, sm: '100%' } }}>
            <Grid item>
              <Typography variant="h5">เงินประกันความเสียหาย</Typography>
            </Grid>
            <Grid item>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="ที่พักของท่านมีการจำกัดอายุผู้เข้าพักหรือไม่?"
                  value={`${policies.damage_deposit.deposit}`}
                  onChange={(e) => {
                    onChange({
                      ...policies,
                      damage_deposit: {
                        ...policies.damage_deposit,
                        deposit: e.target.value === 'true' ? true : false
                      }
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
            {policies.damage_deposit.deposit && (
              <>
                <Grid item>
                  <Typography>
                    โปรดระบุยอดเงินประกันความเสียหาย (ต่อการเข้าพัก)
                  </Typography>
                </Grid>
                <Grid item>
                  <GroupTextField
                    leftText="THB ต่อการเข้าพัก"
                    inputProps={{ 'aria-label': `ตารางเมตร` }}
                    type="number"
                    value={`${policies.damage_deposit.cost}`}
                    onChange={(e) => {
                      onChange({
                        ...policies,
                        damage_deposit: {
                          ...policies.damage_deposit,
                          cost: parseInt(e.target.value)
                        }
                      })
                    }}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default DamageInsurance
