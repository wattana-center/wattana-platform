import { Button, Grid, Typography } from '@mui/material'
import {
  useAlertError,
  useAlertSuccess,
  useLoadingAlert
} from '@app/helpers/useSweetAlert2'
import { useAuthUser, withAuthUser } from 'next-firebase-auth'
import { useDispatch, useSelector } from '@app/helpers/useSelector'

import BusinessRegisterApi from '@app/apis/business-register-api'
import CardAcceptance from './CardAcceptance'
import CertifiedLegality from './CertifiedLegality'
import Commission from './Commission'
import { JoinActions } from '@app/redux-store/businessRegister'
import ROUTESPATH from '@app/config/routes-path'
import React from 'react'
import { Settings } from '@app/apis/interface/business-register-interface'
import { useRouter } from 'next/router'
import { useState } from 'react'

const JoinSettings = () => {
  const router = useRouter()
  const busunessRegister = useSelector((state) => state.busunessRegister.data)
  const authUser = useAuthUser()
  const loadingAlert = useLoadingAlert()
  const alertSuccess = useAlertSuccess()
  const alertError = useAlertError()
  const dispatch = useDispatch()
  const [button, setBotton] = useState<boolean>(false)

  const handleChangeSettings = (value: Settings) => {
    dispatch(
      JoinActions.update({
        ...busunessRegister,
        settings: {
          ...busunessRegister.settings,
          ...value
        }
      })
    )
  }

  const onHandleSubmit = async (isActive: boolean) => {
    setBotton(true)
    const req = {
      ...busunessRegister,
      settings: {
        ...busunessRegister.settings,
        is_active: isActive
      }
    }
    loadingAlert()
    const token = await authUser.getIdToken().then((token) => token)

    if (token) {
      const businessApi = new BusinessRegisterApi({ token: token })
      businessApi
        .finish(req, router.query.id as string)
        .then((res) => {
          if (res.status === 200)
            alertSuccess('ลงทะเบียนเรียบร้อย').then(() => {
              router.push(ROUTESPATH.BUSINESS.HOTEL.GROUP.HOME)
            })
        })
        .catch((e) => {
          alertError(e.message)
        })
        .finally(() => {
          setBotton(false)
        })
    }
  }

  return (
    <>
      <Grid container spacing={1} direction="column">
        <Grid item>
          <Typography>การชำระเงิน</Typography>
        </Grid>
        <Grid item>
          <Typography>
            ระบุวิธีการชำระเงินที่ท่านรับ ข้อมูลภาษี และตัวเลือกอื่น ๆ เช่น
            ค่าธรรมเนียมเพิ่มเติม
          </Typography>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item md={8} xs={12}>
            <CardAcceptance
              settings={busunessRegister.settings}
              onChange={handleChangeSettings}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Commission
            settings={busunessRegister.settings}
            onChange={handleChangeSettings}
          />
        </Grid>
        <Grid item>
          <CertifiedLegality
            settings={busunessRegister.settings}
            onChange={handleChangeSettings}
          />
        </Grid>

        <Grid item>
          <Grid container spacing={2}>
            <Grid item md={8} xs={12}>
              <Button
                disabled={button}
                variant="contained"
                fullWidth
                onClick={() => onHandleSubmit(true)}>
                ลงทะเบียนเสร็จสิ้นและเปิดรับจองทันที
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item md={8} xs={12}>
              <Button
                disabled={button}
                variant="text"
                fullWidth
                onClick={() => onHandleSubmit(false)}>
                ลงทะเบียนเสร็จสิ้นและเปิดรับการจองภายหลัง
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default withAuthUser()(JoinSettings)
