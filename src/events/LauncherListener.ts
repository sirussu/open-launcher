import LauncherEvent from '@/events/LauncherEvent'

abstract class LauncherListener {
  once = false
  abstract handle(event: LauncherEvent, data: any)
}

export default LauncherListener
