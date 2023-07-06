import { Grid, Paper } from '@mui/material'

import { CalendarData } from '@app/apis/interface/business-calendar-interface'
import CalendarDate from './room/calendarDate'
import React from 'react'

// const months_th = [
//   'มกราคม',
//   'กุมภาพันธ์',
//   'มีนาคม',
//   'เมษายน',
//   'พฤษภาคม',
//   'มิถุนายน',
//   'กรกฎาคม',
//   'สิงหาคม',
//   'กันยายน',
//   'ตุลาคม',
//   'พฤศจิกายน',
//   'ธันวาคม'
// ]

// CalendarDate

// const AvailabilitiesDate: React.FC = () => {
//   return <></>
// }

// CalendarRoom

type CalendarRoomProps = {
  data: CalendarData[]
  startDate: Date
  endDate: Date
}

const CalendarRoom: React.FC<CalendarRoomProps> = ({
  data,
  startDate,
  endDate
}) => {
  // Get Service Rate

  return (
    <>
      <Grid container direction="column">
        <Grid item container>
          <CalendarDate startDate={startDate} endDate={endDate} />
        </Grid>
        {data.map((v, k) => (
          <>
            <Grid item key={`room-availabilities${k}`}>
              <Paper sx={{ padding: 2 }}>{v.name}</Paper>
            </Grid>
            <Grid item></Grid>
          </>
        ))}
      </Grid>
    </>
  )
}

export default CalendarRoom
