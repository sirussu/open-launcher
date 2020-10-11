import { mocked } from 'ts-jest/utils'

import EventBus from '@/services/EventBus'
import RenderedIpc from '@/events/ipcs/RenderedIpc'
import LauncherEvent from '@/events/LauncherEvent'
import { DirectorySelected } from '@/events/ClientActions'

jest.mock('@/events/ipcs/RenderedIpc')
jest.mock('@/events/ClientActions')

describe('event service', () => {
  const MockedIpc = mocked(RenderedIpc, true)
  const MockedDirectorySelected = mocked(DirectorySelected, true)

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    MockedIpc.mockClear()
    MockedDirectorySelected.mockClear()
  })

  it('ipc registered', () => {
    const ipc = new RenderedIpc()
    /* eslint-disable no-new */
    new EventBus(ipc)

    expect(ipc.on).toBeCalled()
  })

  it('ipc send on even emit', () => {
    const ipc = new RenderedIpc()
    const bus = new EventBus(ipc)
    const listener = new DirectorySelected()
    bus.on(LauncherEvent.SELECT_GAME_DIRECTORY, listener)
    bus.emit(LauncherEvent.SELECT_GAME_DIRECTORY, {})
    expect(ipc.send).toBeCalled()
  })
})
