import { Grid, Typography } from '@mui/material'

import AdapterDateFns from '@mui/lab/AdapterDateFns'
// import CancelBooking from './CancelBooking'
// import Curfew from './Curfew'
// import DamageInsurance from './DamageInsurance'
// import GuestInformation from './GuestInformation'
import { LocalizationProvider } from '@mui/lab'
// import { Policies } from '@app/apis/interface/business-register-interface'
import React from 'react'
// import Requirements from './Requirements'
import thLocale from 'date-fns/locale/th'
import { withAuthUser } from 'next-firebase-auth'

type ManagePoliciesProps = {
  data?: any
}

const ManagePolicies: React.FC<ManagePoliciesProps> = () => {
  // const handleChangePolicies = (value: Policies) => {}

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={thLocale}>
        <Grid container spacing={1} direction="column">
          <Grid item>
            <Typography>นโยบาย</Typography>
          </Grid>
          <Grid item>
            <Typography>
              ระบุนโยบายเบื้องต้นสักหน่อย
              ท่านอนุญาตให้เด็กหรือสัตว์เลี้ยงเข้าพักไหม?
              นโยบายยกเลิกการจองยืดหยุ่นเพียงใด?
            </Typography>
          </Grid>
          <Grid item>
            {/* <CancelBooking
              value={busunessRegister.policies.cancel}
              onChange={(value) => {
                
              }}
            /> */}
          </Grid>
          <Grid item>
            {/* <GuestInformation
              policies={busunessRegister.policies}
              onChange={handleChangePolicies}
            /> */}
          </Grid>
          <Grid item>
            {/* <DamageInsurance
              policies={busunessRegister.policies}
              onChange={handleChangePolicies}
            /> */}
          </Grid>
          <Grid item>
            {/* <Curfew
              policies={busunessRegister.policies}
              onChange={handleChangePolicies}
            /> */}
          </Grid>
          <Grid item>
            {/* <Requirements
              policies={busunessRegister.policies}
              onChange={handleChangePolicies}
            /> */}
          </Grid>
        </Grid>
      </LocalizationProvider>
    </>
  )
}

export default withAuthUser()(ManagePolicies)
