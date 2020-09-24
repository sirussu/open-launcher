import Axios from 'axios'
Axios.defaults.adapter = global.require('axios/lib/adapters/http')

const config = {
  baseURL: 'https://api.sirus.su/api',
}

export const axios = Axios.create(config)
