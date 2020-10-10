import eventService from '@/services/EventService'
import LauncherEvent from '@/events/LauncherEvent'
import LauncherListener from '@/events/LauncherListener'
import store from '@/store'

export class DirectorySelected extends LauncherListener {
  async handle(event: LauncherEvent, data: Record<string, unknown>) {
    const { directory } = data
    if (directory) {
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

eventService.on(LauncherEvent.SELECT_GAME_DIRECTORY, new DirectorySelected())
