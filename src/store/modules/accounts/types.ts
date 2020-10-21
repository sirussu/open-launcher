import { ActionContext, ActionTree, GetterTree } from 'vuex'
import { IRootState } from '@/store/types'
import { NormalizedAdditional, NormalizedSchema } from '@/types/normalze'
import { RequestStatus } from '@/types/network'

export interface IAccount {
  id: number
  username: string
  password: string
  tfaToken?: string
  tokens: IAuthResponse
}

export interface INormalizedAccount {
  id: number
  byId: IAccount
}

export interface IAuthResponse {
  tokenType: string
  accessToken: string
  refreshToken: string
  expiresIn: number
  tokenIsExpired: boolean
}

export interface IAdaptedResponse extends IAuthResponse{
  username: string
  password: string
  tfaToken?: string
}

export interface IAccountsAdditional extends NormalizedAdditional{
  needTfa: boolean
  lastValidationTimestamp: number
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
  addAccount: (ctx: ActionCtx, payload: INormalizedAccount) => void
  removeAccount: (ctx: ActionCtx, payload: number) => void
  setDefaultAccount: (ctx: ActionCtx, payload: IAccount) => void
  switchOffTfa: (ctx: ActionCtx) => void
  loadAccountInfo: (ctx: ActionCtx, payload: IAdaptedResponse) => Promise<void>
  sendAuthRequest: (ctx: ActionCtx, payload: {username: string, password: string, token?: string}) => Promise<void>
  validateAccountsInfo: (ctx: ActionCtx) => Promise<void>
}

export interface IAccountsGetters extends GetterTree<IAccountsState, IRootState>{
  accounts: (state: IAccountsState) => Array<IAccount>
  defaultAccount: (state: IAccountsState) => IAccount
  needTfa: (state: IAccountsState) => boolean
  getStatus: (state: IAccountsState) => RequestStatus
}
