module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ['jest-localstorage-mock'],
  collectCoverageFrom: ['src/**/*.{t|j}s'],
  collectCoverage: true,
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  transform: {
    '^.*\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    '.*\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!vue-router|@babel|vuetify)'],
  testMatch: ['**/*.spec.{js,ts,vue}'],
}
