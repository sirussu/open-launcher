import Vuex, { Store } from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'

import i18n from '@/modules/i18n'
import StatusBarBlock from '@/views/blocks/StatusBarBlock.vue'

import pluralStub from './stubs/statusBarPluralForms.json'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Status bar component', () => {
  let getters
  let store

  beforeEach(() => {
    getters = {
      summaryOnline: (online: number = 1001) => online,
    }

    store = new Store({
      getters,
    })
  })

  test('correct plural ru locale', () => {
    const wrapper = mount(StatusBarBlock, {
      localVue,
      i18n: i18n(),
    })

    const online = wrapper.find('.online')

    console.log(store.getters)

    expect(wrapper.isVisible()).toBe(true)
    expect(online.text()).toBe(pluralStub[0])
  })
})
