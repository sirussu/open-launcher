import VuexPersist from 'vuex-persist'

import LauncherFile from '@/entities/LauncherFile'

import type { RootState } from './types'

function createPersistencePlugin() {
  const vuexPersist = new VuexPersist<RootState>({
    storage: window.localStorage,
  })

  const restoreState = vuexPersist.restoreState
  vuexPersist.restoreState = async (key, storage) => {
    const state = await restoreState(key, storage)

    if (state.app) {
      state.app.launcherFiles = state?.app.launcherFiles.map(
        LauncherFile.fromObject
      )
    }

    return state
  }

  return vuexPersist
}

export default createPersistencePlugin
