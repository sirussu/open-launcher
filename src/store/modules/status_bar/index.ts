import { Module, MutationTree } from 'vuex'
import { IRootState } from '@/store/types'
import { normalizeData } from '@/utils/normalizeData'
import { denormalizeData } from '@/utils/denormalizeData'
import { IRealm, IStatusActions, IStatusGetters, IStatusState } from '@/store/modules/status_bar/types'
import { RequestStatus } from '@/types/network'
import { axios } from '@/modules/axios'
import { getSummaryOnline } from '@/store/modules/status_bar/lib'
import { modulesFactory } from '@/utils/modulesFactory'

const state: IStatusState = {
  realms: {
    data: {
      allIds: [],
      byId: {},
    },
  },
  additional: {
    status: RequestStatus.INITIAL,
    summaryOnline: 0,
  },
}

const getters: IStatusGetters = {
  realms: state => denormalizeData(state.realms.data),
  summaryOnline: state => state.additional.summaryOnline,
}

const mutations: MutationTree<IStatusState> = {
  SET_REALMS(state, realms: Array<IRealm>) {
    const normalizedRealms = normalizeData(realms)

    state.realms.data.allIds = normalizedRealms.allIds
    state.realms.data.byId = normalizedRealms.byId
  },

  SET_SUMMARY_ONLINE(state, summaryOnline) {
    state.additional.summaryOnline = summaryOnline
  },

  SET_STATUS(state, status: RequestStatus) {
    state.additional.status = status
  },
}

const actions: IStatusActions = {
  async getRealms({ commit }) {
    commit('SET_STATUS', RequestStatus.PENDING)

    try {
      const realms: Array<IRealm> = await axios.get('/server/status')

      const summaryOnline = getSummaryOnline<IRealm>(realms)

      commit('SET_REALMS', realms)
      commit('SET_SUMMARY_ONLINE', summaryOnline)
      commit('SET_STATUS', RequestStatus.LOADED)
    } catch (error) {
      console.error(error)

      commit('SET_STATUS', RequestStatus.FAILED)
    }
  },
}

export const statusBarModule = modulesFactory<IStatusState, IRootState>({ state, mutations, actions, getters })
