import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'lodash/cloneDeep'

import { accountsModule } from '@/store/modules/accounts'
import { errorModule } from '@/store/modules/error'

let store, state, localVue

/* const RESPONSE = {
  positiveWithoutTfa: {
    status: 200,
    accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianR',
    expiresIn: 31536000,
    refreshToken: 'def50200e8897a384376ea78705a03818e4f7a71e388991637a40f2',
    tokenType: 'Bearer',
  },
  positiveWithTfa: {
    status: 200,
    accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianR',
    expiresIn: 31536000,
    refreshToken: 'def50200e8897a384376ea78705a03818e4f7a71e388991637a40f2',
    tokenType: 'Bearer',
    token: 'asdasdasd',
  },
  negative: {
    status: 400,
    statusText: 'Bad Request',
  },
  negativeNeedTfa: {
    status: 401,
    statusText: 'Unauthorized',
  },
} */

const ACCOUNTS = [
  {
    id: 1,
    username: 'qwe_1',
    password: 'qwerty123_1',
    token: 'asdasd_1',
  },
  {
    id: 2,
    username: 'qwerty_2',
    password: 'qwerty123_2',
    token: 'asdasd_2',
  },
  {
    id: 3,
    username: 'qwertyqwe_3',
    password: 'qwerty123_3',
    token: 'asdasd_3',
  },
]

describe("Vuex accounts module sync fn's", () => {
  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)

    store = new Vuex.Store({
      modules: {
        accounts: cloneDeep(accountsModule),
      },
    })

    state = store.state.accounts
  })

  test('addAccount should add account in accounts list', () => {
    state.accounts.push(ACCOUNTS[0])

    store.dispatch('accounts/addAccount', ACCOUNTS[1])
    expect(state.accounts).toHaveLength(2)
  })

  test('addAccount should set defaultId first time', () => {
    store.dispatch('accounts/addAccount', ACCOUNTS[0])
    expect(state.defaultId).toBe(ACCOUNTS[0].id)
  })

  test('addAccount should NOT add account if this account already exist in accounts list', () => {
    state.accounts.push(ACCOUNTS[0])

    store.dispatch('accounts/addAccount', ACCOUNTS[0])
    expect(state.accounts).toHaveLength(1)
  })

  test('removeAccount should remove account from accounts list', () => {
    state.accounts.push(...ACCOUNTS)

    store.dispatch('accounts/removeAccount', ACCOUNTS[0].id)
    expect(state.accounts).toHaveLength(2)
    expect(state.accounts).toEqual(
      expect.arrayContaining([ACCOUNTS[1], ACCOUNTS[2]])
    )
  })

  test('removeAccount should set default account if need', () => {
    state.accounts.push(...ACCOUNTS)
    state.defaultId = ACCOUNTS[0].id

    store.dispatch('accounts/removeAccount', ACCOUNTS[0].id)
    expect(state.defaultId).toBe(ACCOUNTS[1].id)
  })

  test('setDefaultAccount should set default account', () => {
    state.accounts.push(...ACCOUNTS)

    store.dispatch('accounts/setDefaultAccount', ACCOUNTS[2].id)
    expect(state.defaultId).toBe(ACCOUNTS[2].id)
  })
})

describe('Vuex accounts module sendAuthRequest async fn', () => {
  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)

    store = new Vuex.Store({
      modules: {
        accounts: cloneDeep(accountsModule),
        error: cloneDeep(errorModule),
      },
    })

    state = store.state.accounts
  })

  test('sendAuthRequest should call setAccounts in positive case', () => {})

  test('sendAuthRequest should call loadAccountInfo in positive case', () => {})
})
