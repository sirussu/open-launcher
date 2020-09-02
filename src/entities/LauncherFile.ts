export default class LauncherFile {
  fileAttributes = {}
  downloadAttributes = {
    isDownloading: false,
    isIncomplete: false
  }

  get isDownloading () {
    return this.downloadAttributes.isDownloading
  }

  set isDownloading (val) {
    this.downloadAttributes.isDownloading = val
  }

  get isIncomplete () {
    return this.downloadAttributes.isIncomplete
  }

  set isIncomplete (val) {
    this.downloadAttributes.isIncomplete = val
  }

  static fromObject(obj) {
    const launcherFile = new LauncherFile()
    launcherFile.fileAttributes = Object.assign(launcherFile.fileAttributes, obj.fileAttributes)
    launcherFile.downloadAttributes = Object.assign(launcherFile.downloadAttributes, obj.downloadAttributes)
    return launcherFile
  }
}
