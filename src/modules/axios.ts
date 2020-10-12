import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import humps from 'humps'
import isArrayBuffer from 'is-array-buffer'

Axios.defaults.adapter = global.require('axios/lib/adapters/http')

const config = {
  baseURL: 'https://api.sirus.su/api',
  headers: {
    'User-Agent': `sirus-launcher`, // TODO: add version
  },
}

const axios = Axios.create(config)

/**
 * Converts object keys to camelCase
 */
export const camelizeKeysInterceptor = (response: AxiosResponse) => {
  if (response.data && !isArrayBuffer(response.data)) {
    return humps.camelizeKeys(response.data)
  }

  return response
}

/**
 * Converts object keys from camelCase to snake_case
 */
export const revertCamelCaseIntoSnakeCaseInterceptor = (config: AxiosRequestConfig) => {
  if(config.data) {
    config.data = humps.decamelizeKeys(config.data)
  }

  return config
}


export const addAuthHeadersInterceptor = (config: AxiosRequestConfig) => {
  if (localStorage.tokens) {
    const { tokenType, accessToken }: { tokenType: string, accessToken: string } = JSON.parse(<string>localStorage.getItem('tokens'))

    config.headers = {
      ...config.headers,
      'Authorization': `${tokenType} ${accessToken}`,
    }
  }

  return config
}

axios.interceptors.response.use(camelizeKeysInterceptor)
axios.interceptors.request.use(revertCamelCaseIntoSnakeCaseInterceptor)
axios.interceptors.request.use(addAuthHeadersInterceptor)

export { axios }
