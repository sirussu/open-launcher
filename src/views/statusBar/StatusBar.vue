<template>
  <div>
    <span>Sirus.su</span>
    <span>(ver. {{ version }})</span>
    <span v-for="realm in mappedRealms" :key="realm.id">
      {{ realm.name }}
      <span v-if="realm.isOnline">&#128994;</span>
      <span v-else>&#128308;</span>
    </span>
    <span class="online">
      {{ $tc('statusBar.online', online) }}
    </span>
  </div>
</template>

<script>
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
      return `0.0.0` // TODO: need fix this.$interop.getAppVersion()
    },
    mappedRealms() {
      return this.realms.map((realm) => {
        return {
          id: realm.id,
          isOnline: realm.isOnline,
          online: realm.online,
          name: realm.name.split(' -')[0],
        }
      })
    },
  },
})
</script>
