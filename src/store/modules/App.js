import axios from '@/modules/axios'
axios.defaults.adatper = require('axios/lib/adapters/http')

const state = {
  files: []
}

const mutations = {
  SET_FILES (state, files) {
    state.files = files
  }
}

const actions = {
  async loadFiles ({ commit }) {
    const { data } = await axios.get('http://51.15.228.31:8080/api/client/patches')
    commit('SET_FILES', data.patches)
  }
}

export default {
  state,
  mutations,
  actions
}
