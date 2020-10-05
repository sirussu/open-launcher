import { Module, MutationTree } from 'vuex'
import { RequestStatus } from '@/types/network'

import { IRootState } from '../../types'
import { IAccount, IAccountsActions, IAccountsGetters, IAccountsState } from '@/store/modules/accounts/types'

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
  async addAccount({ dispatch, commit }, account) {
    if (state.accounts.length === 0) {
      commit('SET_DEFAULT_ID', account.id)
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
