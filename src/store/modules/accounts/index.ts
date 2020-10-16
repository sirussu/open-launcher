import { MutationTree } from 'vuex'
import { RequestStatus } from '@/types/network'

import {
  IAccountsActions,
  IAccountsGetters,
  IAccountsState,
  IAccountError,
  INormalizedAccount
} from '@/store/modules/accounts/types'
import { axios } from '@/modules/axios'
import { denormalizeData } from '@/utils/denormalizeData'
import { modulesFactory } from '@/utils/modulesFactory'
import { IRootState } from '@/store/types'
import { authData, normalizedExtendedAccount } from '@/store/modules/accounts/lib'

const state: IAccountsState = {
  accounts: {
    data: {
      allIds: [],
      byId: {},
      defaultId: 0,
    }
  },
  additional: {
    status: RequestStatus.INITIAL,
    error: {
      status: 0,
      statusText: ''
    }
  }
}

const getters: IAccountsGetters = {
  accounts: state => denormalizeData(state.accounts.data),
  defaultAccount: state => state.accounts.data.byId[state.accounts.data.defaultId],
  error: state => state.additional.error
}

const mutations: MutationTree<IAccountsState> = {
  ADD_ACCOUNT(state, account: INormalizedAccount) {
    state.accounts.data.allIds.push(account.id)
    state.accounts.data.byId[account.id] = account.byId
  },
  REMOVE_ACCOUNT(state, id) {
    delete state.accounts.data.byId[id]

    const index = state.accounts.data.allIds.findIndex(accountId => accountId === id)
    state.accounts.data.allIds.splice(index, 1)
  },
  SET_DEFAULT_ID(state, accountId: number) {
    state.accounts.data.defaultId = accountId
  },
  SET_STATUS(state, status: RequestStatus) {
    state.additional.status = status
  },
  SET_ERROR(state, error: IAccountError) {
    if(state.additional.error) {
      state.additional.error.status = error.status
      state.additional.error.statusText = error.statusText
    }
  }
}

const actions: IAccountsActions = {
  addAccount({ state, commit }, account) {
    if(state.accounts.data.allIds.length === 0) {
      commit('SET_DEFAULT_ID', account.id)
    }

    if(!state.accounts.data.allIds.includes(account.id)) {
      commit('ADD_ACCOUNT', account)
    }
  },
  removeAccount({ state, commit }, accountId) {
    if(state.accounts.data.defaultId === accountId) {
      commit('SET_DEFAULT_ID', state.accounts.data.allIds[0])
    }

    commit('REMOVE_ACCOUNT', accountId)

    if (state.accounts.data.allIds.length === 0) {
      commit('SET_DEFAULT_ID', 0)
      localStorage.removeItem('tokens')
    }
  },
  setDefaultAccount({ commit }, account) {
    commit('SET_DEFAULT_ID', account.id)
    localStorage.setItem('tokens', `${account.tokens.tokenType} ${account.tokens.accessToken}`)
  },
  clearError({ commit }) {
    commit('SET_ERROR', { status: 0, statusText: '' })
  },
  async sendAuthRequest({ dispatch, commit }, {username, password, token}) {
    commit('SET_STATUS', RequestStatus.PENDING)

    const data = authData({ username, password, token })

    try {
      await dispatch('clearError')

      const authResponse: { tokenType: string, accessToken: string } = await axios.post('https://api.sirus.su/oauth/token', data)

      localStorage.setItem('tokens', `${authResponse.tokenType} ${authResponse.accessToken}`)

      await dispatch('loadAccountInfo', authResponse)
    } catch (error) {
      commit('SET_STATUS', RequestStatus.FAILED)

      if (error.response) {
        commit('SET_ERROR', { status: error.response.status, statusText: error.response.statusText })
      }
    }
  },
  async loadAccountInfo({ dispatch, commit }, authResponse) {
    try {
      const accountInfo: {id: number, username: string} = await axios.get('/user')

      const account = normalizedExtendedAccount(accountInfo, authResponse)

      await dispatch('addAccount', account)

      commit('SET_STATUS', RequestStatus.LOADED)
    } catch (error) {
      commit('SET_STATUS', RequestStatus.FAILED)
    }
  }
}

export const accountsModule = modulesFactory<IAccountsState, IRootState>({ state, mutations, actions, getters })
