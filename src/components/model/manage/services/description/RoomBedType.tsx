import { BEDSNUMBER, BEDSTYPE, ROOMSIGNERBEDS } from '@app/config/room'
import {
  Card,
  FormControl,
  FormHelperText,
  Grid,
  Icon,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'

import { BedData } from '@app/apis/interface/business-register-interface'
import { Button } from '@mui/material'
import { HelperText } from '.'
import { Person } from '@mui/icons-material'
import { ServiceData } from '@app/apis/interface/business-services-interface'

type RoomBedType = {
  room: ServiceData
  setRoom: Dispatch<SetStateAction<ServiceData>>
  helperText: HelperText
}

const RoomBedType: React.FC<RoomBedType> = (props) => {
  const { room, setRoom, helperText } = props

  const handleChangeBedsType =
    (key: number) => (event: SelectChangeEvent<string>) => {
      const newArr = [...room.beds]
      newArr[key].type = event.target.value as string
      setRoom((prve) => ({ ...prve, beds: [...newArr] }))
    }

  const handleChangeBedsNumber =
    (key: number) => (event: SelectChangeEvent<string>) => {
      const newArr = [...room.beds]
      newArr[key].number = parseInt(event.target.value as string)
      setRoom((prve) => ({ ...prve, beds: [...newArr] }))
    }

  const addBeds = () => {
    const beds: BedData = {
      number: 0,
      type: ''
    }
    setRoom({
      ...room,
      beds: [...room.beds, beds]
    })
  }

  const removeBeds = (key: number) => {
    const newArr = [...room.beds]
    newArr.splice(key, 1)
    setRoom((prve) => ({ ...prve, beds: [...newArr] }))
  }

  return (
    <Card sx={{ width: '100%' }}>
      <Grid container p={2}>
        <Grid item xs={12}>
          <Grid container direction="column" spacing={1}>
            {/*  */}
            <Grid item>
              <Typography>ประเภทเตียง/ผู้เข้าพัก</Typography>
            </Grid>
            {/*  */}

            {/*  */}
            {room.type && ROOMSIGNERBEDS.indexOf(room.type) === -1 ? (
              <>
                <Grid item>
                  <Typography>
                    บอกข้อมูลจำนวนเตียงที่มีอยู่แล้วในห้องพัก
                    โดยไม่รวมเตียงเสริม
                  </Typography>
                </Grid>
                <Grid item container direction="column">
                  <Grid item>
                    <Typography>ห้องพักนี้มีเตียงประเภทใด?</Typography>
                  </Grid>

                  {room.beds.map((v, k) => (
                    <Grid
                      item
                      container
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      key={`beds-rows-${k}`}>
                      <Grid item md={5} xs={12}>
                        <FormControl
                          fullWidth
                          error={
                            helperText.beds[k]
                              ? helperText.beds[k].type == ''
                                ? false
                                : true
                              : false
                          }>
                          <Select
                            fullWidth
                            variant="outlined"
                            value={v.type}
                            onChange={handleChangeBedsType(k)}>
                            <MenuItem disabled value="">
                              <em>None</em>
                            </MenuItem>
                            {BEDSTYPE.map((v, k) => (
                              <MenuItem value={v} key={`room-type-item-${k}`}>
                                {v}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>
                            {helperText.beds[k] && helperText.beds[k].type}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid item md={1} xs={12}>
                        <FormControl
                          fullWidth
                          error={
                            helperText.beds[k]
                              ? helperText.beds[k].number == ''
                                ? false
                                : true
                              : false
                          }>
                          <Select
                            fullWidth
                            variant="outlined"
                            value={`${v.number}`}
                            onChange={handleChangeBedsNumber(k)}>
                            <MenuItem disabled value="">
                              <em>None</em>
                            </MenuItem>
                            {BEDSNUMBER.map((v, k) => (
                              <MenuItem value={v} key={`room-type-item-${k}`}>
                                {v}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>
                            {helperText.beds[k] && helperText.beds[k].number}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid item>
                        <Button
                          disabled={k === 0}
                          variant="text"
                          onClick={() => {
                            removeBeds(k)
                          }}
                          fullWidth>
                          <Icon>remove</Icon>ลบ
                        </Button>
                      </Grid>
                    </Grid>
                  ))}

                  <Grid item>
                    <Button
                      variant="text"
                      onClick={() => {
                        addBeds()
                      }}>
                      <Icon>add</Icon>เพิ่มเตียง
                    </Button>
                  </Grid>
                </Grid>
              </>
            ) : null}

            {/*  */}
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography>
                    ลูกค้าสามารถเข้าพักในห้องนี้ได้ทั้งหมดกี่ท่าน?
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    value={room.stays}
                    onChange={(e) => {
                      setRoom((prve) => ({
                        ...prve,
                        stays: parseInt(e.target.value)
                      }))
                    }}
                    InputProps={{
                      type: 'number',
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      )
                    }}></TextField>
                </Grid>
              </Grid>
            </Grid>
            {/*  */}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

export default RoomBedType
