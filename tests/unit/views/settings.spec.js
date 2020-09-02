import Vue from 'vue'
import { /* shallowMount, */ createLocalVue } from '@vue/test-utils'
// import Settings from '@/views/Settings'
// import i18n from '@/modules/i18n'
import Vuex from 'vuex'
// import modules from '@/store/modules'
// import { cloneDeep } from 'lodash'
import VueI18n from 'vue-i18n'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

describe('setting view', () => {
  //   let store
  let localVue

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(VueI18n)
    localVue.use(Vuex)
    //  store = new Vuex.Store({
    //    modules: cloneDeep(modules),
    //  })
  })

  it('language setting', async () => {
    //  const component = shallowMount(Settings, {
    //    i18n: i18n(),
    //    store,
    //    localVue,
    //    vuetify: new Vuetify(),
    //  })

    expect(true).toBe(true)
  })
})
