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
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
