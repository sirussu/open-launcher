import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import nock from 'nock'

import { appModule } from '@/store/modules/app.ts'
import LauncherFile from '@/entities/LauncherFile'

describe('File list receive', () => {
  let store
  let localVue

  const RESPONSE = {
    patches: [
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
      {
        filename: 'run.exe',
        path: '/',
        size: 7704216,
        md5: '45DF7FF8670ABBD6A8F2A590B4B0CCF4',
        host: 'http://51.15.228.31:8080/api/client/patches/',
        storagePath: '/new-live/',
        updatedAt: '2019-05-14',
      },
    ],
    delete: [
      {
        id: 84,
        path: '/Data/ruRU/patch-ruRU-h.zip',
        status: 1,
        isNew: true,
        createdAt: '2017-02-11',
        updatedAt: '2017-02-11',
        new: true,
      },
      {
        id: 85,
        path: '/Data/ruRU/patch-ruRU-k.zip',
        status: 1,
        isNew: true,
        createdAt: '2017-02-11',
        updatedAt: '2017-02-11',
        new: true,
      },
      {
        id: 86,
        path: '/Data/patch-k.zip',
        status: 1,
        isNew: true,
        createdAt: '2017-02-11',
        updatedAt: '2017-02-11',
        new: true,
      },
    ],
  }

  let incompleteFiles: [LauncherFile, LauncherFile] | [] = []

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)

    const INCOMPLETE_FILE = new LauncherFile()
    INCOMPLETE_FILE.isDownloading = true
    const INCOMPLETE_FILE_2 = new LauncherFile()
    INCOMPLETE_FILE_2.isIncomplete = true

    incompleteFiles = [INCOMPLETE_FILE, INCOMPLETE_FILE_2]

    store = new Vuex.Store({ modules: { app: cloneDeep(appModule) } })

    nock.cleanAll()
  })

  it('load file list from server', async () => {
    nock('https://api.sirus.su/')
      .get('/api/client/patches')
      .reply(200, { data: RESPONSE })

    await store.dispatch('loadFiles')
    expect(store.state.app.files).toStrictEqual(RESPONSE.patches)
    expect(store.state.app.filesToRemove).toStrictEqual(RESPONSE.delete)
  })

  it('cleanup incomplete downloads after restart', async () => {
    store.commit('SET_LAUNCHER_FILES', incompleteFiles)

    expect(
      store.state.app.launcherFiles.filter((f) => f.isIncomplete).length
    ).toBe(1)

    store.dispatch('initialStart')

    expect(
      store.state.app.launcherFiles.filter((f) => f.isIncomplete).length
    ).toBe(2)
    expect(
      store.state.app.launcherFiles.filter((f) => f.isDownloading).length
    ).toBe(0)
  })

  it('list should not be changed if error occurred', async () => {
    store.commit('SET_FILES', RESPONSE.patches)

    nock('https://api.sirus.su/')
      .get('/api/client/patches')
      .reply(500, { error: 'Internal server error' })

    try {
      await store.dispatch('loadFiles')
      expect(false).toBe(true)
    } catch (e) {
      expect(e.message).toBe('Request failed with status code 500')
    }

    expect(store.state.app.files).toStrictEqual(RESPONSE.patches)
  })
})
