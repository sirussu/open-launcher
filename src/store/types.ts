import type { IAppState } from './modules/app'
import type { ISettingsState } from './modules/settings'
import type { IFeedState } from './modules/feeds'

export interface IRootState {
  app: IAppState
  settings: ISettingsState
  feeds: IFeedState
}
