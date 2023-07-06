import { Grid, Typography } from '@mui/material'
import { useDispatch, useSelector } from '@app/helpers/useSelector'

import AdapterDateFns from '@mui/lab/AdapterDateFns'
import CancelBooking from './CancelBooking'
import Curfew from './Curfew'
import DamageInsurance from './DamageInsurance'
import GuestInformation from './GuestInformation'
import { JoinActions } from '../../../../redux-store/businessRegister/index'
import { LocalizationProvider } from '@mui/lab'
import { Policies } from '@app/apis/interface/business-register-interface'
import React from 'react'
import Requirements from './Requirements'
import thLocale from 'date-fns/locale/th'
import { withAuthUser } from 'next-firebase-auth'

const JoinPolicies = () => {
  // const router = useRouter()
  const busunessRegister = useSelector((state) => state.busunessRegister.data)
  // const authUser = useAuthUser()
  // const loadingAlert = useLoadingAlert()
  // const alertSuccess = useAlertSuccess()
  // const alertError = useAlertError()
  const dispatch = useDispatch()

  const handleChangePolicies = (value: Policies) => {
    dispatch(
      JoinActions.update({
        ...busunessRegister,
        policies: {
          ...busunessRegister.policies,
          ...value
        }
      })
    )
  }

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
            <CancelBooking
              value={busunessRegister.policies.cancel}
              onChange={(value) => {
                dispatch(
                  JoinActions.update({
                    ...busunessRegister,
                    policies: {
                      ...busunessRegister.policies,
                      cancel: value
                    }
                  })
                )
              }}
            />
          </Grid>
          <Grid item>
            <GuestInformation
              policies={busunessRegister.policies}
              onChange={handleChangePolicies}
            />
          </Grid>
          <Grid item>
            <DamageInsurance
              policies={busunessRegister.policies}
              onChange={handleChangePolicies}
            />
          </Grid>
          <Grid item>
            <Curfew
              policies={busunessRegister.policies}
              onChange={handleChangePolicies}
            />
          </Grid>
          <Grid item>
            <Requirements
              policies={busunessRegister.policies}
              onChange={handleChangePolicies}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
    </>
  )
}

export default withAuthUser()(JoinPolicies)
