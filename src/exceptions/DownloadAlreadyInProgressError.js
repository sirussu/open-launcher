export default class DownloadAlreadyInProgressError extends Error {
  constructor (message) {
    super(message)
    this.name = 'DownloadAlreadyInProgressError'
  }
}
