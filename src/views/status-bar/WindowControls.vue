<template>
  <div class="controls">
    <v-icon :title="$t('statusBar.minimize')" @click.prevent="minimizeApp">
      mdi-minus
    </v-icon>
    <v-icon :title="$t('statusBar.close')" @click="closeApp">
      mdi-close
    </v-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'WindowControls',
  methods: {
    minimizeApp() {
      this.$interop.minimizeApp()
    },
    closeApp() {
      this.$interop.closeApp()
    },
  },
})
</script>
<style scoped>
.controls {
  -webkit-app-region: no-drag;
}
</style>
