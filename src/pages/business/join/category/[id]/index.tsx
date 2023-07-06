import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR
} from 'next-firebase-auth'
import {
  BusinessRegisterResponse,
  RegisterData
} from '@app/apis/interface/business-register-interface'
import {
  Button,
  Container,
  Divider,
  Step,
  StepLabel,
  Stepper,
  Toolbar,
  Typography
} from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from '@app/helpers/useSelector'

import BusinessRegisterApi from '@app/apis/business-register-api'
import Category from '@app/components/model/join/category'
import { JoinActions } from '../../../../../redux-store/businessRegister/index'
import JoinFacility from '@app/components/model/join/facility'
import JoinInfo from '@app/components/model/join/info'
import JoinPhoto from '@app/components/model/join/photo'
import JoinPolicies from '@app/components/model/join/policies'
import JoinRooms from '@app/components/model/join/rooms'
import JoinSettings from '@app/components/model/join/settings'
import { NextPage } from 'next'
import ROUTESPATH from '@app/config/routes-path'
import WattanaTheme from '@app/config/theme'
import { makeStyles } from '@mui/styles'
import { useWarning } from '@app/helpers/useSweetAlert2'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    padding: '16px 0 0'
  },
  button: {
    marginRight: WattanaTheme.spacing(1)
  },
  spacer: {
    flex: '1 1 auto'
  },
  instructions: {
    marginTop: WattanaTheme.spacing(2),
    marginBottom: WattanaTheme.spacing(1)
  }
}))
/**
 * 0 percen stepเลือกประเภทที่พัก
 * 20 percent step ข้อมูลที่พักห้องท่าน
 * 40 percent step ห้องพัก/ราคา
 * 60 percent step สิ่งอำนวยความสะดวก
 * 70 percent step ภาพถ่าย
 * 80 percent step นโยบาย
 * 90 percent step การชำระเงิน
 */
const steps = [
  'เลือกประเภทที่พัก',
  'ข้อมูลที่พักห้องท่าน',
  'ห้องพัก/ราคา',
  'สิ่งอำนวยความสะดวก',
  'ภาพถ่าย',
  'นโยบาย',
  'การชำระเงิน'
]

interface CategoryPageProps {
  res?: BusinessRegisterResponse
}

const CategoryPage: NextPage<CategoryPageProps> = (props) => {
  const { res } = props

  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const [skipped, setSkipped] = React.useState(new Set<number>())

  const busunessRegister = useSelector((state) => state.busunessRegister.data)
  const [stateRegister, setStateRegister] =
    React.useState<RegisterData>(busunessRegister)
  const dispatch = useDispatch()
  const AuthUser = useAuthUser()

  const warning = useWarning()

  const isStepSkipped = (step: number) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    if (activeStep === 0) {
      if (
        busunessRegister.business_type == null ||
        busunessRegister.business_type === ''
      ) {
        warning('โปรดกรอกข้อมูล', 'กรุณาเลือกประเภทที่พักของท่าน')
        return
      }

      onHandleUpdateRegister(20)
    }

    if (activeStep === 1) {
      onHandleUpdateRegister(40)
    }

    if (activeStep === 2) {
      if (busunessRegister.rooms.length < 1) {
        warning('กรุณาเพิ่มห้องพัก', 'จำเป็นต้องเพิ่มห้องพัก อย่างน้อย 1 ห้อง')
        return
      }

      onHandleUpdateRegister(60)
    }

    if (activeStep === 3) {
      if (busunessRegister.facility.facilites.length < 1) {
        warning(
          'กรุณาเลือกสิ่งอำนวยความสะดวกและบริการ',
          'จำเป็นต้องเลือกสิ่งอำนวยความสะดวกและบริการ อย่างน้อย 1 ห้อง'
        )
        return
      }
      onHandleUpdateRegister(70)
    }

    if (activeStep === 4) {
      if (busunessRegister.images.length < 1) {
        warning(
          'กรุณาเพิ่มภาพถ่ายที่พัก',
          'จำเป็นต้องเพิ่มภาพถ่ายที่พัก อย่างน้อย 1 ภาพ'
        )
        return
      }
      onHandleUpdateRegister(80)
    }

    if (activeStep === 5) {
      onHandleUpdateRegister(90)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const onHandleUpdateRegister = async (complete_persent: number) => {
    if (JSON.stringify(stateRegister) !== JSON.stringify(busunessRegister)) {
      if (res?.id) {
        const token = await AuthUser.getIdToken().then((token) => token)

        if (token) {
          const businessApi = new BusinessRegisterApi({ token: token })
          const req = {
            ...busunessRegister,
            complete_persent: complete_persent
          }
          businessApi
            .update(req, `${res.id}`)
            .then((res) => {
              setStateRegister(res.data.data)
            })
            .catch(() => {
              //แสดงแจ้งเตือนไม่สามารถบันทึกโรงแรมได้
            })
        }
      }
    }
  }

  const initialize = async () => {
    const iniData = {
      ...busunessRegister,
      name: res?.name ? res?.name : '',
      business_type: res?.data.business_type ? res?.data.business_type : '',
      address: res?.data.address ? res?.data.address : '',
      address_more: res?.data.address_more ? res?.data.address_more : '',
      province: res?.data.province ? res?.data.province : '',
      city: res?.data.city ? res?.data.city : '',
      zipcode: res?.data.zipcode ? res?.data.zipcode : '',

      stars: res?.data.stars ? res?.data.stars : 0,
      description: res?.data.description ? res?.data.description : '',
      longitude: res?.data.longitude ? res?.data.longitude : 0,
      latitude: res?.data.latitude ? res?.data.latitude : 0,
      rooms: res?.data.rooms ? res?.data.rooms : [],
      complete_persent: res?.data.complete_persent
        ? res?.data.complete_persent
        : 0,
      contact: {
        name: res?.data.contact ? res?.data.contact.name : '',
        phone_number: res?.data.contact ? res?.data.contact.phone_number : '',
        phone_number_more: res?.data.contact
          ? res?.data.contact.phone_number_more
          : '',
        chain: res?.data.contact ? res?.data.contact.chain : false
      },
      facility: res?.data.facility
        ? res?.data.facility
        : stateRegister.facility,
      images: res?.data.images ? res?.data.images : [],
      policies: res?.data.policies
        ? res?.data.policies
        : busunessRegister.policies,
      settings: res?.data.settings
        ? res?.data.settings
        : busunessRegister.settings
    }
    dispatch(JoinActions.set(iniData))
    setStateRegister(iniData)

    if (res?.data.complete_persent === 20) {
      setActiveStep(1)
    } else if (res?.data.complete_persent === 40) {
      setActiveStep(2)
    } else if (res?.data.complete_persent === 60) {
      setActiveStep(3)
    } else if (res?.data.complete_persent === 70) {
      setActiveStep(4)
    } else if (res?.data.complete_persent === 80) {
      setActiveStep(5)
    } else if (res?.data.complete_persent === 90) {
      setActiveStep(6)
    } else if (res?.data.complete_persent === 100) {
      setActiveStep(6)
    }
  }

  useEffect(() => {
    initialize()
  }, [])

  return (
    <>
      {res ? (
        <>
          <Toolbar />
          <Container
            maxWidth="lg"
            style={{
              paddingTop: 20,
              paddingBottom: 40,
              // background: '#fff',
              height: '100%',
              flex: '1 1 0%'
            }}>
            <Typography variant="h5">
              เปิดที่พักของท่านให้จองบน Hotelsolution.com
              และเริ่มต้อนรับลูกค้าได้ทันที!
            </Typography>
            <Typography variant="body1">
              เริ่มต้นโดยเลือกประเภทที่พักที่ท่านต้องการเปิดให้จองบน
              Hotelsolution.com
            </Typography>
            <Divider />

            <Stepper style={{ overflow: 'auto' }} activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {}
                const labelProps: {
                  optional?: React.ReactNode
                } = {}
                if (isStepSkipped(index)) {
                  stepProps.completed = false
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                )
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography className={classes.instructions}>
                  All steps completed - you&apos;re finished
                </Typography>
                <div className={classes.buttonWrapper}>
                  <div className={classes.spacer} />
                  <Button onClick={handleReset}>Reset</Button>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography className={classes.instructions}>
                  Step {activeStep + 1}
                </Typography>

                {activeStep === 0 && <Category onClick={handleNext} />}
                {activeStep === 1 && <JoinInfo />}
                {activeStep === 2 && <JoinRooms />}
                {activeStep === 3 && <JoinFacility next={handleNext} />}
                {activeStep === 4 && <JoinPhoto />}
                {activeStep === 5 && <JoinPolicies />}
                {activeStep === 6 && <JoinSettings />}
                <div className={classes.buttonWrapper}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}>
                    Back
                  </Button>
                  <div className={classes.spacer} />
                  {activeStep === steps.length - 1 ? null : (
                    <Button onClick={handleNext}>Next</Button>
                  )}
                </div>
              </React.Fragment>
            )}
          </Container>
        </>
      ) : null}
    </>
  )
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN
})(async ({ AuthUser, params }) => {
  // Optionally, get other props.
  const token = await AuthUser.getIdToken()

  if (token == null) {
    return {
      redirect: {
        destination: ROUTESPATH.AUTHEN.SING_IN,
        permanent: false
      }
    }
  }

  if (!params) {
    return { notFound: true }
  }

  const businessRegisterApi = new BusinessRegisterApi({ token: token })

  try {
    const response = await businessRegisterApi.get<BusinessRegisterResponse>(
      (params as any)?.id
    )

    if (response.status === 200) {
      return {
        props: {
          res: response.data
        }
      }
    }
  } catch (_) {
    return {
      notFound: true
    }
  }

  return {
    notFound: true
  }
  // .then((res) => {
  //   return res.data
  // })
  // .catch(() => {
  //   return {
  //     notFound: true
  //   }
  // })
})

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(CategoryPage)
