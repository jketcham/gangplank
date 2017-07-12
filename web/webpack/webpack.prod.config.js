/* eslint-disable prefer-template */
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const PUBLIC_PATH = 'https://chandler.gangplank.space/';
const base = require('./webpack.base.config');


module.exports = Object.assign({}, base, {
  // Don't attempt to continue if there are any errors.
  bail: true,

  devtool: 'source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new webpack.ProvidePlugin({
      Promise: 'bluebird',
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        comparisons: false,
      },
      output: {
        comments: false,
      },
      sourceMap: true,
    }),
    new SWPrecacheWebpackPlugin(
      {
        cacheId: 'anchor-web',
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'service-worker.js',
        minify: true,
        navigateFallback: PUBLIC_PATH + 'index.html',
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      },
    ),
  ],
});
