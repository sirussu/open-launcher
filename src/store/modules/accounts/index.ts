import { MutationTree } from 'vuex'

import { RequestStatus } from '@/types/network'
import {
  IAccountsActions,
  IAccountsGetters,
  IAccountsState, IAuthResponse,
  INormalizedAccount, IValidationTimestamp
} from '@/store/modules/accounts/types'
import { axios } from '@/modules/axios'
import { denormalizeData } from '@/utils/denormalizeData'
import { modulesFactory } from '@/utils/modulesFactory'
import { IRootState } from '@/store/types'
import { adaptUserDataToRequestParams, adaptExtendedAccount, adaptResponse } from './adapters'
import {
  getShiftedTimestamp,
  getTimestamp,
  getTimestampOffset,
  isDelayTimeIsGone,
  isTimezoneHasOffset
} from './lib'

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
    needTfa: {
      needTfa: false,
      isReLogin: false,
      username: '',
      password: '',
    },
    lastValidationTimestamp: {
      timestamp: 0,
      timezone: '',
      timestampWithDelayTime: 0,
    }
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
  REMOVE_ACCOUNT(state, id: number) {
    state.accounts.data.allIds = state.accounts.data.allIds.filter(accountId => accountId !== id)

    delete state.accounts.data.byId[id]
  },
  SET_DEFAULT_ID(state, accountId: number) {
    state.accounts.data.defaultId = accountId
  },
  SET_STATUS(state, status: RequestStatus) {
    state.additional.status = status
  },
  SET_NEED_TFA(state, { needTfa, isReLogin, username, password }: { needTfa: boolean, isReLogin: boolean, username: string, password: string }) {
    state.additional.needTfa = {
      needTfa,
      isReLogin,
      username,
      password,
    }
  },
  SET_VALIDATE_ACCOUNTS_TIME(state, timestamp: IValidationTimestamp) {
    state.additional.lastValidationTimestamp = timestamp
  },
  SET_IS_EXPIRED(state, { value, id }: { value: boolean, id: number }) {
    state.accounts.data.byId[id].tokenIsExpired = value
  },
}

const actions: IAccountsActions = {
  addAccount({ state, commit }, account) {
    if (state.accounts.data.allIds.length === 0) {
      commit('SET_DEFAULT_ID', account.id)
      commit('ADD_ACCOUNT', account)
    }

    if (!state.accounts.data.allIds.includes(account.id)) {
      commit('ADD_ACCOUNT', account)
    } else {
      console.warn(`Account ${account.byId.username} already exist in account list`) // TODO: Need a notificator
    }

    if (state.accounts.data.byId[account.id].tokenIsExpired) {
      commit('SET_IS_EXPIRED', { value: false, id: account.id })
    }
  },
  removeAccount({ state, commit }, accountId) {
    if (state.accounts.data.defaultId === accountId) {
      commit('SET_DEFAULT_ID', state.accounts.data.allIds[0])
    }

    if (state.accounts.data.allIds.length === 0) {
      commit('SET_DEFAULT_ID', 0)
      localStorage.removeItem('tokens')
    }

    commit('REMOVE_ACCOUNT', accountId)
  },
  setDefaultAccount({ commit }, account) {
    commit('SET_DEFAULT_ID', account.id)
    localStorage.setItem('tokens', `${account.tokens.tokenType} ${account.tokens.accessToken}`)
  },
  switchOffTfa({ commit }) {
    commit('SET_NEED_TFA', false)
  },
  async sendAuthRequest({ dispatch, commit }, { username, password, token, isReLogin }) {
    commit('SET_STATUS', RequestStatus.PENDING)

    const userDataToRequestParams = adaptUserDataToRequestParams({ username, password, token })

    try {
      const authResponse: IAuthResponse = await axios.post('https://api.sirus.su/oauth/token', userDataToRequestParams)

      localStorage.setItem('tokens', `${authResponse.tokenType} ${authResponse.accessToken}`)

      const adaptedResponse = adaptResponse(authResponse, { username, password, token })

      await dispatch('loadAccountInfo', adaptedResponse)
    } catch (error) {
      commit('SET_STATUS', RequestStatus.FAILED)

      if (error.response && error.response.status === 401) {
        commit('SET_NEED_TFA', { needTfa: true, isReLogin, username, password })
      } else {
        console.dir(error)
      }
    }
  },
  async validateAccountsInfo({ commit, getters, state }) {
    const date = new Date()
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const timestampObject = getTimestamp(date, timezone)

    // validators
    const hasTimezoneOffset = isTimezoneHasOffset(state.additional.lastValidationTimestamp.timezone, timestampObject.timezone)
    const hasDelayTimeIsGone = isDelayTimeIsGone(state.additional.lastValidationTimestamp.timestampWithDelayTime, timestampObject.timestamp)

    if (hasTimezoneOffset) {
      const offset = getTimestampOffset(date)
      const shiftedTimestampObject = getShiftedTimestamp(state.additional.lastValidationTimestamp, timezone, offset)

      commit('SET_VALIDATE_ACCOUNTS_TIME', shiftedTimestampObject)
    }

    if(!hasDelayTimeIsGone) {
      return
    }

    commit('SET_VALIDATE_ACCOUNTS_TIME', timestampObject)

    for(let account of getters.accounts) {
      const accountDataToRequestParams = adaptUserDataToRequestParams({ username: account.username, password: account.password, token: account.tokens.tfaToken })

      try {
        await axios.post('https://api.sirus.su/oauth/token', accountDataToRequestParams)
      } catch (error) {
        if ([400, 401].includes(error.response.status)) {
          console.warn(`${account.username} account password has been changed or auth token has expired`) // TODO: Need a notificator
          commit('SET_IS_EXPIRED', { value: true, id: account.id })
        }
      }
    }
  },
  async loadAccountInfo({ dispatch, commit }, adaptedAuthResponse) {
    try {
      const accountInfo: { id: number } = await axios.get('/user')

      const account = adaptExtendedAccount(accountInfo, adaptedAuthResponse)

      await dispatch('addAccount', account)

      commit('SET_STATUS', RequestStatus.LOADED)

      commit('SET_NEED_TFA', { needTfa: false, isReLogin: false, username: '', password: '' })
    } catch (error) {
      commit('SET_STATUS', RequestStatus.FAILED)
      console.error(error)
    }
  },
}

export const accountsModule = modulesFactory<IAccountsState, IRootState>({ state, mutations, actions, getters })
