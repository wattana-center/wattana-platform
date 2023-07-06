import { BookingData, bookingHeadCells } from './utils'
import {
  BookingDataGetAll,
  BookingResponseGetAll
} from '@app/apis/interface/business-booking'
import { Order, getComparator, stableSort } from '@app/utils/sort'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from '@mui/material'
import React, { useEffect, useState } from 'react'

import { BookingTextMessage } from '@app/config/booking'
import BusinessBookingApi from '@app/apis/business-booking-api'
import ReservationsDetail from './detail'
import WattanaTheme from '@app/config/theme'
import { makeStyles } from '@mui/styles'
import { useAuthUser } from 'next-firebase-auth'
import { useRouter } from 'next/router'

const useStyles = makeStyles({
  paper: {
    width: '100%',
    marginBottom: WattanaTheme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  hideLastBorder: {
    '&:last-child td, &:last-child th': {
      border: 0
    }
  }
})

const DateViewReservations: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const AuthUser = useAuthUser()

  const [items, setItems] = useState<BookingResponseGetAll>()
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof BookingData>('fullname_th')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [openDialog, setOpenDialog] = React.useState(false)
  const [select, setSelect] = React.useState<BookingDataGetAll>()

  const startDate = router.query.start_date as string
  const endDate = router.query.end_date as string
  const filter = router.query.filter as string

  // Start Component
  const init = async () => {
    const token = await AuthUser.getIdToken().then((token) => token)

    if (token) {
      const businessBookingApi = new BusinessBookingApi(
        { token: token },
        router.query.business_id as string
      )
      const req: any = {
        page: page.toString(),
        pagesize: rowsPerPage.toString()
      }

      if (filter) {
        req.filter = filter

        if (startDate) {
          req.start_date = startDate
        }

        if (endDate) {
          req.end_date = endDate
        }
      }
      // req.start_date
      // req.end_date
      // req.filter

      businessBookingApi
        .getAll<BookingResponseGetAll>(req)
        .then((r) => {
          setItems(r.data)
        })
        .catch(() => {
          // [0] - dialog error
        })
    }
  }

  // Handle Table
  const createSortHandler =
    (property: keyof BookingData) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property)
    }

  // Handle Table
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof BookingData
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  // Handle Table
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  // Handle Table
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - (items ? items.data.length : 0))
      : 0

  // useEffect Zone
  useEffect(() => {
    if (AuthUser) init()
  }, [AuthUser])

  return (
    <>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {bookingHeadCells.map((headCell, k) => (
                  <TableCell
                    key={`${headCell.id}-cell-${k}`}
                    align={headCell.numeric ? 'right' : 'left'}
                    // padding={headCell.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === headCell.id ? order : false}>
                    {headCell.sort ? (
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}>
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <span>
                            {order === 'desc'
                              ? 'sorted descending'
                              : 'sorted ascending'}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    ) : (
                      headCell.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {items &&
                items.data &&
                stableSort<BookingDataGetAll>(
                  items.data,
                  getComparator(order, orderBy)
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, key) => {
                    return (
                      <TableRow
                        key={`table-row-join-register-${key}`}
                        className={classes.hideLastBorder}>
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <a
                            onClick={() => {
                              setSelect(row)
                              setOpenDialog(true)
                              // router.push({
                              //   pathname:
                              //     ROUTESPATH.BUSINESS.HOTEL.EXTRANET.MANAGE
                              //       .HOME,
                              //   query: { business_id: row.id }
                              // })
                            }}>
                            {new Date(row.create_at).toLocaleDateString('th', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </a>
                        </TableCell>
                        <TableCell>{row.fullname_th}</TableCell>

                        <TableCell>
                          <BookingTextMessage str={row.status} />
                          {/* {row.status === 'B' ? (
                            <label style={{ color: 'green' }}>
                              ยืนยันการจอง
                            </label>
                          ) : (
                            <label style={{ color: 'red' }}>
                              ปิด/ไม่รับจอง
                            </label>
                          )} */}
                        </TableCell>
                        <TableCell>{row.check_in}</TableCell>
                        <TableCell>{row.check_out}</TableCell>
                      </TableRow>
                    )
                  })}

              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 69 * emptyRows
                  }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={items ? items?.data.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <ReservationsDetail
        bookingData={select}
        open={openDialog}
        handleClose={() => {
          setOpenDialog(false)
        }}
      />
    </>
  )
}

export default DateViewReservations
