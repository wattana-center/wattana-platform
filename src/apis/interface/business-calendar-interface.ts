interface CalendarResponseGetAll {
  page: number
  page_size: number
  data: CalendarData[]
  total_records: number
}

interface CalendarData {
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
  rate_plan: Rateplan[]
  availabilities: Availability[]
}

interface Availability {
  date: string
  max_available_rooms: number
  booked_rooms: number
  is_active: boolean
  business_services_id: number
}

interface Rateplan {
  id: number
  name: string
  code: string
  price_type: string
  price_difference: number
  business_services_id: number
  rate: Rate[]
}

interface Rate {
  date: string
  cost: number
  rate_plan_id: number
}

interface Servicetype {
  name: string
}

interface Bed {
  type: string
  number: number
}

export type { CalendarResponseGetAll, CalendarData }
