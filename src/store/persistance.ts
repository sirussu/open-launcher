import VuexPersist from 'vuex-persist'

import LauncherFile from '@/entities/LauncherFile'

import type { RootState } from './types'

export const vuexPersist = new VuexPersist<RootState>({
  storage: window.localStorage,
  restoreState: (key, storage) => {
    const data = storage?.getItem(key)

    if (typeof data === 'string') {
      const state = JSON.parse(data)

      if (state.app) {
        state.app.launcherFiles = state?.app.launcherFiles.map(
          LauncherFile.fromObject
        )
      }

      return state
    }

    return {}
  },
})
