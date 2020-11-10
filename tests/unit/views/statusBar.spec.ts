import Vue from 'vue'
import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils'

import StatusBar from '@/views/statusBar/StatusBar.vue'
import { i18n } from '@/modules/i18n'

Vue.use(Vuetify)

const pluralCases = [0, 1, 2, 5, 1001, 1002, 1005, 1011, 1012]
const expectedPlural = {
  0: '0 человек',
  1: '1 человек',
  2: '2 человека',
  5: '5 человек',
  1001: '1001 человек',
  1002: '1002 человека',
  1005: '1005 человек',
  1011: '1011 человек',
  1012: '1012 человек',
}
const getExpectedPlural = (currentCase: number): string =>
  expectedPlural[currentCase]

describe('Status bar component', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  test.each(pluralCases)('correct plural ru locale', async (currentCase) => {
    const wrapper = mount(StatusBar, {
      localVue,
      i18n,
      vuetify,
      propsData: { realms: [], online: currentCase },
      computed: {
        mappedRealms() {
          return []
        },
      },
    })

    const online = wrapper.find('.online')
    const expected = getExpectedPlural(currentCase)

    expect(wrapper.isVisible()).toBe(true)
    expect(online.text()).toBe(expected)
  })
})
