import { createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import nock from 'nock'

import { statusBarModule } from '@/store/modules/statusBar'
import { IStatusState } from '@/store/modules/statusBar/types'

import realmsStub from './stubs/realms.json'
import realmsRawStub from './stubs/realmsRaw.json'

describe('status bar module', () => {
  let store: Store<{ status: IStatusState }>
  let localVue

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)

    store = new Vuex.Store({
      modules: {
        status: cloneDeep(statusBarModule)
      }
    })

    nock.cleanAll()
  })

  test('get realms, save them in store', async () => {
    nock('https://api.sirus.su/api').get('/server/status').reply(200, realmsRawStub)

    await store.dispatch('status/getRealms')

    expect(Object.keys(store.getters)).toContain('status/realms')
    expect(store.getters['status/realms']).toHaveLength(4)
    expect(store.getters['status/realms']).toMatchObject(realmsStub)

    expect(Object.keys(store.getters)).toContain('status/summaryOnline')
    expect(store.getters['status/summaryOnline']).toBe(8674)
  })
})
