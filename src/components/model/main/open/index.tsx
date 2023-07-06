import { BusinessData, businessHeadCells } from './utils'
import {
  BusinessDataGetAll,
  BusinessResponseGetAll
} from '@app/apis/interface/business-interface'
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

import BusinessApi from '@app/apis/business-api'
import ROUTESPATH from '@app/config/routes-path'
import WattanaTheme from '@app/config/theme'
import { makeStyles } from '@mui/styles'
import { useAuthUser } from 'next-firebase-auth'
import { useRouter } from 'next/router'

// import { useRouter } from 'next/router'

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

const ItemsBusiness = () => {
  const classes = useStyles()
  const router = useRouter()
  const AuthUser = useAuthUser()

  const [items, setItems] = useState<BusinessResponseGetAll>()
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof BusinessData>('name')
  const [page, setPage] = React.useState(0)
  const [total, setTotal] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  // Start Component
  const init = async () => {
    const token = await AuthUser.getIdToken().then((token) => token)

    if (token) {
      const businessApi = new BusinessApi({ token: token })
      businessApi
        .getAll<BusinessResponseGetAll>({
          page: `${page + 1}`,
          pagesize: `${rowsPerPage}`
        })
        .then((r) => {
          setTotal(r.data.total_records)
          setItems(r.data)
        })
        .catch(() => {
          // [0] - dialog error
        })
    }
  }

  // Handle Table
  const createSortHandler =
    (property: keyof BusinessData) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property)
    }

  // Handle Table
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof BusinessData
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - (items ? total : 0)) : 0

  // useEffect Zone
  useEffect(() => {
    if (AuthUser) init()
  }, [AuthUser])

  useEffect(() => {
    init()
  }, [page, rowsPerPage])

  return (
    <>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-label="simple table"
            style={{ minHeight: 69 * rowsPerPage }}>
            <TableHead>
              <TableRow>
                {businessHeadCells.map((headCell, k) => (
                  <TableCell
                    key={`${headCell.id}-cell-${k}`}
                    align={headCell.numeric ? 'right' : 'left'}
                    style={{ width: `${headCell.maxWidth}%` }}
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
                stableSort<BusinessDataGetAll>(
                  items.data,
                  getComparator(order, orderBy)
                )
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                              router.push({
                                pathname:
                                  ROUTESPATH.BUSINESS.HOTEL.EXTRANET.MANAGE
                                    .HOME,
                                query: { business_id: row.id }
                              })
                            }}>
                            {row.name}
                          </a>
                        </TableCell>
                        <TableCell>
                          {row.address} {row.city}
                        </TableCell>

                        <TableCell>
                          {row.is_active ? (
                            <label style={{ color: 'green' }}>
                              เปิด/รับจอง
                            </label>
                          ) : (
                            <label style={{ color: 'red' }}>
                              ปิด/ไม่รับจอง
                            </label>
                          )}
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    )
                  })}

              {emptyRows > 0 ? (
                <TableRow
                  style={{
                    height: 69 * emptyRows
                  }}>
                  <TableCell colSpan={6} />
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  )
}

export default ItemsBusiness
