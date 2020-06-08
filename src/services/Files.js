const fs = require('fs').promises
const path = require('path')

export default class Files {
  static FILES_TO_EXIST = [
    'Data',
    'Data/ruRU'
  ]

  /**
   * Check is correct directory for downloading client
   *
   * @param directory
   * @return {Promise<boolean>}
   */
  static async isCorrectClientDirectory (directory) {
    try {
      await Promise.all(Files.FILES_TO_EXIST.map(f => Files.exists(path.resolve(directory, f))))
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
  static async exists (fileOrDirectory) {
    const parent = path.dirname(fileOrDirectory)
    const file = path.basename(fileOrDirectory).toLocaleLowerCase()
    const files = await fs.readdir(parent)

    const found = files.find(f => f.toLocaleLowerCase() === file)
    if (found) {
      return path.resolve(parent, found)
    }

    throw new Error('ENOENT: File not found: ' + fileOrDirectory)
  }

  /**
   * Check that is correct file (right size and modification date if provided)
   * @param {String} path absolute path to file
   * @param {Number} size
   * @param {Number|null} timestamp
   * @return {Promise<boolean>}
   */
  static async isCorrectFile (path, size, timestamp) {
    const stats = await fs.stat(await Files.exists(path))

    return (timestamp === null || stats.mtime.getTime() === timestamp) && stats.size === size
  }

  /**
   * Remove file from disk
   * @param {String} path - absolute path to file
   * @return {Promise<void>}
   */
  static async remove (path) {
    return await fs.unlink(await Files.exists(path))
  }
}
