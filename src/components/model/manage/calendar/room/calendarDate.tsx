import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

import React from 'react'
import { makeStyles } from '@mui/styles'

const widthSize = 45
const options: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  year: undefined,
  month: undefined,
  day: 'numeric'
}
const optionsMonth: Intl.DateTimeFormatOptions = {
  weekday: undefined,
  year: 'numeric',
  month: 'long',
  day: undefined
}
const useStyles = makeStyles(() => ({
  table: {
    border: '1px solid #ccc',
    padding: '2px 9px',
    width: 'auto'
  },
  row: {
    // border: '1px solid #000',
    // margin: 0
  },
  cell: {
    display: 'table-cell',
    border: '1px solid #000'
  },
  htext: {
    textAlign: 'right'
    // width: widthSize
  }
}))

type CalendarDateProps = {
  startDate: Date
  endDate: Date
}
const CalendarDate: React.FC<CalendarDateProps> = ({ startDate, endDate }) => {
  const classes = useStyles()

  let loop = new Date(startDate)
  const month = []
  const dates: { [key: string]: any[] } = {}
  const element: any[] = []
  while (loop <= endDate) {
    const date = loop.toLocaleDateString('th', options).split(' ')
    const m = loop.toLocaleDateString('th', optionsMonth)
    month.push(m)

    if (dates[`${m}`] == null) {
      dates[`${m}`] = []
    }
    dates[`${m}`].push(
      <TableCell
        key={`${loop.toDateString()}`}
        className={classes.row}
        width={widthSize}>
        <div className={classes.htext}>{date[0]}</div>
        <div className={classes.htext}>{date[1]}</div>
      </TableCell>
    )

    const newDate = loop.setDate(loop.getDate() + 1)
    loop = new Date(newDate)
  }

  const uniqueMonth = month.filter(function (item, pos, self) {
    return self.indexOf(item) == pos
  })

  uniqueMonth.map((m, k) => {
    console.log(dates[`${m}`])
    element.push(
      <Table key={`month-group-${k}`} className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={dates[`${m}`].length}
              style={{ textIndent: 5, textAlign: 'left' }}>
              {m}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>{dates[`${m}`]}</TableRow>
        </TableBody>
      </Table>
    )
  })

  return (
    <TableContainer
      component={Paper}
      style={{
        overflow: 'auto',
        position: 'relative',
        overflowX: 'scroll',
        willChange: 'transform',
        display: 'flex'
      }}>
      {element}
    </TableContainer>
  )
}

export default CalendarDate
