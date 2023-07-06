import { BUSINESS_CALENDAR_API } from '@app/config/common'
import { CommonApi } from './instance'

type ICommonApi = {
  token?: string
}

class BusinessCalendarApi extends CommonApi {
  constructor(config: ICommonApi, businessID: string) {
    super()
    this.token = config.token
    this.apiName = BUSINESS_CALENDAR_API.replace(':businessID', businessID)
  }
}

export default BusinessCalendarApi
