import { Module } from 'vuex'

interface IModuleFields<S, R> extends Module<S, R> {}

export function modulesFactory<S, R>(
  moduleFields: IModuleFields<S, R>
): Module<S, R> {
  moduleFields.namespaced = true

  return moduleFields
}
