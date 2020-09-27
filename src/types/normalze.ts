import { RequestStatus } from './network'

export type NormalizedAdditional = {
  status: RequestStatus
}

export type NormalizedSchema<IData> = {
  data: {
    allIds: Array<number | string>
    byId: Record<number | string, IData>
  }
  additional?: NormalizedAdditional
}
