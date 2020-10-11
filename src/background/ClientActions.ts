import { dialog } from 'electron'

import LauncherListener from '@/events/LauncherListener'
import LauncherEvent from '@/events/LauncherEvent'
import eventService from '@/background/EventService'

export class SelectDirectory extends LauncherListener {
  async handle() {
    const selection = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    })
    eventService.emit(LauncherEvent.SELECT_GAME_DIRECTORY, {
      directory: selection.canceled ? null : selection.filePaths[0],
    })
  }
}

export function init() {
  eventService.on(
    LauncherEvent.OPEN_SELECT_GAME_DIRECTORY_DIALOG,
    new SelectDirectory()
  )
}
