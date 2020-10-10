import { mocked } from 'ts-jest/utils'

import EventBus from '@/services/EventBus'
import RenderedIpc from '@/events/ipcs/RenderedIpc'
import LauncherEvent from '@/events/LauncherEvent'
import { DirectorySelected } from '@/events/ClientActions'

jest.mock('@/events/ipcs/RenderedIpc')
jest.mock('@/events/ClientActions')

describe('Event Bus', function () {
  const MockedIpc = mocked(RenderedIpc, true)
  const MockedDirectorySelected = mocked(DirectorySelected, true)

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    MockedIpc.mockClear()
    MockedDirectorySelected.mockClear()
  })

  it('event registration and emit', () => {
    const ipc = new RenderedIpc()
    const bus = new EventBus(ipc)
    const listener = new DirectorySelected()
    bus.on(LauncherEvent.SELECT_GAME_DIRECTORY, listener)
    bus.emit(LauncherEvent.SELECT_GAME_DIRECTORY, {})
    expect(listener.handle).toBeCalled()
  })

  it('multiple events called', () => {
    const ipc = new RenderedIpc()
    const bus = new EventBus(ipc)
    const listener = new DirectorySelected()
    const listener2 = new DirectorySelected()

    bus.on(LauncherEvent.SELECT_GAME_DIRECTORY, listener)
    bus.on(LauncherEvent.SELECT_GAME_DIRECTORY, listener2)

    bus.emit(LauncherEvent.SELECT_GAME_DIRECTORY, {})

    expect(listener.handle).toBeCalled()
    expect(listener2.handle).toBeCalled()
  })

  it('correct listener used', () => {
    const ipc = new RenderedIpc()
    const bus = new EventBus(ipc)
    const listener = new DirectorySelected()
    const listener2 = new DirectorySelected()

    bus.on(LauncherEvent.WRONG_GAME_DIRECTORY_SELECTED, listener)
    bus.on(LauncherEvent.SELECT_GAME_DIRECTORY, listener2)

    bus.emit(LauncherEvent.SELECT_GAME_DIRECTORY, {})

    expect(listener.handle).not.toBeCalled()
    expect(listener2.handle).toBeCalled()
  })

  it('data passed correctly', () => {
    const ipc = new RenderedIpc()
    const bus = new EventBus(ipc)
    const listener = new DirectorySelected()

    const data = { foo: 'bar' }

    bus.on(LauncherEvent.SELECT_GAME_DIRECTORY, listener)

    bus.emit(LauncherEvent.SELECT_GAME_DIRECTORY, { ...data })

    expect(listener.handle).toBeCalledWith(
      LauncherEvent.SELECT_GAME_DIRECTORY,
      { ...data }
    )
  })

  it('once listener called once', () => {
    const ipc = new RenderedIpc()
    const bus = new EventBus(ipc)
    const listener = new DirectorySelected()
    listener.once = true

    bus.on(LauncherEvent.SELECT_GAME_DIRECTORY, listener)

    bus.emit(LauncherEvent.SELECT_GAME_DIRECTORY, {})
    bus.emit(LauncherEvent.SELECT_GAME_DIRECTORY, {})

    expect(listener.handle).toBeCalledTimes(1)
  })

  it('correctly called more then one time', () => {
    const ipc = new RenderedIpc()
    const bus = new EventBus(ipc)
    const listener = new DirectorySelected()

    bus.on(LauncherEvent.SELECT_GAME_DIRECTORY, listener)

    bus.emit(LauncherEvent.SELECT_GAME_DIRECTORY, {})
    bus.emit(LauncherEvent.SELECT_GAME_DIRECTORY, {})

    expect(listener.handle).toBeCalledTimes(2)
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
