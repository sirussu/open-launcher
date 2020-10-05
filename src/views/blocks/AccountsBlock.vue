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
                    defaultId === account.id
                      ? 'mdi-account-check'
                      : 'mdi-account-switch'
                  }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title v-text="account.username" />
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn
                    block
                    v-text="$t('accounts.remove_account')"
                    @click="removeAccount(account.id)"
                  />
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
      :username="localState.username"
      @clear-error="setNullError"
      @clear-form="resetForm"
      @auth-requested="sendRequest"
    />
  </div>
</template>

<script lang="ts">
import { createNamespacedHelpers } from 'vuex-composition-helpers'
import { computed, defineComponent, reactive } from '@vue/composition-api'

import { IErrorActions, IErrorGetters } from '@/store/modules/error/types'
import {
  IAccountsActions,
  IAccountsGetters,
  IAccountsState,
} from '@/store/modules/accounts/types'

import AccountsModal from '../accounts/AccountsModal.vue'

const {
  useGetters: useAccountsGetters,
  useActions: useAccountsActions,
  useState: useAccountsState,
} = createNamespacedHelpers<IAccountsState, IAccountsGetters, IAccountsActions>(
  'accounts'
)
const {
  useGetters: useErrorsGetters,
  useActions: useErrorsActions,
} = createNamespacedHelpers<IErrorGetters, IErrorActions>('error')

export default defineComponent({
  name: 'AccountsBlock',
  components: { AccountsModal },
  setup() {
    // mapAccountActions
    const {
      setDefaultAccount,
      removeAccount,
      sendAuthRequest,
    } = useAccountsActions([
      'setDefaultAccount',
      'removeAccount',
      'sendAuthRequest',
    ])
    // mapErrorActions
    const { setError } = useErrorsActions(['setError'])
    // mapAccountGetters
    const { defaultAccount, accounts } = useAccountsGetters([
      'defaultAccount',
      'accounts',
    ])
    // mapErrorGetters
    const { error } = useErrorsGetters(['error'])
    // mapAccountsState
    const { defaultId } = useAccountsState(['defaultId'])
    // SFC state
    const localState = reactive({
      showModal: false,
      username: '',
      passwd: '',
    })
    // computed
    const hasTfa = computed(() => {
      if (error.value) {
        return error.value.status === 401
      }
    })
    // methods
    const setNullError = async () => {
      await setError(null)
    }
    const sendRequest = async ({ username, password, token }) => {
      localState.username = username
      localState.passwd = password
      await sendAuthRequest({ username, password, token })
    }
    const resetForm = () => {
      localState.username = ''
      localState.passwd = ''
    }

    return {
      defaultId,
      localState,
      hasTfa,
      accounts,
      defaultAccount,
      status,
      error,
      setDefaultAccount,
      sendRequest,
      setNullError,
      removeAccount,
      sendAuthRequest,
      setError,
      resetForm,
    }
  },
})
</script>
