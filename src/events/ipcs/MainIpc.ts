import { ipcMain, BrowserWindow } from 'electron'

import EventBus, { Ipc } from '@/services/EventBus'
import LauncherEvent from '@/events/LauncherEvent'

export default class MainIpc extends Ipc {
  constructor() {
    super(ipcMain)
  }

  send(event: LauncherEvent, data: Record<string, unknown>) {
    BrowserWindow.getAllWindows().forEach((w) =>
      w.webContents.send(EventBus.CHANNEL_NAME, { event, data })
    )
  }
}
