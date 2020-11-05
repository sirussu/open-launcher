import { MutationTree, ActionTree, GetterTree, ActionContext } from 'vuex'

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
  steps: [WelcomeSteps.SETUP, WelcomeSteps.LOGIN],
  currentStepIndex: 0,
}

const mutations: MutationTree<IWelcomeState> = {
  setStep(state: IWelcomeState, index: number) {
    state.currentStepIndex = index
  },
  setIsCompleted(state: IWelcomeState, isCompleted: boolean) {
    state.isCompleted = isCompleted
  },
}

export interface IWelcomeActions extends ActionTree<IWelcomeState, IRootState> {
  nextStep: (ctx: ActionContext<IWelcomeState, IRootState>) => void
  prevStep: (ctx: ActionContext<IWelcomeState, IRootState>) => void
  setIsCompleted: (
    ctx: ActionContext<IWelcomeState, IRootState>,
    isCompleted: boolean
  ) => void
}

const actions: IWelcomeActions = {
  nextStep({ commit, state }) {
    const { currentStepIndex, steps } = state
    const nextStepIndex = currentStepIndex + 1

    commit('setStep', nextStepIndex)

    if (!state.isCompleted && nextStepIndex === steps.length) {
      commit('setIsCompleted', true)
    }
  },
  prevStep({ commit, state }) {
    const { currentStepIndex } = state

    if (currentStepIndex !== 0) {
      const nextStepIndex = currentStepIndex - 1
      commit('setStep', nextStepIndex)
    }
  },
  setIsCompleted({ commit }, isCompleted) {
    commit('setIsCompleted', isCompleted)
  },
}

export interface IWelcomeGetters extends GetterTree<IWelcomeState, IRootState> {
  currentStepIndex: (state: IWelcomeState) => number
  currentStep: (state: IWelcomeState) => WelcomeSteps
  isCompleted: (state: IWelcomeState) => boolean
  stepsCount: (state: IWelcomeState) => number
}

const getters: IWelcomeGetters = {
  currentStepIndex: (state) => state.currentStepIndex,
  currentStep: (state) => state.steps[state.currentStepIndex],
  isCompleted: (state) => state.isCompleted,
  stepsCount: (state) => state.steps.length,
}

export const welcomeModule = modulesFactory<IWelcomeState, IRootState>({
  state,
  mutations,
  actions,
  getters,
})
