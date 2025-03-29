const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: {
    'jquery.md.bootstrap.datetimepicker': [
      './src/jquery.md.bootstrap.datetimepicker.js',
      './src/jquery.md.bootstrap.datetimepicker.style.css'
    ]
  },
  devtool: 'source-map',
  mode: 'production', // development   production
  output: {
    filename: '[name].js'
  },
  watch: true,
  devServer: {
    static: {
      watch: true,
    },
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
    rules: [
      {
        test: /.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['js', 'jsx'],
      fix: true,
      emitWarning: true
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.BannerPlugin({
      banner: `
Bootstrap 4+ Persian Date Time Picker jQuery Plugin
https://github.com/Mds92/MD.BootstrapPersianDateTimePicker
version : 3.12.0
Written By Mohammad Dayyan
Social Id: @mds1401

      `
    })
  ]
};