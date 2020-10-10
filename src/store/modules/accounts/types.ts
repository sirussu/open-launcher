import { ActionContext, ActionTree, GetterTree } from 'vuex'
import { IRootState } from '@/store/types'
import { NormalizedAdditional, NormalizedSchema } from '@/types/normalze'

export interface IAccount {
  id: number
  username: string
  password: string
}

export interface INormalizedAccount {
  id: number
  byId: IAccount
}

export interface IAuthResponse {
  tokenType: string
  accessToken: string
}

export interface IAccountError {
  status: number
  statusText: string
}

export interface IAccountsAdditional extends NormalizedAdditional{
  error: {
    status: number
    statusText: string
  }
}

export interface IAccounts extends NormalizedSchema<IAccount> {
  data: {
    allIds: Array<number>
    byId: Record<number, IAccount>
    defaultId: number
  }
}

export interface IAccountsState {
  accounts: IAccounts
  additional: IAccountsAdditional
}

type ActionCtx = ActionContext<IAccountsState, IRootState>

export interface IAccountsActions extends ActionTree<IAccountsState, IRootState>{
  addAccount: (ctx: ActionCtx, payload: IAccount) => void
  removeAccount: (ctx: ActionCtx, payload: number) => void
  setDefaultAccount: (ctx: ActionCtx, payload: number) => void
  setError: (ctx: ActionCtx, payload: IAccountError | null) => void
  loadAccInfo: (ctx: ActionCtx, payload: IAuthResponse) => Promise<void>
  sendAuthRequest: (ctx: ActionCtx, payload: {username: string, password: string, token?: string}) => Promise<void>
}

export interface IAccountsGetters extends GetterTree<IAccountsState, IRootState>{
  accounts: (state: IAccountsState) => Array<IAccount>
  defaultAccount: (state: IAccountsState) => IAccount | undefined
  error: (state: IAccountsState) => IAccountError | undefined
}
