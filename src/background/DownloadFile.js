const { ipcMain, session } = require('electron')
const urls = {}

function getConfigByUrl (url) {
  return urls[url]
}

function getConfigById (id) {
  return Object.values(urls).find(c => c.requestId === id)
}

export function register (win) {
  ipcMain.on('download', (event, arg) => {
    urls[arg.url] = arg
    win.webContents.downloadURL(arg.url)
  })

  win.webContents.session.on('will-download', (event, item, webContents) => {
    const config = getConfigByUrl(item.getURLChain()[0])
    const path = config.absolutePath + config.filename + '.tmp'

    item.setSavePath(path)

    console.log('Will download', config, path, item.getURL())

    item.on('updated', (event, state) => {
      if (state === 'interrupted') {
        console.log('Download is interrupted but can be resumed')
      } else if (state === 'progressing') {
        if (item.isPaused()) {
          console.log('Download is paused')
        } else {
          console.log(`Received bytes: ${item.getReceivedBytes()}`)
        }
      }
    })

    item.once('done', (event, state) => {
      if (state === 'completed') {
        console.log('Download successfully')
      } else {
        console.log(`Download failed: ${state}`, event.error)
      }
    })
  })

  session.defaultSession.webRequest.onHeadersReceived((details, next) => {
    let statusLine = details.statusLine
    if (details.statusCode === 206) { // Partial content will be automatically interrupted by electron
      const config = getConfigById(details.id)
      if (config) {
        statusLine = statusLine.replace('206 Partial Content', '200 OK')
      }
    }

    next({
      cancel: false,
      responseHeaders: details.responseHeaders,
      statusLine: statusLine
    })
  })

  session.defaultSession.webRequest.onBeforeSendHeaders({
    urls: [
      '<all_urls>'
    ]
  }, (details, next) => {
    const reqHeaders = Object.assign({}, details.requestHeaders)
    // Redirects will have same id, so just keep chain
    const config = getConfigById(details.id) || getConfigByUrl(details.url)
    if (config) {
      if (!config.requestId) { // set id
        config.requestId = details.id
      }
      if (config.range) {
        reqHeaders.Range = config.range
      }
    }
    next({
      cancel: false,
      requestHeaders: reqHeaders
    })
  })
}

export default { register }
