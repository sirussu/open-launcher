import type { AppState } from './modules/App'
import type { SettingsState } from './modules/Settings'

export interface RootState {
  app: AppState
  settings: SettingsState
}
