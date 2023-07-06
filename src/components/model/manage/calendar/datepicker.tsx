import { Box, TextField } from '@mui/material'
import { DateRange, DateRangePicker, LocalizationProvider } from '@mui/lab'

import AdapterDateFns from '@mui/lab/AdapterDateFns'
import React from 'react'
import thLocale from 'date-fns/locale/th'
import { useEffect } from 'react'

type DatepickerCalendarProps = {
  startDate?: Date
  endDate?: Date
  setStartDate?: React.Dispatch<React.SetStateAction<Date>>
  setEndDate?: React.Dispatch<React.SetStateAction<Date>>
  onChange?: (startDate: Date, endDate: Date) => void
}

const DatepickerCalendar: React.FC<DatepickerCalendarProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onChange
}) => {
  const [value, setValue] = React.useState<DateRange<Date>>([null, null])

  useEffect(() => {
    if (startDate && endDate) {
      setValue([startDate, endDate])
    }
  }, [startDate, endDate])

  const onHandleSearch = (newValue: DateRange<Date | null>) => {
    setValue(newValue)
    if (setStartDate && newValue[0]) {
      setStartDate(newValue[0])
    }
    if (setEndDate && newValue[1]) {
      setEndDate(newValue[1])
    }

    // if (newValue[0] && newValue[1] && onChange)
    //   onChange(newValue[0], newValue[1])
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={thLocale}>
        <Box>
          <DateRangePicker
            calendars={3}
            value={value}
            onChange={onHandleSearch}
            onAccept={(date: DateRange<Date>) => {
              if (onChange && date[0] && date[1]) {
                onChange(date[0], date[1])
              }
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField
                  {...startProps}
                  style={{ minWidth: 250 }}
                  helperText=""
                  label="วันที่เช็คอิน"
                />
                <Box sx={{ mx: 0.5 }}></Box>
                <TextField
                  {...endProps}
                  style={{ minWidth: 250 }}
                  helperText=""
                  label="วันที่เช็คเอาท์"
                />
              </React.Fragment>
            )}
          />
        </Box>
      </LocalizationProvider>
    </>
  )
}

export default DatepickerCalendar
