<template>
  <v-dialog
    max-width="300px"
    persistent
    v-model="isTfa"
    @keydown.enter="tfaWasEntered"
  >
    <v-card>
      <v-card-title>
        <span class="headline">{{ $t('accounts.modal.enter_tfa_code') }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" v-if="hasTfa">
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
        <v-btn text @click="tfaWasEntered" :disabled="validate.$invalid">
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
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import useVuelidate from '@vuelidate/core'

import { validate2fa } from '@/utils/validate'

export default defineComponent({
  name: 'TfaModal',
  props: {
    hasTfa: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const tfaToken = ref('')
    const validate = useVuelidate(validate2fa, { tfaToken }, 'tfaToken')

    return {
      tfaToken,
      validate,
    }
  },
  computed: {
    isTfa: {
      get() {
        return this.hasTfa
      },
      set(val) {
        if (val) {
          return this.get()
        }
      },
    },
    tfaError() {
      if (!(this.validate.tfaToken.$dirty && this.isTfa)) {
        return
      }

      if (this.validate.tfaToken.minLength.$invalid) {
        return this.$t('accounts.modal.tfaError.minLength')
      }

      if (this.validate.tfaToken.required.$invalid) {
        return this.$t('accounts.modal.tfaError.required')
      }
    },
  },
  methods: {
    tfaWasEntered() {
      this.$emit('tfa-was-entered', {
        tfaToken: this.tfaToken,
      })

      this.tfaToken = ''
    },
    resetForm() {
      this.tfaToken = ''
      this.$emit('clear-error')
      this.$emit('clear-form')
    },
  },
})
</script>
