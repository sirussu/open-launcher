import Vue from 'vue'
import Vuex from 'vuex'

import { modules } from './modules'
import { vuexPersist } from './persistance'

import type { RootState } from './types'

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  modules,
  strict: true,
  plugins: [vuexPersist.plugin],
})
