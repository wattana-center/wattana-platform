import { BUSINESS_GROUP_API } from '@app/config/common'
import { CommonApi } from './instance'

type ICommonApi = {
  token?: string
}

class BusinessGroupApi extends CommonApi {
  constructor(config: ICommonApi) {
    super()
    this.token = config.token
    this.apiName = BUSINESS_GROUP_API
  }
}

export default BusinessGroupApi
