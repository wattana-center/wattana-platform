import { Box, TextField } from '@mui/material'
import { DateRange, DateRangePicker, LocalizationProvider } from '@mui/lab'

import AdapterDateFns from '@mui/lab/AdapterDateFns'
import React from 'react'
import thLocale from 'date-fns/locale/th'
import { useEffect } from 'react'

type DatepickerReservationsProps = {
  startDate?: Date
  endDate?: Date
  setStartDate?: React.Dispatch<React.SetStateAction<Date>>
  setEndDate?: React.Dispatch<React.SetStateAction<Date>>
}

const DatepickerReservations: React.FC<DatepickerReservationsProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate
}) => {
  const [value, setValue] = React.useState<DateRange<Date>>([null, null])

  useEffect(() => {
    if (startDate && endDate) {
      setValue([startDate, endDate])
    }
  }, [startDate, endDate])

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={thLocale}>
        <Box>
          <DateRangePicker
            calendars={3}
            value={value}
            onChange={(newValue) => {
              setValue(newValue)
              if (setStartDate && newValue[0]) {
                setStartDate(newValue[0])
              }
              if (setEndDate && newValue[1]) {
                setEndDate(newValue[1])
              }
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField
                  {...startProps}
                  style={{ minWidth: 250 }}
                  helperText=""
                />
                <Box sx={{ mx: 0.5 }}></Box>
                <TextField
                  {...endProps}
                  style={{ minWidth: 250 }}
                  helperText=""
                />
              </React.Fragment>
            )}
          />
        </Box>
      </LocalizationProvider>
    </>
  )
}

export default DatepickerReservations
