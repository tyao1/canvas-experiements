var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require("./webpack.config.js");
var path = require('path');
var projectPath = path.join(__dirname, 'renderer');
var compiledPath = path.join(__dirname, 'compiled');

config.entry.index.unshift("webpack-dev-server/client?http://localhost:8080/"); //, "webpack/hot/dev-server");
var compiler = webpack(config);

var server = new webpackDevServer(compiler, {
  // hot: true,
  inline: true,
  contentBase: compiledPath,
});

server.listen(8080,
  function(err, result) {
    if (err) {
      console.log(errr);
    } else {
      console.log('Listening at 8080');
    }
  }
);
