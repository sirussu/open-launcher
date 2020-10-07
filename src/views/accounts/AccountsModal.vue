<template>
  <v-row justify="center">
    <v-dialog
      max-width="600px"
      v-model="showModal"
      @click:outside="resetForm"
      @keydown.enter="sendRequest"
    >
      <template #activator="{ on }">
        <v-btn v-on="on">
          <template #default>
            {{ $t('accounts.add_account') }}
          </template>
        </v-btn>
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
                  v-model="login"
                  required
                  autofocus
                  :rules="rules"
                  hide-details="auto"
                >
                  <template #label>
                    {{ $t('accounts.modal.enter_login') }}*
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="pass"
                  required
                  :rules="rules"
                  hide-details="auto"
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
          <v-btn text @click="sendRequest">
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
    <v-dialog
      max-width="300px"
      persistent
      v-model="showTfaModal"
      @keydown.enter="sendRequest"
    >
      <v-card>
        <v-card-title>
          <span class="headline">{{
            $t('accounts.modal.enter_tfa_code')
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" v-if="hasTfa">
                <v-text-field
                  v-model="tfaToken"
                  required
                  autofocus
                  :rules="rules"
                  hide-details="auto"
                >
                  <template #label>
                    {{ $t('accounts.modal.enter_tfa_code') }}*
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="sendRequest">
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
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'AccountsModal',
  props: {
    hasTfa: {
      type: Boolean,
      default: false,
    },
    userName: {
      type: String,
      required: true,
    },
    passwd: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      login: '',
      pass: '',
      tfaToken: '',
      showModal: false,
      showTfaModal: false,
      rules: [(value) => !!value || ''],
    }
  },
  methods: {
    clearErrorAndForm() {
      this.$emit('clear-error')
      this.$emit('clear-form')
    },
    resetForm() {
      this.showModal = false
      this.login = ''
      this.pass = ''
      this.tfaToken = ''
      this.clearErrorAndForm()
    },
    sendRequest() {
      this.$emit('auth-requested', {
        username: this.login,
        password: this.pass,
        token: this.tfaToken,
      })
      this.showModal = false
      this.login = ''
      this.pass = ''
      this.tfaToken = ''
    },
  },
  watch: {
    hasTfa(tfa) {
      if (tfa) {
        this.showTfaModal = true
        this.pass = this.passwd
        this.login = this.userName
      } else {
        this.showTfaModal = false
        this.pass = ''
        this.login = ''
        this.tfaToken = ''
      }
    },
  },
})
</script>
