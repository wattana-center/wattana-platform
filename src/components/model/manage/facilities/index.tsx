import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Theme,
  Typography,
  useTheme
} from '@mui/material'
import {
  FacilityData,
  FacilityRequest
} from '@app/apis/interface/business-facility'
import {
  useAlertError,
  useAlertSuccess,
  useLoadingAlert
} from '@app/helpers/useSweetAlert2'
import { useAuthUser, withAuthUser } from 'next-firebase-auth'

import BusinessApi from '@app/apis/business-api'
import BusinessFacilityApi from '@app/apis/business-facility'
import { BusinessResponseGet } from '@app/apis/interface/business-interface'
import { Facility } from '@app/apis/interface/facility-master-interface'
import { LANGUAGE } from '@app/config/facility'
import React from 'react'
import { useEffect } from 'react'
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

type ManageFacilitiesProps = {
  businessData: BusinessResponseGet
  masterData: Facility[]
  facilityData: FacilityData[]
}

const ManageFacilities: React.FC<ManageFacilitiesProps> = ({
  masterData,
  businessData,
  facilityData
}) => {
  const [business, setBusiness] = useState<BusinessResponseGet>({
    ...businessData
  })
  const [facility, setFacility] = useState<FacilityData[]>([...facilityData])
  const [loading, setLoading] = useState(-1)
  const authUser = useAuthUser()
  const theme = useTheme()
  const alertError = useAlertError()
  const loadingAlert = useLoadingAlert()
  const alertSuccess = useAlertSuccess()

  const handleChangeCarPark = (event: SelectChangeEvent<string>) => {
    const carPark = event.target.value as string
    setBusiness({
      ...business,
      car_park: parseInt(carPark)
    })
  }

  const handleChangeBreakfast = (event: SelectChangeEvent<string>) => {
    const breakfast = event.target.value as string

    setBusiness({
      ...business,
      breakfast: parseInt(breakfast)
    })
  }

  const handleChangeLanguage = (event: SelectChangeEvent<string[]>) => {
    const language = event.target.value as string[]

    setBusiness({
      ...business,
      language: language
    })
  }

  const findFacility = (id: number) => {
    const find = facility.find((v) => v.detail.id === id)
    if (find != null) {
      return true
    }

    return false
  }

  const handleOnChangeFacility =
    (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoading(id)
      if (e.target.checked) {
        handleOnUpdateFacility({
          business_id: businessData.id,
          facility_id: id,
          type: 0
        })
      } else {
        handleOnDeleteFacility(id)

        //remove
      }
    }

  const handleOnDeleteFacility = async (id: number) => {
    const token = await authUser.getIdToken()
    if (token) {
      const facilityApi = new BusinessFacilityApi(
        { token: token },
        businessData.id.toString()
      )

      await facilityApi
        .delete(`${id}`)
        .then(() => {
          const current = facility.filter((v) => v.detail.id !== id)
          setFacility(current)
        })
        .catch((e) => {
          alertError(e.message)
        })
        .finally(() => {
          setLoading(-1)
        })
    } else {
      alertError(`access denied`)
      setLoading(-1)
    }
  }

  const handleOnUpdateFacility = async (data: FacilityRequest) => {
    const token = await authUser.getIdToken()
    if (token) {
      const facilityApi = new BusinessFacilityApi(
        { token: token },
        businessData.id.toString()
      )

      facilityApi
        .save(data)
        .then((res) => {
          setFacility([...facility, res.data])
        })
        .finally(() => {
          setLoading(-1)
        })
    } else {
      alertError(`access denied`)
      setLoading(-1)
    }
  }

  const handleOnSaveFacility = async () => {
    const token = await authUser.getIdToken()
    if (token) {
      loadingAlert()
      const businessApi = new BusinessApi({ token: token })
      await businessApi
        .update(business, `${business.id}`)
        .then(() => {
          alertSuccess(`บันทึกข้อมูลเรียบร้อย`)
        })
        .catch((error) => {
          alertError(`${error.message}`)
        })
    }
  }

  useEffect(() => {
    setBusiness({ ...businessData })
  }, [businessData])

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
                    value={`${business.car_park}`}
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
                    value={`${business.breakfast}`}
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
                      value={business.language}
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
                          style={getStyles(name, business.language, theme)}>
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
          {masterData.map((v, k) => (
            <Grid item md={4} xs={12} key={`facility-master-items-${k}`}>
              <Card>
                <CardContent>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                      {loading === v.id ? (
                        <CircularProgress />
                      ) : (
                        <Checkbox
                          checked={findFacility(v.id)}
                          onChange={handleOnChangeFacility(v.id)}
                        />
                      )}
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

export default withAuthUser<ManageFacilitiesProps>()(ManageFacilities)
