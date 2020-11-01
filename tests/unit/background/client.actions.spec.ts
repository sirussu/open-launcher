import { mocked } from 'ts-jest/utils'

import { ValidateFileList } from '@/background/ClientActions'
import LauncherFile from '@/entities/LauncherFile'
import LauncherEvent from '@/events/LauncherEvent'
import fileManageServier from '@/services/FileManageService'
jest.mock('@/services/FileManageService')

describe('Client action events', () => {
  const MockedFileManageService = mocked(fileManageServier, true)

  beforeEach(() => {
    MockedFileManageService.isValidFile.mockClear()
  })

  const RAW_FILES = [
    {
      filename: 'patch-d.zip',
      path: '/Data/',
      size: 174954589,
      md5: '393ABCBA77B8E369DD83109CBA76A285',
      host: 'http://51.15.228.31:8080/api/client/patches/',
      storagePath: '/new-live/',
      updatedAt: '2019-06-05',
    },
    {
      filename: 'patch-ruRU-6.zip',
      path: '/Data/ruRU/',
      size: 25191304,
      md5: '0522CA7960F8E3D7CB445D5CF109E682',
      host: 'http://51.15.228.31:8080/api/client/patches/',
      storagePath: '/new-live/',
      updatedAt: '2020-04-16',
    },
  ]

  it('validation function called', () => {
    const files = RAW_FILES.map(LauncherFile.fromObject)
    const handler = new ValidateFileList()

    handler.handle(LauncherEvent.FILE_LIST_UPDATED, {
      files,
      clientPath: '/dummy/path',
    })

    expect(MockedFileManageService.isValidFile).toBeCalledTimes(2)
  })
})
