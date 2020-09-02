import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import vuexPersist from '@/store/persistance'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  strict: true,
  plugins: [vuexPersist().plugin],
})
