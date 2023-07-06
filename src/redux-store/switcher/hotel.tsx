import { Reducer } from 'redux'
import { useDispatch } from '@app/helpers/useSelector'

const SAVE_VISITOR = 'SWITCHER/HOTEL/SAVE'
const UPDATE_VISITOR = 'SWITCHER/HOTEL/UPDATE'

const initialState = {
  data: [],
  currentHotel: 0,
  update: false,
  isError: false
}

export type SwitcherHotelType = {
  data: any[]
  currentHotel?: number
  update: boolean
  isError: boolean
}

// Reducer
const SwitcherHotelReducer: Reducer<SwitcherHotelType> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SAVE_VISITOR:
      return {
        ...state,
        data: action.payload
      }
    case UPDATE_VISITOR:
      return {
        ...state,
        data: action.payload,
        update: true
      }
    default:
      return state
  }
}

const SwitcherHotelActions = {
  save: (data: SwitcherHotelType, currentStep = 0) => ({
    type: SAVE_VISITOR,
    payload: data,
    currentStep: currentStep
  }),
  update: (data: SwitcherHotelType) => ({
    type: UPDATE_VISITOR,
    payload: data
  })
}

export const useSwitcherHotelActions = () => {
  const dispatch = useDispatch()
  return {
    showAPILoading: (data: SwitcherHotelType) =>
      dispatch(SwitcherHotelActions.save(data)),
    hideLoading: (data: SwitcherHotelType) =>
      dispatch(SwitcherHotelActions.update(data))
  }
}

export default SwitcherHotelReducer
