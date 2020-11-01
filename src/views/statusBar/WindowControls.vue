<template>
  <div class="controls">
    <v-btn text :title="$t('statusBar.minimize')" @click="minimizeApp">
      <v-icon>{{ mdiMinus }}</v-icon>
    </v-btn>
    <v-btn text :title="$t('statusBar.close')" @click="closeApp">
      <v-icon>{{ mdiClose }}</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { mdiMinus, mdiClose } from '@mdi/js'

export default defineComponent({
  name: 'WindowControls',
  setup() {
    return {
      mdiMinus,
      mdiClose,
    }
  },
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

.v-icon {
  margin: 0;
}
</style>
