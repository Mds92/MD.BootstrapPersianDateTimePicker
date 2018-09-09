var webpack = require('webpack');

var PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
  entry: './entry.js',
  devtool: 'source-map',
  output: {
    path: './dist',
    filename: PROD ? 'bundle.min.js' : 'bundle.js'
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ] : []
};