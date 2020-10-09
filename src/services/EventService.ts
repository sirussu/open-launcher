import { ipcRenderer } from 'electron'

import EventBus, { Ipc } from '@/services/EventBus'
import LauncherEvent from "@/events/LauncherEvent";

class MainIpc implements Ipc {
  private onCallback: any;

  constructor() {
    ipcRenderer.on(EventBus.CHANNEL_NAME, ((event, args) => {
      this.onCallback(args)
    }))
  }

  on(callback: ({event, data}: { event: string; data: any }) => void) {
    this.onCallback = callback
  }

  send(event: LauncherEvent, data: any) {
    ipcRenderer.send(EventBus.CHANNEL_NAME, { event, data })
  }
}

const mainIpc = new MainIpc();

export default new EventBus(mainIpc);
