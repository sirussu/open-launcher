import { openLink } from './openLink'
import { minimize, close } from './windowControls'
import { version } from './version'

export class ElectronInterop {
  openUrl(url: string) {
    openLink(url)
  }
  minimizeApp() {
    minimize()
  }
  closeApp() {
    close()
  }
  getAppVersion() {
    version()
  }
}

export const interop = new ElectronInterop()
