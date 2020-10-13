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
  REMOVE_ACCOUNT(state, id: number) {
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
  removeAccount({ state, commit }, accountId) {
    if(state.accounts.data.defaultId === accountId) {
      commit('SET_DEFAULT_ID', state.accounts.data.allIds[0])
    }

    commit('REMOVE_ACCOUNT', accountId)

    if (state.accounts.data.allIds.length === 0) {
      commit('SET_DEFAULT_ID', 0)
    }
  },
  setDefaultAccount({ commit }, account) {
    commit('SET_DEFAULT_ID', account.id)
    localStorage.setItem('tokens', JSON.stringify({ tokenType: account.tokens.tokenType, accessToken: account.tokens.accessToken }))
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
    const data = {
      username,
      password,
      token,
      grantType: process.env.VUE_APP_GRANT_TYPE,
      clientId: Number(process.env.VUE_APP_CLIENT_ID),
      clientSecret: process.env.VUE_APP_CLIENT_SECRET,
      scope: '*'
    }

    try {
      commit('SET_ERROR', { status: 0, statusText: '' })
      const authResponse: { tokenType: string, accessToken: string } = await axios.post('https://api.sirus.su/oauth/token', data)

      localStorage.setItem('tokens', JSON.stringify({ tokenType: authResponse.tokenType, accessToken: authResponse.accessToken }))

      await dispatch('loadAccountInfo', authResponse)

      commit('SET_STATUS', RequestStatus.LOADED)
    } catch (error) {
      commit('SET_STATUS', RequestStatus.FAILED)

      if (error.isAxiosError) {
        const typedError: IAccountError = {
          status: error.response.status,
          statusText: error.response.statusText
        }
        commit('SET_ERROR', typedError)
      }
    }
  },
  async loadAccountInfo({ state, commit }, authResponse) {
    commit('SET_STATUS', RequestStatus.PENDING)

    try {
      const accountInfo: {id: number, username: string} = await axios.get('/user')

      const normalizedExtendedAccount = {
        id: accountInfo.id,
        byId: {
          tokens: { ...authResponse },
          accountInfo,
          id: accountInfo.id,
          username: accountInfo.username
        }
      }
      if(state.accounts.data.allIds.length === 0) {
        commit('SET_DEFAULT_ID', normalizedExtendedAccount.id)
      }

      if(!state.accounts.data.allIds.includes(normalizedExtendedAccount.id)) {
        commit('ADD_ACCOUNT', normalizedExtendedAccount)
      }

      commit('SET_STATUS', RequestStatus.LOADED)
    } catch (error) {
      commit('SET_STATUS', RequestStatus.FAILED)

      if (error.isAxiosError) {
        const typedError: IAccountError = {
          status: error.response.status,
          statusText: error.response.statusText
        }
        commit('SET_ERROR', typedError)
      }
    }
  }
}

export const accountsModule = modulesFactory<IAccountsState, IRootState>({ state, mutations, actions, getters })
