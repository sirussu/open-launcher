import { promises as fs, createReadStream } from 'fs'
import path from 'path'
import crypto from 'crypto'

export class FileCheckProgress {
  public bytes = 0
  public bytesDone = 0
  public path: string | null = null

  constructor(bytes: number, path: string, bytesDone: number) {
    this.bytes = bytes
    this.path = path
    this.bytesDone = bytesDone
  }
}

export default class Files {
  static FILES_TO_EXIST = ['Data', 'Data/ruRU']

  /**
   * Check is correct directory for downloading client
   *
   * @param directory
   * @return {Promise<boolean>}
   */
  static async isCorrectClientDirectory(directory) {
    try {
      await Promise.all(
        Files.FILES_TO_EXIST.map((f) =>
          Files.exists(path.resolve(directory, f))
        )
      )
      return true
    } catch (e) {
      return false
    }
  }

  /**
   * Check existence of file or directory (filename - case-insensitive)
   * We can check whole path case-insensitive, but that requires to go from '/' - bad idea
   * @param fileOrDirectory
   * @return {Promise<string>} real path to file
   */
  static async exists(fileOrDirectory) {
    const parent = path.dirname(fileOrDirectory)
    const file = path.basename(fileOrDirectory).toLocaleLowerCase()
    const files = await fs.readdir(parent)

    const found = files.find((f) => f.toLocaleLowerCase() === file)
    if (found) {
      return path.resolve(parent, found)
    }

    throw new Error('ENOENT: File not found: ' + fileOrDirectory)
  }

  /**
   * Return md5 hash of exist file
   * @param path - path to file
   * @param onProgress
   */
  static async getFileHash(
    path: string,
    onProgress?: (progress: FileCheckProgress) => void
  ) {
    const stats = await fs.stat(path)

    const hash = crypto.createHash('md5')
    const fileStream = createReadStream(path)

    let bytesDone = 0

    if (onProgress) {
      onProgress(new FileCheckProgress(stats.size, path, bytesDone))
    }

    return new Promise((resolve, reject) => {
      fileStream.on('data', (data) => {
        hash.update(data)
        bytesDone += data.length
        if (onProgress) {
          onProgress(new FileCheckProgress(stats.size, path, bytesDone))
        }
      })

      fileStream.on('end', () => {
        resolve(hash.digest('hex').toLocaleLowerCase())
      })

      fileStream.on('error', error => {
        reject(error)
      })
    })
  }

  /**
   * Check that is correct file (right size and modification date if provided)
   * @param {String} path absolute path to file
   * @param {Number} size
   * @param {Number|null} timestamp
   * @return {Promise<boolean>}
   */
  static async isCorrectFile(path, size, timestamp) {
    const stats = await fs.stat(await Files.exists(path))

    return (
      (timestamp === null || stats.mtime.getTime() === timestamp) &&
      stats.size === size
    )
  }

  /**
   * Remove file from disk
   * @param {String} path - absolute path to file
   * @return {Promise<void>}
   */
  static async remove(path) {
    return await fs.unlink(await Files.exists(path))
  }
}
