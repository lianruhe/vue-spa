const config = require('../config')
const paths = config.paths
const browsers = 'Android >= 4, iOS >= 7'

module.exports = {
  plugins: [
    require('postcss-import')({
      path: paths.src('application/styles')
    }),
    require('postcss-url')({
      basePath: paths.src('static')
    }),
    require('postcss-cssnext')({
      browsers,
      features: {
        customProperties: {
          // variables: require(paths.src('application/styles/variables'))
        },
        // 禁用 autoprefixer，在 postcss-rtl 后单独引入
        // 否则会跟 postcss-rtl 冲突
        autoprefixer: false
      }
    }),
    // 如果不需要 flexible，请移除
    require('postcss-pxtorem')({
      rootValue: 100,
      propWhiteList: []
    }),
    // PostCSS plugin for RTL-optimizations
    // require('postcss-rtl')({
    //   // Custom function for adding prefix to selector. Optional.
    //   addPrefixToSelector (selector, prefix) {
    //     if (/^html/.test(selector)) {
    //       return selector.replace(/^html/, `html${prefix}`)
    //     }
    //     if (/:root/.test(selector)) {
    //       return selector.replace(/:root/, `${prefix}:root`)
    //     }
    //     // compliant with postcss-flexible
    //     if (/^\[data-dpr(="[1-3]")?]/.test(selector)) {
    //       return `${prefix}${selector}`
    //     }
    //     return `${prefix} ${selector}`
    //   }
    // }),
    require('autoprefixer')({
      browsers
    }),
    require('postcss-browser-reporter')(),
    require('postcss-reporter')()
  ]
}
