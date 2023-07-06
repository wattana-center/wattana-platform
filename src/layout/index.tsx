import Appbar from './Appbar'
import { DRAWERWIDTH } from '@app/config/layout'
import Drawer from './Drawer'
import WattanaTheme from '@app/config/theme'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'
import { useSelector } from '@app/helpers/useSelector'

const useStyles = makeStyles(() => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh)',
    transition: WattanaTheme.transitions.create('margin', {
      easing: WattanaTheme.transitions.easing.sharp,
      duration: WattanaTheme.transitions.duration.leavingScreen
    }),
    marginLeft: 0
  },
  contentShift: {
    transition: WattanaTheme.transitions.create('margin', {
      easing: WattanaTheme.transitions.easing.easeOut,
      duration: WattanaTheme.transitions.duration.enteringScreen
    }),
    marginLeft: DRAWERWIDTH
  }
}))

const Layout: React.FC = ({ children }) => {
  const classes = useStyles()

  const sidebar = useSelector((state) => state.sidebar)

  return (
    <>
      <Appbar />
      <Drawer />
      <main
        // style={{ msFlex: 1, flex: 1, WebkitFlex: 1 }}
        className={clsx(classes.content, {
          [classes.contentShift]: sidebar.isActive
        })}>
        {children}
      </main>
    </>
  )
}

export default Layout
