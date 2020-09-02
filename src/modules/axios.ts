import axios from 'axios'
axios.defaults.adapter = global.require('axios/lib/adapters/http')

export default axios.create()
