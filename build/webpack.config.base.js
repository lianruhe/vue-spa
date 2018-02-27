const webpack = require('webpack')
const { env, paths, compilerHashType, compilerPublicPath, compilerVendor, compilerDevtool } = require('../config')
// const vueLoaderOptions = require('./vue-loader.options')
const postcssOptions = require('./postcss.options')

module.exports = {
  entry: {
    app: './src/index.js',
    vendor: compilerVendor
  },
  output: {
    path: paths.dist(),
    filename: `[name].[${compilerHashType}].js`,
    publicPath: compilerPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.css', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': paths.src()
    }
  },
  devtool: compilerDevtool,
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [paths.src(), paths.test()],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: postcssOptions,
          // autoprefixer: false,
          loaders: {
            js: 'babel-loader'
          }
          // 必须为 true，否则 vue-loader@12.0.0 会导致 css 加载顺序混乱
          // extractCSS: true
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [paths.src(), paths.test()]
      },
      {
        test: /\.css$/,
        loader: 'postcss-loader',
        options: postcssOptions
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: paths.assets('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: paths.assets('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: paths.assets('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    })
  ]
}
