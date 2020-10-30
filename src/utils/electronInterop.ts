import { openLink } from './openLink'
import { minimize, close } from './remote/windowControls'
import { version } from './remote/version'

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
