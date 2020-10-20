module.exports = {
  presets: ['@vue/cli-plugin-babel/preset', '@babel/preset-typescript'],
  plugins: ['transform-es2015-modules-commonjs'],
  env: {
    test: {
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
