<template>
  <v-dialog
    max-width="300px"
    persistent
    v-model="isTfaModalShown"
    @keydown.enter="sendRequestWithTfa"
  >
    <v-progress-linear
      :active="canShowProgressBar"
      :indeterminate="canShowProgressBar"
    />
    <v-card>
      <v-card-title>
        <span class="headline">{{ $t('accounts.modal.enter_tfa_code') }}</span>
      </v-card-title>
      <v-card-text>
        <v-container pt-0 pb-0>
          <v-row>
            <v-col cols="12" class="pt-0 pb-0">
              <v-text-field
                v-model.lazy="validate.tfaToken.$model"
                :error-messages="tfaError"
                :disabled="canShowProgressBar"
                autofocus
                clearable
                required
              >
                <template #label>
                  {{ $t('accounts.modal.enter_tfa_code') }}
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click.stop="sendRequestWithTfa"
          :disabled="validate.$invalid || canShowProgressBar"
        >
          <template #default>
            {{ $t('accounts.add_account') }}
          </template>
        </v-btn>
        <v-btn text @click.stop="resetForm" :disabled="canShowProgressBar">
          <template #default>
            {{ $t('accounts.modal.close_modal') }}
          </template>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
// TODO: Fix typescript for validators here
import { defineComponent, ref } from '@vue/composition-api'
import useVuelidate from '@vuelidate/core'

import { INeedTfa } from '@/store/modules/accounts/types'
import { validateTfa } from '@/utils/validate'

interface ITfaModalProps {
  tfa: INeedTfa
  canShowProgressBar: boolean
}

export default defineComponent<ITfaModalProps>({
  setup() {
    const tfaToken = ref('')
    const validate = useVuelidate(
      // @ts-ignore
      validateTfa,
      { tfaToken },
      { $autoDirty: true }
    )

    return {
      tfaToken,
      validate,
    }
  },
  props: {
    tfa: {
      type: Object,
      required: true,
    },
    canShowProgressBar: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    isTfaModalShown: {
      get() {
        // @ts-ignore
        return this.tfa.needTfa
      },
      set(val) {
        if (val) {
          // @ts-ignore
          this.$emit('tfa-was-entered', this.tfaToken)
        } else {
          // @ts-ignore
          this.$emit('clear-tfa-form')
        }
      },
    },
    tfaError() {
      // @ts-ignore
      if (!(this.validate.tfaToken.$dirty && this.tfa.needTfa)) {
        return
      }

      // @ts-ignore
      if (this.validate.tfaToken.minLength.$invalid) {
        return this.$t('accounts.modal.tfaError.minLength')
      }

      // @ts-ignore
      if (this.validate.tfaToken.required.$invalid) {
        return this.$t('accounts.modal.tfaError.required')
      }

      return null
    },
  },
  methods: {
    hideModal() {
      this.isTfaModalShown = false
    },
    sendRequestWithTfa() {
      this.isTfaModalShown = true

      this.tfaToken = ''
      // @ts-ignore
      this.validate.tfaToken.$reset()
    },
    resetForm() {
      this.tfaToken = ''
      this.hideModal()
      // @ts-ignore
      this.validate.tfaToken.$reset()
    },
  },
})
</script>
