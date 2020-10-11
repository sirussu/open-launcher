import { ipcRenderer } from 'electron'
import { mocked } from 'ts-jest/utils'

import RenderedIpc from '@/events/ipcs/RenderedIpc'
import EventBus from '@/services/EventBus'
import LauncherEvent from '@/events/LauncherEvent'

jest.mock('electron', () => ({
  __esModule: true,
  IpcRenderer: () => ({
    on: jest.fn(),
    send: jest.fn(),
  }),
  ipcRenderer: {
    on: jest.fn(),
    send: jest.fn(),
  },
}))

describe('renderer ipc', () => {
  const MockedIpcRenderer = mocked(ipcRenderer, true)

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    MockedIpcRenderer.on.mockClear()
    MockedIpcRenderer.send.mockClear()
  })

  it('ipc registered', () => {
    /* eslint-disable no-new */
    new RenderedIpc()

    expect(ipcRenderer.on).toBeCalledTimes(1)
  })

  it('ipc send to background process with correct data', () => {
    const ipc = new RenderedIpc()
    const data = { foo: 'bar' }

    ipc.send(LauncherEvent.SELECT_GAME_DIRECTORY, { ...data })

    expect(ipcRenderer.send).toBeCalledWith(EventBus.CHANNEL_NAME, {
      event: LauncherEvent.SELECT_GAME_DIRECTORY,
      data: { ...data },
    })
  })
})
