import { Reducer } from 'redux'
import { RegisterData } from '@app/apis/interface/business-register-interface'

export const InitialBusinessRegister: BusinessRegisterState = {
  data: {
    business_type: '',
    name: '',
    address: '',
    address_more: '',
    province: '',
    city: '',
    zipcode: '',
    stars: 0,
    description: '',
    longitude: 0,
    latitude: 0,
    rooms: [],
    complete_persent: 0,
    contact: {
      name: '',
      phone_number: '',
      phone_number_more: '',
      chain: false
    },
    facility: {
      car_park: 0,
      breakfast: 0,
      language: ['Thai'],
      facilites: []
    },
    images: [],
    policies: {
      checkin_start: '00:00',
      checkin_end: '23:59',
      checkout_start: '00:00',
      checkout_end: '23:59',
      always_require_booker_address: false,
      always_require_booker_contact_number: false,
      has_age_restriction: false,
      age_restriction_min: 0,
      age_restriction_max: 0,

      has_curfew: true, //เวลาเข้าออกที่พัก
      curfew_start: '00:00',
      curfew_end: '23:59',

      smoking_allowed: false,
      parties_allowed: false,
      quiet_hours: false,
      pets_allowed: false,
      damage_deposit: {
        deposit: false,
        cost: 0
      },
      cancel: {
        free_cancel: false,
        interval: '',
        cancelation: ''
      },
      cxl_mod: {
        cxl: false,
        is_opt_in: ''
      }
    },
    settings: {
      invoice_recipient: '',
      invoice_address: '',
      cc_acceptance: false,
      cc_id: [],
      is_active: true
    }
  }
}

export type BusinessRegisterState = {
  data: RegisterData
}

export enum BusinessRegisterActionType {
  SET = 'BUSINESS/REGISTER/SET',
  UPDATE = 'BUSINESS/REGISTER/UPDATE',
  RESET = 'BUSINESS/REGISTER/RESET',
  SELECTOR = 'BUSINESS/REGISTER/SELECTOR'
}

type Action =
  | { type: BusinessRegisterActionType.SET; payload: BusinessRegisterState }
  | { type: BusinessRegisterActionType.UPDATE; payload: BusinessRegisterState }
  | { type: BusinessRegisterActionType.RESET }
  | {
      type: BusinessRegisterActionType.SELECTOR
      payload: BusinessRegisterState
    }

export const businessRegisterReducer: Reducer<BusinessRegisterState> = (
  state = InitialBusinessRegister,
  action: Action
) => {
  switch (action.type) {
    case BusinessRegisterActionType.SET:
      return Object.assign({}, state, action.payload)
    case BusinessRegisterActionType.UPDATE:
      return Object.assign({}, state, action.payload)
    case BusinessRegisterActionType.RESET:
      return Object.assign({}, state, InitialBusinessRegister)

    default:
      return state
  }
}

export const JoinActions = {
  update: (data: RegisterData) => ({
    type: BusinessRegisterActionType.UPDATE,
    payload: {
      data: data
    }
  }),
  set: (data: RegisterData) => ({
    type: BusinessRegisterActionType.SET,
    payload: {
      data: data
    }
  })
}
