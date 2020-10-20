import { MutationTree } from 'vuex'

import { RequestStatus } from '@/types/network'
import {
  IAccountsActions,
  IAccountsGetters,
  IAccountsState,
  INormalizedAccount,
} from '@/store/modules/accounts/types'
import { axios } from '@/modules/axios'
import { denormalizeData } from '@/utils/denormalizeData'
import { modulesFactory } from '@/utils/modulesFactory'
import { IRootState } from '@/store/types'
import { adaptUserDataToRequestParams, adaptExtendedAccount } from '@/store/modules/accounts/adapters'
import { PENDING_TIME_MS } from '@/config'

const state: IAccountsState = {
  accounts: {
    data: {
      allIds: [],
      byId: {},
      defaultId: 0,
    },
  },
  additional: {
    status: RequestStatus.INITIAL,
    needTfa: false,
    lastValidateAccountsTimestamp: 0
  },
}

const getters: IAccountsGetters = {
  accounts: state => denormalizeData(state.accounts.data),
  defaultAccount: state => state.accounts.data.byId[state.accounts.data.defaultId],
  needTfa: state => state.additional.needTfa,
  getStatus: state => state.additional.status
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
  SET_NEED_TFA(state, value) {
    state.additional.needTfa = value
  },
  SET_VALIDATE_ACCOUNTS_TIME(state, timestamp) {
    state.additional.lastValidateAccountsTimestamp = timestamp
  },
}

const actions: IAccountsActions = {
  addAccount({ state, commit }, account) {
    if (state.accounts.data.allIds.length === 0) {
      commit('SET_DEFAULT_ID', account.id)
    }

    if (!state.accounts.data.allIds.includes(account.id)) {
      commit('ADD_ACCOUNT', account)
    }
  },
  removeAccount({ state, commit }, accountId) {
    if (state.accounts.data.defaultId === accountId) {
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
  switchOffTfa({ commit }) {
    commit('SET_NEED_TFA', false)
  },
  async sendAuthRequest({ dispatch, commit }, { username, password, token }) {
    commit('SET_STATUS', RequestStatus.PENDING)

    const userDataToRequestParams = adaptUserDataToRequestParams({ username, password, token })

    try {
      const authResponse: { tokenType: string, accessToken: string, tfaToken?: string, password?: string } = await axios.post('https://api.sirus.su/oauth/token', userDataToRequestParams)

      localStorage.setItem('tokens', `${authResponse.tokenType} ${authResponse.accessToken}`)

      authResponse.tfaToken = token
      authResponse.password = password

      await dispatch('loadAccountInfo', authResponse)
    } catch (error) {
      commit('SET_STATUS', RequestStatus.FAILED)

      if (error.response && error.response.status === 401) {
        commit('SET_NEED_TFA', true)
        commit('SET_STATUS', RequestStatus.PENDING)
      } else {
        console.error(error)
      }
    }
  },
  async validateAccountsInfo({ dispatch, commit, getters, state }) {
    const currentTime = Date.now()

    if ((state.additional.lastValidateAccountsTimestamp + PENDING_TIME_MS) > currentTime) {
      return
    }

    commit('SET_VALIDATE_ACCOUNTS_TIME', currentTime)

    for(let account of getters.accounts) {
      const accountDataToRequestParams = adaptUserDataToRequestParams({ username: account.username, password: account.password, token: account.tokens.tfaToken })

      try {
        await axios.post('https://api.sirus.su/oauth/token', accountDataToRequestParams)
      } catch (error) {
        console.dir(error)
        if ([400, 401].includes(error.response.status)) {
          console.warn(`${account.username} account password has been changed or auth token has expired`) // TODO: Need a notificator
          await dispatch('removeAccount', account.id)
        }
      }
    }
  },
  async loadAccountInfo({ dispatch, commit }, authResponse) {
    try {
      const accountInfo: {id: number, username: string} = await axios.get('/user')

      const account = adaptExtendedAccount(accountInfo, authResponse)

      await dispatch('addAccount', account)

      commit('SET_STATUS', RequestStatus.LOADED)

      commit('SET_NEED_TFA', false)
    } catch (error) {
      commit('SET_STATUS', RequestStatus.FAILED)
      console.error(error)
    }
  },
}

export const accountsModule = modulesFactory<IAccountsState, IRootState>({ state, mutations, actions, getters })
