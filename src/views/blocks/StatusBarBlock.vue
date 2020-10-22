<template>
  <v-system-bar window app class="status-bar">
    <status-bar :online="summaryOnline" :realms="realms" />
    <v-spacer />
    <window-controls />
  </v-system-bar>
</template>

<script lang="ts">
import { createNamespacedHelpers } from 'vuex-composition-helpers'
import { defineComponent } from '@vue/composition-api'

import StatusBar from '@/views/statusBar/StatusBar.vue'
import WindowControls from '@/views/statusBar/WindowControls.vue'
import { IStatusGetters, IStatusActions } from '@/store/modules/statusBar/types'

const {
  useActions: useStatusActions,
  useGetters: useStatusGetters,
} = createNamespacedHelpers<IStatusGetters, IStatusActions>('status')

export default defineComponent({
  name: 'StatusBarBlock',
  components: { WindowControls, StatusBar },
  setup() {
    const { getRealms } = useStatusActions(['getRealms'])
    const { realms, summaryOnline } = useStatusGetters([
      'realms',
      'summaryOnline',
    ])

    getRealms()

    const interval = setInterval(() => {
      getRealms()
    }, 3 * 60 * 1000)

    return {
      interval,
      getRealms,
      realms,
      summaryOnline,
    }
  },
  destroyed() {
    clearInterval(this.interval)
  },
})
</script>

<style scoped>
.status-bar {
  -webkit-app-region: drag;
  -webkit-user-select: none;
}
</style>
