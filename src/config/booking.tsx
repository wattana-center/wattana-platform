// BookSuccess BookingStatus = "B"
// BookWith    BookingStatus = "W"
// BookFail    BookingStatus = "F"
// BookCancel  BookingStatus = "C"

import { Typography } from '@mui/material'

type BookingTextMessageProps = {
  str: string
}

const BookingTextMessage: React.FC<BookingTextMessageProps> = ({ str }) => {
  let message = ''
  let color = ''
  if (str === 'B') {
    message = 'ยืนยันการจองเรียบร้อย'
    color = 'green'
  } else if (str === 'W') {
    message = 'กำลังทำรายการ'
    color = 'orange'
  } else if (str === 'F') {
    message = 'ดำเนินการจองล้มเหลม'
    color = 'red'
  } else if (str === 'C') {
    message = 'ยกเลิกการจอง'
    color = 'gray'
  } else {
    message = 'error'
    color = 'red'
  }

  return (
    <>
      <Typography sx={{ color: color }}>{message}</Typography>
    </>
  )
}

export { BookingTextMessage }
