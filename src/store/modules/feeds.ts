import {
  MutationTree,
  ActionTree,
  GetterTree,
  Module,
  ActionContext,
} from 'vuex'

import { RequestStatus } from '@/types/network'
import { axios } from '@/modules/axios'
import { normalizeData } from '@/utils/normalizeData'
import { denormalizeData } from '@/utils/denormalizeData'
import { NormalizedSchema, NormalizedAdditional } from '@/types/normalze'

import { IRootState } from '../types'

export interface IFeed {
  id: number
  title: string
  description: string
  coverColor: string
  coverUrl: string // only path
  forumTopicId: number
}

export interface IFeedState {
  feeds: NormalizedSchema<IFeed>
  additional: NormalizedAdditional
}

const state: IFeedState = {
  feeds: {
    data: {
      allIds: [],
      byId: {},
    },
  },
  additional: {
    status: RequestStatus.INITIAL,
  },
}

const mutations: MutationTree<IFeedState> = {
  SET_STATUS(state, status: RequestStatus) {
    state.additional.status = status
  },
  SET_NEWS(state, feeds: Array<IFeed>) {
    state.feeds.data = normalizeData(feeds)
  },
}

export interface IFeedsActions extends ActionTree<IFeedState, IRootState> {
  getFeeds: (ctx: ActionContext<IFeedState, IRootState>) => Promise<void>
}

const actions: IFeedsActions = {
  async getFeeds({ commit }) {
    commit('SET_STATUS', RequestStatus.PENDING)
    try {
      const { data: news } = await axios.get('/news')

      commit('SET_NEWS', news)
      commit('SET_STATUS', RequestStatus.LOADED)
    } catch (error) {
      console.error(error)

      commit('SET_STATUS', RequestStatus.FAILED)
    }
  },
}

export interface IFeedsGetters extends GetterTree<IFeedState, IRootState> {
  feeds: (state: IFeedState) => Array<IFeed>
}

const getters: IFeedsGetters = {
  feeds: (state) => denormalizeData(state.feeds.data),
}

export const feedsModule: Module<IFeedState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
