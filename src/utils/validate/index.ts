import { required, minLength } from 'vuelidate/lib/validators'
import { ITfaValidator, IAccountFieldsValidator } from '@/utils/validate/types'

export const validateAccountFields: IAccountFieldsValidator = {
  authForm: {
    login: {
      required,
      minLength: minLength(3),
    },
    pass: {
      required,
      minLength: minLength(6),
    },
  },
}

export const validateTfa: ITfaValidator = {
  tfaToken: {
    required,
    minLength: minLength(6),
  },
}
