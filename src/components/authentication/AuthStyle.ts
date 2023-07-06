import WattanaTheme from '@app/config/theme'
import { makeStyles } from '@mui/styles'

const AuthStyle = makeStyles(() => ({
  root: {
    maxWidth: 500,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50
  },
  sub: {
    maxWidth: 500,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10
  },
  menuButton: {
    marginRight: WattanaTheme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

export default AuthStyle
