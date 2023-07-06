import { BUSINESS_BOOKING_API } from '@app/config/common'
import { CommonApi } from './instance'

type ICommonApi = {
  token?: string
}

class BusinessBookingApi extends CommonApi {
  constructor(config: ICommonApi, businessID: string) {
    super()
    this.token = config.token
    this.apiName = BUSINESS_BOOKING_API.replace(':businessID', businessID)
  }
}

export default BusinessBookingApi
