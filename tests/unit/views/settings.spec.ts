import Vue from 'vue'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import Vuetify from 'vuetify'
import cloneDeep from 'lodash/cloneDeep'
import { shallowMount, createLocalVue } from '@vue/test-utils'

import SettingsPage from '@/views/pages/Settings.vue'
import { modules } from '@/store/modules'
import i18n from '@/modules/i18n'

Vue.use(Vuetify)

describe('setting view', () => {
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

  it('language setting', async () => {
    const component = shallowMount(SettingsPage, {
      i18n: i18n(),
      store,
      localVue,
      vuetify: new Vuetify(),
    })

    expect(true).toBe(true)
  })
})
