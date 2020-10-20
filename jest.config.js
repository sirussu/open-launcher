module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  setupFiles: ['jest-localstorage-mock'],
  collectCoverageFrom: ['src/**/*.{t|j}s'],
  collectCoverage: true,
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  reporters: ['default', 'jest-github-actions-reporter'],
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  transform: {
    '^.*\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest',
    '.*\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!vue-router|@babel|vuetify)'],
  testMatch: ['**/*.spec.{js,ts,vue}'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
}
