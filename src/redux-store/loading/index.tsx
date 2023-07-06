import { Reducer } from 'redux'

const initialState: LoadingState = {
  open: false
}

export type LoadingState = {
  open: boolean
}

export enum LoadingActionType {
  UPDATE = 'LOADING/UPDATE',
  RESET = 'LOADING/RESET'
}

export const loadingReducer: Reducer<LoadingState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LoadingActionType.UPDATE:
      return Object.assign({}, state, action.payload)
    case LoadingActionType.RESET:
      return initialState
    default:
      return state
  }
}

export const LoadingDispatcher = {
  close: () => ({
    type: LoadingActionType.UPDATE,
    payload: {
      open: false
    }
  }),
  open: () => ({
    type: LoadingActionType.UPDATE,
    payload: {
      open: true
    }
  })
}
