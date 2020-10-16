<template>
  <status-bar :realms="realms" :online="summaryOnline" />
</template>

<script lang="ts">
import { createNamespacedHelpers } from 'vuex-composition-helpers'
import { defineComponent } from '@vue/composition-api'

import StatusBar from '@/views/status_bar/StatusBar'
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
  components: { StatusBar },
  setup() {
    const { getRealms } = useStatusActions(['getRealms'])
    const { realms, summaryOnline } = useStatusGetters([
      'realms',
      'summaryOnline',
    ])

    getRealms()

    return {
      getRealms,
      realms,
      summaryOnline,
    }
  },
})
</script>
