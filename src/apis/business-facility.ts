import { FacilityData, FacilityRequest } from './interface/business-facility'

import { AxiosResponse } from 'axios'
import { BUSINESS_FACILITY_API } from '@app/config/common'
import { CommonApi } from './instance'

type ICommonApi = {
  token?: string
}

class BusinessFacilityApi extends CommonApi {
  constructor(config: ICommonApi, businessID: string) {
    super()
    this.token = config.token
    this.apiName = BUSINESS_FACILITY_API.replace(':businessID', businessID)
  }

  async save(data: FacilityRequest): Promise<AxiosResponse<FacilityData>> {
    const axios = this.instance()
    const result = await axios.post<FacilityData>(this.apiName, data)

    return result
  }
}

export default BusinessFacilityApi
