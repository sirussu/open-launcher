import { createLocalVue, mount } from '@vue/test-utils'

import VueI18n from 'vue-i18n'
// @ts-ignore
import StatusBar from '@/views/statusBar/StatusBar.vue'
import en from '@/locales/en.json'
import ru from '@/locales/ru.json'

const localVue = createLocalVue()
localVue.use(VueI18n)

const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: {
    en,
    ru,
  },
  pluralizationRules: {
    ru: (choice: number) => {
      if (choice === 0) {
        return 0
      }

      let form

      if (choice % 10 === 1 && choice % 100 !== 11) {
        form = 0
      } else if (
        choice % 10 >= 2 &&
        choice % 10 <= 4 &&
        (choice % 100 < 10 || choice % 100 >= 20)
      ) {
        form = 1
      } else {
        form = 2
      }

      return form
    },
  },
})

const cases = [0, 1, 2, 5, 1001, 1002, 1005, 1011, 1012]
const expectedCases = {
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
const getExpected = (currentCase: number): string => expectedCases[currentCase]

describe('Status bar component', () => {
  const wrapper = mount(StatusBar, {
    localVue,
    i18n,
  })

  test.each(cases)('correct plural ru locale', async (currentCase) => {
    await wrapper.setProps({ realms: [], online: currentCase })

    const online = wrapper.find('.online')
    const expected = getExpected(currentCase)

    expect(wrapper.isVisible()).toBe(true)
    expect(online.text()).toBe(expected)
  })
})
