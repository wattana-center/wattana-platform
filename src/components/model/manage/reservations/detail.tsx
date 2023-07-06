import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography
} from '@mui/material'

import { BookingDataGetAll } from '@app/apis/interface/business-booking'
import React from 'react'

type ReservationsDetailProps = {
  open: boolean
  handleClose: () => void
  bookingData?: BookingDataGetAll
}

const GridL: React.FC = ({ children }) => {
  return (
    <Grid item xs={12} sm={4} md={2} textAlign="right">
      {children}
    </Grid>
  )
}

const GridR: React.FC = ({ children }) => {
  return (
    <Grid item xs={12} sm>
      {children}
    </Grid>
  )
}

const spacingRow = 1

const ReservationsDetail: React.FC<ReservationsDetailProps> = ({
  open,
  handleClose,
  bookingData
}) => {
  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>#{bookingData?.reference}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            รายละเอียดการจองของคุณ {bookingData?.fullname_th}
          </DialogContentText>
          <Grid container direction="column" spacing={1} sx={{ mt: 1 }}>
            {/* [1]status */}
            <Grid item container spacing={spacingRow}>
              <GridL>
                <Typography>สถานะ</Typography>
              </GridL>
              <GridR>
                <Typography>{bookingData?.status}</Typography>
              </GridR>
            </Grid>
            {/* [2]payment_status */}
            <Grid item container spacing={spacingRow}>
              <GridL>
                <Typography>สถานะการจ่ายเงิน</Typography>
              </GridL>
              <GridR>
                <Typography>{bookingData?.payment_status}</Typography>
              </GridR>
            </Grid>
            {/* [3]reference */}
            <Grid item container spacing={spacingRow}>
              <GridL>
                <Typography>เลขอ้างอิง</Typography>
              </GridL>
              <GridR>
                <Typography>{bookingData?.reference}</Typography>
              </GridR>
            </Grid>

            {/* [4]check_in */}
            <Grid item container spacing={spacingRow}>
              <GridL>
                <Typography>วันที่เข้าพัก</Typography>
              </GridL>
              <GridR>
                <Typography>{bookingData?.check_in}</Typography>
              </GridR>
            </Grid>

            {/* [5]check_out */}
            <Grid item container spacing={spacingRow}>
              <GridL>
                <Typography>วันที่ออก</Typography>
              </GridL>
              <GridR>
                <Typography>{bookingData?.check_out}</Typography>
              </GridR>
            </Grid>

            {/* [6]total_net_cost */}
            <Grid item container spacing={spacingRow}>
              <GridL>
                <Typography>ราคาสิทธิ</Typography>
              </GridL>
              <GridR>
                <Typography>{bookingData?.total_net_cost}</Typography>
              </GridR>
            </Grid>

            {/* [7]commission_amount */}
            <Grid item container spacing={spacingRow}>
              <GridL>
                <Typography>คอมมิชชั่น</Typography>
              </GridL>
              <GridR>
                <Typography>{bookingData?.commission_amount}</Typography>
              </GridR>
            </Grid>

            {/* [8]commission_rate */}
            <Grid item container spacing={spacingRow}>
              <GridL>
                <Typography>คอมมิชชั่น %</Typography>
              </GridL>
              <GridR>
                <Typography>{bookingData?.commission_rate}</Typography>
              </GridR>
            </Grid>

            {/* [9]fullname_th */}
            <Grid item container spacing={spacingRow}>
              <GridL>
                <Typography>ชื่อ</Typography>
              </GridL>
              <GridR>
                <Typography>{bookingData?.fullname_th}</Typography>
              </GridR>
            </Grid>

            {/* [10]fullname_en */}
            <Grid item container spacing={spacingRow}>
              <GridL>
                <Typography>name</Typography>
              </GridL>
              <GridR>
                <Typography>{bookingData?.fullname_en}</Typography>
              </GridR>
            </Grid>

            {/* [11]holder_email */}
            <Grid item container spacing={spacingRow}>
              <GridL>
                <Typography>อีเมลติดต่อ</Typography>
              </GridL>
              <GridR>
                <Typography>{bookingData?.holder_email}</Typography>
              </GridR>
            </Grid>

            {/* [12]holder_telphone */}
            <Grid item container spacing={spacingRow}>
              <GridL>
                <Typography>เบอร์ติดต่อ</Typography>
              </GridL>
              <GridR>
                <Typography>{bookingData?.holder_telphone}</Typography>
              </GridR>
            </Grid>

            {/* [13]create_at */}
            <Grid item container spacing={spacingRow}>
              <GridL>
                <Typography>วันที่สร้าง</Typography>
              </GridL>
              <GridR>
                <Typography>
                  {bookingData?.create_at
                    ? new Date(bookingData?.create_at).toLocaleString()
                    : ''}
                </Typography>
              </GridR>
            </Grid>

            {/* [14]updated_at */}
            <Grid item container spacing={spacingRow}>
              <GridL>
                <Typography>วันที่แก้ไขล่าสุด</Typography>
              </GridL>
              <GridR>
                <Typography>
                  {bookingData?.updated_at
                    ? new Date(bookingData?.updated_at).toLocaleString()
                    : ''}
                </Typography>
              </GridR>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ReservationsDetail
