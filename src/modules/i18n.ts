import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from '../locales/en.json'
import ru from '../locales/ru.json'

Vue.use(VueI18n)

export default () =>
  new VueI18n({
    locale: process.env.VUE_APP_I18N_LOCALE || 'en',
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
    messages: {
      en,
      ru,
    },
    pluralizationRules: {
      'ru': (choice: number, choicesLength: number) => {
        if (choice === 0) {
          return 0
        }

        let result
        const teen = choice > 10 && choice < 20
        const endsWithOne = choice % 10 === 1

        if ((!teen && endsWithOne) && choicesLength < 4) {
          result = 1
        } else {
          result = 2
        }

        if (choicesLength < 4) {
          result = 2
        } else {
          result = 3
        }

        if (!teen && endsWithOne) {
          result = 1
        }

        if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
          result = 2
        }

        return result
      }
    }
  })
