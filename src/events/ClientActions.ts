import eventService from '@/services/EventService'
import LauncherEvent from '@/events/LauncherEvent'
import LauncherListener from '@/events/LauncherListener'
import store from '@/store'

export class DirectorySelected extends LauncherListener {
  async handle(
    event: LauncherEvent,
    { directory }: { directory: string | null }
  ) {
    if (directory) {
      // it can be null if windows closed but directory not selected
      await store.dispatch('setClientDirectory', directory)
      // TODO: check is directory setted in the store
    }

    eventService.emit(LauncherEvent.WRONG_GAME_DIRECTORY_SELECTED, {
      directory,
    })
  }
}

export function init() {
  eventService.on(LauncherEvent.SELECT_GAME_DIRECTORY, new DirectorySelected())
}
