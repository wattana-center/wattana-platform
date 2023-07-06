import { BUSINESS_TAGS_API } from '@app/config/common'
import { CommonApi } from './instance'

type ICommonApi = {
  token?: string
}

class BusinessTagsApi extends CommonApi {
  constructor(config: ICommonApi, businessID: string) {
    super()
    this.token = config.token
    this.apiName = BUSINESS_TAGS_API.replace(':businessID', businessID)
  }
}

export default BusinessTagsApi
