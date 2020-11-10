<template>
  <settings-block />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import SettingsBlock from '@/views/blocks/SettingsBlock.vue'

export default defineComponent({
  components: {
    SettingsBlock,
  },
})
</script>
