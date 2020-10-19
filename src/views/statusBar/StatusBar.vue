<template>
  <div>
    <span>Sirus.su</span>
    <span>(ver. {{ version }})</span>
    <span v-for="realm in realms" :key="realm.id">
      {{ realm.name.split(' -')[0] }}
      <span v-if="realm.isOnline">&#128994;</span>
      <span v-else>&#128308;</span>
    </span>
    <span class="online">
      {{ $tc('statusBar.online', online) }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'StatusBar',
  props: {
    realms: {
      type: Array,
      required: true,
    },
    online: {
      type: Number,
      required: true,
    },
  },
  computed: {
    version() {
      // return this.$interop.getAppVersion() || `0.0.0`
      return `0.0.0`
    },
  },
})
</script>
