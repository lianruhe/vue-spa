'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config')
const isProduction = config.env === 'production'

// generate loader string to be used with extract text plugin
function generateLoaders (loader, loaderOptions) {
  const sourceMap = isProduction
  const loaders = [{
    loader: 'css-loader',
    options: {
      minimize: isProduction,
      sourceMap
    }
  }]

  if (loader) {
    loaders.push({
      loader: loader + '-loader',
      options: Object.assign({}, loaderOptions, {
        sourceMap
      })
    })
  }

  // Extract CSS when that option is specified
  // (which is the case during production build)
  if (isProduction) {
    return ExtractTextPlugin.extract({
      use: loaders,
      fallback: 'vue-style-loader'
    })
  } else {
    return ['vue-style-loader'].concat(loaders)
  }
}

module.exports = {
  loaders: {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass')
  },
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
