module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ['jest-localstorage-mock'],
  collectCoverageFrom: [
    'src/**/*.js'
  ],
  collectCoverage: true,
  setupFilesAfterEnv: ['./jest.setup.js'],
  transform: { '^.*\\.js$': 'babel-jest' },
  transformIgnorePatterns: ['node_modules/(?!vue-router|@babel|vuetify)']
}
