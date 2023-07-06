interface GroupGetAllRes {
  page: number
  page_size: number
  data: Datum[]
  total_records: number
}

interface Datum {
  id: number
  uid: string
  owner: string
  name?: any
  create_at: string
  updated_at: string
  deleted_at?: any
}

export type { GroupGetAllRes }
