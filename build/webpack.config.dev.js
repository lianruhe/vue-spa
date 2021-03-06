const fs = require('fs')
const path = require('path')
// const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const baseWebpackConfig = require('./webpack.config.base')

// add hot-reload related code to entry chunks
// Object.keys(baseWebpackConfig.entry).forEach(function (name) {
//   baseWebpackConfig.entry[name] = ['webpack-dev-server/client', './build/dev-client'].concat(baseWebpackConfig.entry[name])
// })

module.exports = merge(baseWebpackConfig, {
  // module: {
  //   rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  // },
  // cheap-module-eval-source-map is faster for development
  // devtool: '#cheap-module-eval-source-map',
  plugins: [
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      serviceWorkerLoader: `<script>${fs.readFileSync(path.join(__dirname,
        './service-worker-dev.js'), 'utf-8')}</script>`
    }),
    new FriendlyErrorsPlugin()
  ]
})
