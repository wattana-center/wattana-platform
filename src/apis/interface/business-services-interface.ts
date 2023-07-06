interface ServicesResponseGetAll {
  page: number
  page_size: number
  data: ServiceData[]
  total_records: number
}

interface ServiceData {
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
  beds: ServiceBed[]
  service_type: Servicetype
  tags: ServiceTag[]
  images: ServiceImage[]
}

interface ServiceImage {
  id: number
  business_id: number
  size: string
  url: string
  src: string
  index: boolean
}

interface ServiceTag {
  id: number
  name: string
  business_id: number
}

interface Servicetype {
  name: string
}

interface ServiceBed {
  type: string
  number: number
}

interface ServicesResponseGet {
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
  beds: ServiceBed[]
  service_type: Servicetype
  tags: ServiceTag[]
  images: ServiceImage[]
}

interface ServicesRequestUpdate {
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
  beds: ServiceBed[]
  service_type: Servicetype
}

export type {
  ServicesResponseGetAll,
  ServicesResponseGet,
  ServicesRequestUpdate,
  ServiceData
}
