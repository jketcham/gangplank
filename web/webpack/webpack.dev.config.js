const path = require('path');
const webpack = require('webpack');

const base = require('./webpack.base.config');

const ROOT_DIR = path.normalize(path.join(__dirname, '..'));

module.exports = Object.assign({}, base, {
  devtool: 'cheap-module-inline-source-map',

  entry: {
    main: [
      'webpack-dev-server/client?http://localhost:8181',
      'webpack/hot/dev-server',
      path.join(ROOT_DIR, 'src/main.js'),
    ],
  },

  output: {
    path: path.join(ROOT_DIR, 'dist'),
    publicPath: 'dist/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].js',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      Promise: 'bluebird',
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
    }),
  ],
});
