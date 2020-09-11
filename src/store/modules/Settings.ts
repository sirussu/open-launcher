import { MutationTree, ActionTree, Module } from 'vuex'

import Files from '@/services/Files'

import { RootState } from '../types'

export interface SettingsState {
  clientDirectory: string | null
  startOnSystemStartup: boolean
  ignoreFileHashCheck: boolean
  locale: 'ru' | 'en'
}

const state: SettingsState = {
  clientDirectory: null,
  startOnSystemStartup: false,
  ignoreFileHashCheck: false,
  locale: 'ru',
}

const mutations: MutationTree<SettingsState> = {
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

const actions: ActionTree<SettingsState, RootState> = {
  async setClientDirectory({ commit }, directory: string) {
    if (await Files.isCorrectClientDirectory(directory)) {
      commit('SET_CLIENT_DIRECTORY', directory)
      return true
    }

    return false
  },
}

export const settingsModule: Module<SettingsState, RootState> = {
  state,
  mutations,
  actions,
}
