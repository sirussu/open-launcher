import Vue from 'vue'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import Vuetify from 'vuetify'
import cloneDeep from 'lodash/cloneDeep'
import { mount, createLocalVue } from '@vue/test-utils'

// @ts-ignore
import Settings from '@/views/pages/Settings.vue'
import { modules } from '@/store/modules'
import { i18n } from '@/modules/i18n'

Vue.use(Vuetify)

describe('Settings', () => {
  let store
  let localVue

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(VueI18n)
    localVue.use(Vuex)
    store = new Vuex.Store({
      modules: cloneDeep(modules),
    })
  })

  it('should render properly', () => {
    const settings = mount(Settings, {
      i18n,
      store,
      localVue,
      vuetify: new Vuetify(),
    })

    expect(settings.exists()).toBe(true)
  })
})
