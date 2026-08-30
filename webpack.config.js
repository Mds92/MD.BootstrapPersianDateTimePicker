const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

module.exports = (env, argv) => {
  const isDev = Boolean(env.WEBPACK_SERVE) || argv.mode === 'development';

  return {
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
    devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
    mode: isDev ? 'development' : 'production',
    module: {
      rules: [{
        test: /\.tsx?$/,
        use: [{
          loader: 'expose-loader',
          options: {
            exposes: ['mds'],
          },
        }, {
          loader: 'esbuild-loader',
          options: {
            loader: 'ts',
            target: 'es2017',
          },
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
    ...(env.WEBPACK_SERVE ? {} : { watch: true }),
    devServer: {
      hot: true,
      static: {
        directory: path.join(__dirname),
        watch: false,
      },
      compress: false,
      port: 9000,
      open: ['/demo/demo.html'],
    },
    optimization: {
      minimize: !isDev,
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
Bootstrap 5+ Persian Date Time Picker
https://github.com/Mds92/MD.BootstrapPersianDateTimePicker
version : 4.4.0
Written By Mohammad Dayyan, Mordad 1397 - 1404
mds_soft@yahoo.com - @mds1401
      `
      })
    ]
  };
};
