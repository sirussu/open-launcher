<template>
  <v-main>
    <v-container fluid class="welcome-screen">
      <welcome-steps-block />
    </v-container>
  </v-main>
</template>

<script lang="ts">
import WelcomeStepsBlock from './blocks/WelcomeStepsBlock.vue'

export default {
  components: {
    WelcomeStepsBlock,
  },
}
</script>

<style scoped>
.welcome-screen {
  height: 100%;
}
</style>
