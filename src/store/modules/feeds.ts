import { MutationTree, ActionTree, GetterTree, ActionContext } from 'vuex'

import { RequestStatus } from '@/types/network'
import { axios } from '@/modules/axios'
import { normalizeData } from '@/utils/normalizeData'
import { denormalizeData } from '@/utils/denormalizeData'
import { modulesFactory } from '@/utils/modulesFactory'
import { NormalizedSchema, NormalizedAdditional } from '@/types/normalze'
import { NotificationTypes } from '@/types/notification'

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

interface ISetFeedsMutationCtx {
  feeds: Array<IFeed>
  currentPage: number
  isLastPage: boolean
}

const mutations: MutationTree<IFeedState> = {
  SET_STATUS(state, status: RequestStatus) {
    state.additional.status = status
  },
  SET_FEEDS(state, { feeds }: ISetFeedsMutationCtx) {
    const normalizedFeeds = normalizeData(feeds)

    state.feeds.data.allIds = normalizedFeeds.allIds
    state.feeds.data.byId = normalizedFeeds.byId
  },
}

export interface IFeedsActions extends ActionTree<IFeedState, IRootState> {
  getFeeds: (ctx: ActionContext<IFeedState, IRootState>) => Promise<void>
}

const actions: IFeedsActions = {
  async getFeeds({ commit, dispatch }) {
    commit('SET_STATUS', RequestStatus.PENDING)
    try {
      const { data: feeds } = await axios.get('/news')

      commit('SET_FEEDS', { feeds })
      commit('SET_STATUS', RequestStatus.LOADED)
    } catch (error) {
      console.error('getFeeds', error)

      dispatch(
        'notification/addNotification',
        { type: NotificationTypes.ERROR, i18n: 'feeds_loading_error' },
        { root: true }
      )

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

export const feedsModule = modulesFactory<IFeedState, IRootState>({
  state,
  mutations,
  actions,
  getters,
})
