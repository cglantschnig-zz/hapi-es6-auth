var path = require('path');
var webpack = require('webpack');

console.log(__dirname);

module.exports = {
  entry: './src/adminpanel/main.js',
  output: { path: __dirname, filename: 'bundle.js' }
};
