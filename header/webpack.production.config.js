const config = require('./webpack.config.js')
const webpack = require('webpack')

// config.externals = {
  // react: 'React', // this is a short term solution to the symbol polyfill problem in IE11
  // 'react-dom': 'ReactDOM',
  // moment: 'moment',
  // 'moment-timezone': 'moment'
// }

config.devtool = 'cheap-source-map'

config.plugins.push(
  new webpack.LoaderOptionsPlugin({
    debug: false
  })
)

module.exports = config
