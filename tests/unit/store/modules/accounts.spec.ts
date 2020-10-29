import { createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import nock from 'nock'
import { advanceBy, advanceTo, clear } from 'jest-date-mock'

import { accountsModule } from '@/store/modules/accounts'
import { notificationModule } from '@/store/modules/notification'
import { IAccountsState } from '@/store/modules/accounts/types'

import tokensStub from './stubs/tokens.json'
import accountInfoStub from './stubs/accountInfo.json'
import accountStub from './stubs/defaultAccount.json'
import normalizedAccountStub from './stubs/normalizedAccount.json'

describe('accounts module', () => {
  let store: Store<{ accounts: IAccountsState }>
  let localVue
  const baseURL = 'https://api.sirus.su'

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)

    store = new Vuex.Store({
      modules: {
        accounts: cloneDeep(accountsModule),
        notification: cloneDeep(notificationModule),
      },
    })

    nock.cleanAll()
    clear()
  })

  test('correct account from request & setting as default', async () => {
    nock(baseURL).post('/oauth/token').reply(200, tokensStub)
    nock(baseURL).get('/api/user').reply(200, accountInfoStub)

    await store.dispatch('accounts/sendAuthRequest', {
      username: 'asddsa',
      password: 'asddsaasddsa',
    })

    expect(Object.keys(store.getters)).toContain('accounts/accounts')
    expect(Object.keys(store.getters)).toContain('accounts/defaultAccount')
    expect(store.getters['accounts/accounts']).toHaveLength(1)
    expect(store.getters['accounts/defaultAccount']).toMatchObject(accountStub)
  })

  test('validate account information', async () => {
    nock(baseURL).post('/oauth/token').reply(400)

    await store.dispatch('accounts/addAccount', normalizedAccountStub)
    expect(store.getters['accounts/accounts']).toHaveLength(1)

    await store.dispatch('accounts/controlValidationTimestamp')
    expect(store.state.accounts.accounts.data.byId[normalizedAccountStub.id].tokenIsExpired).toBe(true)
  })

  test('controlValidationTimestamp with offset', async () => {
    nock(baseURL).post('/oauth/token').reply(200)
    advanceTo(new Date(2020, 9, 28, 19, 0, 0))
// TODO: advanceBy = offset
    await store.dispatch('accounts/addAccount', normalizedAccountStub)
    expect(store.getters['accounts/accounts']).toHaveLength(1)

    await store.dispatch('accounts/controlValidationTimestamp')
    expect(store.state.accounts.accounts.data.byId[normalizedAccountStub.id].tokenIsExpired).toBe(true)


  })

  /*test('re-login with tfa', async () => {
    nock(baseURL).post('/oauth/token').reply(401)
    nock(baseURL).post('/oauth/token').reply(200, tokensStub)
    nock(baseURL).get('/api/user').reply(200, accountInfoStub)

    await store.dispatch('accounts/sendAuthRequest', { username: 'asddsa', password: 'asddsaasddsa', token: undefined, isReLogin: true })
    expect(store.state.accounts.accounts.data.allIds).toHaveLength(0)

    await store.dispatch('accounts/sendAuthRequest', { username: 'asddsa', password: 'asddsaasddsa', token: '123123', isReLogin: true })
    expect(store.state.accounts.accounts.data.allIds).toHaveLength(1)
  })*/
})
