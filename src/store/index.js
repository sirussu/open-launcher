import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import modules from './modules'
import { storage } from '@/services/PersistentStore'

const vuexPersist = new VuexPersist({
  storage: storage
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  strict: true,
  plugins: [
    vuexPersist.plugin
  ]
})
