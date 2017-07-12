const gulp = require('gulp');
const del = require('del');


const BUILD_FILES = [
    'dist/',
];

gulp.task('clean', () =>
    del(BUILD_FILES),
);
