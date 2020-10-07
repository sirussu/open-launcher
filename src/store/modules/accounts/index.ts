import { Module, MutationTree } from 'vuex'
import { RequestStatus } from '@/types/network'

import { IRootState } from '../../types'
import {
  IAccountsActions,
  IAccountsGetters,
  IAccountsState,
  IAccountError,
  INormalizedAccount
} from '@/store/modules/accounts/types'
import { axios } from '@/modules/axios'
import { denormalizeData } from '@/utils/denormalizeData'

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
  REMOVE_ACCOUNT(state, { id, index }: { id: number, index: number }) {
    delete state.accounts.data.byId[id]
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
    const normalizedAccount = {
      id: account.id,
      byId: account
    }

    if (state.accounts.data.allIds.length === 0) {
      commit('SET_DEFAULT_ID', normalizedAccount.id)
    }

    state.accounts.data.allIds.includes(normalizedAccount.id) ? console.log(`Account ${account.username} already exist in accounts list`) : commit('ADD_ACCOUNT', normalizedAccount)// TODO: need a toaster
  },
  removeAccount({ state, commit }, account) {
    const index = state.accounts.data.allIds.findIndex(id => id === account.id)
    const removingAccount = {
      id: account.id,
      index
    }

    commit('REMOVE_ACCOUNT', removingAccount)

    if (state.accounts.data.allIds.length > 0) {
      if(state.accounts.data.defaultId === removingAccount.id) {
        commit('SET_DEFAULT_ID', state.accounts.data.allIds[0])
      }
    } else {
      commit('SET_DEFAULT_ID', 0)
    }
  },
  setDefaultAccount({ commit }, accountId) {
    commit('SET_DEFAULT_ID', accountId)
  },
  setError({ commit }, error) {
    if (error === null) {
      commit('SET_ERROR', { status: 0, statusText: '' })
    } else {
      commit('SET_ERROR', error)
    }
  },
  async sendAuthRequest({ dispatch, commit }, {username, password, token}) {
    commit('SET_STATUS', RequestStatus.PENDING)

    const params = {
      grant_type: 'password',
      client_id: 3,
      client_secret: 'W90b7o7e81OI8JwNXItC8GXouS8rUStS9kQPKFul',
      username,
      password,
      token,
      scope: '*'
    }
    try {
      await dispatch('setError', null)
      const response = await axios.post('https://api.sirus.su/oauth/token', params)
      await dispatch('loadAccInfo', response)

      commit('SET_STATUS', RequestStatus.LOADED)
    } catch (err) {
      commit('SET_STATUS', RequestStatus.FAILED)

      if (err.isAxiosError) {
        const error: IAccountError = {
          status: err.response.status,
          statusText: err.response.statusText
        }
        await dispatch('setError', error)
      } else {
        console.log(err)
      }
    }
  },
  async loadAccInfo({ dispatch, commit }, authResponse) {
    commit('SET_STATUS', RequestStatus.PENDING)

    const params = {
      headers: { 'Authorization': `${authResponse.tokenType} ${authResponse.accessToken}` }
    }

    try {
      const accountInfo: {id: number, username: string} = await axios.get('/user', params)
      const extendedAccount = {
        ...authResponse,
        id: accountInfo.id,
        username: accountInfo.username,
        accountInfo
      }
      await dispatch('addAccount', extendedAccount)

      commit('SET_STATUS', RequestStatus.LOADED)
    } catch (err) {
      commit('SET_STATUS', RequestStatus.FAILED)

      if (err.isAxiosError) {
        const error: IAccountError = {
          status: err.response.status,
          statusText: err.response.statusText
        }
        await dispatch('setError', error)
      } else {
        console.log(err)
      }
    }
  }
}

export const accountsModule: Module<IAccountsState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
