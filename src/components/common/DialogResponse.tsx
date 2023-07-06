import { Alert, Dialog, Typography } from '@mui/material'
import { useDispatch, useSelector } from '@app/helpers/useSelector'

import { DialogDispatcher } from '@app/redux-store/dialog'
import React from 'react'

const DialogResponse: React.FC = () => {
  const dialog = useSelector((s) => s.dialog)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(
      dispatch(
        DialogDispatcher.update({
          ...dialog,
          open: false
        })
      )
    )
  }

  return (
    <Dialog onClose={handleClose} open={dialog.open}>
      <Alert severity={dialog.type}>
        <Typography variant="body1">{dialog.message}</Typography>
      </Alert>
    </Dialog>
  )
}

const useDialog = () => {
  const dialog = useSelector((s) => s.dialog)
  const dispatch = useDispatch()

  return {
    close: () => {
      dispatch(
        DialogDispatcher.update({
          ...dialog,
          open: false
        })
      )
    },
    open: (
      message: string,
      type?: 'error' | 'info' | 'success' | 'warning'
    ) => {
      let t = type
      if (t == null) {
        t = 'error'
      }
      dispatch(
        DialogDispatcher.update({
          ...dialog,
          open: true,
          message: message,
          type: t
        })
      )
    }
  }
}

export { DialogResponse, useDialog }
