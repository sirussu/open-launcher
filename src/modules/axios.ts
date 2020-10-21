import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import humps from 'humps'
import isArrayBuffer from 'is-array-buffer'

Axios.defaults.adapter = global.require('axios/lib/adapters/http')

const config = {
  baseURL: process.env.VUE_APP_API_URL,
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
export const revertCamelCaseIntoSnakeCaseInterceptor = (
  config: AxiosRequestConfig
) => {
  if (config.data) {
    config.data = humps.decamelizeKeys(config.data)
  }

  return config
}

export const addAuthHeadersInterceptor = (config: AxiosRequestConfig) => {
  const tokens = localStorage.getItem('tokens')

  if (!tokens) return config

  config.headers = {
    ...config.headers,
    Authorization: tokens,
  }

  return config
}

axios.interceptors.response.use(camelizeKeysInterceptor)
axios.interceptors.request.use(revertCamelCaseIntoSnakeCaseInterceptor)
axios.interceptors.request.use(addAuthHeadersInterceptor)

export { axios }
