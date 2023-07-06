import { Action, Reducer } from 'redux'

import { UserInfo } from '@firebase/auth'
import firebase from 'firebase/app'
import { useDispatch } from '@app/helpers/useSelector'

const initialState: IUsersState = {
  displayName: null,
  email: null,
  phoneNumber: null,
  photoURL: null,
  providerId: '',
  uid: ''
}

export type IUsersState = UserInfo

export enum UsersActionType {
  UPDATE_USERS = 'PROFILE_UPDATE_USERS',
  RESET_USERS = 'PROFILE_RESET_USERS'
}

export const usersReducer: Reducer<IUsersState> = (
  state = initialState,
  action
): IUsersState => {
  switch (action.type) {
    case UsersActionType.UPDATE_USERS:
      return Object.assign({}, state, action.payload)
    case UsersActionType.RESET_USERS:
      return initialState
    default:
      return state
  }
}

export interface UsersDispatchAction extends Action<UsersActionType> {
  payload: IUsersState | undefined
}

export class UsersDispatcher {
  private readonly dispatch = useDispatch()

  update = (value: IUsersState) => {
    return this.dispatch({ type: UsersActionType.UPDATE_USERS, payload: value })
  }

  reset = () => {
    return this.dispatch({
      type: UsersActionType.RESET_USERS,
      payload: undefined
    })
  }
}
