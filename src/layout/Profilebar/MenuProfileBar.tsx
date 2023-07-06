import { Dashboard, Widgets } from '@mui/icons-material'
import { IdTokenResult, getAuth } from 'firebase/auth'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import Menu, { MenuProps } from '@mui/material/Menu'
import React, { useEffect, useState } from 'react'

import { AuthUserContext } from 'next-firebase-auth'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import ROUTESPATH from '@app/config/routes-path'
import SendIcon from '@mui/icons-material/Send'
import WattanaTheme from '@app/config/theme'
import { useRouter } from 'next/router'
import { withStyles } from '@mui/styles'

const StyledMenu = withStyles(() => ({
  paper: {
    minWidth: 300,
    border: '1px solid #d3d4d5'
  }
}))((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))

const StyledMenuItem = withStyles(() => ({
  root: {
    '&:focus': {
      backgroundColor: WattanaTheme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: WattanaTheme.palette.common.white
      }
    }
  }
}))(MenuItem)

interface IMenuProfile {
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
  anchorEl: null | HTMLElement
  signOut: () => void
  AuthUser: AuthUserContext
}

const MenuProfileBar = (props: IMenuProfile) => {
  const auth = getAuth()
  const { setAnchorEl, anchorEl, AuthUser, signOut } = props

  const [resultToken, setResultToken] = useState<IdTokenResult | undefined>()

  const router = useRouter()
  const handleClose = () => {
    setAnchorEl(null)
  }

  const onhandleSignOut = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    AuthUser.firebaseUser?.getIdTokenResult().then((r) => {
      setResultToken(r)
    })
  }, [AuthUser])

  const IsAdmin = (): JSX.Element => {
    return resultToken &&
      resultToken?.claims &&
      (resultToken?.claims['is_admin'] as unknown as boolean) === true ? (
      <>
        <StyledMenuItem
        // onClick={() => {
        //   setAnchorEl(null)
        //   router.push(ROUTESPATH.HOME.INDEX)
        // }}
        >
          <ListItemIcon>
            <Dashboard fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="ข้อมูลผู้ใช้งาน" />
        </StyledMenuItem>
      </>
    ) : (
      <></>
    )
  }

  return (
    <div>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <StyledMenuItem
          onClick={() => {
            setAnchorEl(null)
            router.push(ROUTESPATH.PROFILE.INDEX)
          }}>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="ข้อมูลส่วนตัว" />
        </StyledMenuItem>
        {/* <StyledMenuItem>
          <ListItemIcon>
            <Widgets fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="จัดการบล็อก" />
        </StyledMenuItem> */}
        <IsAdmin />
        <StyledMenuItem onClick={onhandleSignOut}>
          <ListItemIcon>
            <InboxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="ออกจากระบบ"
            onClick={async () => {
              signOut()
            }}
          />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  )
}

export default MenuProfileBar
