import { createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import nock from 'nock'

import { accountsModule } from '@/store/modules/accounts'
import { IAccountsState } from '@/store/modules/accounts/types'

import tokensStub from './stubs/tokens.json'
import accountInfoStub from './stubs/accountInfo.json'
import accountsStub from './stubs/accounts.json'

describe('accounts module', () => {
  let store: Store<{ accounts: IAccountsState }>
  let localVue
  const baseURL = 'https://api.sirus.su'

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)

    store = new Vuex.Store({
      modules: {
        accounts: cloneDeep(accountsModule)
      }
    })

    nock.cleanAll()
  })

  test('correct account from request & setting as default', async () => {
    nock(baseURL).post('/oauth/token').reply(200, tokensStub.tokens1)
    nock(baseURL).get('/api/user').reply(200, accountInfoStub.accountInfo1)

    await store.dispatch('accounts/sendAuthRequest', { username: 'asddsa', password: 'asddsaasddsa' })

    expect(Object.keys(store.getters)).toContain('accounts/accounts')
    expect(Object.keys(store.getters)).toContain('accounts/defaultAccount')
    expect(store.getters['accounts/accounts']).toHaveLength(1)
    expect(store.getters['accounts/defaultAccount']).toMatchObject(accountsStub.account1)
  })
})
