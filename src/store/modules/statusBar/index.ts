import { MutationTree } from 'vuex'

import { IRootState } from '@/store/types'
import {
  IRealm,
  IStatusActions,
  IStatusGetters,
  IStatusState,
} from '@/store/modules/statusBar/types'
import { RequestStatus } from '@/types/network'
import { axios } from '@/modules/axios'
import { getSummaryOnline } from '@/store/modules/statusBar/lib'
import { modulesFactory } from '@/utils/modulesFactory'

const state: IStatusState = {
  realms: [],
  status: RequestStatus.INITIAL,
  summaryOnline: 0,
}

const getters: IStatusGetters = {
  realms: (state) => state.realms,
  summaryOnline: (state) => state.summaryOnline,
}

const mutations: MutationTree<IStatusState> = {
  SET_REALMS(state, realms: Array<IRealm>) {
    state.realms = realms
  },

  SET_SUMMARY_ONLINE(state, summaryOnline) {
    state.summaryOnline = summaryOnline
  },

  SET_STATUS(state, status: RequestStatus) {
    state.status = status
  },
}

const actions: IStatusActions = {
  async getRealms({ commit }) {
    commit('SET_STATUS', RequestStatus.PENDING)

    try {
      const realms: Array<IRealm> = await axios.get('/server/status')

      const summaryOnline = getSummaryOnline(realms)

      commit('SET_REALMS', realms)
      commit('SET_SUMMARY_ONLINE', summaryOnline)
      commit('SET_STATUS', RequestStatus.LOADED)
    } catch (error) {
      console.error(error)

      commit('SET_STATUS', RequestStatus.FAILED)
    }
  },
}

export const statusBarModule = modulesFactory<IStatusState, IRootState>({
  state,
  mutations,
  actions,
  getters,
})
