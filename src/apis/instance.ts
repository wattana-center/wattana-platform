import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'

export interface CommonGetAll {
  page?: string
  pagesize?: string
  end_date?: string
  start_date?: string
  ids?: string
  filter?: string
}

export class CommonApi {
  public token?: string
  public apiName = ''
  async getAll<T>(query: CommonGetAll): Promise<AxiosResponse<T>> {
    const options: string[][] = []
    if (query.page && query.pagesize) {
      options.push(['page', query.page], ['pagesize', query.pagesize])
    }

    if (query.end_date) {
      options.push(['end_date', query.end_date])
    }

    if (query.start_date) {
      options.push(['start_date', query.start_date])
    }

    if (query.ids) {
      options.push(['ids', query.ids])
    }

    if (query.filter) {
      options.push(['filter', query.filter])
    }

    const params = new URLSearchParams(options)
    const result = this.instance().get<T>(this.apiName, {
      params: params
    })

    return result
  }

  async get<T>(id: string): Promise<AxiosResponse<T>> {
    const result = this.instance().get<T>(this.apiName + `/${id}`)

    return result
  }

  async delete<T>(id: string): Promise<AxiosResponse<T>> {
    const result = this.instance().delete<T>(this.apiName + `/${id}`)

    return result
  }

  instance(): AxiosInstance {
    const axiosApiInstance = axios.create()

    axiosApiInstance.interceptors.request.use(async (config) => {
      config.headers = {
        Authorization: `Bearer ` + this.token,
        'Content-Type': 'application/json'
      }
      config.timeout = 12000

      config.onUploadProgress = (progressEvent: any) => {
        const progress = (progressEvent.loaded / progressEvent.total) * 100
        window.PROGRESS = progress
      }

      config.onDownloadProgress = (progressEvent: any) => {
        const progress = (progressEvent.loaded / progressEvent.total) * 100
        if (progress === 100) {
          window.PROGRESS = 101
        }
      }

      return config
    })

    axiosApiInstance.interceptors.response.use(
      (response) => {
        return response
      },
      async (error: AxiosError) => {
        //redirect to login
        if (error.response?.status === 401) {
        }
        return Promise.reject(this.handleError(error))
      }
    )

    return axiosApiInstance
  }

  handleError = (error: AxiosError): ResponseType => {
    return {
      data: {
        code: error.response?.status,
        message: error.response?.data.message
      },
      code: error.response?.status,
      message: error.message
    }
  }
}

export type ResponseType<T = any> = {
  code: number | undefined
  message?: string
  data?: T
}
