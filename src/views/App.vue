<template>
  <v-app>
    <status-bar-block />
    <navigation />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
<script lang="ts">
import Navigation from './common/Navigation.vue'
import StatusBarBlock from './blocks/StatusBarBlock.vue'

export default {
  components: {
    Navigation,
    StatusBarBlock,
  },
}
</script>
