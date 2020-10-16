import { appModule as app } from './app'
import { settingsModule as settings } from './settings'
import { feedsModule as feeds } from './feeds'
import { statusBarModule as status } from './status_bar'
import { accountsModule as accounts } from '@/store/modules/accounts'

export const modules = {
  app,
  settings,
  feeds,
  status,
  accounts,
}
