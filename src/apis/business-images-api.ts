import {
  ImagesRequestUpdate,
  ImagesResponseDelete,
  ImagesResponseUpload
} from './interface/business-images-interface'

import { AxiosResponse } from 'axios'
import { BUSINESS_IMAGES_API } from '@app/config/common'
import { CommonApi } from './instance'

type ICommonApi = {
  token?: string
}
export type UploadImageApi = {
  file: File
  business_id: string
  size: string
  type: string
  index: boolean
}

class BusinessImagesApi extends CommonApi {
  constructor(config: ICommonApi, businessID: string) {
    super()
    this.token = config.token
    this.apiName = BUSINESS_IMAGES_API.replace(':businessID', businessID)
  }

  async upload(
    request: ImagesRequestUpdate,
    id: number
  ): Promise<AxiosResponse<ImagesResponseUpload>> {
    const result = this.instance().put<ImagesResponseUpload>(
      this.apiName + `/${id}`,
      request
    )
    return result
  }

  async uploadImage(
    request: UploadImageApi
  ): Promise<AxiosResponse<ImagesResponseUpload>> {
    const formData = new FormData()

    formData.append('file', request.file)
    formData.append('business_id', request.business_id)
    formData.append('size', request.size)
    formData.append('type', request.type)
    formData.append('index', `${request.index}`)

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    const result = this.instance().post<ImagesResponseUpload>(
      this.apiName,
      formData,
      config
    )
    return result
  }

  async deleteImage(
    imageId: number
  ): Promise<AxiosResponse<ImagesResponseDelete>> {
    const result = this.instance().delete<ImagesResponseDelete>(
      this.apiName + `/${imageId}`
    )
    return result
  }
}

export default BusinessImagesApi
