import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import appStore from '@/store/modules/App'
import { cloneDeep } from 'lodash'
import nock from 'nock'

describe('File list receive', () => {
  let store
  let localVue

  const RESPONSE = {
    patches: [{
      filename: 'patch-d.zip',
      path: '/Data/',
      size: 174954589,
      md5: '393ABCBA77B8E369DD83109CBA76A285',
      host: 'http://51.15.228.31:8080/api/client/patches/',
      storagePath: '/new-live/',
      updatedAt: '2019-06-05'
    }, {
      filename: 'patch-ruRU-6.zip',
      path: '/Data/ruRU/',
      size: 25191304,
      md5: '0522CA7960F8E3D7CB445D5CF109E682',
      host: 'http://51.15.228.31:8080/api/client/patches/',
      storagePath: '/new-live/',
      updatedAt: '2020-04-16'
    }, {
      filename: 'run.exe',
      path: '/',
      size: 7704216,
      md5: '45DF7FF8670ABBD6A8F2A590B4B0CCF4',
      host: 'http://51.15.228.31:8080/api/client/patches/',
      storagePath: '/new-live/',
      updatedAt: '2019-05-14'
    }],
    delete: [{
      id: 84,
      path: '/Data/ruRU/patch-ruRU-h.zip',
      status: 1,
      isNew: true,
      createdAt: '2017-02-11',
      updatedAt: '2017-02-11',
      new: true
    }, {
      id: 85,
      path: '/Data/ruRU/patch-ruRU-k.zip',
      status: 1,
      isNew: true,
      createdAt: '2017-02-11',
      updatedAt: '2017-02-11',
      new: true
    }, {
      id: 86,
      path: '/Data/patch-k.zip',
      status: 1,
      isNew: true,
      createdAt: '2017-02-11',
      updatedAt: '2017-02-11',
      new: true
    }]
  }

  nock('http://51.15.228.31:8080')
    .get('/api/client/patches')
    .reply(200, RESPONSE)

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)

    store = new Vuex.Store({ modules: { App: cloneDeep(appStore) } })
  })

  it('load file list from server', async () => {
    await store.dispatch('loadFiles')
    expect(store.state.App.files).toStrictEqual(RESPONSE.patches)
  })
})
