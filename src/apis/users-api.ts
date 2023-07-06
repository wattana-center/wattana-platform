import { RegisterUsersReq, RegisterUsersRes } from './interface/users.interface'

import { AxiosResponse } from 'axios'
import { BUSINESS_USERS_API } from '@app/config/common'
import { CommonApi } from './instance'

type ICommonApi = {
  token?: string
}

class UsersApi extends CommonApi {
  constructor(config: ICommonApi) {
    super()
    this.token = config.token
    this.apiName = BUSINESS_USERS_API
  }

  async register(
    data: RegisterUsersReq
  ): Promise<AxiosResponse<RegisterUsersRes>> {
    const axios = this.instance()
    const result = await axios.post<RegisterUsersRes>(this.apiName, data)

    return result
  }

  async confirmEmail(
    token: string
  ): Promise<AxiosResponse<{ message: string }>> {
    const axios = this.instance()
    const result = await axios.put<{ message: string }>(
      this.apiName + '/confirm',
      {
        token: token
      }
    )

    return result
  }
}

export default UsersApi
