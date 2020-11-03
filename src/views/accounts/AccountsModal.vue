<template>
  <v-row
    @click.stop="openModal"
    v-ripple
    dense
    class="account-modal__activator"
  >
    <v-col cols="auto" order="1">
      <v-spacer />
    </v-col>
    <v-col cols="1" order="2">
      <v-icon>mdi-plus</v-icon>
    </v-col>
    <v-col cols="3" order="3">
      {{ $t('accounts.add_account') }}
    </v-col>
    <v-col order="4">
      <v-spacer />
    </v-col>

    <v-dialog
      max-width="600px"
      v-model="showModalComp"
      @click:outside="resetForm"
      @keydown.enter="sendRequest"
    >
      <v-progress-linear
        :active="showProgressBar"
        :indeterminate="showProgressBar"
      />
      <!--<template #activator="{ on }">
        <v-row v-on="on" v-ripple dense class="account-modal__activator">
          <v-col cols="auto" order="1">
            <v-spacer />
          </v-col>
          <v-col cols="1" order="2">
            <v-icon>mdi-plus</v-icon>
          </v-col>
          <v-col cols="3" order="3">
            {{ $t('accounts.add_account') }}
          </v-col>
          <v-col order="4">
            <v-spacer />
          </v-col>
        </v-row>
      </template>-->
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
                  :disabled="showProgressBar"
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
                  :disabled="showProgressBar"
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
            :disabled="validate.authForm.$invalid || showProgressBar"
          >
            <template #default>
              {{ $t('accounts.add_account') }}
            </template>
          </v-btn>
          <v-btn text @click="resetForm" :disabled="showProgressBar">
            <template #default>
              {{ $t('accounts.modal.close_modal') }}
            </template>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
// TODO: Fix typescript for validators here
import { defineComponent, reactive } from '@vue/composition-api'
import useVuelidate from '@vuelidate/core'

import { validateAccountFields } from '@/utils/validate'

export default defineComponent({
  name: 'AccountsModal',
  setup() {
    const authForm = reactive({
      login: '',
      pass: '',
    })

    const validate = useVuelidate(
      // @ts-ignore
      validateAccountFields,
      { authForm },
      { $autoDirty: true }
    )

    return {
      authForm,
      validate,
    }
  },
  props: {
    showModal: {
      type: Boolean,
      required: true,
      default: false,
    },
    showProgressBar: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  computed: {
    loginError() {
      // @ts-ignore
      if (!(this.validate.authForm.login.$dirty && this.showModal)) {
        return
      }

      // @ts-ignore
      if (this.validate.authForm.login.minLength.$invalid) {
        return this.$t('accounts.modal.authError.loginMinLength')
      }

      // @ts-ignore
      if (this.validate.authForm.login.required.$invalid) {
        return this.$t('accounts.modal.authError.loginRequired')
      }

      return null
    },
    passwordError() {
      // @ts-ignore
      if (!(this.validate.authForm.pass.$dirty && this.showModal)) {
        return
      }

      // @ts-ignore
      if (this.validate.authForm.pass.minLength.$invalid) {
        return this.$t('accounts.modal.authError.passMinLength')
      }

      // @ts-ignore
      if (this.validate.authForm.pass.required.$invalid) {
        return this.$t('accounts.modal.authError.passRequired')
      }

      return null
    },
    showModalComp: {
      get() {
        return this.showModal
      },
      set(val) {
        if (val) {
          this.$emit('open-accounts-modal', val)
        } else {
          this.$emit('close-accounts-modal', val)
        }
      },
    },
  },
  methods: {
    openModal() {
      this.showModalComp = true
    },
    resetForm() {
      this.showModalComp = false
      this.authForm.login = ''
      this.authForm.pass = ''
      this.validate.authForm.$reset()
    },
    sendRequest() {
      if (this.validate.authForm.$invalid) {
        return
      }

      this.$emit('auth-requested', {
        username: this.authForm.login,
        password: this.authForm.pass,
      })

      this.authForm.login = ''
      this.authForm.pass = ''
      this.validate.authForm.$reset()
    },
  },
})
</script>

<style scoped>
.account-modal__activator:hover {
  background-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;
}
</style>
