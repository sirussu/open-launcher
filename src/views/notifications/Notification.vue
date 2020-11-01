<template>
  <v-alert :width="450" dark :type="alertType" @click="closeNotification">
    {{ notification.text }}
  </v-alert>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { NotificationTypes } from '@/types/notification'

const alertTypeByNotificationType = {
  [NotificationTypes.SUCCESS]: 'success',
  [NotificationTypes.WARN]: 'warning',
  [NotificationTypes.ERROR]: 'error',
  [NotificationTypes.INFO]: 'info',
}

export default defineComponent({
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  computed: {
    alertType() {
      // @ts-ignore
      return alertTypeByNotificationType[this.notification.type]
    },
  },
  methods: {
    closeNotification() {
      this.$notification.remove(this.notification.id)
    },
  },
})
</script>
