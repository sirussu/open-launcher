import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import '@/assets/app.scss'

import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import Vuelidate from 'vuelidate'

import { Interop } from '@/plugins/interop'
import * as clientActions from '@/events/ClientActions'

import i18n from './modules/i18n'
import vuetifyConfig from './modules/vuetify'
import App from './views/App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueCompositionAPI)
Vue.use(Interop)
// @ts-ignore
Vue.use(Vuelidate)

new Vue({
  router,
  store,
  vuetify: vuetifyConfig(),
  i18n: i18n(),
  created() {
    clientActions.init()
  },
  render: (h) => h(App),
}).$mount('#app')
