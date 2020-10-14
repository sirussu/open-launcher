import { ActionTree, GetterTree, Module, MutationTree } from 'vuex'

interface IModuleFields<S, R> {
  namespaced?: boolean
  state?: S | (() => S)
  mutations?: MutationTree<S>
  actions?: ActionTree<S, R>
  getters?: GetterTree<S, R>
}

export function modulesFactory<S, R>(moduleFields: IModuleFields<S, R>): Module<S, R> {
  moduleFields.namespaced = true
  return moduleFields
}
