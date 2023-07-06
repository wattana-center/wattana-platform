import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'

import { businessRegisterReducer } from './businessRegister'
import { dialogReducer } from './dialog'
import { loadingReducer } from './loading'
import { sideBarReducer } from './sideBarReducer'
import { usersReducer } from './users/users'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    busunessRegister: businessRegisterReducer,
    sidebar: sideBarReducer,
    loading: loadingReducer,
    dialog: dialogReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
