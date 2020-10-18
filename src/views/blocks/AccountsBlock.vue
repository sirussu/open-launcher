<template>
  <div>
    <v-container pa-0 class="accounts-block">
      <v-list flat>
        <v-list-item-group>
          <v-list-item
            v-for="account in accounts"
            :key="account.id"
            :class="{ 'v-item--active': defaultAccount.id === account.id }"
            @click="setDefaultAccount(account)"
            dense
          >
            <v-list-item-action>
              <v-icon v-if="defaultAccount.id === account.id"
                >mdi-account-check</v-icon
              >
            </v-list-item-action>

            <v-list-item-content>
              {{ account.username }}
            </v-list-item-content>

            <v-list-item-action>
              <v-btn text @click="removeAccount(account.id)" tile>
                <template #default>
                  {{ $t('accounts.remove_account') }}
                </template>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
        <accounts-modal @clear-form="resetForm" @auth-requested="sendRequest" />
        <tfa-modal
          :has-tfa="hasTfa"
          @tfa-was-entered="tfaWasEntered"
          @clear-form="resetForm"
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
import TfaModal from '../accounts/TfaModal.vue'

const {
  useGetters: useAccountsGetters,
  useActions: useAccountsActions,
} = createNamespacedHelpers<IAccountsState, IAccountsGetters, IAccountsActions>(
  'accounts'
)

export default defineComponent({
  name: 'AccountsBlock',
  components: { AccountsModal, TfaModal },
  setup() {
    const {
      setDefaultAccount,
      removeAccount,
      sendAuthRequest,
      switchOffTfa,
    } = useAccountsActions([
      'setDefaultAccount',
      'removeAccount',
      'sendAuthRequest',
      'switchOffTfa',
    ])

    const {
      defaultAccount,
      accounts,
      needTfa,
      getStatus,
    } = useAccountsGetters([
      'defaultAccount',
      'accounts',
      'needTfa',
      'getStatus',
    ])

    const username = ref('')
    const password = ref('')

    return {
      username,
      password,
      accounts,
      defaultAccount,
      needTfa,
      setDefaultAccount,
      removeAccount,
      sendAuthRequest,
      getStatus,
      switchOffTfa,
    }
  },
  computed: {
    hasTfa() {
      return this.needTfa
    },
  },
  methods: {
    async sendRequest({ username, password, token }) {
      this.username = username
      this.password = password
      await this.sendAuthRequest({ username, password, token })
    },
    async tfaWasEntered(tfaToken) {
      await this.sendAuthRequest({
        username: this.username,
        password: this.password,
        token: tfaToken,
      })
    },
    resetForm() {
      this.username = ''
      this.password = ''
      this.switchOffTfa()
    },
  },
})
</script>

<style scoped>
.accounts-block .v-item--active {
  background-color: rgba(255, 255, 255, 0.24);
}
</style>
