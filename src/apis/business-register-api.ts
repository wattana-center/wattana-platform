import {
  BusinessRegisterRequest,
  BusinessRegisterResponse,
  RegisterData
} from './interface/business-register-interface'

import { AxiosResponse } from 'axios'
import { BUSINESS_REGISTER } from '@app/config/common'
import { CommonApi } from './instance'
import { ImagesResponseDelete } from './interface/business-images-interface'

type ICommonApi = {
  token?: string
}

export type UploadImageRegisterApi = {
  file: File
  register_id: string
  size: string
  type: string
}

export interface ImagesRegisterResponseUpload {
  id: string
  size: string
  src: string
  type: string
  local: string
}

class BusinessRegisterApi extends CommonApi {
  constructor(config: ICommonApi) {
    super()
    this.token = config.token
    this.apiName = BUSINESS_REGISTER
  }

  async save(
    data: BusinessRegisterRequest
  ): Promise<AxiosResponse<BusinessRegisterResponse>> {
    const axios = this.instance()
    const result = await axios.post<BusinessRegisterResponse>(
      this.apiName,
      data
    )

    return result
  }

  async update(
    busunessRegister: RegisterData,
    id: string
  ): Promise<AxiosResponse<BusinessRegisterResponse>> {
    const data = {
      name: busunessRegister.name,
      data: {
        business_type: busunessRegister.business_type,
        name: busunessRegister.name,
        address: busunessRegister.address,
        address_more: busunessRegister.address_more,
        province: busunessRegister.province,
        zipcode: busunessRegister.zipcode,
        city: busunessRegister.city,
        rooms: busunessRegister.rooms,
        stars: busunessRegister.stars,
        description: busunessRegister.description,
        complete_persent: busunessRegister.complete_persent,
        longitude: busunessRegister.longitude,
        latitude: busunessRegister.latitude,
        contact: {
          name: busunessRegister.contact.name,
          chain: busunessRegister.contact.chain,
          phone_number: busunessRegister.contact.phone_number,
          phone_number_more: busunessRegister.contact.phone_number_more
        },
        facility: busunessRegister.facility,
        images: busunessRegister.images,
        policies: busunessRegister.policies,
        settings: busunessRegister.settings
      }
    }

    const axios = this.instance()
    const result = await axios.put<BusinessRegisterResponse>(
      this.apiName + `/${id}`,
      data
    )

    return result
  }

  async finish(
    busunessRegister: RegisterData,
    id: string
  ): Promise<AxiosResponse<BusinessRegisterResponse>> {
    const data = {
      name: busunessRegister.name,
      data: {
        business_type: busunessRegister.business_type,
        name: busunessRegister.name,
        address: busunessRegister.address,
        address_more: busunessRegister.address_more,
        province: busunessRegister.province,
        zipcode: busunessRegister.zipcode,
        city: busunessRegister.city,
        rooms: busunessRegister.rooms,
        stars: busunessRegister.stars,
        description: busunessRegister.description,
        complete_persent: 100,
        longitude: busunessRegister.longitude,
        latitude: busunessRegister.latitude,
        contact: {
          name: busunessRegister.contact.name,
          chain: busunessRegister.contact.chain,
          phone_number: busunessRegister.contact.phone_number,
          phone_number_more: busunessRegister.contact.phone_number_more
        },
        facility: busunessRegister.facility,
        images: busunessRegister.images,
        policies: busunessRegister.policies,
        settings: busunessRegister.settings
      }
    }

    const axios = this.instance()
    const result = await axios.put<BusinessRegisterResponse>(
      this.apiName + `/${id}/finish`,
      data
    )

    return result
  }

  async uploadImage(
    request: UploadImageRegisterApi
  ): Promise<AxiosResponse<ImagesRegisterResponseUpload>> {
    const formData = new FormData()

    formData.append('file', request.file)
    formData.append('register_id', request.register_id)
    formData.append('size', request.size)
    formData.append('type', request.type)

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    const result = this.instance().post<ImagesRegisterResponseUpload>(
      this.apiName + `/image`,
      formData,
      config
    )
    return result
  }

  async deleteImage(
    registerId: string,
    imageId: string
  ): Promise<AxiosResponse<ImagesResponseDelete>> {
    const result = this.instance().delete<ImagesResponseDelete>(
      this.apiName + `/${registerId}/image/${imageId}`
    )
    return result
  }
}

export default BusinessRegisterApi
