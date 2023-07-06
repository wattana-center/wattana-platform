import {
  BusinessRequest,
  BusinessResponseGet
} from './interface/business-interface'

import { AxiosResponse } from 'axios'
import { BUSINESS_API } from '@app/config/common'
import { CommonApi } from './instance'

type ICommonApi = {
  token?: string
}

class BusinessApi extends CommonApi {
  constructor(config: ICommonApi) {
    super()
    this.token = config.token
    this.apiName = BUSINESS_API
  }

  async update(
    data: BusinessResponseGet,
    id: string
  ): Promise<AxiosResponse<BusinessRequest>> {
    const req: BusinessRequest = {
      is_active: data.is_active,
      name: data.name,
      type: data.type,
      stars: data.stars,
      description: data.description,
      longitude: data.longitude,
      latitude: data.latitude,
      follow_summary: data.follow_summary,
      car_park: data.car_park,
      language: data.language,
      breakfast: data.breakfast,
      contact: data.contact,
      city: data.city,
      zipcode: data.zipcode,
      province: data.province,
      address: data.address,
      address_more: data.address_more,
      commission: data.commission,
      remark: data.remark
    }

    const axios = this.instance()
    const result = await axios.put<BusinessRequest>(
      this.apiName + `/${id}`,
      req
    )

    return result
  }
}

export default BusinessApi
