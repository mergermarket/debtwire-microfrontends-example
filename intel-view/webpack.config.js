const path = require('path')
const webpack = require('webpack')

const entryPoints = ['./src/index.jsx']
const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.LoaderOptionsPlugin({
    debug: true
  })
]

module.exports = {
  devtool: 'eval-source-map',
  entry: entryPoints,
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.jsx']
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/public/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  },
  plugins,
  optimization: {}
}
