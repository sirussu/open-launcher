import Axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import humps from 'humps'
import isArrayBuffer from 'is-array-buffer'

const config = {
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'User-Agent': `sirus-launcher`, // TODO: add version
  },
  adapter: global.require('axios/lib/adapters/http'),
}

const axios = Axios.create(config)

/**
 * Converts object keys to camelCase
 */
const camelizeKeysInterceptor = (response: AxiosResponse) => {
  if (response.data && !isArrayBuffer(response.data)) {
    return humps.camelizeKeys(response.data)
  }

  return response
}

/**
 * Converts object keys from camelCase to snake_case
 */
const revertCamelCaseIntoSnakeCaseInterceptor = (
  config: AxiosRequestConfig
) => {
  if (config.data) {
    config.data = humps.decamelizeKeys(config.data)
  }

  return config
}

const addAuthHeadersInterceptor = (config: AxiosRequestConfig) => {
  const tokens = localStorage.getItem('tokens')

  if (!tokens) return config

  config.headers = {
    ...config.headers,
    Authorization: tokens,
  }

  return config
}

const responseLogger = (response: AxiosResponse) => {
  const {
    config: { url, method },
    status,
    statusText,
    data,
    headers,
  } = response

  console.group(
    `%cResponse: [${method?.toUpperCase()}] ${url}`,
    'font-size:13px;'
  )

  if (headers) {
    console.log(`Headers:`)
    console.dir(headers)
  }
  status && console.log(`Status: ${status} ${statusText}`)
  if (data) {
    console.log('Data:')
    console.dir(data)
  }

  console.groupEnd()

  return response
}

const requestLogger = (config: AxiosRequestConfig) => {
  const { url, method, data, headers } = config

  console.group(
    `%cRequest: [${method?.toUpperCase()}] ${url}`,
    'font-size:13px;'
  )

  if (headers) {
    console.log(`Headers:`)
    console.dir(headers)
  }

  if (typeof data === 'object') {
    console.log(`Response:`)
    console.dir(data)
  } else {
    console.log(`Response: ${data}`)
  }

  console.groupEnd()

  return config
}

const errorLogger = (error: AxiosError) => {
  const {
    config: { method, url },
    response,
  } = error

  console.group(
    `%cError: [${method?.toUpperCase()}] ${url}`,
    'color: red; font-size:13px;'
  )

  if (typeof response === 'object') {
    console.log(`Response:`)
    console.dir(response)
  } else {
    console.log(`Response: ${response}`)
  }

  console.groupEnd()

  return Promise.reject(error)
}

axios.interceptors.response.use(responseLogger, errorLogger)
axios.interceptors.response.use(camelizeKeysInterceptor)

axios.interceptors.request.use(requestLogger, errorLogger)
axios.interceptors.request.use(revertCamelCaseIntoSnakeCaseInterceptor)
axios.interceptors.request.use(addAuthHeadersInterceptor)

export { axios }
