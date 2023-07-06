import {
  Divider,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer as MasterDrawer,
  Toolbar
} from '@mui/material'

import { DRAWERWIDTH } from '@app/config/layout'
import NAVIGATOR_SLIDE from '@app/config/navigator'
import React from 'react'
import WattanaTheme from '@app/config/theme'
import { makeStyles } from '@mui/styles'
import { useRouter } from 'next/router'
import { useSelector } from '@app/helpers/useSelector'
import { useSidebarActions } from '@app/redux-store/sideBarReducer'

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: DRAWERWIDTH,
    boxSizing: 'border-box',
    zIndex: WattanaTheme.zIndex.drawer - 1
  }
}))

const Drawer = () => {
  const classes = useStyles()
  const sidebarActions = useSidebarActions()
  const sidebar = useSelector((state) => state.sidebar)
  const route = useRouter()

  const handleDrawerToggle = () => {
    sidebarActions.toggle()
  }

  const handleClick = (action: string) => {
    route.push(action)
    sidebarActions.toggle()
  }

  return (
    <MasterDrawer
      // variant="temporary"
      variant="persistent"
      anchor="left"
      open={sidebar.isActive}
      onClose={handleDrawerToggle}
      classes={{
        root: classes.drawerPaper,
        paper: classes.drawerPaper
      }}
      ModalProps={{
        keepMounted: true // Better open performance on mobile.
      }}>
      <Toolbar />
      <div style={{ overflow: 'auto' }}>
        <div />
        <Divider />
        <List>
          {NAVIGATOR_SLIDE.GROUP.map((text, index) => (
            <ListItem
              button
              onClick={() => handleClick(text.action)}
              key={index}>
              <ListItemIcon>
                <Icon>{text.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {NAVIGATOR_SLIDE.EXTRANET.map((text, index) => (
            <ListItem
              button
              onClick={() => handleClick(text.action)}
              key={index}>
              <ListItemIcon>
                <Icon>{text.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItem>
          ))}
        </List>
      </div>
    </MasterDrawer>
  )
}

export default Drawer
