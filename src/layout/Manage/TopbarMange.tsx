import { Button, Container, Grid, Menu, MenuItem } from '@mui/material'
import { makeStyles, withStyles } from '@mui/styles'

import ROUTESPATH from '@app/config/routes-path'
import React from 'react'
import WattanaTheme from '@app/config/theme'
import { useRouter } from 'next/router'

const useStyles = makeStyles(() => ({
  popoverPaper: {
    width: 400
    // height: '100%',
    // maxHeight: 'unset',
    // maxWidth: 200
  }
}))

const BootstrapButton = withStyles({
  root: {
    color: '#fff',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '12px 16px',
    lineHeight: 1.5,
    border: `2px solid ${WattanaTheme.palette.primary.main}`,
    borderRadius: 0,
    // backgroundColor: '#0063cc',
    // borderColor: '#0063cc',

    '&:hover': {
      backgroundColor: 'rgba(255,255,255,.2)',
      borderBottom: '2px solid rgba(255,255,255,.8)',
      boxShadow: 'none'
    },
    '&:active': {
      borderBottom: '2px solid #fff'
    },
    '&:focus': {
      // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)'
      backgroundColor: 'rgba(255,255,255,.2)',
      borderBottom: '2px solid rgba(255,255,255,.8)',
      boxShadow: 'none'
    }
  }
})(Button)

const TopbarMange = () => {
  const classes = useStyles()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [anchorElAvailability, setAnchorElAvailability] =
    React.useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)
  const openAvailability = Boolean(anchorElAvailability)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClickAvailability = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElAvailability(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleCloseAvailability = () => {
    setAnchorElAvailability(null)
  }

  const handleAction = ({ url, query }: { url: string; query: any }) => {
    setAnchorEl(null)
    // setanchorElAvailability(null)
    router.push({
      pathname: url,
      query: query
    })
  }

  return (
    <>
      <div
        style={{
          width: '100%',
          backgroundColor: WattanaTheme.palette.primary.main
        }}>
        <Container maxWidth="lg">
          <Grid container>
            <Grid item>
              <BootstrapButton
                onClick={() =>
                  handleAction({
                    url: ROUTESPATH.BUSINESS.HOTEL.EXTRANET.MANAGE.HOME,
                    query: { business_id: router.query.business_id }
                  })
                }>
                หน้าหลัก
              </BootstrapButton>
            </Grid>
            <Grid item>
              <BootstrapButton onClick={handleClickAvailability}>
                ราคาและจำนวนห้องที่เปิดให้จอง
              </BootstrapButton>
            </Grid>
            <Grid item>
              <BootstrapButton
                onClick={() =>
                  handleAction({
                    url: ROUTESPATH.BUSINESS.HOTEL.EXTRANET.MANAGE.RESERVATIONS
                      .SEARCH_RESERVATIONS,
                    query: { business_id: router.query.business_id }
                  })
                }>
                การจอง
              </BootstrapButton>
            </Grid>
            <Grid item>
              <BootstrapButton onClick={handleClick}>ที่พัก</BootstrapButton>
            </Grid>
            <Grid item>
              <BootstrapButton
                onClick={() =>
                  handleAction({
                    url: ROUTESPATH.BUSINESS.HOTEL.EXTRANET.MANAGE.PROPERTY
                      .SETTINGS.MESSAGING,
                    query: { business_id: router.query.business_id }
                  })
                }>
                กล่องข้อความ
              </BootstrapButton>
            </Grid>
            <Grid item>
              <BootstrapButton
                onClick={() =>
                  handleAction({
                    url: ROUTESPATH.BUSINESS.HOTEL.EXTRANET.MANAGE.PROPERTY
                      .SETTINGS.TRANSACTION,
                    query: { business_id: router.query.business_id }
                  })
                }>
                การเงิน
              </BootstrapButton>
            </Grid>
          </Grid>
        </Container>

        <Menu
          id="basic-business"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-business'
          }}>
          <MenuItem
            onClick={() =>
              handleAction({
                url: ROUTESPATH.BUSINESS.HOTEL.EXTRANET.MANAGE.PROPERTY
                  .CONTENT_SCORE,
                query: { business_id: router.query.business_id }
              })
            }>
            ภาพร่วม
          </MenuItem>
          <MenuItem
            onClick={() =>
              handleAction({
                url: ROUTESPATH.BUSINESS.HOTEL.EXTRANET.MANAGE.PROPERTY
                  .GENERAL_INFO,
                query: { business_id: router.query.business_id }
              })
            }>
            ข้อมูลทั่วไป
          </MenuItem>
          <MenuItem
            onClick={() =>
              handleAction({
                url: ROUTESPATH.BUSINESS.HOTEL.EXTRANET.MANAGE.PROPERTY.PHOTOS,
                query: { business_id: router.query.business_id }
              })
            }>
            ภาพถ่าย
          </MenuItem>
          <MenuItem
            onClick={() =>
              handleAction({
                url: ROUTESPATH.BUSINESS.HOTEL.EXTRANET.MANAGE.PROPERTY
                  .POLICIES,
                query: { business_id: router.query.business_id }
              })
            }>
            นโยบาย
          </MenuItem>
          <MenuItem
            onClick={() =>
              handleAction({
                url: ROUTESPATH.BUSINESS.HOTEL.EXTRANET.MANAGE.PROPERTY
                  .FACILITIES,
                query: { business_id: router.query.business_id }
              })
            }>
            สิ่งอำนวยความสะดวกและบริการ
          </MenuItem>
          <MenuItem
            onClick={() =>
              handleAction({
                url: ROUTESPATH.BUSINESS.HOTEL.EXTRANET.MANAGE.PROPERTY.ROOMS,
                query: { business_id: router.query.business_id }
              })
            }>
            ห้องพัก
          </MenuItem>
          <MenuItem
            onClick={() =>
              handleAction({
                url: ROUTESPATH.BUSINESS.HOTEL.EXTRANET.MANAGE.PROPERTY
                  .TRANSPORTATION,
                query: { business_id: router.query.business_id }
              })
            }>
            ตำแหน่งที่พักของท่าน
          </MenuItem>
          <MenuItem
            onClick={() =>
              handleAction({
                url: ROUTESPATH.BUSINESS.HOTEL.EXTRANET.MANAGE.PROPERTY
                  .SURROUNDINGS,
                query: { business_id: router.query.business_id }
              })
            }>
            สถานที่ใกล้เคียง
          </MenuItem>
        </Menu>

        <Menu
          PopoverClasses={{
            paper: classes.popoverPaper
          }}
          id="basic-business-availability"
          anchorEl={anchorElAvailability}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={openAvailability}
          onClose={handleCloseAvailability}
          MenuListProps={{
            'aria-labelledby': 'basic-business-availability'
          }}>
          <MenuItem
            sx={{ root: { minHeight: 200 } }}
            onClick={() =>
              handleAction({
                url: ROUTESPATH.BUSINESS.HOTEL.EXTRANET.MANAGE
                  .RATES_AVAILABILITY.CALENDAR,
                query: { business_id: router.query.business_id }
              })
            }>
            ปฏิทิน
          </MenuItem>
        </Menu>
      </div>
    </>
  )
}

export default TopbarMange
