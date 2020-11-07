const { GenerateSW } = require('workbox-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  lintOnSave: isDevelopment,
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
  },
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
      !isDevelopment &&
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
    ].filter(Boolean),
  },
}
