import { required, minLength } from 'vuelidate/lib/validators'
import { IAccountFieldsValidator } from '@/utils/validate/types'

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
  tfaToken: {
    required,
    minLength: minLength(6),
  },
}
