import { MutationTree, ActionTree } from 'vuex'

import { isCorrectClientDirectory } from '@/utils/files'
import { modulesFactory } from '@/utils/modulesFactory'

import { IRootState } from '../types'

export interface ISettingsState {
  clientDirectory: string | null
  startOnSystemStartup: boolean
  ignoreFileHashCheck: boolean
  locale: 'ru' | 'en'
}

const state: ISettingsState = {
  clientDirectory: null,
  startOnSystemStartup: false,
  ignoreFileHashCheck: false,
  locale: 'ru',
}

const mutations: MutationTree<ISettingsState> = {
  SET_CLIENT_DIRECTORY(state, directory) {
    state.clientDirectory = directory
  },
  IGNORE_FILE_HASH_CHECK(state, ignore) {
    state.ignoreFileHashCheck = ignore
  },
  START_ON_SYSTEM_STARTUP(state, start) {
    state.startOnSystemStartup = start
  },
  SET_LOCALE(state, locale) {
    state.locale = locale
  },
}

const actions: ActionTree<ISettingsState, IRootState> = {
  async setClientDirectory({ commit }, directory: string) {
    if (await isCorrectClientDirectory(directory)) {
      commit('SET_CLIENT_DIRECTORY', directory)
    }
  },
}

export const settingsModule = modulesFactory<ISettingsState, IRootState>({
  state,
  mutations,
  actions,
})
