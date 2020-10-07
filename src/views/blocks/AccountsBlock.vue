<template>
  <div>
    <v-item-group mandatory>
      <v-container>
        <v-list>
          <v-list-item-group mandatory>
            <v-list-item
              v-for="account in accounts"
              :key="account.id"
              @click="setDefaultAccount(account.id)"
            >
              <v-row align="center">
                <v-list-item-icon>
                  <v-icon>{{
                    defaultAccount.id === account.id
                      ? 'mdi-account-check'
                      : 'mdi-account-switch'
                  }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title v-text="account.username" />
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn block @click="removeAccount(account.id)">
                    <template #default>
                      {{ $t('accounts.remove_account') }}
                    </template>
                  </v-btn>
                </v-list-item-action>
              </v-row>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-container>
    </v-item-group>
    <accounts-modal
      :has-tfa="hasTfa"
      :passwd="localState.passwd"
      :user-name="localState.username"
      @clear-error="setError(null)"
      @clear-form="resetForm"
      @auth-requested="sendRequest"
    />
  </div>
</template>

<script lang="ts">
import { createNamespacedHelpers } from 'vuex-composition-helpers'
import { defineComponent, reactive } from '@vue/composition-api'

import {
  IAccountsActions,
  IAccountsGetters,
  IAccountsState,
} from '@/store/modules/accounts/types'

import AccountsModal from '../accounts/AccountsModal.vue'

const {
  useGetters: useAccountsGetters,
  useActions: useAccountsActions,
} = createNamespacedHelpers<IAccountsState, IAccountsGetters, IAccountsActions>(
  'accounts'
)
export default defineComponent({
  name: 'AccountsBlock',
  components: { AccountsModal },
  setup() {
    const {
      setDefaultAccount,
      removeAccount,
      sendAuthRequest,
      setError,
    } = useAccountsActions([
      'setDefaultAccount',
      'removeAccount',
      'sendAuthRequest',
      'setError',
    ])

    const { defaultAccount, accounts, error } = useAccountsGetters([
      'defaultAccount',
      'accounts',
      'error',
    ])
    const localState = reactive({
      showModal: false,
      username: '',
      passwd: '',
    })
    return {
      localState,
      accounts,
      defaultAccount,
      error,
      setDefaultAccount,
      removeAccount,
      sendAuthRequest,
      setError,
    }
  },
  computed: {
    hasTfa() {
      if (this.error) {
        return this.error.status === 401
      }
    },
  },
  methods: {
    async sendRequest({ username, password, token }) {
      this.localState.username = username
      this.localState.passwd = password
      await this.sendAuthRequest({ username, password, token })
    },
    resetForm() {
      this.localState.username = ''
      this.localState.passwd = ''
    },
  },
})
</script>
