import {
  Card,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Icon,
  InputBase,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from '@mui/material'
import React, { Dispatch, SetStateAction, useState } from 'react'

import { HelperText } from '.'
import { ServiceData } from '@app/apis/interface/business-services-interface'

/**
 * Line Description
 * 000 Calculator Price discount
 * 001 default_cost field
 * 002 setIsDiscount
 * 003 ท่านให้ราคาถูกกว่าเท่าไร
 * 004 discount_min_stays
 * 005
 * 006 แสดงสรุปราคา
 */
type RoomPriceProps = {
  room: ServiceData
  setRoom: Dispatch<SetStateAction<ServiceData>>
  helperText: HelperText
}

const RoomPrice: React.FC<RoomPriceProps> = (props) => {
  const { room, setRoom } = props

  const theme = useTheme()

  const [isDiscount, setIsDiscount] = useState<boolean>(false)

  const renderItems = () => {
    const el = []
    for (let index = 1; index < room.stays; index++) {
      el.push(index)
    }

    return el.map((v, k) => (
      <MenuItem value={`${v}`} key={`room-type-item-${k}`}>
        {v}
      </MenuItem>
    ))
  }
  // 000 Calculator Price discount
  const renderDiscountSummary = () => {
    const el = []
    for (let index = room.stays; index > room.discount_min_stays; index--) {
      el.push(index)
    }

    return (
      <>
        {room.discount > 0 ? (
          el.map((v, k) => (
            <TableRow key={`table-row-summary-stays_discount-${k}`}>
              <TableCell>
                <Stack direction="row">
                  <Icon>person</Icon>
                  <Typography>x {v}</Typography>
                </Stack>
              </TableCell>
              <TableCell>
                <Typography>
                  <b style={{ color: 'green' }}>
                    THB {(room.default_cost / room.stays) * v}
                  </b>
                </Typography>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <>
            <TableRow>
              <TableCell>
                <Stack direction="row">
                  <Icon>person</Icon>
                  <Typography>x {room.stays}</Typography>
                </Stack>
              </TableCell>
              <TableCell>
                <Typography>
                  <b style={{ color: 'green' }}>THB {room.default_cost}</b>
                </Typography>
              </TableCell>
            </TableRow>
          </>
        )}
      </>
    )
  }

  return (
    <Card sx={{ width: '100%' }}>
      <Grid container p={2} spacing={2}>
        <Grid item md={6} xs={12}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography>ราคาพื้นฐานต่อคืน</Typography>
            </Grid>
            <Grid item>
              <Typography>
                นี่คือราคาที่ต่ำที่สุดซึ่งเราจะนำไปใช้เป็นราคาจองของห้องนี้สำหรับทุกวันเข้าพักโดยอัตโนมัติ
                ทั้งนี้ ก่อนที่ที่พักของท่านจะเปิดให้จองออนไลน์โดยสมบูรณ์
                ท่านสามารถตั้งราคาสำหรับแต่ละฤดูกาลได้ในแดชบอร์ดที่พักของท่าน
              </Typography>
            </Grid>
            <Grid item>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography>ราคาสำหรับ {room.stays} ท่าน</Typography>
                </Grid>
                <Grid item>
                  <Paper
                    variant="outlined"
                    square
                    component="form"
                    sx={{
                      p: theme.spacing(1, 2),
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                    <Typography>THB/ต่อเดือน</Typography>
                    <Divider
                      sx={{ height: 28, m: 0.5, ml: 2, mr: 1 }}
                      orientation="vertical"
                    />
                    {/* 001 default_cost */}
                    <InputBase
                      value={room.default_cost}
                      type="number"
                      onChange={(e) => {
                        if (parseInt(e.target.value) > 0)
                          setRoom((prve) => ({
                            ...prve,
                            default_cost: parseInt(e.target.value)
                          }))
                      }}
                      sx={{ ml: 1, flex: 1 }}
                      inputProps={{
                        min: 1
                      }}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            {room.stays > 1 && (
              <Grid item>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Typography>
                      ท่านให้ราคาถูกกว่าหากมีผู้เข้าพักน้อยกว่า {room.stays}{' '}
                      ท่าน?
                    </Typography>
                  </Grid>
                  <Grid item>
                    <FormControl component="fieldset">
                      {/* 002 setIsDiscount */}
                      <RadioGroup
                        value={isDiscount}
                        onChange={(e) => {
                          if (
                            (e.target as HTMLInputElement).value === 'false'
                          ) {
                            setRoom((prve) => ({
                              ...prve,
                              discount: 0,
                              discount_min_stays: 0
                            }))
                          }
                          setIsDiscount(
                            (e.target as HTMLInputElement).value === 'true'
                              ? true
                              : false
                          )
                        }}>
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="ใช่"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="ไม่"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  {isDiscount && (
                    <>
                      <Grid item>
                        <Typography>ท่านให้ราคาถูกกว่าเท่าไร?</Typography>
                      </Grid>
                      <Grid item>
                        {/* 003 */}
                        <Paper
                          variant="outlined"
                          square
                          component="form"
                          sx={{
                            p: theme.spacing(1, 2),
                            display: 'flex',
                            alignItems: 'center'
                          }}>
                          <Typography>% ต่อท่าน</Typography>
                          <Divider
                            sx={{ height: 28, m: 0.5, ml: 2, mr: 1 }}
                            orientation="vertical"
                          />
                          <InputBase
                            value={room.discount}
                            // defaultValue={0}
                            type="number"
                            onChange={(e) => {
                              if (parseInt(e.target.value) > 0)
                                setRoom((prve) => ({
                                  ...prve,
                                  discount: parseInt(e.target.value)
                                }))
                            }}
                            sx={{ ml: 1, flex: 1 }}
                            inputProps={{
                              'aria-label': 'ท่านให้ราคาถูกกว่าเท่าไร',
                              min: 0,
                              max: 100
                            }}
                          />
                        </Paper>
                      </Grid>
                      <Grid item>
                        <Typography>
                          จะต้องมีผู้เข้าพักขั้นต่ำกี่ท่านจึงจะได้ราคาที่ถูกกว่าจากท่าน??
                        </Typography>
                      </Grid>
                      <Grid item>
                        {/* 004 set discount_min_stays */}
                        <Select
                          fullWidth
                          variant="outlined"
                          value={`${room.discount_min_stays}`}
                          onChange={(e) => {
                            setRoom((prve) => ({
                              ...prve,
                              discount_min_stays: parseInt(e.target.value)
                            }))
                          }}>
                          {room.stays > 0 ? renderItems() : null}
                        </Select>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          {/* 006 */}
          <TableContainer square component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={2}>
                    ข้อมูลสรุปด้านราคาของ {room.name}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>จำนวนผู้เข้าพัก</TableCell>
                  <TableCell>ราคา</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {renderDiscountSummary()}
                <TableRow>
                  <TableCell colSpan={2}>
                    เมื่อท่านได้รับสิทธิ์ให้เข้าถึงแดชบอร์ดที่พักของท่านแล้ว
                    เราจะขอให้ท่านตรวจสอบข้อมูลราคาของท่านอีกครั้งก่อนที่พักของท่านจะเปิดให้จองออนไลน์โดยสมบูรณ์บนเว็บไซต์ของเรา
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Card>
  )
}

export default RoomPrice
