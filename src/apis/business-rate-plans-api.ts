import { BUSINESS_RATE_PLANS_API } from '@app/config/common'
import { CommonApi } from './instance'

type ICommonApi = {
  token?: string
}

class BusinessRatePlansApi extends CommonApi {
  constructor(config: ICommonApi, serverID: string, businessID: string) {
    super()
    this.token = config.token
    this.apiName = BUSINESS_RATE_PLANS_API.replace(
      ':businessID',
      businessID
    ).replace(':serverID', serverID)
  }
}

export default BusinessRatePlansApi
