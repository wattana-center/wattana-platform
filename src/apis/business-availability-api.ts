import { BUSINESS_AVAILABILITY_API } from '@app/config/common'
import { CommonApi } from './instance'

type ICommonApi = {
  token?: string
}

class BusinessAvailabilityApi extends CommonApi {
  constructor(config: ICommonApi, businessID: string, serverID: string) {
    super()
    this.token = config.token
    this.apiName = BUSINESS_AVAILABILITY_API.replace(
      ':businessID',
      businessID
    ).replace(':serverID', serverID)
  }
}

export default BusinessAvailabilityApi
