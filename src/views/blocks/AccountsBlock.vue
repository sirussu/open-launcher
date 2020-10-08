<template>
  <div>
    <v-container pa-0 class="accounts-block">
      <v-list flat>
        <v-list-item-group>
          <v-list-item
            v-for="account in accounts"
            :key="account.id"
            :class="{ 'v-item--active': defaultAccount.id === account.id }"
            @click="setDefaultAccount(account.id)"
            dense
          >
            <v-list-item-action>
              <v-icon>{{
                defaultAccount.id === account.id ? 'mdi-account-check' : ''
              }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              {{ account.username }}
            </v-list-item-content>

            <v-list-item-action>
              <v-btn text @click="removeAccount(account)" tile>
                <template #default>
                  {{ $t('accounts.remove_account') }}
                </template>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
        <accounts-modal
          :has-tfa="hasTfa"
          :passwd="passwd"
          :user-name="userName"
          @clear-error="setError(null)"
          @clear-form="resetForm"
          @auth-requested="sendRequest"
        />
      </v-list>
    </v-container>
  </div>
</template>

<script lang="ts">
import { createNamespacedHelpers } from 'vuex-composition-helpers'
import { defineComponent, ref } from '@vue/composition-api'

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
    const userName = ref('')
    const passwd = ref('')

    return {
      userName,
      passwd,
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
      this.userName = username
      this.passwd = password
      await this.sendAuthRequest({ username, password, token })
    },
    resetForm() {
      this.userName = ''
      this.passwd = ''
    },
  },
})
</script>
<style scoped>
.accounts-block .v-item--active {
  background-color: rgba(255, 255, 255, 0.24);
}
</style>
