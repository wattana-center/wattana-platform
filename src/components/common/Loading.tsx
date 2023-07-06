import { Backdrop, CircularProgress } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from '@app/helpers/useSelector'

import { LoadingDispatcher } from '@app/redux-store/loading'

type Loading = {
  open?: boolean
}

const Loading: React.FC<Loading> = (props) => {
  const { open } = useSelector((s) => s.loading)
  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(LoadingDispatcher.close())
  }

  useEffect(() => {
    if (props.open === true) dispatch(LoadingDispatcher.open())
    else if (props.open === false) dispatch(LoadingDispatcher.close())
  }, [props])

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

const useLoading = () => {
  const dispatch = useDispatch()
  return {
    close: () => {
      dispatch(LoadingDispatcher.close())
    },
    open: () => {
      dispatch(LoadingDispatcher.open())
    }
  }
}

export { Loading, useLoading }
