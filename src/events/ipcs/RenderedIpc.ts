import { ipcRenderer } from 'electron'

import EventBus, { Ipc } from '@/services/EventBus'
import LauncherEvent from '@/events/LauncherEvent'

export default class RenderedIpc extends Ipc {
  constructor() {
    super(ipcRenderer)
  }

  send(event: LauncherEvent, data: Record<string, unknown>) {
    ipcRenderer.send(EventBus.CHANNEL_NAME, { event, data })
  }
}
