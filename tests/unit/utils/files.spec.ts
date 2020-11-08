import mock from 'mock-fs'

import {
  isCorrectClientDirectory,
  isCorrectFile,
  isFileExists,
  removeFile,
} from '@/utils/files'

describe('File helper', () => {
  const FILE = mock.file({
    content: Buffer.from([8, 6, 7, 5, 3, 0, 9]),
    ctime: new Date(1),
    mtime: new Date(1),
  })

  beforeEach(() => {
    mock({
      '/home/user/Name Of Directory/Data/ruRU': {
        'patch-9.zip': FILE,
      },
    })
  })

  afterAll(() => {
    mock.restore()
  })

  it('file exists', async () => {
    expect.assertions(1)

    expect(await isFileExists('/home/user/Name Of Directory/Data')).toBe(true)
  })

  it('file exists non-case sensitive filename', async () => {
    expect.assertions(1)

    expect(await isFileExists('/home/user/Name Of Directory/Data/ruRU')).toBe(
      true
    )
  })

  it('check right directory structure', async () => {
    expect(await isCorrectClientDirectory('/home/user/Name Of Directory')).toBe(
      true
    )
  })

  it('check right directory structure', async () => {
    expect(await isCorrectClientDirectory('/home/user')).toBe(false)
  })

  it('remove file', async () => {
    await removeFile('/home/user/Name Of Directory/Data/ruRU/patch-9.zip')

    expect(
      await isFileExists('/home/user/Name Of Directory/Data/ruRU/patch-9.zip')
    ).toBe(false)
  })

  it('check file', async () => {
    expect(
      await isCorrectFile(
        '/home/user/Name Of Directory/Data/ruRU/patch-9.zip',
        FILE().getContent().length,
        new Date(1).getTime()
      )
    ).toBe(true)
  })

  it('check file including without timestamp', async () => {
    expect(
      await isCorrectFile(
        '/home/user/Name Of Directory/Data/ruRU/patch-9.zip',
        FILE().getContent().length
      )
    ).toBe(true)
  })
})
