import {
  ServicesRequestUpdate,
  ServicesResponseGet
} from './interface/business-services-interface'

import { AxiosResponse } from 'axios'
import { BUSINESS_SERVICE_API } from '@app/config/common'
import { CommonApi } from './instance'

type ICommonApi = {
  token?: string
}

class BusinessServiceApi extends CommonApi {
  constructor(config: ICommonApi, businessID: string) {
    super()
    this.token = config.token
    this.apiName = BUSINESS_SERVICE_API.replace(':businessID', businessID)
  }

  async insert(
    request: ServicesRequestUpdate
  ): Promise<AxiosResponse<ServicesResponseGet>> {
    const result = this.instance().post<ServicesResponseGet>(
      this.apiName,
      request
    )
    return result
  }

  async update(
    request: ServicesRequestUpdate,
    id: string
  ): Promise<AxiosResponse<ServicesResponseGet>> {
    const result = this.instance().put<ServicesResponseGet>(
      this.apiName + `/${id}`,
      request
    )
    return result
  }
}

export default BusinessServiceApi
