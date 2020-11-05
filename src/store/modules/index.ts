import { appModule as app } from './app'
import { settingsModule as settings } from './settings'
import { feedsModule as feeds } from './feeds'
import { accountsModule as accounts } from './accounts'
import { statusBarModule as status } from './statusBar'
import { notificationModule as notification } from './notification'
import { welcomeModule as welcome } from './welcome'

export const modules = {
  app,
  settings,
  feeds,
  status,
  accounts,
  notification,
  welcome,
}
