import { Card, Grid, Typography } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'

import GroupTextField from '@app/components/items/GroupTextField'
import { HelperText } from '.'
import { RegisterRoomData } from '@app/apis/interface/business-register-interface'

type RoomSizeType = {
  room: RegisterRoomData
  setRoom: Dispatch<SetStateAction<RegisterRoomData>>
  helperText: HelperText
}

const RoomSize: React.FC<RoomSizeType> = (props) => {
  const { room, setRoom } = props

  return (
    <Card sx={{ width: '100%' }}>
      <Grid container p={2}>
        <Grid item md={6} xs={12}>
          <Grid container direction="column">
            <Grid item>
              <Typography>ขนาดของห้องพัก (ระบุหรือไม่ก็ได้)</Typography>
            </Grid>
            <Grid item>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography>ประเภทห้องพัก</Typography>
                </Grid>
                <Grid item>
                  <GroupTextField
                    leftText="ตารางเมตร"
                    inputProps={{ 'aria-label': `ตารางเมตร` }}
                    type="number"
                    value={`${room.size}`}
                    onChange={(e) => {
                      setRoom({
                        ...room,
                        size: parseInt(e.target.value)
                      })
                    }}
                  />
                  {/* <Paper
                    variant="outlined"
                    square
                    component="form"
                    sx={{
                      p: theme.spacing(1, 2),
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                    <Typography>ตารางเมตร</Typography>
                    <Divider
                      sx={{ height: 28, m: 0.5, ml: 2, mr: 1 }}
                      orientation="vertical"
                    />
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      inputProps={{ 'aria-label': 'ตารางเมตร' }}
                    />
                  </Paper> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

export default RoomSize
