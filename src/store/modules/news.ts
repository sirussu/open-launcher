import { MutationTree, ActionTree, GetterTree, Module } from 'vuex'

import { IRootState } from '../types'

import { axios } from '@/modules/axios'
import { RequestStatus } from '@/types/nerwork'

interface INews {
  id: string
}

export interface INewsState {
  news: Array<INews>
  status: RequestStatus
}

const state: INewsState = {
  news: [],
  status: RequestStatus.INITIAL,
}

const mutations: MutationTree<INewsState> = {
  SET_STATUS(state, status: RequestStatus) {
    state.status = status
  },
  SET_NEWS(state, news: Array<INews>) {
    state.news = news
  },
}

const actions: ActionTree<INewsState, IRootState> = {
  async getNews({ commit }) {
    commit('SET_STATUS', RequestStatus.PENDING)
    try {
      const news = await axios.get('news')
      commit('SET_NEWS', RequestStatus.PENDING)
      commit('SET_STATUS', RequestStatus.LOADED)

      console.log('news', news)
    } catch {
      commit('SET_STATUS')
    }
  },
}

const getters: GetterTree<INewsState, IRootState> = {}

export const appModule: Module<INewsState, IRootState> = {
  state,
  mutations,
  actions,
  getters,
}
