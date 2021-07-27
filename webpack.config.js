const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

module.exports = {
  entry: {
    'sample': './src/sample.ts',
    'mds.bs.datetimepicker.style': './src/mds.bs.datetimepicker.style.css',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'SampleModule',
      type: 'umd',
    },
  },
  devtool: 'source-map',
  mode: 'production',
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: [{
        loader: 'expose-loader',
        options: {
          exposes: ['Mds'],
        },
      }, {
        loader: 'ts-loader'
      }],
      exclude: /node_modules/,
    }, {
      test: /.s?css$/,
      use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {}
        },
        'css-loader'
      ],
    }],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: {
    bootstrap: 'bootstrap',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  watch: false,
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
  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.BannerPlugin({
      banner: `
Bootstrap 5+ Persian Date Time Picker jQuery Plugin
https://github.com/Mds92/MD.BootstrapPersianDateTimePicker
version : 4.0.0
Written By Mohammad Dayyan, Mordad 1397 - 1400
mds.soft@gmail.com - @mdssoft
      `
    })
  ]
};