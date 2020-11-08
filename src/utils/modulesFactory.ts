import { Module } from 'vuex'

interface IModuleFields<S, R> extends Module<S, R> {}

export function modulesFactory<ModuleState, RootState>(
  moduleFields: IModuleFields<ModuleState, RootState>
): Module<ModuleState, RootState> {
  moduleFields.namespaced = true

  return moduleFields
}
