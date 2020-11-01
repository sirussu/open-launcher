import nodePath from 'path'

export interface IValidatableFile {
  filePath: string
  size: number
  hash: string
}

export interface IDownloadableFile {
  host: string
  path: string
  filename: string
}

export default class LauncherFile
  implements IValidatableFile, IDownloadableFile {
  host: string
  path: string
  size: number
  hash: string
  filename: string
  filePath: string

  constructor(
    filename: string,
    path: string,
    host: string,
    size: number,
    hash: string
  ) {
    this.host = host
    this.path = path
    this.size = size
    this.hash = hash
    this.filename = filename
    this.filePath = nodePath.normalize(this.path + this.filename)
  }

  downloadAttributes = {
    isDownloading: false,
    isIncomplete: false,
    isValid: false,
    isValidating: false,
  }

  get isDownloading() {
    return this.downloadAttributes.isDownloading
  }

  set isDownloading(val: boolean) {
    this.downloadAttributes.isDownloading = val
  }

  get isIncomplete() {
    return this.downloadAttributes.isIncomplete
  }

  set isIncomplete(val: boolean) {
    this.downloadAttributes.isIncomplete = val
  }

  set isValid(val: boolean) {
    this.downloadAttributes.isValid = val
  }

  get isValid() {
    return this.downloadAttributes.isValid
  }

  set isValidating(val: boolean) {
    this.downloadAttributes.isValid = val
  }

  get isValidating() {
    return this.downloadAttributes.isValid
  }

  static fromObject({ filename, md5, host, size, path }) {
    return new LauncherFile(filename, path, host, size, md5)
  }
}
