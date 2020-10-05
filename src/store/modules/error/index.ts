import {
  MutationTree,
  Module,
} from 'vuex'

import { IRootState } from '../../types'
import { IErrorActions, IErrorGetters, IErrorState } from '@/store/modules/error/types'

const state: IErrorState = {
  error: {
    status: 0,
    statusText: '',
  }
}

const getters: IErrorGetters = {
  error: state => state.error,
}

const mutations: MutationTree<IErrorState> = {
  SET_ERROR(state, err) {
    state.error.status = err.status
    state.error.statusText = err.statusText
  },
}

const actions: IErrorActions = {
  setError({ commit }, err) {
    err === null ? commit('SET_ERROR', { status: 0, statusText: '' }) : commit('SET_ERROR', err)
  },
}

export const errorModule: Module<IErrorState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
