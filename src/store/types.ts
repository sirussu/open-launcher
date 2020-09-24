import type { IAppState } from './modules/App'
import type { ISettingsState } from './modules/Settings'

export interface IRootState {
  app: IAppState
  settings: ISettingsState
}
