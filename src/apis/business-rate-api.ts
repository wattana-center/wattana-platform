import { BUSINESS_RATE_API } from '@app/config/common'
import { CommonApi } from './instance'

type ICommonApi = {
  token?: string
}

class BusinessRateApi extends CommonApi {
  constructor(
    config: ICommonApi,
    businessID: string,
    serverID: string,
    ratePlanID: string
  ) {
    super()
    this.token = config.token
    this.apiName = BUSINESS_RATE_API.replace(':businessID', businessID)
      .replace(':serverID', serverID)
      .replace(':ratePlanID', ratePlanID)
  }
}

export default BusinessRateApi
