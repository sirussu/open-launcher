const OFF = 'off'
const ERROR = 'error'
const WARN = 'warn'

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
  },
  extends: ['plugin:vue/essential', '@vue/standard', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? WARN : OFF,
    'no-debugger': process.env.NODE_ENV === 'production' ? WARN : OFF,
  },
  overrides: [
    {
      files: ['*.ts', '*.vue'],
      extends: [
        'plugin:vue/essential',

        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',

        '@vue/typescript/recommended',

        '@vue/prettier',
        '@vue/prettier/@typescript-eslint',
      ],
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-unused-vars': ERROR,
        '@typescript-eslint/no-explicit-any': [
          ERROR,
          { ignoreRestArgs: false, fixToUnknown: false },
        ],
        '@typescript-eslint/ban-ts-ignore': OFF,
        '@typescript-eslint/explicit-module-boundary-types': OFF,
      },
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
}
