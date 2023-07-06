interface BusinessResponseGetAll {
  page: number
  page_size: number
  data: BusinessDataGetAll[]
  total_records: number
}

interface BusinessDataGetAll {
  id: number
  is_active: boolean
  name: string
  type: string
  stars: number
  description: string
  longitude: number
  latitude: number
  follow_summary: number
  car_park: number
  language?: string[]
  breakfast: number
  contact?: Contact
  city: string
  zipcode: string
  province: string
  address: string
  address_more: string
  create_at: string
  updated_at: string
  deleted_at?: any
}

interface Contact {
  name: string
  chain: boolean
  phone_number: string
  phone_number_more: string
}

interface BusinessResponseGet {
  id: number
  is_active: boolean
  name: string
  type: string
  stars: number
  description: string
  longitude: number
  latitude: number
  follow_summary: number
  car_park: number
  language: string[]
  breakfast: number
  contact: Contact
  city: string
  zipcode: string
  province: string
  address: string
  address_more: string
  create_at: string
  updated_at: string
  deleted_at?: any
  service: Service[]
  facility: Facility[]
  images: Image[]
  commission: number
  remark?: string
}

interface Facility {
  id: number
  type: number
  detail: Detail
}

interface Detail {
  id: number
  name: string
  icon_type: string
  icon_name: string
}

interface Service {
  id: number
  business_id: number
  service_type_id: number
  booking_online: boolean
  name: string
  max_pax: number
  max_adults: number
  max_children: number
  stays: number
  smoking: string
  type: string
  size: number
  number: number
  default_cost: number
  discount: number
  discount_min_stays: number
  beds: Bed[]
  service_type: Servicetype
  tags: Tag[]
}

interface Tag {
  id: number
  name: string
  business_id: number
  image: Image[]
}

interface Image {
  id: number
  business_id: number
  size: string
  url: string
  src: string
  index: boolean
}

interface Servicetype {
  id: number
  name: string
  create_at: string
  updated_at: string
  deleted_at?: any
}

interface Bed {
  type: string
  number: number
}

interface Contact {
  name: string
  chain: boolean
  phone_number: string
  phone_number_more: string
}

interface BusinessRequest {
  is_active: boolean
  name: string
  type: string
  stars: number
  description: string
  longitude: number
  latitude: number
  follow_summary: number
  car_park: number
  language: string[]
  breakfast: number
  contact: Contact
  city: string
  zipcode: string
  province: string
  address: string
  address_more: string
  commission: number
  remark?: string
}

interface Contact {
  name: string
  chain: boolean
  phone_number: string
  phone_number_more: string
}

export type {
  BusinessResponseGetAll,
  BusinessDataGetAll,
  BusinessResponseGet,
  BusinessRequest
}
