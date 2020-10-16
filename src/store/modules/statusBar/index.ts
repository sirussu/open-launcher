import { Module, MutationTree } from 'vuex'
import { IRootState } from '@/store/types'
import { normalizeData } from '@/utils/normalizeData'
import { denormalizeData } from '@/utils/denormalizeData'
import { IStatusActions, IStatusGetters, IStatusState } from '@/store/modules/statusBar/types'
import { RequestStatus } from '@/types/network'
import { axios } from '@/modules/axios'

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
  SET_REALMS(state, realms) {
    const normalizedRealms = normalizeData(realms)

    state.realms.data.allIds = normalizedRealms.allIds
    state.realms.data.byId = normalizedRealms.byId
  },

  SET_STATUS(state, status: RequestStatus) {
    state.additional.status = status
  },
}

const actions: IStatusActions = {
  async getRealms({ commit }) {
    commit('SET_STATUS', RequestStatus.PENDING)

    try {
      const realms = await axios.get('/server/status')

      commit('SET_REALMS', realms)
      commit('SET_STATUS', RequestStatus.LOADED)
    } catch (error) {
      console.error(error)

      commit('SET_STATUS', RequestStatus.FAILED)
    }
  },
}

export const statusBarModule: Module<IStatusState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
