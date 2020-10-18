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

import StatusBar from '@/views/status-bar/StatusBar.vue'
import WindowControls from '@/views/status-bar/WindowControls.vue'
import {
  IStatusGetters,
  IStatusActions,
} from '@/store/modules/status_bar/types'

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
    setInterval(() => {
      getRealms()
    }, 3 * 60 * 1000)

    return {
      getRealms,
      realms,
      summaryOnline,
    }
  },
})
</script>

<style scoped>
.status-bar {
  -webkit-app-region: drag;
  -webkit-user-select: none;
}
</style>
