import { IpcMain, IpcRenderer } from 'electron'

import LauncherEvent from '@/events/LauncherEvent'
import LauncherListener from '@/events/LauncherListener'

export type IpcCallback = ({
  event,
  data,
}: {
  event: string
  data: Record<string, unknown>
}) => void

export abstract class Ipc {
  private onCallback: IpcCallback | null = null

  protected constructor(electronIpc: IpcMain | IpcRenderer) {
    electronIpc.on(EventBus.CHANNEL_NAME, (event, args) => {
      if (this.onCallback) {
        this.onCallback(args)
      }
    })
  }

  on(callback: IpcCallback) {
    this.onCallback = callback
  }

  abstract send(event: LauncherEvent, data: Record<string, unknown>)
}

class EventBus {
  protected events: Map<LauncherEvent, Array<LauncherListener>> = new Map<
    LauncherEvent,
    Array<LauncherListener>
  >()

  private ipc: Ipc
  static CHANNEL_NAME = 'global-event-bus'

  constructor(ipc: Ipc) {
    this.ipc = ipc

    ipc.on(({ event, data }) => {
      this.internalEmit(LauncherEvent[event], data, true)
    })
  }

  on(event: LauncherEvent, listener: LauncherListener) {
    const listeners = this.events.get(event)
    if (!listeners) {
      this.events.set(event, [listener])
    } else {
      listeners.push(listener)
    }
  }

  emit(event: LauncherEvent, data: Record<string, unknown>) {
    this.internalEmit(event, data, false)
  }

  /**
   * @param event
   * @param data
   * @param isIpc - is ipc event, we should not publish it to ipc
   * @private
   */
  private internalEmit(
    event: LauncherEvent,
    data: Record<string, unknown>,
    isIpc: boolean
  ) {
    const listeners = this.events.get(event)
    // we need to send ipc event even we have no listeners, listeners still can be registered in main/render process
    if (!isIpc) {
      this.ipc.send(event, data)
    }

    if (!listeners || listeners.length === 0) {
      return
    }

    listeners.forEach((listener, index) => {
      listener.handle(event, data)

      if (listener.once) {
        listeners.splice(index, 1)
      }
    })
  }
}

export default EventBus
