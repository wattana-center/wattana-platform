import { BUSINESS_MASTER_FACILITY } from '@app/config/common'
import { CommonApi } from './instance'

type ICommonApi = {
  token?: string
}

class FacilityMasterApi extends CommonApi {
  constructor(config: ICommonApi) {
    super()
    this.token = config.token
    this.apiName = BUSINESS_MASTER_FACILITY
  }
}

export default FacilityMasterApi
