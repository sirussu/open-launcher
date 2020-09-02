// eslint-disable-next-line no-unused-vars
const { app, BrowserWindow, shell, dialog } = require('electron')
const { ipcRenderer } = require('electron')

function downloadFile ({ filename, absolutePath, url }) {
  console.log(filename, absolutePath, url)
  ipcRenderer.send('download', { filename, absolutePath, url, range: 'bytes=104216-' })
}

export default { downloadFile }
