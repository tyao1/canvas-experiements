'use strict';

var path = require('path');
var args = process.argv.slice(2);

var projectPath = path.join(__dirname, 'renderer');
var compiledPath = path.join(__dirname, 'compiled');

module.exports = {
  devtool: 'eval',
  entry: {
    index: [path.join(projectPath, 'app.js')],
  },
  output: {
    path: compiledPath,
    filename: 'index.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /lib|node_modules/
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  eslint: {
    configFile: '.eslintrc'
  }
};
