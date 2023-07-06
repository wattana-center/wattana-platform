interface RegisterUsersReq {
  primary_email: string
  password: string
  display_name: string
  phone_number: string
}

interface RegisterUsersRes {
  id: number
  uid: string
  primary_email: string
  display_name: string
  custom_claims?: any
  provider_data?: any
  metadata?: any
  email_verified: boolean
  disabled: boolean
  phone_number: string
  photo_url?: any
  create_at: string
  updated_at: string
  deleted_at?: any
}

export type { RegisterUsersReq, RegisterUsersRes }
