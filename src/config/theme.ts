import { grey, red } from '@mui/material/colors'

import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const BaseTheme = createTheme({
  palette: {
    primary: {
      light: '#334e72',
      main: '#00224f',
      dark: '#001737',
      contrastText: '#fff'
    },
    secondary: {
      light: '#6fbf73',
      main: '#4caf50',
      dark: '#357a38',
      contrastText: '#000'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#fff'
    },
    warning: {
      main: '#FBB451'
    }
  },
  typography: {
    fontFamily: 'Kanit, Arial, Helvetica, sans-serif'
  },
  components: {}
})

const WattanaTheme = createTheme({
  ...BaseTheme,
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderBottom: `2px solid ${BaseTheme.palette.primary.main}`,
          width: '100%',
          [BaseTheme.breakpoints.up('md')]: {
            width: 'auto'
          }
        }
      }
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          borderRadius: BaseTheme.spacing(2)
        }
      }
    },
    MuiPaper: {
      variants: [],
      defaultProps: {
        sx: {
          // backgroundColor: grey[50]
        }
      }
    },
    MuiSelect: {
      defaultProps: {
        sx: {
          backgroundColor: grey[50]
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        sx: {
          '& .MuiInputBase-root': {
            backgroundColor: grey[50]
          }
        }
      },
      styleOverrides: {
        root: {
          '&.MuiInputBase-root': {
            backgroundColor: grey[50]
          }
          // backgroundColor: grey[50],
          // borderRadius: BaseTheme.spacing(1)
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          // backgroundColor: grey[50]
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: BaseTheme.spacing(3, 0)
        }
      }
    }
  }
})

export default WattanaTheme
