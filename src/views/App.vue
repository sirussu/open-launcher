<template>
  <v-app>
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

export default {
  components: {
    Navigation,
  },
}
</script>
