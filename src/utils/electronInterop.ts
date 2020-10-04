import { openLink } from './openLink'

export class ElectronInterop {
  openUrl(url: string) {
    openLink(url)
  }
}

export const interop = new ElectronInterop()
