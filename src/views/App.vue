<template>
  <v-app>
    <status-bar-block />
    <navigation />
    <v-main>
      <notifications />
      <v-container fluid>
        <router-view />
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
}
</script>
