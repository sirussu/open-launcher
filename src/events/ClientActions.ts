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
      const correct = await store.dispatch('setClientDirectory', directory)
      if (correct) {
        return
      }
    }

    eventService.emit(LauncherEvent.WRONG_GAME_DIRECTORY_SELECTED, {
      directory,
    })
  }
}

export default {
  init() {
    eventService.on(
      LauncherEvent.SELECT_GAME_DIRECTORY,
      new DirectorySelected()
    )
  },
}
