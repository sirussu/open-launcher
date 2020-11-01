import Files from '@/services/Files'
import { IValidatableFile } from '@/entities/LauncherFile'

export class FileManageService {
  private _clientPath: string | null = null

  set clientPath(value: string | null) {
    this._clientPath = value
  }

  get clientPath(): string | null {
    return this._clientPath
  }

  async isValidFile(file: IValidatableFile) {
    if (!(await Files.isCorrectFile(file.filePath, file.size, null))) {
      return false
    }

    return (
      (await Files.getFileHash(file.filePath)) === file.hash.toLocaleLowerCase()
    )
  }
}

export default new FileManageService()
