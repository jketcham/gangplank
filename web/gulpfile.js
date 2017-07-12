/* eslint-disable comma-dangle */
require('babel-register');
require('require-dir')('gulptasks');

const gulp = require('gulp');
const runSequence = require('run-sequence');


gulp.task('default', () =>
  runSequence(
    'clean',
    [
      'assets',
      'less',
      'webpack:build',
    ]
  )
);


gulp.task('watch', () =>
  runSequence(
    'clean',
    [
      'assets',
      'less:watch',
      'webpack-dev-server',
    ]
  )
);
