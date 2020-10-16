import type { IAppState } from './modules/app'
import type { ISettingsState } from './modules/settings'
import type { IFeedState } from './modules/feeds'
import type { IStatusState } from './modules/statusBar/types'
import type { IAccountsState } from '@/store/modules/accounts/types'

export interface IRootState {
  app: IAppState
  settings: ISettingsState
  feeds: IFeedState
  status: IStatusState
  accounts: IAccountsState
}
