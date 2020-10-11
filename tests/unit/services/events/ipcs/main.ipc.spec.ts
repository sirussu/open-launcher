import { ipcMain, BrowserWindow, WebContents } from 'electron'
import { mocked } from 'ts-jest/utils'

import LauncherEvent from '@/events/LauncherEvent'
import MainIpc from '@/events/ipcs/MainIpc'

jest.mock('electron', function () {
  return {
    __esModule: true,
    ipcMain: {
      on: jest.fn(),
    },
    WebContents: jest.fn(() => ({
      send: jest.fn(),
    })),
    BrowserWindow: {
      getAllWindows: jest.fn(() => [
        {
          webContents: new WebContents(),
        },
      ]),
    },
  }
})

describe('main ipc', () => {
  const MockedIpcRenderer = mocked(ipcMain, true)
  const MockedBrowserWindow = mocked(BrowserWindow, true)
  const MockedWebContents = mocked(WebContents, true)

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    MockedIpcRenderer.on.mockClear()
    MockedWebContents.mockClear()
    MockedBrowserWindow.getAllWindows.mockClear()
  })

  it('ipc registered', () => {
    /* eslint-disable no-new */
    new MainIpc()

    expect(ipcMain.on).toBeCalledTimes(1)
  })

  it('ipc send to background process with correct data', () => {
    const ipc = new MainIpc()
    const data = { foo: 'bar' }

    ipc.send(LauncherEvent.SELECT_GAME_DIRECTORY, { ...data })

    expect(BrowserWindow.getAllWindows).toBeCalled()
  })
})
