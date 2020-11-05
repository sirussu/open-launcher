<template>
  <v-app>
    <status-bar-block />
    <template v-if="isWelcomeScreenCompleted">
      <navigation />
      <v-main>
        <notifications />
        <v-container fluid>
          <transition name="slide">
            <router-view />
          </transition>
        </v-container>
      </v-main>
    </template>
    <welcome-screen v-else />
  </v-app>
</template>

<script lang="ts">
import { createNamespacedHelpers } from 'vuex-composition-helpers'
import { defineComponent } from '@vue/composition-api'

import { IWelcomeGetters, IWelcomeState } from '@/store/modules/welcome'

import Navigation from './common/Navigation.vue'
import StatusBarBlock from './blocks/StatusBarBlock.vue'
import Notifications from './notifications/Notifications.vue'
import WelcomeScreen from './WelcomeScreen.vue'

const { useGetters: useWelcomeGetters } = createNamespacedHelpers<
  IWelcomeState,
  IWelcomeGetters
>('welcome')

export default defineComponent({
  components: {
    Notifications,
    Navigation,
    StatusBarBlock,
    WelcomeScreen,
  },
  setup() {
    const { isCompleted: isWelcomeScreenCompleted } = useWelcomeGetters([
      'isCompleted',
    ])

    return {
      isWelcomeScreenCompleted,
    }
  },
  async created() {
    await this.$store.dispatch('accounts/validateAccounts', {
      root: true,
    })
  },
})
</script>

<style>
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter,
.slide-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
