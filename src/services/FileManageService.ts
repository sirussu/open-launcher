import Files from '@/services/Files'

abstract class CanBeValidated {
  path: string
  size: number
  hash: string

  protected constructor(path: string, size: number, hash: string) {
    this.path = path
    this.size = size
    this.hash = hash
  }
}

export default class FileManageService {
  async isValidFile(file: CanBeValidated) {
    if (!(await Files.isCorrectFile(file.path, file.size, null))) {
      return false
    }

    if ((await Files.getFileHash(file.path)) !== file.hash) {
      return false
    }
  }
}
