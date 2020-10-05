import { Module, MutationTree } from 'vuex'
import { RequestStatus } from '@/types/network'

import { IRootState } from '../../types'
import { IAccount, IAccountsActions, IAccountsGetters, IAccountsState } from '@/store/modules/accounts/types'
import { axios } from '@/modules/axios'

const state: IAccountsState = {
  accounts: [],
  defaultId: 0,
  additional: {
    status: RequestStatus.INITIAL
  }
}

const getters: IAccountsGetters = {
  accounts: state => state.accounts,
  defaultAccount: state => state.accounts.find(acc => acc.id === state.defaultId)
}

const mutations: MutationTree<IAccountsState> = {
  ADD_ACCOUNT(state, account: IAccount) {
    state.accounts.push(account)
  },
  REMOVE_ACCOUNT(state, accountId: number) {
    state.accounts.filter(acc => acc.id !== accountId)
  },
  SET_DEFAULT_ID(state, accountId: number) {
    state.defaultId = accountId
  },
  SET_STATUS(state, status: RequestStatus) {
    state.additional.status = status
  }
}

const actions: IAccountsActions = {
  addAccount({ state, commit }, account) {
    if (state.accounts.length === 0) {
      commit('SET_DEFAULT_ID', account.id)
    }

    state.accounts.find(acc => acc.id === account.id) ? console.log(`Account ${account.username} already exist in accounts list`) : commit('ADD_ACCOUNT', account)// TODO: need a toaster
  },
  removeAccount({ state, commit }, account) {
    commit('REMOVE_ACCOUNT', account.id)

    if (state.accounts.length > 0) {
      if(state.defaultId === account.id) {
        commit('SET_DEFAULT_ID', state.accounts[0].id)
      }
    } else {
      commit('SET_DEFAULT_ID', 0)
    }
  },
  async sendAuthRequest({ state, dispatch, commit }, {username, password, token}) {
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
      const response = await axios.post('https://api.sirus.su/oauth/token', params)
      await dispatch('loadAccInfo', response)
      commit('SET_STATUS', RequestStatus.LOADED)
    } catch (err) {

    }
  },
  async loadAccInfo({ state, dispatch, commit }, authResponse) {
    const params = {
      headers: { 'Authorization': `${authResponse.tokenType} ${authResponse.accessToken}` }
    }

    try {
      const response = await axios.get('/user', params)
      await dispatch('addAccount', { ...authResponse, response })
      commit('SET_STATUS', RequestStatus.LOADED)
    } catch (err) {

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
