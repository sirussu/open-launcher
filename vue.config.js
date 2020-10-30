const { GenerateSW } = require('workbox-webpack-plugin')

module.exports = {
  lintOnSave: false,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        publish: ['github'],
      },
    },
    i18n: {
      locale: 'ru',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      new GenerateSW({
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: new RegExp('/uploads/news'),
            handler: 'CacheFirst',
          },
        ],
        navigateFallbackDenylist: [new RegExp('^/_')],
      }),
    ],
  },
}
