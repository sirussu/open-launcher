<template>
  <v-system-bar window app>
    <span>Sirus.su</span>
    <span>(ver.{{ version }})</span>
    <v-spacer />
    <v-btn tile small>
      <v-icon :title="$t('statusBar.minimize')" @click="minimizeApp">
        mdi-minus
      </v-icon>
    </v-btn>
    <v-btn tile small>
      <v-icon v-ripple :title="$t('statusBar.close')" @click="closeApp">
        mdi-close
      </v-icon>
    </v-btn>
  </v-system-bar>
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
    setInterval(() => {
      getRealms()
    }, 3 * 60 * 1000)

    return {
      getRealms,
      realms,
      summaryOnline,
    }
  },
  computed: {
    version() {
      return '1.0.0'
    },
  },
  methods: {
    minimizeApp() {
      console.log(`minimize`)
    },
    closeApp() {
      console.log(`close`)
    },
  },
})
</script>

<style scoped>
.rounded {
  border-radius: 100%;
}
</style>
