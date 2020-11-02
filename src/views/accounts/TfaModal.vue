<template>
  <v-dialog
    max-width="300px"
    persistent
    v-model="tfaModalToggler"
    @keydown.enter="tfaWasEntered"
  >
    <v-card>
      <v-card-title>
        <span class="headline">{{ $t('accounts.modal.enter_tfa_code') }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model.lazy="validate.tfaToken.$model"
                :error-messages="tfaError"
                autofocus
                clearable
                required
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
        <v-btn text @click.stop="tfaWasEntered" :disabled="validate.$invalid">
          <template #default>
            {{ $t('accounts.add_account') }}
          </template>
        </v-btn>
        <v-btn text @click.stop="resetForm">
          <template #default>
            {{ $t('accounts.modal.close_modal') }}
          </template>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import useVuelidate from '@vuelidate/core'

import { validateTfa } from '@/utils/validate'

export default defineComponent({
  name: 'TfaModal',
  props: {
    hasTfa: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const tfaToken = ref('')
    const validate = useVuelidate(validateTfa, { tfaToken }, 'tfaToken')

    return {
      tfaToken,
      validate,
    }
  },
  computed: {
    tfaModalToggler: {
      get() {
        return this.hasTfa.needTfa
      },
      set(val) {
        this.$emit('tfa-modal-closed', !val)
      },
    },
    tfaError() {
      if (!(this.validate.tfaToken.$dirty && this.hasTfa.needTfa)) {
        return
      }

      if (this.validate.tfaToken.minLength.$invalid) {
        return this.$t('accounts.modal.tfaError.minLength')
      }

      if (this.validate.tfaToken.required.$invalid) {
        return this.$t('accounts.modal.tfaError.required')
      }

      return null
    },
  },
  methods: {
    tfaWasEntered() {
      this.$emit('tfa-was-entered', this.tfaToken)

      this.tfaToken = ''
      this.validate.tfaToken.$reset()
    },
    resetForm() {
      this.tfaToken = ''
      this.$emit('clear-tfa-form')
      this.validate.tfaToken.$reset()
    },
  },
})
</script>
