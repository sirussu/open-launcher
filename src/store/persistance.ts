import VuexPersist, { AsyncStorage } from 'vuex-persist'

// import LauncherFile from '@/entities/LauncherFile'
import DataStorage from '@/services/DataStorage'

function createPersistencePlugin() {
  const storage = new DataStorage()
  storage.load()

  const vuexPersist = new VuexPersist({
    storage: (storage as unknown) as AsyncStorage,
  })

  // const restoreState = vuexPersist.restoreState
  // vuexPersist.restoreState = (key, storage) => {
  //   const state = restoreState(key, storage) as any
  //   state.App.launcherFiles = state.App.launcherFiles.map(LauncherFile.fromObject)

  //   return state
  // }

  return vuexPersist
}

export default createPersistencePlugin
