var webpack = require('webpack');

var PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
  entry: './src/jquery.Bootstrap-PersianDateTimePicker.js',
  devtool: 'source-map',
  output: 
  {
    
    filename: 'jquery.Bootstrap-PersianDateTimePicker.min.js' 
  }
  
};