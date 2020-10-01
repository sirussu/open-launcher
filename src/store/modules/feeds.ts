import {
  MutationTree,
  ActionTree,
  GetterTree,
  Module,
  ActionContext,
} from 'vuex'
import difference from 'lodash/difference'

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
  additional: { page: number; isLastPage: boolean } & NormalizedAdditional
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
    page: 0,
    isLastPage: false,
  },
}

interface ISetFeedsMutationCtx {
  feeds: Array<IFeed>
  currentPage: number
  isLastPage: boolean
}

const mutations: MutationTree<IFeedState> = {
  SET_STATUS(state, status: RequestStatus) {
    state.additional.status = status
  },
  SET_FEEDS(state, { feeds, currentPage, isLastPage }: ISetFeedsMutationCtx) {
    const normalizedFeeds = normalizeData(feeds)

    state.feeds.data.allIds.push(
      ...difference(normalizedFeeds.allIds, state.feeds.data.allIds) // For persisted data
    )
    state.feeds.data.byId = {
      ...state.feeds.data.byId,
      ...normalizedFeeds.byId,
    }
    state.additional.page = currentPage
    state.additional.isLastPage = isLastPage
  },
}

export interface IFeedsActions extends ActionTree<IFeedState, IRootState> {
  getFeeds: (
    ctx: ActionContext<IFeedState, IRootState>,
    page?: number
  ) => Promise<void>
}

const actions: IFeedsActions = {
  async getFeeds({ commit }, page) {
    commit('SET_STATUS', RequestStatus.PENDING)
    try {
      const { data: feeds, currentPage, nextPageUrl } = (await axios.get(
        '/news',
        {
          params: { page },
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      )) as any

      const isLastPage = !nextPageUrl

      commit('SET_FEEDS', { feeds, currentPage, isLastPage })
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
