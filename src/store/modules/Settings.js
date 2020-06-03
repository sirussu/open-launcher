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
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
