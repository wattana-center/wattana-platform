import {
  Avatar,
  Button,
  Grid,
  Theme,
  Typography,
  createStyles
} from '@mui/material'
import { useAuthUser, withAuthUser } from 'next-firebase-auth'

import Link from 'next/link'
import { LockOpenOutlined } from '@mui/icons-material'
import MenuProfileBar from './MenuProfileBar'
import ROUTESPATH from '@app/config/routes-path'
import React from 'react'
import WattanaTheme from '@app/config/theme'
import { makeStyles } from '@mui/styles'
import { useRouter } from 'next/router'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    flexGrow: 1
  },
  facebook: {
    color: '#2185D0'
  },
  margin: {
    margin: WattanaTheme.spacing(0.5, 0, 0, 0)
  },
  signOutButton: {
    color: '#fff',
    height: 72
    // marginLeft: theme.spacing(1)
  },
  large: {
    width: WattanaTheme.spacing(5),
    height: WattanaTheme.spacing(5)
  },
  text: {
    color: '#fff',
    margin: 0
  }
}))

const Profilebar = () => {
  const AuthUser = useAuthUser()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const classes = useStyles()

  const route = useRouter()

  // const [userInfo, setUserInfo] = React.useState<IUserInfo | null>(null)

  // React.useEffect(() => {
  //   if (profile) {
  //     setUserInfo({
  //       displayName: profile?.displayName as string,
  //       photoURL: profile?.photoURL as string,
  //       email: profile?.email as string
  //     })

  //     if (!profile?.emailVerified) {
  //       if (
  //         route.pathname !== ROUTESPATH.AUTHEN.CONFIRM_EMAIL &&
  //         route.pathname !== ROUTESPATH.AUTHEN.SIGN_UP &&
  //         route.pathname !== ROUTESPATH.AUTHEN.SING_IN
  //       ) {
  //         useSweetAlert2.fire({
  //           title: 'โปรดยืนยันอีเมล',
  //           text:
  //             'ท่านยังไม่ได้ยืนยันอีเมล กรุณายืนยันอีเมลตามที่อยู่อีเมลที่ได้สมัครไว้!',
  //           icon: 'warning',
  //           confirmButtonColor: '#3085d6',
  //           cancelButtonColor: '#d33',
  //           confirmButtonText: 'Yes!'
  //         }).then(() => {
  //           route.push(ROUTESPATH.AUTHEN.CONFIRM_EMAIL)
  //         })
  //       }
  //     }
  //   } else {
  //     setUserInfo(null)
  //   }
  // }, [profile])

  if (AuthUser.firebaseUser == null) {
    return (
      <>
        <Link href={ROUTESPATH.AUTHEN.SING_IN}>
          <Button
            className={classes.signOutButton}
            startIcon={<LockOpenOutlined />}>
            ลงชื่อเข้าใช้งาน
          </Button>
        </Link>
      </>
    )
  }

  const { displayName, photoURL, email } = AuthUser.firebaseUser

  return (
    <>
      <MenuProfileBar
        signOut={AuthUser.signOut}
        AuthUser={AuthUser}
        setAnchorEl={setAnchorEl}
        anchorEl={anchorEl}
      />
      <Button onClick={handleClick}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs>
            <Avatar
              alt={displayName ? displayName : ''}
              src={photoURL ? photoURL : ''}
              className={classes.large}
            />
          </Grid>
          <Grid container item xs alignItems="flex-end" direction="column">
            <Grid item>
              <Typography className={classes.text}>{displayName}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" className={classes.text}>
                {email}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Button>
    </>
  )
}

export default withAuthUser()(Profilebar)
