import { ValidationRule } from 'vuelidate/lib/validators'

export interface IAccountFieldsValidator {
  authForm: {
    login: {
      required: () => ValidationRule
      minLength: (length: number) => boolean
    }
    pass: {
      required: () => ValidationRule
      minLength: (length: number) => boolean
    }
  }
}

export interface ITfaValidator {
  tfaToken: {
    required: () => ValidationRule
    minLength: (length: number) => boolean
  }
}
