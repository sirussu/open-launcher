<template>
  <v-container pa-0 class="accounts-modal">
    <v-dialog
      max-width="600px"
      v-model="showModal"
      @click:outside="resetForm"
      @keydown.enter="sendRequest"
    >
      <template #activator="{ on }">
        <v-list-item v-on="on">
          <v-list-item-action>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            {{ $t('accounts.add_account') }}
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t('accounts.modal.title') }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model.lazy="validate.authForm.login.$model"
                  :error-messages="loginError"
                  autofocus
                  clearable
                  required
                >
                  <template #label>
                    {{ $t('accounts.modal.enter_login') }}*
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  type="password"
                  v-model.lazy="validate.authForm.pass.$model"
                  :error-messages="passwordError"
                  clearable
                  required
                >
                  <template #label>
                    {{ $t('accounts.modal.enter_pass') }}*
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>{{ $t('accounts.modal.req_fields') }}</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="sendRequest"
            :disabled="validate.authForm.$invalid"
          >
            <template #default>
              {{ $t('accounts.add_account') }}
            </template>
          </v-btn>
          <v-btn text @click="resetForm">
            <template #default>
              {{ $t('accounts.modal.close_modal') }}
            </template>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api'
import useVuelidate from '@vuelidate/core'

import { validateAccountFields } from '@/utils/validate'

export default defineComponent({
  name: 'AccountsModal',
  setup() {
    const authForm = reactive({
      login: '',
      pass: '',
    })
    const showModal = ref(false)
    const validate = useVuelidate(
      validateAccountFields,
      { authForm },
      { $autoDirty: true }
    )

    return {
      authForm,
      showModal,
      validate,
    }
  },
  computed: {
    loginError() {
      if (!(this.validate.authForm.login.$dirty && this.showModal)) {
        return
      }

      if (this.validate.authForm.login.minLength.$invalid) {
        return this.$t('accounts.modal.authError.loginMinLength')
      }

      if (this.validate.authForm.login.required.$invalid) {
        return this.$t('accounts.modal.authError.loginRequired')
      }
    },
    passwordError() {
      if (!(this.validate.authForm.pass.$dirty && this.showModal)) {
        return
      }

      if (this.validate.authForm.pass.minLength.$invalid) {
        return this.$t('accounts.modal.authError.passMinLength')
      }

      if (this.validate.authForm.pass.required.$invalid) {
        return this.$t('accounts.modal.authError.passRequired')
      }
    },
  },
  methods: {
    clearErrorAndForm() {
      this.$emit('clear-error')
      this.$emit('clear-form')
    },
    resetForm() {
      this.showModal = false
      this.authForm.login = ''
      this.authForm.pass = ''
      this.tfaToken = ''
      this.clearErrorAndForm()
    },
    sendRequest() {
      if (this.validate.authForm.$invalid) {
        return
      }

      this.$emit('auth-requested', {
        username: this.authForm.login,
        password: this.authForm.pass,
      })

      this.showModal = false
      this.authForm.login = ''
      this.authForm.pass = ''
    },
  },
})
</script>
