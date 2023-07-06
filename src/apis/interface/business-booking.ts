interface BookingResponseGetAll {
  page: number
  page_size: number
  data: BookingDataGetAll[]
  total_records: number
}

interface BookingDataGetAll {
  id: number
  status: string
  payment_status: string
  reference: string
  check_in: string
  check_out: string
  total_net_cost: number
  commission_amount: number
  commission_rate: number
  fullname_th: string
  fullname_en: string
  holder_email: string
  holder_telphone: string
  create_at: string
  updated_at: string
  deleted_at?: any
  business_id: number
}

export type { BookingResponseGetAll, BookingDataGetAll }
