const OFF = 'off'
const ERROR = 'error'
const WARN = 'warn'

module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    jest: true,
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2017,
  },

  settings: {
    'import/core-modules': ['electron'],
  },

  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/prettier',
    'plugin:vue/essential',
    '@vue/typescript',
  ],
  plugins: ['eslint-plugin-import', 'lodash'],

  rules: {
    'prettier/prettier': ERROR,
    'no-console': process.env.NODE_ENV === 'production' ? WARN : OFF,
    'no-debugger': process.env.NODE_ENV === 'production' ? WARN : OFF,
    'lodash/import-scope': [ERROR, 'method'],
    'import/order': [
      ERROR,
      {
        groups: [
          ['builtin', 'external'],
          ['internal'],
          ['parent', 'sibling', 'index'],
          ['object'],
        ],
        'newlines-between': 'always',
      },
    ],
    'max-len': [
      ERROR,
      120,
      4,
      {
        ignoreComments: true,
        ignoreUrls: true,
      },
    ],
  },

  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'max-len': OFF,
      },
    },
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
        '@typescript-eslint/ban-ts-comment': OFF,
        '@typescript-eslint/no-empty-interface': OFF,
        '@typescript-eslint/naming-convention': [
          ERROR,
          {
            selector: 'interface',
            format: ['PascalCase'],
            custom: {
              regex: '^I[A-Z]',
              match: true,
            },
          },
        ],
      },
    },
    {
      files: ['**/__tests__/*.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
}
