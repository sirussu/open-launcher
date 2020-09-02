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
import { remote } from 'electron'

export default {
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

      const selection = await remote.dialog.showOpenDialog({
        properties: ['openDirectory'],
      })

      if (!selection.canceled && selection.filePaths.length > 0) {
        if (
          !(await this.$store.dispatch(
            'setClientDirectory',
            selection.filePaths[0]
          ))
        ) {
          this.errors.clientDirectory = this.$t(
            'settings.errors.wrong_client_directory'
          )
        }
      }
    },
  },
  computed: {
    locales() {
      return this.$store.state.App.availableLocales
    },
    clientDirectory() {
      return this.$store.state.Settings.clientDirectory
    },
    locale: {
      set(val) {
        this.$store.commit('SET_LOCALE', val)
        this.$i18n.locale = val
      },
      get() {
        return this.$store.state.Settings.locale
      },
    },
  },
}
</script>
