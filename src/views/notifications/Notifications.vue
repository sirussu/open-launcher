<template>
  <transition-group name="fade" tag="div" class="notifications-container">
    <notification
      v-for="notification in $notification.getAll()"
      :key="notification.id"
      :notification="notification"
      :payload="$notification.getPayload(notification.id)"
    />
  </transition-group>
</template>

<script lang="ts">
import Notification from './Notification.vue'

export default {
  components: {
    Notification,
  },
}
</script>

<style scoped>
.notifications-container {
  position: absolute;
  z-index: 1000;
  right: 0;
}
</style>
