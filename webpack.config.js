const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    'jquery.md.bootstrap.datetimepicker': './src/jquery.md.bootstrap.datetimepicker.js',
    'jquery.md.bootstrap.datetimepicker.style': './src/jquery.md.bootstrap.datetimepicker.style.css'
  },
  devtool: 'source-map',
  mode: 'production',
  output: {
    filename: '[name].js'
  },
  watch: true,
  devServer: {
    lazy: false,
    watchContentBase: true
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: [{
        test: /.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [{
          loader: `jshint-loader`,
          options: {
            emitErrors: true,
            failOnHint: true
          }
        }]
      },
      {
        test: /.s?css$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          'css-loader'
        ],
      }
    ]
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.BannerPlugin({
      banner: `
Bootstrap 4+ Persian Date Time Picker jQuery Plugin
https://github.com/Mds92/MD.BootstrapPersianDateTimePicker
version : 3.11.5
Written By Mohammad Dayyan, Mordad 1397 - 1400
mds.soft@gmail.com - @mdssoft

      `
    })
  ]
};