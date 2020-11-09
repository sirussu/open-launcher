import { MutationTree, ActionTree, ActionContext, GetterTree } from 'vuex'

import { isCorrectClientDirectory } from '@/utils/files'
import { modulesFactory } from '@/utils/modulesFactory'
import { Langs } from '@/types/lang'
import { i18n as i18nModule } from '@/modules/i18n'

import { IRootState } from '../types'

export interface ISettingsState {
  clientDirectory: string | null
  startOnSystemStartup: boolean
  ignoreFileHashCheck: boolean
  locale: Langs
}

const state: ISettingsState = {
  clientDirectory: null,
  startOnSystemStartup: false,
  ignoreFileHashCheck: false,
  locale: Langs.RU,
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
  SET_LOCALE(state, locale: Langs) {
    state.locale = locale
  },
}

export interface ISettingsActions
  extends ActionTree<ISettingsState, IRootState> {
  setClientDirectory: (
    ctx: ActionContext<ISettingsState, IRootState>,
    directory: string
  ) => Promise<void>
  setLocale: (
    ctx: ActionContext<ISettingsState, IRootState>,
    lang: Langs
  ) => void
}

const actions: ISettingsActions = {
  async setClientDirectory({ commit }, directory: string) {
    if (await isCorrectClientDirectory(directory)) {
      commit('SET_CLIENT_DIRECTORY', directory)
    }
  },
  setLocale({ commit }, lang: Langs) {
    commit('SET_LOCALE', lang)
    i18nModule.locale = lang
  },
}

export interface ISettingsGetters
  extends GetterTree<ISettingsState, IRootState> {
  clientDirectory: (state: ISettingsState) => string | null
  locale: (state: ISettingsState) => Langs
}

const getters: ISettingsGetters = {
  clientDirectory: (state) => state.clientDirectory,
  locale: (state) => state.locale,
}

export const settingsModule = modulesFactory<ISettingsState, IRootState>({
  state,
  mutations,
  actions,
  getters,
})
