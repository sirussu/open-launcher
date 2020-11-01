import { dialog } from 'electron'

import LauncherListener from '@/events/LauncherListener'
import LauncherEvent from '@/events/LauncherEvent'
import eventService from '@/background/EventService'
import LauncherFile from '@/entities/LauncherFile'
import fileManageService from '@/services/FileManageService'

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

export class ValidateFileList extends LauncherListener {
  async handle(
    event: LauncherEvent,
    { files, clientPath }: { files: Array<LauncherFile>; clientPath: string }
  ) {
    fileManageService.clientPath = clientPath

    files.forEach(async (file) => {
      file.isValidating = true
      file.isValid = await fileManageService.isValidFile(file)
      file.isValidating = false
    })
  }
}

export function init() {
  eventService.on(
    LauncherEvent.OPEN_SELECT_GAME_DIRECTORY_DIALOG,
    new SelectDirectory()
  )
  eventService.on(LauncherEvent.FILE_LIST_UPDATED, new ValidateFileList())
}
