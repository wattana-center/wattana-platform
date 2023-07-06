import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Theme,
  Typography,
  useTheme
} from '@mui/material'
import {
  Facility,
  FacilityMasterResponseGetAll
} from '@app/apis/interface/facility-master-interface'
import React, { useEffect } from 'react'
import { useAuthUser, withAuthUser } from 'next-firebase-auth'
import { useDispatch, useSelector } from '@app/helpers/useSelector'

import FacilityMasterApi from '@app/apis/facility-master-api'
import { Grid } from '@mui/material'
import { JoinActions } from '@app/redux-store/businessRegister'
import { LANGUAGE } from '@app/config/facility'
import { useState } from 'react'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  }
}

type JoinFacilityProps = {
  next: () => void
}

const JoinFacility: React.FC<JoinFacilityProps> = ({ next }) => {
  const theme = useTheme()

  const authUser = useAuthUser()
  const dispatch = useDispatch()
  const busunessRegister = useSelector((state) => state.busunessRegister.data)

  const [facility, setFacility] = useState<Facility[]>()

  // const [carPark, setCarPark] = useState<string>('0')
  // const [breakfast, setBreakfast] = useState<string>('0')
  // const [personName, setPersonName] = React.useState<string[]>([])

  const getFacilityData = async () => {
    const token = await authUser.getIdToken().then((token) => token)
    if (token) {
      const facilityMasterApi = new FacilityMasterApi({ token: token })
      facilityMasterApi.getAll<FacilityMasterResponseGetAll>({}).then((res) => {
        if (res.status === 200) {
          setFacility(res.data.data)
        }
      })
    }
  }

  const handleChangeCarPark = (event: SelectChangeEvent<string>) => {
    const carPark = event.target.value as string
    dispatch(
      JoinActions.set({
        ...busunessRegister,
        facility: {
          ...busunessRegister.facility,
          car_park: parseInt(carPark)
        }
      })
    )
  }

  const handleChangeBreakfast = (event: SelectChangeEvent<string>) => {
    const breakfast = event.target.value as string

    dispatch(
      JoinActions.set({
        ...busunessRegister,
        facility: {
          ...busunessRegister.facility,
          breakfast: parseInt(breakfast)
        }
      })
    )
    // setBreakfast(event.target.value as string)
  }

  const handleChangeLanguage = (event: SelectChangeEvent<string[]>) => {
    const language = event.target.value as string[]
    dispatch(
      JoinActions.set({
        ...busunessRegister,
        facility: {
          ...busunessRegister.facility,
          language: language
        }
      })
    )
  }

  const handleOnSaveFacility = () => {
    next()
  }

  useEffect(() => {
    getFacilityData()
  }, [authUser])

  return (
    <>
      <Grid container spacing={1} direction="column">
        <Grid item>
          <Typography>สิ่งอำนวยความสะดวกและบริการ</Typography>
        </Grid>
        <Grid item>
          <Typography>
            ตอนนี้ ช่วยบอกข้อมูลทั่วไปเกี่ยวกับที่พักของท่านสักหน่อย เช่น
            สิ่งอำนวยความสะดวก อินเทอร์เน็ต ที่จอดรถ
            และภาษาที่ท่านกับพนักงานสามารถสื่อสารได้
          </Typography>
        </Grid>
        <Grid item>
          <Card>
            <CardContent>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography>ที่จอดรถ</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    ข้อมูลนี้สำคัญสำหรับผู้เข้าพักที่ขับรถยนต์มาที่พักของท่าน
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>มีที่จอดรถสำหรับผู้เข้าพักหรือไม่</Typography>
                </Grid>
                <Grid item>
                  <Select
                    autoWidth
                    sx={{ minWidth: 200 }}
                    id="card-park-select"
                    value={`${busunessRegister.facility.car_park}`}
                    onChange={handleChangeCarPark}>
                    <MenuItem value={'0'}>ไม่มี</MenuItem>
                    <MenuItem value={'1'}>มี มีค่าบริการ</MenuItem>
                    <MenuItem value={'2'}>มี ฟรี</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card>
            <CardContent>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography>อาหารเช้า</Typography>
                </Grid>
                <Grid item>
                  <Typography>มีบริการอาหารเช้าหรือไม่?</Typography>
                </Grid>
                <Grid item>
                  <Select
                    autoWidth
                    sx={{ minWidth: 200 }}
                    id="card-park-select"
                    value={`${busunessRegister.facility.breakfast}`}
                    onChange={handleChangeBreakfast}>
                    <MenuItem value={'0'}>ไม่</MenuItem>
                    <MenuItem value={'1'}>มี และร่วมในราคาที่พัก</MenuItem>
                    <MenuItem value={'2'}>
                      มี ผู้เข้าพักต้องเลือกว่าจะรับบริการหรือไม่
                    </MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card>
            <CardContent>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography>ภาษาที่ใช้สื่อสาร</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    ท่านหรือพนักงานของท่านสื่อสารด้วยภาษาใด?
                  </Typography>
                </Grid>
                <Grid item>
                  <FormControl sx={{ minWidth: 300 }}>
                    <Select
                      multiple
                      value={busunessRegister.facility.language}
                      onChange={handleChangeLanguage}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} sx={{ m: '2px' }} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}>
                      {LANGUAGE.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(
                            name,
                            busunessRegister.facility.language,
                            theme
                          )}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Typography>สิ่งอำนวยความสะดวกที่ได้รับความนิยมจากลูกค้า</Typography>
        </Grid>
        <Grid item container spacing={1}>
          {facility?.map((v, k) => (
            <Grid item md={4} xs={12} key={`facility-master-items-${k}`}>
              <Card>
                <CardContent>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Checkbox
                        checked={
                          busunessRegister.facility.facilites.find(
                            (f) => f === `${v.id}`
                          )
                            ? true
                            : false
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            dispatch(
                              JoinActions.set({
                                ...busunessRegister,
                                facility: {
                                  ...busunessRegister.facility,
                                  facilites: [
                                    ...busunessRegister.facility.facilites,
                                    `${v.id}`
                                  ]
                                }
                              })
                            )
                          } else {
                            const current =
                              busunessRegister.facility.facilites.filter(
                                (f) => f !== `${v.id}`
                              )
                            dispatch(
                              JoinActions.set({
                                ...busunessRegister,
                                facility: {
                                  ...busunessRegister.facility,
                                  facilites: current
                                }
                              })
                            )
                          }
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography>{v.name}</Typography>
                    </Grid>
                    <Grid item></Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid item>
          <Button variant="contained" fullWidth onClick={handleOnSaveFacility}>
            บันทึกสิ่งอำนวยความสะดวกและบริการ
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default withAuthUser<JoinFacilityProps>()(JoinFacility)
