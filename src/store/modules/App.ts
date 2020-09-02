import axios from '@/modules/axios'
import DownloadAlreadyInProgressError from '@/exceptions/DownloadAlreadyInProgressError'

const state = {
  files: [],
  filesToRemove: [],
  launcherFiles: [],
  availableLocales: [
    { key: 'en', lang: 'English' },
    { key: 'ru', lang: 'Русский' },
  ],
}

const mutations = {
  SET_FILES(state, files) {
    state.files = files
  },
  SET_FILES_TO_REMOVE(state, files) {
    state.filesToRemove = files
  },
  SET_LAUNCHER_FILES(state, files) {
    state.launcherFiles = files
  },
  SET_INCOMPLETE_DOWNLOAD(state, file) {
    file.isDownloading = false
    file.isIncomplete = true
  },
}

const actions = {
  async loadFiles({ commit, state }) {
    if (state.launcherFiles.find((f) => f.isDownloading)) {
      throw new DownloadAlreadyInProgressError(
        'Can`t update list due downloading already in progress'
      )
    }

    const { data } = await axios.get(
      'http://51.15.228.31:8080/api/client/patches'
    )
    commit('SET_FILES', data.patches)
    commit('SET_FILES_TO_REMOVE', data.delete)
  },
  async initialStart({ state, commit }) {
    state.launcherFiles.forEach((file) => {
      if (file.isDownloading) {
        commit('SET_INCOMPLETE_DOWNLOAD', file)
      }
    })
  },
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters,
}
