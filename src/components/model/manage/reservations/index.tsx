import {
  Button,
  FormControl,
  Grid,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography
} from '@mui/material'

import DateViewReservations from './dataview'
import DatepickerReservations from './datepicker'
import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'

const ManageReservations: React.FC = () => {
  const router = useRouter()

  const [filter, setFilter] = React.useState('create_at')
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())

  const handleChange = (event: SelectChangeEvent<string>) => {
    setFilter(event.target.value as string)
  }

  const onHandleSearch = () => {
    router.push({
      pathname: '',
      query: {
        business_id: router.query.business_id,
        start_date: startDate.toISOString().slice(0, 10),
        end_date: endDate.toISOString().slice(0, 10),
        filter: filter
      }
    })
  }

  //Initiative component
  useEffect(() => {
    const startDateStr = router.query.start_date as string
    const endDateStr = router.query.end_date as string
    if (startDateStr && endDateStr) {
      setStartDate(new Date(startDateStr))
      setEndDate(new Date(endDateStr))
    }
  }, [])

  return (
    <>
      <Grid container direction="column" spacing={1}>
        <Grid item container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography>จองห้องพัก</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" startIcon={<Icon>print</Icon>}>
                ปรินท์ข้อมูลรายการจอง
              </Button>
              <Button variant="outlined" startIcon={<Icon>file_download</Icon>}>
                ดาวน์โหลด
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Grid item container spacing={1}>
          <Grid item xs>
            <FormControl fullWidth>
              <InputLabel id="select-day-label">วันที่</InputLabel>
              <Select
                labelId="select-day-label"
                id="select-day-select"
                value={filter}
                label="วันที่"
                onChange={handleChange}>
                <MenuItem value={'check_in'}>เช็คอิน</MenuItem>
                <MenuItem value={'check_out'}>เช็คเอาท์</MenuItem>
                <MenuItem value={'create_at'}>วันที่จอง</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs>
            <DatepickerReservations
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </Grid>
          <Grid item xs>
            <Button
              fullWidth
              sx={{ height: '100%' }}
              startIcon={<Icon>search</Icon>}
              onClick={() => {
                onHandleSearch()
              }}>
              ค้นหา
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <DateViewReservations />
        </Grid>
      </Grid>
    </>
  )
}

export default ManageReservations
