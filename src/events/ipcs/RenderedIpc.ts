import EventBus, {Ipc, IpcCallback} from "@/services/EventBus";
import {ipcRenderer} from "electron";
import LauncherEvent from "@/events/LauncherEvent";

export default class RenderedIpc implements Ipc {
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
