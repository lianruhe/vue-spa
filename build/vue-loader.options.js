'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config')
const { __PROD__ } = config.globals

// generate loader string to be used with extract text plugin
function generateLoaders (loader, loaderOptions) {
  const sourceMap = __PROD__
  const loaders = [{
    loader: 'css-loader',
    options: {
      minimize: __PROD__,
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
  if (__PROD__) {
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
