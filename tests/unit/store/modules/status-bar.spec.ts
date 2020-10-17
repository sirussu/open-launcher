import { createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import nock from 'nock'

import { statusBarModule } from '@/store/modules/status_bar'
import { IStatusState } from '@/store/modules/status_bar/types'

import realmsStub from './stubs/realms.json'

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
    nock('https://api.sirus.su/api').get('/server/status').reply(200, realmsStub)

    await store.dispatch('status/getRealms')

    expect(Object.keys(store.getters)).toContain('status/realms')
    expect(Object.keys(store.getters)).toContain('status/summaryOnline')
    expect(store.getters['status/summaryOnline']).toBe(8674)
    expect(store.getters['status/realms']).toHaveLength(4)
  })
})
