module.exports = {
  lintOnSave: false,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        publish: [
          'github'
        ]
      }
    },
    i18n: {
      locale: 'ru',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
