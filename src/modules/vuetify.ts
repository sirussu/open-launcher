import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import ru from 'vuetify/es5/locale/ru'
import en from 'vuetify/es5/locale/en'

Vue.use(Vuetify)

export const initVuetify = () =>
  new Vuetify({
    lang: {
      locales: { ru, en },
      current: 'ru',
    },
    icons: {
      iconfont: 'mdiSvg',
    },
    theme: {
      dark: true,
    },
  })
