import Vue from 'vue'
import Vuex from 'vuex'

import { modules } from './modules'
import { vuexPersist } from './persistance'
import type { IRootState } from './types'

Vue.use(Vuex)

export default new Vuex.Store<IRootState>({
  modules,
  strict: true,
  plugins: [vuexPersist.plugin],
})
