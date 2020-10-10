import { ipcRenderer } from 'electron'

import EventBus, { Ipc, IpcCallback } from '@/services/EventBus'
import LauncherEvent from '@/events/LauncherEvent'

class MainIpc implements Ipc {
  private onCallback: IpcCallback | null = null

  constructor() {
    ipcRenderer.on(EventBus.CHANNEL_NAME, (event, args) => {
      if (this.onCallback) {
        this.onCallback(args)
      }
    })
  }

  on(callback: IpcCallback) {
    this.onCallback = callback
  }

  send(event: LauncherEvent, data: Record<string, unknown>) {
    ipcRenderer.send(EventBus.CHANNEL_NAME, { event, data })
  }
}

const mainIpc = new MainIpc()

export default new EventBus(mainIpc)
