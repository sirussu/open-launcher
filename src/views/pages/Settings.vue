<template>
  <v-card>
    <v-card-title>
      {{ $t('sidebar.settings') }}
    </v-card-title>
    <v-card-text>
      <v-select
        v-model="locale"
        item-text="lang"
        item-value="key"
        :items="locales"
        :label="$t('settings.choose_lang')"
        outlined
      ></v-select>
      <v-text-field
        @click.native.prevent="choose"
        :value="clientDirectory"
        :label="$t('settings.choose_client_directory')"
        outlined
        readonly
        append-outer-icon="mdi-folder"
        @click:append-outer="choose"
        :error="!!errors.clientDirectory"
        :error-messages="errors.clientDirectory"
      >
      </v-text-field>
    </v-card-text>
  </v-card>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

import eventService from '@/services/EventService'
import LauncherEvent from '@/events/LauncherEvent'
import CallbackListener from '@/events/CallbackListener'

export default defineComponent({
  data() {
    return {
      errors: {
        clientDirectory: null,
      },
    }
  },
  methods: {
    async choose() {
      this.errors.clientDirectory = null

      eventService.emit(LauncherEvent.OPEN_SELECT_GAME_DIRECTORY_DIALOG, {})
      eventService.on(
        LauncherEvent.WRONG_GAME_DIRECTORY_SELECTED,
        new CallbackListener(() => {
          this.errors.clientDirectory = this.$t(
            'settings.errors.wrong_client_directory'
          )
        }, true)
      )
    },
  },
  computed: {
    locales() {
      return this.$store.state.app.availableLocales
    },
    clientDirectory() {
      return this.$store.state.settings.clientDirectory
    },
    locale: {
      set(val) {
        this.$store.commit('SET_LOCALE', val)
        this.$i18n.locale = val
      },
      get() {
        return this.$store.state.settings.locale
      },
    },
  },
})
</script>
