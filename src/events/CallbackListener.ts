import LauncherEvent from '@/events/LauncherEvent'
import LauncherListener from '@/events/LauncherListener'

export default class CallbackListener extends LauncherListener {
  private readonly _callback: (
    event: LauncherEvent,
    data: Record<string, unknown>
  ) => void

  constructor(
    callback: (event: LauncherEvent, data: Record<string, unknown>) => void,
    once = false
  ) {
    super()
    this._callback = callback
    this.once = once
  }

  handle(event: LauncherEvent, data: Record<string, unknown>) {
    this._callback(event, data)
  }
}
