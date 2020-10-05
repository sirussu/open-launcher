import { RequestStatus } from '@/types/network'
import { ActionContext, ActionTree, GetterTree } from 'vuex'
import { IRootState } from '@/store/types'

export interface IAccount {
  id: number
  username: string
  password: string
}

export interface IAuthResponse {
  tokenType: string
  accessToken: string
}

export interface IAccountsState {
  accounts: Array<IAccount>
  defaultId: number
  additional: {
    status: RequestStatus,
  },
}

type ActionCtx = ActionContext<IAccountsState, IRootState>

export interface IAccountsActions extends ActionTree<IAccountsState, IRootState>{
  addAccount: (ctx: ActionCtx, payload: IAccount) => void
  removeAccount: (ctx: ActionCtx, payload: IAccount) => void
  loadAccInfo: (ctx: ActionCtx, payload: IAuthResponse) => Promise<void>
  sendAuthRequest: (ctx: ActionCtx, payload: {username: string, password: string, token?: string}) => Promise<void>
}

export interface IAccountsGetters extends GetterTree<IAccountsState, IRootState>{
  accounts: (state: IAccountsState) => Array<IAccount>
  defaultAccount: (state: IAccountsState) => IAccount | undefined
}
