module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ['jest-localstorage-mock'],
  collectCoverageFrom: [
    'src/**/*.js'
  ],
  collectCoverage: true
}
