<template>
  <div class="welcome-steps">
    <transition name="step-slide">
      <component :is="stepComponent" />
    </transition>
    <v-row>
      <v-col>
        <v-btn @click="prevStep">{{ $t('steps.prev-step') }}</v-btn>
      </v-col>
      <v-col>
        <v-btn @click="nextStep">{{ $t('steps.next-step') }}</v-btn>
      </v-col>
      <v-col>
        <v-btn color="primary" @click="skipWelcomeScreen">
          {{ $t('steps.skip') }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { createNamespacedHelpers } from 'vuex-composition-helpers'
import { defineComponent } from '@vue/composition-api'

import {
  IWelcomeActions,
  IWelcomeGetters,
  IWelcomeState,
} from '@/store/modules/welcome'
import SelectFolderStep from '@/views/welcomeSteps/SelectFolder.vue'
import LoginStep from '@/views/welcomeSteps/Login.vue'
import { WelcomeSteps } from '@/types/welcomeSteps'

const {
  useActions: useWelcomeActions,
  useGetters: useWelcomeGetters,
} = createNamespacedHelpers<IWelcomeState, IWelcomeGetters, IWelcomeActions>(
  'welcome'
)

const componentByStepType = {
  [WelcomeSteps.SETUP]: 'select-folder-step',
  [WelcomeSteps.LOGIN]: 'login-step',
}

export default defineComponent({
  components: {
    SelectFolderStep,
    LoginStep,
  },
  setup() {
    const { nextStep, prevStep, setIsCompleted } = useWelcomeActions([
      'nextStep',
      'prevStep',
      'setIsCompleted',
    ])
    const { currentStep, currentStepIndex, stepsCount } = useWelcomeGetters([
      'currentStep',
      'currentStepIndex',
      'steps',
    ])

    return {
      currentStep,
      currentStepIndex,
      stepsCount,
      nextStep,
      prevStep,
      setIsCompleted,
    }
  },
  computed: {
    stepComponent() {
      return componentByStepType[this.currentStep as WelcomeSteps]
    },
  },
  methods: {
    skipWelcomeScreen() {
      // @ts-ignore
      this.setIsCompleted(true)
    },
  },
})
</script>

<style scoped>
.welcome-steps {
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.step-slide-enter-active {
  transition: all 0.3s ease;
}

.step-slide-enter,
.step-slide-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
