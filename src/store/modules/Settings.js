import Files from '@/services/Files'

const state = {
  clientDirectory: null,
  startOnSystemStartup: false,
  ignoreFileHashCheck: false
}

const mutations = {
  SET_CLIENT_DIRECTORY (state, directory) {
    state.clientDirectory = directory
  },
  IGNORE_FILE_HASH_CHECK (state, ignore) {
    state.ignoreFileHashCheck = ignore
  },
  START_ON_SYSTEM_STARTUP (state, start) {
    state.startOnSystemStartup = start
  }
}

const actions = {
  async setClientDirectory ({ commit, state }, directory) {
    if (await Files.isCorrectClientDirectory(directory)) {
      commit('SET_CLIENT_DIRECTORY', directory)
      return true
    }

    return false
  }
}

export default {
  state,
  mutations,
  actions
}
