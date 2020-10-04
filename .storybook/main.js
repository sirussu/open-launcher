const path = require('path')

module.exports = {
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
  ],
  stories: ['../stories/**/*.stories.@(j|t)s'],
   webpackFinal: async (config) => {
     config.resolve.extensions.push(
       '.vue',
       '.css',
       '.less',
       '.scss',
       '.sass',
       '.html'
     )

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    }

         config.module.rules.push(
           {
             test: /\.s(c|a)ss$/,
             use: [
               'vue-style-loader',
               {
                 loader: 'css-loader',
                 options: {
                   esModule: false,
                 },
               },
               {
                 loader: 'sass-loader',
                 options: {
                   implementation: require('sass'),
                   sassOptions: {
                     data: `@import "@/packages/theme/styles/idm.scss"`,
                     indentedSyntax: true,
                     fiber: require('fibers'),
                   },
                 },
               },
             ],
           },
           {
             test: /\.html$/,
             exclude: /node_modules/,
             use: { loader: 'html-loader' },
           }
         )

    return config
  },
}
