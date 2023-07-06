interface TagsResponseGetAll {
  page: number
  page_size: number
  data: Tag[]
  total_records: number
}

interface Tag {
  id: number
  name: string
  business_id: number
}

export type { TagsResponseGetAll, Tag }
