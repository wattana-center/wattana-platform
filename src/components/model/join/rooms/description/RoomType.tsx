import {
  Card,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material'
import { ROOMTYPE, SMOKING } from '@app/config/room'
import React, { Dispatch, SetStateAction } from 'react'

import FormControl from '@mui/material/FormControl'
import { FormHelperText } from '@mui/material'
import { HelperText } from '.'
import { RegisterRoomData } from '@app/apis/interface/business-register-interface'

/**
 * Comment Line Description
 * 000
 * 001 ประเภทห้องพัก
 * 002 ชื่อห้องพัก
 * 003 นโยบายการสูบบุหรี่
 * 004 จำนวนห้องพัก (ของประเภทนี้)
 */

type RoomTypeProps = {
  room: RegisterRoomData
  setRoom: Dispatch<SetStateAction<RegisterRoomData>>
  helperText: HelperText
}

const RoomType: React.FC<RoomTypeProps> = (props) => {
  const { room, setRoom, helperText } = props

  const handleChangeRoomType = (event: SelectChangeEvent<string>) => {
    setRoom((prve) => ({ ...prve, type: event.target.value as string }))
  }

  const handleChangeSmoking = (event: SelectChangeEvent<string>) => {
    setRoom((prve) => ({ ...prve, smoking: event.target.value as string }))
  }

  return (
    <Card sx={{ width: '100%' }}>
      <Grid container p={2}>
        <Grid item md={6} xs={12}>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Typography>โปรดเลือก</Typography>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography>ประเภทห้องพัก</Typography>
                </Grid>
                <Grid item>
                  {/* [001] */}
                  <FormControl
                    sx={{ minWidth: '100%' }}
                    error={helperText.type == '' ? false : true}>
                    <Select
                      fullWidth
                      variant="outlined"
                      value={room.type}
                      onChange={handleChangeRoomType}>
                      <MenuItem disabled value="">
                        <em>None</em>
                      </MenuItem>
                      {ROOMTYPE.map((v, k) => (
                        <MenuItem value={v} key={`room-type-item-${k}`}>
                          {v}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{helperText.type}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            {/*  */}
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography>ชื่อห้องพัก</Typography>
                </Grid>
                <Grid item>
                  {/* [002] */}
                  <TextField
                    fullWidth
                    value={room.name}
                    error={helperText.name == '' ? false : true}
                    helperText={helperText.name}
                    onChange={(e) => {
                      setRoom((prve) => ({
                        ...prve,
                        name: e.target.value
                      }))
                    }}></TextField>
                </Grid>
              </Grid>
            </Grid>
            {/*  */}
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography>นโยบายการสูบบุหรี่</Typography>
                </Grid>
                <Grid item>
                  {/* [003] */}
                  <FormControl
                    sx={{ minWidth: '100%' }}
                    error={helperText.smoking == '' ? false : true}>
                    <Select
                      fullWidth
                      variant="outlined"
                      value={room.smoking}
                      onChange={handleChangeSmoking}
                      autoWidth>
                      <MenuItem disabled value="">
                        <em>None</em>
                      </MenuItem>
                      {SMOKING.map((v, k) => (
                        <MenuItem value={v} key={`room-type-item-${k}`}>
                          {v}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{helperText.smoking}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography>จำนวนห้องพัก (ของประเภทนี้)</Typography>
                </Grid>
                <Grid item>
                  {/* [004] */}
                  <TextField
                    type="number"
                    value={room.number}
                    InputProps={{
                      inputMode: 'numeric',
                      inputProps: { min: 1, max: 99 }
                    }}
                    onChange={(e) => {
                      if (parseInt(e.target.value) < 100)
                        setRoom((prve) => ({
                          ...prve,
                          number: parseInt(e.target.value)
                        }))
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

export default RoomType
