const gulp = require('gulp');
const gutil = require('gulp-util');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');


const SOURCES = [
  'styles/main.less',
];

const DESTINATION = 'dist/';

const LESS_CONFIG = {
  paths: [
    'styles/',
    'node_modules/',
  ],
};


gulp.task('less', () => {
  const compiler = less(LESS_CONFIG);

  compiler.on('error', (error) => {
    gutil.log('[less]', error.toString());
    compiler.emit('end');
  });

  return gulp
    .src(SOURCES)
    .pipe(sourcemaps.init())
    .pipe(compiler)
    .pipe(rename('styles.css'))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(DESTINATION));
});


gulp.task('less:watch', () => {
  gulp.start('less');
  gulp.watch('styles/**/*.less', ['less']);
});
