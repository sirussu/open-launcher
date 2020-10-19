import { IRootState } from '@/store/types'
import { ActionContext, ActionTree, GetterTree } from 'vuex'
import { RequestStatus } from '@/types/network'

export interface IRealm {
  id: number
  name: string
  isOnline: boolean
  online: number
}

export interface IStatusState {
  realms: Array<IRealm>
  status: RequestStatus
  summaryOnline: number
}

export interface IStatusGetters extends GetterTree<IStatusState, IRootState> {
  realms: (state: IStatusState) => Array<IRealm>
  summaryOnline: (state: IStatusState) => number
}

type ActionCtx = ActionContext<IStatusState, IRootState>

export interface IStatusActions extends ActionTree<IStatusState, IRootState> {
  getRealms: (ctx: ActionCtx) => Promise<void>
}
