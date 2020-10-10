import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import Vue from 'vue'

import { addDecorator } from '@storybook/vue'
import { action } from '@storybook/addon-actions'

import * as _Vuetify from 'vuetify/lib'
import ru from 'vuetify/es5/locale/ru'
import en from 'vuetify/es5/locale/en'

import '@/assets/app.scss'

import i18nConfig from '../src/modules/i18n'

const Vuetify = _Vuetify.default

const isVueComponent = (obj) => obj.name === 'VueComponent'

const VComponents = Object.entries(_Vuetify).reduce((acc, [key, exported]) => {
  if (isVueComponent(exported)) {
    acc[key] = exported
  }

  return acc
}, {})

Vue.use(Vuetify, {
  components: {
    ...VComponents,
  },
})

Vue.use((Vue) => {
  Vue.prototype.$interop = {
    openUrl(link) {
      action('openUrl')(link)
    },
  }
})

const appDecorator = () => {
  return {
    i18n: i18nConfig(),
    vuetify: new Vuetify({
      lang: {
        locales: { ru, en },
        current: 'ru',
      },
      theme: {
        dark: true,
      },
    }),
    template: `
      <v-app>
          <v-main>
            <story/>
          </v-main>
      </v-app>
    `,
  }
}

addDecorator(appDecorator)