import { Module } from 'vuex'

export function modulesFactory<S, R>(fields: Module<S, R>): Module<S, R> {
  fields.namespaced = true
  return fields
}
