import {
  Card,
  Grid,
  Icon,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'

import { BusinessResponseGet } from '@app/apis/interface/business-interface'

type AddressInfoProps = {
  data: BusinessResponseGet
  setData: Dispatch<SetStateAction<BusinessResponseGet>>
}

const AddressInfo: React.FC<AddressInfoProps> = ({ data, setData }) => {
  const onHandleAddress = (value: string) => {
    setData({
      ...data,
      address: value
    })
  }

  const onHandleAddressMore = (value: string) => {
    setData({
      ...data,
      address_more: value
    })
  }

  const onHandleProvince = (value: string) => {
    setData({
      ...data,
      province: value
    })
  }

  const onHandleCity = (value: string) => {
    setData({
      ...data,
      city: value
    })
  }

  const onHandleZipcode = (value: string) => {
    setData({
      ...data,
      zipcode: value
    })
  }

  return (
    <>
      <Card>
        <Grid container p={2} spacing={2}>
          <Grid item md={6} xs={12}>
            <Grid container direction="column">
              <Grid item>
                <Typography>ที่พักของท่านตั้งอยู่ที่ใด?</Typography>
              </Grid>
              {/*  */}
              <Grid item>
                <Typography>
                  ท่านมีที่พักหลายแห่งที่ต้องการลงทะเบียน
                  เพราะฉะนั้นโปรดกรอกข้อมูลให้ตรงกับของที่พักที่กำลังลงทะเบียนอยู่นี้
                </Typography>
              </Grid>
              {/*  */}
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>บ้านเลขที่ ถนน</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      value={data.address}
                      variant="outlined"
                      placeholder="เช่น 123 ถนน ข้าวสาร"
                      fullWidth
                      onChange={(e) =>
                        onHandleAddress(e.target.value)
                      }></TextField>
                  </Grid>
                </Grid>
              </Grid>
              {/*  */}
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>ที่อยู่ บรรทัดที่ 2</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      value={data.address_more}
                      variant="outlined"
                      placeholder="หมายเลขยูนิต ชั้น อาคาร ฯลฯ"
                      fullWidth
                      onChange={(e) =>
                        onHandleAddressMore(e.target.value)
                      }></TextField>
                  </Grid>
                </Grid>
              </Grid>
              {/*  */}
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>ประเทศ/ภูมิภาค</Typography>
                  </Grid>
                  <Grid item>
                    <Select
                      value={data.city}
                      variant="outlined"
                      displayEmpty
                      fullWidth
                      onChange={(e) => onHandleCity(e.target.value)}>
                      <MenuItem value="">กรุณาเลือก</MenuItem>
                      <MenuItem value="ประเทศไทย">ประเทศไทย</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
              {/*  */}
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>เมือง</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      value={data.province}
                      variant="outlined"
                      placeholder="เช่น Khanu Woralaksaburi"
                      fullWidth
                      onChange={(e) =>
                        onHandleProvince(e.target.value)
                      }></TextField>
                  </Grid>
                </Grid>
              </Grid>
              {/*  */}
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>รหัสไปรษณีย์</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      value={data.zipcode}
                      variant="outlined"
                      fullWidth
                      onChange={(e) =>
                        onHandleZipcode(e.target.value)
                      }></TextField>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} xs={12}>
            <Paper variant="outlined" square>
              <Grid container p={2} spacing={2}>
                <Grid item>
                  <Icon
                    baseClassName="material-icons-outlined"
                    style={{ fontSize: '72px' }}>
                    info
                  </Icon>
                </Grid>
                <Grid item xs>
                  <Grid container>
                    <Grid item>
                      <Typography>ข้อมูลที่อยู่ของท่านมีความสำคัญ</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        โปรดระบุที่อยู่ของที่พักโดยละเอียด เช่น ชื่ออาคาร
                        หมายเลขอาคาร ฯลฯ เมื่อท่านลงทะเบียนเรียบร้อยแล้ว
                        เราอาจจัดส่งจดหมายทางไปรษณีย์ไปยังที่อยู่ดังกล่าวเพื่อยืนยันตำแหน่งที่พักของท่าน
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default AddressInfo
