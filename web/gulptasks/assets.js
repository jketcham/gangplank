const gulp = require('gulp');


gulp.task('assets', () => {
  gulp.src('public/*')
    .pipe(gulp.dest('dist/'));
});
