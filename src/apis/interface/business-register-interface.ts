interface BusinessRegisterRequest {
  name?: string
  owner?: string
  email?: string
  data?: RegisterData
  group?: number
}

interface ImagesData {
  id: string
  src: string
  size: string
  type: string
  local: string
}

interface RegisterData {
  business_type: string
  name: string
  address: string
  address_more: string
  province: string
  zipcode: string
  city: string
  stars: number
  description: string
  longitude: number
  latitude: number
  rooms: RegisterRoomData[]
  complete_persent: number
  contact: {
    name: string
    phone_number: string
    phone_number_more: string
    chain: boolean
  }
  facility: {
    car_park: number
    breakfast: number
    language: string[]
    facilites: string[]
  }
  images: ImagesData[]
  policies: Policies
  settings: Settings
}

interface Settings {
  invoice_recipient: string
  invoice_address: string
  cc_acceptance: boolean
  cc_id: string[]
  is_active: boolean
}

interface Policies {
  checkin_start: string
  checkin_end: string
  checkout_start: string
  checkout_end: string
  always_require_booker_address: boolean
  always_require_booker_contact_number: boolean
  has_age_restriction: boolean
  age_restriction_min: number
  age_restriction_max: number

  has_curfew: boolean //เวลาเข้าออกที่พัก
  curfew_start: string
  curfew_end: string

  smoking_allowed: boolean
  parties_allowed: boolean
  quiet_hours: boolean
  pets_allowed: boolean
  damage_deposit: {
    deposit: boolean
    cost: number
  }
  cancel: {
    free_cancel: boolean
    interval: string
    cancelation: string
  }
  cxl_mod: {
    cxl: boolean
    is_opt_in: string
  }
}

interface RegisterRoomData {
  id: string
  name: string
  type: string
  smoking: string
  number: number
  beds: BedData[]
  stays: number
  size: number
  default_cost: number
  discount: number
  discount_min_stays: number
}

interface BedData {
  type: string
  number: number
}

interface BusinessRegisterResponse {
  id: number
  name: string
  owner: string
  email: string
  data: RegisterData
  create_by: string
  create_at: string
  updated_at: string
  deleted_at?: any
}

interface BusinessRegisterResponseGetAll {
  page: number
  page_size: number
  data: BusinessRegisterResponse[]
  total_records: number
}

export type {
  RegisterRoomData,
  RegisterData,
  BusinessRegisterRequest,
  BusinessRegisterResponse,
  BusinessRegisterResponseGetAll,
  ImagesData,
  BedData,
  Policies,
  Settings
}
