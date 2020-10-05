import {
  MutationTree,
  ActionTree,
  GetterTree,
  Module,
  ActionContext,
} from 'vuex'
import { RequestStatus } from '@/types/network'
import { axios } from '@/modules/axios'

import { IRootState } from '../../types'
import { IErrorsState } from '@/store/modules/error/types'

export const errorsModule: Module<IErrorsState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
