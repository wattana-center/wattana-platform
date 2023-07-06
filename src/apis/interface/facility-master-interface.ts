interface FacilityMasterResponseGetAll {
  page: number
  page_size: number
  data: Facility[]
  total_records: number
}

interface Facility {
  id: number
  name: string
  icon_type: string
  icon_name: string
}

export type { FacilityMasterResponseGetAll, Facility }
