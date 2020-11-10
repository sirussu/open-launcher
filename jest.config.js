module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript',
  setupFilesAfterEnv: ['./jest.setup.js'],
  setupFiles: ['jest-localstorage-mock', 'jest-date-mock'],
  transformIgnorePatterns: [
    'node_modules/(?!vue-router|vuetify|jest-vue-preprocessor|vuex-composition-helpers)',
  ],
}
