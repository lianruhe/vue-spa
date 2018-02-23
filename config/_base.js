const { resolve } = require('path')
const _debug = require('debug')
// import { resolve } from 'path'
// import _debug from 'debug'

const debug = _debug('app:config:base')

const env = process.env.NODE_ENV || 'development'

const config = {
  env,

  pkg: require('../package.json'),

  // theme name
  theme: 'default',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  pathBase: resolve(__dirname, '../'),
  dirSrc: 'src',
  dirDist: 'dist',
  dirTest: 'test',
  dirAssets: env ? 'src/static' : 'src/assets',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  serverHost: '0.0.0.0', // binds to all hosts
  serverPort: process.env.PORT || 3000,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compilerDevtool: 'source-map',
  compilerHashType: 'hash',
  compilerHtmlMinify: false,
  compilerPublicPath: '/',
  compilerVendor: [
    'vue',
    'vue-router'
  ]
}

// ------------------------------------
// Environment
// ------------------------------------
config.globals = {
  'process.env.NODE_ENV': JSON.stringify(config.env),
  __DEV__: config.env === 'development',
  __PROD__: config.env === 'production',
  __TEST__: config.env === 'test'
}

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
config.compilerVendor = config.compilerVendor
  .filter(dep => {
    if (config.pkg.dependencies.hasOwnProperty(dep)) {
      return true
    }

    debug(
      'Package "' + dep + '" was not found as an npm dependency in package.json; ' +
      'it won\'t be included in the webpack vendor bundle.\n' +
      'Consider removing it from compiler_vendor in "./config/_base.js"'
    )
  })

// ------------------------------------
// Utilities
// ------------------------------------
config.paths = (() => {
  const base = (...args) =>
    resolve.apply(resolve, [config.pathBase, ...args])

  return {
    base,
    src: base.bind(null, config.dirSrc),
    dist: base.bind(null, config.dirDist),
    test: base.bind(null, config.dirTest),
    assets: base.bind(null, config.dirAssets)
  }
})()

module.exports = config
