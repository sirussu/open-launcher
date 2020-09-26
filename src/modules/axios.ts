import Axios, { AxiosResponse } from 'axios'
import humps from 'humps'
import isArrayBuffer from 'is-array-buffer'

Axios.defaults.adapter = global.require('axios/lib/adapters/http')

const config = {
  baseURL: 'https://api.sirus.su/api',
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

axios.interceptors.response.use(camelizeKeysInterceptor)

export { axios }
