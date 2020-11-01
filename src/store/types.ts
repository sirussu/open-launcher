import type { IAppState } from './modules/app'
import type { ISettingsState } from './modules/settings'
import type { IFeedState } from './modules/feeds'
import type { IStatusState } from './modules/statusBar/types'
import type { IAccountsState } from './modules/accounts/types'
import type { IWelcomeState } from './modules/welcome'
import type { INotificationState } from './modules/notification'

export interface IRootState {
  app: IAppState
  settings: ISettingsState
  feeds: IFeedState
  status: IStatusState
  accounts: IAccountsState
  welcome: IWelcomeState
  norification: INotificationState
}
