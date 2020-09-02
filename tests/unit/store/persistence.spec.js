import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

import appStore from '@/store/modules/App'
import createPersistencePlugin from '@/store/persistance'

describe('File list receive', () => {
  let store
  let localVue

  const FILES = [
    {
      fileAttributes: {
        filename: 'patch-d.zip',
        path: '/Data/',
        size: 174954589,
        md5: '393ABCBA77B8E369DD83109CBA76A285',
        host: 'http://51.15.228.31:8080/api/client/patches/',
        storagePath: '/new-live/',
        updatedAt: '2019-06-05',
      },
      downloadAttributes: {
        isDownloading: true,
      },
    },
  ]

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)
  })

  it('check persistence with class', async () => {
    localStorage.setItem(
      'user_data',
      JSON.stringify({
        vuex: {
          App: {
            launcherFiles: FILES,
          },
        },
      })
    )

    store = new Vuex.Store({
      modules: {
        App: cloneDeep(appStore),
      },
      plugins: [createPersistencePlugin().plugin],
    })

    expect(store.state.App.launcherFiles.length).toBe(FILES.length)
  })
})
