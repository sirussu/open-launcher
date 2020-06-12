import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/app.scss'
import vuetify from './modules/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
