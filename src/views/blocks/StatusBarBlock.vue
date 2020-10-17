<template>
  <div></div>
</template>

<script lang="ts">
import { createNamespacedHelpers } from 'vuex-composition-helpers'
import { defineComponent } from '@vue/composition-api'

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
