const mock = require('mock-fs')

const Files = require('@/services/Files').default

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

  it('file exists', () => {
    expect.assertions(1)
    return Files.exists('/home/user/Name Of Directory/Data').then((path) =>
      expect(path).toEqual('/home/user/Name Of Directory/Data')
    )
  })

  it('file exists non-case sensitive filename', () => {
    expect.assertions(1)
    return Files.exists('/home/user/Name Of Directory/Data/ruRU').then((path) =>
      expect(path).toEqual('/home/user/Name Of Directory/Data/ruRU')
    )
  })

  it('check right directory structure', async () => {
    await expect(
      Files.isCorrectClientDirectory('/home/user/Name Of Directory')
    ).resolves.toBeTruthy()
  })

  it('check right directory structure', async () => {
    await expect(
      Files.isCorrectClientDirectory('/home/user')
    ).resolves.toBeFalsy()
  })

  it('remove file', async () => {
    expect.assertions(2)
    await Files.remove('/home/user/Name Of Directory/Data/ruRU/patch-9.zip')
    try {
      await Files.exists('/home/user/Name Of Directory/Data/ruRU/patch-9.zip')
    } catch (e) {
      expect(e.message).toBe(
        'ENOENT: File not found: /home/user/Name Of Directory/Data/ruRU/patch-9.zip'
      )
    }
  })

  it('check file', async () => {
    await expect(
      Files.isCorrectFile(
        '/home/user/Name Of Directory/Data/ruRU/patch-9.zip',
        FILE().getContent().length,
        new Date(1).getTime()
      )
    ).resolves.toBeTruthy()
  })

  it('check file including without timestamp', async () => {
    await expect(
      Files.isCorrectFile(
        '/home/user/Name Of Directory/Data/ruRU/patch-9.zip',
        FILE().getContent().length,
        null
      )
    ).resolves.toBeTruthy()
  })
})
