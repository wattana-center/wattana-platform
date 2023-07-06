interface ImagesResponseGetAll {
  page: number
  page_size: number
  data: Images[]
  total_records: number
}

interface Images {
  id: number
  business_id: number
  size: string
  url: string
  src: string
  index: boolean
  facility: boolean
  tags?: ImagesTag[]
}

interface ImagesTag {
  id: number
  name: string
  business_id: number
}

interface ImagesResponseUpload {
  id: number
  business_id: number
  size: string
  url: string
  src: string
  index: boolean
  facility: boolean
  tags: Tag[]
}

interface Tag {
  id: number
  name: string
  business_id: number
}

interface ImagesResponseDelete {
  message: string
}

interface ImagesRequestUpdate {
  size?: string
  index: boolean
  facility: boolean
  tags?: {
    id: number
  }[]
}

export type {
  ImagesResponseGetAll,
  ImagesResponseUpload,
  ImagesResponseDelete,
  ImagesRequestUpdate,
  ImagesTag,
  Images
}
