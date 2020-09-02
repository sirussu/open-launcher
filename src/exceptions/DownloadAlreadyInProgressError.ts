export default class DownloadAlreadyInProgressError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'DownloadAlreadyInProgressError'
  }
}
