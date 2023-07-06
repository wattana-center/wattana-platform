import { AppDispatch, RootState } from '@app/redux-store'
import {
  TypedUseSelectorHook,
  useDispatch as useDispatchSelector,
  useSelector as useReduxSelector
} from 'react-redux'

const useDispatch = () => useDispatchSelector<AppDispatch>()
const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
export { useSelector, useDispatch }
