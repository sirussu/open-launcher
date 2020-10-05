<template>
  <v-row justify="center">
    <v-dialog
      max-width="600px"
      v-model="localState.showModal"
      @click:outside="resetForm"
      @keydown.enter="sendRequest"
    >
      <template #activator="{ on }">
        <v-btn v-text="$t('accounts.add_account')" v-on="on" />
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
                  v-model="localState.login"
                  required
                  :rules="localState.rules"
                  hide-details="auto"
                >
                  <template #label>
                    {{ $t('accounts.modal.enter_login') }}*
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="localState.pass"
                  required
                  :rules="localState.rules"
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
          <v-spacer></v-spacer>
          <v-btn
            text
            v-text="$t('accounts.add_account')"
            @click="sendRequest"
          />
          <v-btn
            text
            v-text="$t('accounts.modal.close_modal')"
            @click="resetForm"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      max-width="300px"
      persistent
      v-model="localState.showTfaModal"
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
                  v-model="localState.tfaToken"
                  required
                  :rules="localState.rules"
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
          <v-spacer></v-spacer>
          <v-btn
            text
            v-text="$t('accounts.add_account')"
            @click="sendRequest"
          />
          <v-btn
            text
            v-text="$t('accounts.modal.close_modal')"
            @click="resetForm"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from '@vue/composition-api'

export default defineComponent({
  name: 'AccountsModal',
  props: {
    hasTfa: {
      type: Boolean,
      default: false,
    },
    username: {
      type: String,
      required: true,
    },
    passwd: {
      type: String,
      required: true,
    },
  },
  setup(props, ctx) {
    // SFC state
    const localState = reactive({
      login: '',
      pass: '',
      tfaToken: '',
      showModal: false,
      showTfaModal: false,
      rules: [(value) => !!value || ''],
    })
    // methods
    const clearErrorAndForm = () => {
      ctx.emit('clear-error')
      ctx.emit('clear-form')
    }
    const resetForm = () => {
      localState.showModal = false
      localState.login = ''
      localState.pass = ''
      localState.tfaToken = ''
      clearErrorAndForm()
    }
    const sendRequest = () => {
      ctx.emit('auth-requested', {
        username: localState.login,
        password: localState.pass,
        token: localState.tfaToken,
      })
      localState.showModal = false
      localState.login = ''
      localState.pass = ''
      localState.tfaToken = ''
    }
    // watchers
    watch(
      () => props.hasTfa,
      (tfa) => {
        if (tfa) {
          localState.showTfaModal = true
          localState.pass = props.passwd
          localState.login = props.username
        } else {
          localState.showTfaModal = false
          localState.pass = ''
          localState.login = ''
          localState.tfaToken = ''
        }
      }
    )
    return {
      localState,
      resetForm,
      sendRequest,
    }
  },
})
</script>
