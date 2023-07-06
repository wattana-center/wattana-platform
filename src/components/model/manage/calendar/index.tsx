import { Container, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import { CalendarResponseGetAll } from '@app/apis/interface/business-calendar-interface'
import CalendarRoom from './room'
import DatepickerCalendar from './datepicker'
import { useRouter } from 'next/router'

type ManageCalendarProps = CalendarResponseGetAll

const ManageCalendar: React.FC<ManageCalendarProps> = ({ data }) => {
  const router = useRouter()

  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())

  const onHandleSearch = (newStarDate: Date, newEndDate: Date) => {
    router.push({
      pathname: '',
      query: {
        business_id: router.query.business_id,
        start_date: newStarDate.toISOString().slice(0, 10),
        end_date: newEndDate.toISOString().slice(0, 10)
      }
    })
  }

  useEffect(() => {
    const sd = new Date(router.query.start_date as string)
    const ed = new Date(router.query.end_date as string)

    setStartDate(sd)
    setEndDate(ed)
  }, [])

  return (
    <>
      <Container maxWidth="lg">
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography>ปฏิทิน</Typography>
          </Grid>
          <Grid item sx={{ mt: 2 }}>
            <DatepickerCalendar
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              onChange={onHandleSearch}
            />
          </Grid>
        </Grid>
      </Container>

      <div>
        <CalendarRoom data={data} startDate={startDate} endDate={endDate} />
      </div>
    </>
  )
}

export default ManageCalendar
