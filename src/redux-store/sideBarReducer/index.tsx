import { Reducer } from 'redux'
import { useDispatch } from '@app/helpers/useSelector'

const initialState: SidebarState = {
  isActive: false
}

export type SidebarState = { isActive: boolean }

export enum SideBarAction {
  SHOW_SIDEBAR = 'SYSTEMS/SHOW_SIDEBAR',
  HIDE_SIDEBAR = 'SYSTEMS/HIDE_SIDEBAR',
  TOGGLE_SIDEBAR = 'SYSTEMS/TOGGLE_SIDEBAR'
}

export const sideBarReducer: Reducer<SidebarState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SideBarAction.TOGGLE_SIDEBAR:
      return {
        isActive: !state.isActive
      }
    case SideBarAction.SHOW_SIDEBAR:
      return {
        isActive: true
      }
    case SideBarAction.HIDE_SIDEBAR:
      return {
        isActive: false
      }
    default:
      return state
  }
}

export const useSidebarActions = () => {
  const dispatch = useDispatch()
  return {
    toggle: () => dispatch(SidebarActions.toggle()),
    show: () => dispatch(SidebarActions.show()),
    hide: () => dispatch(SidebarActions.hide())
  }
}

export const SidebarActions = {
  toggle: () => ({
    type: SideBarAction.TOGGLE_SIDEBAR
  }),
  show: () => ({
    type: SideBarAction.SHOW_SIDEBAR
  }),
  hide: () => ({
    type: SideBarAction.HIDE_SIDEBAR
  })
}
