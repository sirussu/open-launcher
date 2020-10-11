import LauncherEvent from '@/events/LauncherEvent'

abstract class LauncherListener {
  once = false
  abstract handle(event: LauncherEvent, data: Record<string, unknown>)
}

export default LauncherListener
