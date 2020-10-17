import { appModule as app } from './app'
import { settingsModule as settings } from './settings'
import { feedsModule as feeds } from './feeds'
import { accountsModule as accounts } from '@/store/modules/accounts'

export const modules = {
  app,
  settings,
  feeds,
  accounts,
}
