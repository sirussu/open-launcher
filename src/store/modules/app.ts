import { MutationTree, ActionTree, GetterTree, Module } from 'vuex'
import { axios } from '@/modules/axios'

import { IRootState } from '../types'

enum DownloadErrors {
  ALREADY_IN_PROGRESS = 'ALREADY_IN_PROGRESS',
}

export interface IAppState {
  files?: Array<{ isDownloading: boolean }> // TODO: make normal type
  filesToRemove: Array<{ isDownloading: boolean }>
  launcherFiles: Array<{ isDownloading: boolean }>
  availableLocales: Array<{ key: 'ru' | 'en'; lang: string }>
  errors: DownloadErrors | null
}

const state: IAppState = {
  files: [],
  filesToRemove: [],
  launcherFiles: [],
  availableLocales: [
    { key: 'en', lang: 'English' },
    { key: 'ru', lang: 'Русский' },
  ],
  errors: null,
}

const mutations: MutationTree<IAppState> = {
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
  SET_ERROR(state, error) {
    state.errors = error
  },
}

const actions: ActionTree<IAppState, IRootState> = {
  async loadFiles({ commit, state }) {
    if (state.launcherFiles.find((f) => f.isDownloading)) {
      commit('SET_ERROR', DownloadErrors.ALREADY_IN_PROGRESS)
      return
    }

    const { data } = await axios.get('client/patches')
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

const getters: GetterTree<IAppState, IRootState> = {}

export const appModule: Module<IAppState, IRootState> = {
  state,
  mutations,
  actions,
  getters,
}
