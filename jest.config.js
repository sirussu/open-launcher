module.exports = {
  setupFiles: ['jest-localstorage-mock'],
  collectCoverageFrom: ['src/**/*.{t|j}s'],
  collectCoverage: true,
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  testURL: 'http://localhost/',
  transformIgnorePatterns: [
    'node_modules/(?!vue-router|vuetify|babel-jest|jest-vue-preprocessor)',
  ],
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: ['**/*.spec.{js,ts,vue}'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  reporters: ['default', 'jest-github-actions-reporter'],
}
