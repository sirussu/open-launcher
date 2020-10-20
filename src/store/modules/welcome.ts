import { MutationTree, ActionTree, GetterTree } from 'vuex'

import { WelcomeSteps } from '@/types/welcomeSteps'
import { modulesFactory } from '@/utils/modulesFactory'

import { IRootState } from '../types'

export interface IWelcomeState {
  isCompleted: boolean
  steps: Array<WelcomeSteps>
  currentStepIndex: number
}

const state: IWelcomeState = {
  isCompleted: false,
  steps: [WelcomeSteps.SETUP],
  currentStepIndex: 0,
}

const mutations: MutationTree<IWelcomeState> = {}

const actions: ActionTree<IWelcomeState, IRootState> = {}

const getters: GetterTree<IWelcomeState, IRootState> = {
  currentStepIndex: (state) => state.currentStepIndex,
  currentStep: (state) => state.steps[state.currentStepIndex],
  isCompleted: (state) => state.isCompleted,
  steps: (state) => state.steps,
}

export const welcomeModule = modulesFactory<IWelcomeState, IRootState>({
  state,
  mutations,
  actions,
  getters,
})
