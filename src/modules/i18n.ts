import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from '../locales/en.json'
import ru from '../locales/ru.json'

Vue.use(VueI18n)

const pluralizationRules = {
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
}

export const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE,
  messages: {
    en,
    ru,
  },
  pluralizationRules,
})
