<template>
  <v-app>
    <status-bar-block />
    <navigation />
    <v-main>
      <notifications />
      <v-container fluid>
        <transition name="slide">
          <router-view />
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>
<script lang="ts">
import Navigation from './common/Navigation.vue'
import StatusBarBlock from './blocks/StatusBarBlock.vue'
import Notifications from './notifications/Notifications.vue'

export default {
  components: {
    Notifications,
    Navigation,
    StatusBarBlock,
  },
  async created() {
    await this.$store.dispatch('accounts/validationTimezoneCheck', {
      root: true,
    })
    await this.$store.dispatch('accounts/beforeValidateAccountsCheck', {
      root: true,
    })
  },
}
</script>

<style>
.slide-enter-active {
  transition: all 0.3s ease;
}
.slideleave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter,
.slide-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
