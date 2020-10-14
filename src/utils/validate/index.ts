import { required, minLength } from 'vuelidate/lib/validators'
import { I2faValidator, IAccountFieldsValidator } from '@/utils/validate/types'

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

export const validate2fa: I2faValidator = {
  tfaToken: {
    required,
    minLength: minLength(6),
  },
}
