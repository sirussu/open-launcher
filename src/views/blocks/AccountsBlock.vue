<template>
  <div>
    <v-container class="accounts-block">
      <v-row
        v-for="account in accounts"
        :key="account.id"
        :class="{ 'row-active': activeClass(account) }"
        dense
        v-ripple
        justify="space-around"
        align="center"
      >
        <v-col cols="8" order="1" class="accounts-block__main-btn">
          <v-btn
            pa-0
            block
            text
            tile
            :disabled="account.tokenIsExpired"
            @click.stop="setDefaultAccount(account)"
            :ripple="false"
          >
            <v-col cols="1" order="1" class="pl-0 ml-n3">
              <v-icon v-if="defaultAccount.id === account.id">
                mdi-account-check
              </v-icon>
            </v-col>

            <v-col cols="auto" order="2">
              {{ account.username }}
            </v-col>

            <v-col order="3">
              <v-spacer />
            </v-col>
          </v-btn>
        </v-col>
        <v-col cols="auto" order="2">
          <v-btn
            v-if="account.tokenIsExpired"
            text
            @click.stop="reLogin('', account)"
            tile
          >
            <template #default>
              {{ $t('accounts.re_login') }}
            </template>
          </v-btn>
          <v-btn v-else text @click.stop="removeAccount(account.id)" tile>
            <template #default>
              {{ $t('accounts.remove_account') }}
            </template>
          </v-btn>
        </v-col>
      </v-row>
      <accounts-modal @clear-form="resetForm" @auth-requested="sendRequest" />
      <tfa-modal
        :has-tfa="needTfa"
        @tfa-was-entered="tfaWasEntered"
        @clear-form="resetForm"
      />
    </v-container>
  </div>
</template>

<script lang="ts">
import { createNamespacedHelpers } from 'vuex-composition-helpers'
import { defineComponent, ref } from '@vue/composition-api'

import {
  IAccount,
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
  methods: {
    async sendRequest({ username, password, token }) {
      await this.sendAuthRequest({
        username,
        password,
        token,
        isReLogin: false,
      })
    },
    async tfaWasEntered(tfaToken: string) {
      if (this.needTfa.isReLogin) {
        await this.reLogin(tfaToken)
      }

      await this.sendAuthRequest({
        username: this.needTfa.username,
        password: this.needTfa.password,
        token: tfaToken,
        isReLogin: false,
      })
    },
    async reLogin(tfaToken?: string, account?: IAccount) {
      if (account) {
        await this.sendAuthRequest({
          username: account.username,
          password: account.password,
          token: account.tfaToken,
          isReLogin: true,
        })
      }

      if (tfaToken) {
        await this.sendAuthRequest({
          username: this.needTfa.username,
          password: this.needTfa.password,
          token: tfaToken,
          isReLogin: false,
        })
      }
    },
    resetForm() {
      this.username = ''
      this.password = ''
      this.switchOffTfa()
    },
    activeClass(account) {
      return this.defaultAccount.id === account.id && !account.tokenIsExpired
    },
  },
})
</script>

<style scoped>
.accounts-block .row-active {
  background-color: rgba(255, 255, 255, 0.24);
}
.accounts-block .row-active:hover {
  background-color: rgba(255, 255, 255, 0.24) !important;
}
.accounts-block .row:hover {
  background-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;
}
.accounts-block__main-btn .theme--dark.v-btn:hover::before {
  opacity: 0;
}
</style>
