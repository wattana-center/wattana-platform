import { Reducer } from 'redux'

export type DialogState = {
  open: boolean
  message: string
  type: 'error' | 'info' | 'success' | 'warning'
}

const initialState: DialogState = {
  open: false,
  message: '',
  type: 'error'
}

export enum DialogAction {
  UPDATE_DIALOG_CODE = 'UPDATE_DIALOG_CODE'
}

export const dialogReducer: Reducer<DialogState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case DialogAction.UPDATE_DIALOG_CODE:
      return {
        ...state,
        ...action.payload.data
      }
    default:
      return {
        ...state
      }
  }
}

export const DialogDispatcher = {
  update: (data: DialogState) => ({
    type: DialogAction.UPDATE_DIALOG_CODE,
    payload: { data: data }
  })
}
