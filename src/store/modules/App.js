import axios from '@/modules/axios'
axios.defaults.adatper = require('axios/lib/adapters/http')

const state = {
  files: [],
  filesToRemove: []
}

const mutations = {
  SET_FILES (state, files) {
    state.files = files
  },
  SET_FILES_TO_REMOVE (state, files) {
    state.filesToRemove = files
  }
}

const actions = {
  async loadFiles ({ commit }) {
    const { data } = await axios.get('http://51.15.228.31:8080/api/client/patches')
    commit('SET_FILES', data.patches)
    commit('SET_FILES_TO_REMOVE', data.delete)
  }
}

export default {
  state,
  mutations,
  actions
}
