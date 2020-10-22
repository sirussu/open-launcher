import { boolean } from '@storybook/addon-knobs'

import AccountsModal from '@/views/accounts/AccountsModal.vue'
import TfaModal from '@/views/accounts/TfaModal.vue'

export default {
  title: 'AccountsModals',
}

export const AccountsModalView = () => ({
  components: { AccountsModal },
  props: {

  },
  template: '<accounts-modal />',
})

export const TfaModalView = () => ({
  components: { TfaModal },
  props: {
    hasTfa: {
      default: boolean('hasTfa', true)
    }
  },
  template: '<tfa-modal :hasTfa="hasTfa"/>',
})
