import { ActionContext, ActionTree, GetterTree } from 'vuex'
import { IRootState } from '@/store/types'

export interface IErrorState {
  error: IError
}

export interface IError {
  status: number
  statusText: string
}

export interface IErrorActions extends ActionTree<IErrorState, IRootState> {
  setError: (ctx: ActionContext<IErrorState, IRootState>, payload: IError | null) => void
}

export interface IErrorGetters extends GetterTree<IErrorState, IRootState> {
  error: (state: IErrorState) => IError
}
