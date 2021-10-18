const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

module.exports = {
  entry: {
    'mds.bs.datetimepicker': './src/mds.bs.datetimepicker.ts',
    'mds.bs.datetimepicker.style': './src/mds.bs.datetimepicker.style.css',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'MdsPersianDateTimePicker',
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
          exposes: ['mds'],
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
  target: 'web',
  watch: true,
  devServer: {
    lazy: false,
    hot: true,
    inline: true,
    watchContentBase: true,
    contentBase: './',
    watchOptions: {
      aggregateTimeout: 200,
      poll: 1000,
      followSymlinks: true,
    }
  },
  optimization: {
    minimize: true,
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
version : 4.1.1
Written By Mohammad Dayyan, Mordad 1397 - 1400
mds.soft@gmail.com - @mdssoft
      `
    })
  ]
};