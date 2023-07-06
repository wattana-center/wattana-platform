import {
  AppBar,
  Button,
  Container,
  Icon,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material'
import React, { useEffect } from 'react'
import { useAuthUser, withAuthUser } from 'next-firebase-auth'

import Link from 'next/link'
import Profilebar from './Profilebar'
import ROUTESPATH from '@app/config/routes-path'
import WattanaTheme from '@app/config/theme'
import { makeStyles } from '@mui/styles'
import { useRouter } from 'next/router'
import { useSidebarActions } from '@app/redux-store/sideBarReducer'

const drawerWidth = 240

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1
  },
  menuButton: {
    padding: 0,
    marginRight: WattanaTheme.spacing(2)
  },
  root: {
    display: 'flex'
  },
  appBar: {
    padding: 0,
    zIndex: WattanaTheme.zIndex.drawer,
    height: 68
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: WattanaTheme.zIndex.drawer
  },

  drawerContainer: {
    overflow: 'auto'
  },
  content: {
    flexGrow: 1,
    padding: WattanaTheme.spacing(3)
  },
  toolbar: {}
}))

const Appbar = () => {
  const AuthUser = useAuthUser()
  const classes = useStyles()
  const route = useRouter()
  const sidebarActions = useSidebarActions()
  const handleDrawerToggle = () => {
    sidebarActions.toggle()
  }

  useEffect(() => {
    AuthUser.getIdToken().then((token) => {
      if (token) localStorage.setItem('token', token)
    })
  }, [])

  return <>
    <AppBar position="fixed" className={classes.appBar} elevation={0}>
      <Container maxWidth="lg">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            size="large">
            <Icon>menu</Icon>
          </IconButton>
          <Link href={ROUTESPATH.HOME}>
            <Typography variant="h6" className={classes.title}>
              Hotelsolution
            </Typography>
          </Link>
          {AuthUser.email != null ? (
            <Profilebar />
          ) : (
            <Button
              color="inherit"
              onClick={() => {
                route.push(ROUTESPATH.AUTHEN.SING_IN)
              }}>
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  </>;
}

export default withAuthUser()(Appbar)
