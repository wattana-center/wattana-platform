import { BUSINESS_NEARBY_API } from '@app/config/common'
import { CommonApi } from './instance'

type ICommonApi = {
  token?: string
}

class BusinessNearbyApi extends CommonApi {
  constructor(config: ICommonApi, businessID: string) {
    super()
    this.token = config.token
    this.apiName = BUSINESS_NEARBY_API.replace(':businessID', businessID)
  }
}

export default BusinessNearbyApi
