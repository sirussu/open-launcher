import { NormalizedSchema, NormalizedAdditional } from '@/types/normalze'

import { IRootState } from '@/store/types'
import { ActionContext, ActionTree, GetterTree } from 'vuex'

export interface IRealm {
  id: number
  name: string
  isOnline: boolean
  online: number
}

export interface IRealmAdditional extends NormalizedAdditional {
  summaryOnline: number
}

export interface IStatusState extends NormalizedSchema<IRealm>{
  realms: NormalizedSchema<IRealm>
  additional: IRealmAdditional
}

export interface IStatusGetters extends GetterTree<IStatusState, IRootState> {
  realms: (state: IStatusState) => Array<IRealm>
  summaryOnline: (state: IStatusState) => number
}

export interface IStatusActions extends ActionTree<IStatusState, IRootState> {
  getRealms: (ctx: ActionContext<IStatusState, IRootState>) => Promise<void>
}
