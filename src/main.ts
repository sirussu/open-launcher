import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/app.scss'
import vuetifyConfig from './modules/vuetify'
import i18n from './modules/i18n'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify: vuetifyConfig(),
  i18n: i18n(),
  render: (h) => h(App),
}).$mount('#app')
