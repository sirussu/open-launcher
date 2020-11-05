<template>
  <v-row justify="center">
    <v-col>
      <v-row justify="center">
        <v-col align-self="center">
          <v-btn @click="selectFolder">
            {{ $t('steps.select_folder.select_existed') }}
          </v-btn>
        </v-col>
      </v-row>
      <v-spacer />
      <v-row justify="center">
        <v-col align-self="center" justify="center">
          <v-btn @click="downloadGame">
            {{ $t('steps.select_folder.download') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  methods: {
    selectFolder() {
      console.log('selectFolder')
    },
    downloadGame() {
      console.log('downloadGame')
    },
  },
})
</script>
