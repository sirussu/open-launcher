import { ipcMain, BrowserWindow } from 'electron'

import EventBus, { Ipc, IpcCallback } from '@/services/EventBus'
import LauncherEvent from '@/events/LauncherEvent'

export default class MainIpc implements Ipc {
  private onCallback: IpcCallback | null = null

  constructor() {
    ipcMain.on(EventBus.CHANNEL_NAME, (event, args) => {
      if (this.onCallback) {
        this.onCallback(args)
      }
    })
  }

  on(callback: IpcCallback) {
    this.onCallback = callback
  }

  send(event: LauncherEvent, data: Record<string, unknown>) {
    BrowserWindow.getAllWindows().forEach((w) =>
      w.webContents.send(EventBus.CHANNEL_NAME, { event, data })
    )
  }
}
