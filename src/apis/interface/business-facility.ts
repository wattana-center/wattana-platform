interface FacilityResponseGetAll {
  page: number
  page_size: number
  data: FacilityData[]
  total_records: number
}

interface FacilityData {
  type: number
  detail: Detail
}

interface Detail {
  id: number
  name: string
  icon_type: string
  icon_name: string
}

interface FacilityRequest {
  type: number
  business_id: number
  facility_id: number
}

export type { FacilityResponseGetAll, FacilityData, FacilityRequest }
