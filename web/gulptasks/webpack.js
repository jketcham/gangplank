const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const WEBPACK_CONFIGS = require('require-dir')('../webpack');


const STATS_OPTIONS = {
  colors: gutil.colors.supportsColor,
  hash: false,
  timings: true,
  chunks: false,
  chunkModules: false,
  modules: false,
  children: true,
  version: true,
  cached: false,
  cachedAssets: false,
  reasons: false,
  source: false,
  errorDetails: false,
};


// Production build
gulp.task('webpack:build', (callback) => {
  webpack(WEBPACK_CONFIGS['webpack.prod.config'], (err, stats) => {
    if (err) {
      throw new gutil.PluginError('[webpack:build]', err);
    }
    gutil.log('[webpack:build]', stats.toString(STATS_OPTIONS));
    callback();
  });
});


// Development build
gulp.task('webpack:dev', (callback) => {
  webpack(WEBPACK_CONFIGS['webpack.dev.config']).watch(100, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('[webpack:dev]', err);
    }
    gutil.log('[webpack:dev]', stats.toString(STATS_OPTIONS));
  });
});

// Hot loading server
gulp.task('webpack-dev-server', (callback) => {
  const host = 'localhost';
  const port = 8181;
  const compiler = webpack(WEBPACK_CONFIGS['webpack.dev.config']);

  const serverConfig = {
    hot: true,
    publicPath: `/${WEBPACK_CONFIGS['webpack.dev.config'].output.publicPath}`,
    stats: STATS_OPTIONS,
  };

  // Start a webpack-dev-server
  new WebpackDevServer(compiler, serverConfig).listen(port, host, (err) => {
    if (err) {
      throw new gutil.PluginError('[webpack-dev-server]', err);
    }
    gutil.log('[webpack-dev-server]', `http://${host}:${port}/`);
  });
});
