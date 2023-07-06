import {
  Divider,
  InputBase,
  InputBaseProps,
  Paper,
  Typography
} from '@mui/material'

import React from 'react'
import theme from '@app/config/theme'

interface GroupTextFieldProps extends InputBaseProps {
  leftText: string
}

const GroupTextField: React.FC<GroupTextFieldProps> = (props) => {
  const { leftText } = props

  const getInputProps = () => {
    const input = Object.create(props)
    delete input.leftText
  }

  // Object.keys(input).forEach(function (key) {
  //   if (input[key] === 'leftText') {
  //     delete input[key]
  //   }
  // })
  // delete input['leftText']
  return (
    <Paper
      variant="outlined"
      square
      component="form"
      sx={{
        p: theme.spacing(1, 2),
        display: 'flex',
        alignItems: 'center'
      }}>
      <Typography>{leftText}</Typography>
      <Divider
        sx={{ height: 28, m: 0.5, ml: 2, mr: 1 }}
        orientation="vertical"
      />
      <InputBase {...getInputProps()} sx={{ ml: 1, flex: 1 }} />
    </Paper>
  )
}

export default GroupTextField
