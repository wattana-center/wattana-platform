import {
  Box,
  Button,
  Icon,
  LinearProgress,
  LinearProgressProps,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography
} from '@mui/material'
import {
  BusinessRegisterResponse,
  BusinessRegisterResponseGetAll
} from '@app/apis/interface/business-register-interface'
import { JoinBusinessData, joinBusinessHeadCells } from './utils'
import { Order, getComparator, stableSort } from '@app/utils/sort'
import React, { useEffect, useState } from 'react'

import BusinessRegisterApi from '@app/apis/business-register-api'
import ROUTESPATH from '@app/config/routes-path'
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

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  )
}

const ItemsBusinessPaddingRegister = () => {
  const classes = useStyles()
  const route = useRouter()
  const AuthUser = useAuthUser()

  const [items, setItems] = useState<BusinessRegisterResponseGetAll>()
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof JoinBusinessData>('name')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  // Start Component
  const init = async () => {
    const token = await AuthUser.getIdToken().then((token) => token)

    if (token) {
      const businessApi = new BusinessRegisterApi({ token: token })
      businessApi
        .getAll<BusinessRegisterResponseGetAll>({})
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
    (property: keyof JoinBusinessData) =>
    (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property)
    }

  // Handle Table
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof JoinBusinessData
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

  const handleOnClickRemove = async (id: number) => {
    const token = await AuthUser.getIdToken().then((token) => token)

    if (token) {
      const businessApi = new BusinessRegisterApi({ token: token })
      businessApi
        .delete<BusinessRegisterResponseGetAll>(`${id}`)
        .then(() => {
          init()
        })
        .catch(() => {
          // [0] - dialog error
        })
    }
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
                {joinBusinessHeadCells.map((headCell, k) => (
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
                stableSort<BusinessRegisterResponse>(
                  items.data,
                  getComparator(order, orderBy)
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, key) => {
                    const process =
                      row.data != null ? row.data?.complete_persent : 0

                    return (
                      <TableRow
                        key={`table-row-join-register-${key}`}
                        className={classes.hideLastBorder}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell>{row.data?.address}</TableCell>
                        <TableCell>
                          <LinearProgressWithLabel value={process} />
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={2}>
                            <Button
                              variant="outlined"
                              onClick={() =>
                                route.push(
                                  ROUTESPATH.BUSINESS.HOTEL.JOIN.CATEGORY.replace(
                                    '{id}',
                                    `${row.id}`
                                  )
                                )
                              }>
                              ลงทะเบียนต่อ
                            </Button>
                            <Button
                              onClick={() => handleOnClickRemove(row.id)}
                              startIcon={<Icon>delete</Icon>}>
                              ลบ
                            </Button>
                          </Stack>
                        </TableCell>
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
    </>
  )
}

export default ItemsBusinessPaddingRegister
