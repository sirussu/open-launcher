module.exports = {
  presets: ['@vue/cli-plugin-babel/preset', '@babel/preset-typescript'],
  env: {
    test: {
      plugins: ['transform-es2015-modules-commonjs'],
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
      ],
    },
  },
}
