'use strict';

const gulp = require('gulp');

const atImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');
const del = require('del');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

const TASK_NAME_DEFAULT = 'default';
const TASK_NAME_CLEAN = 'clean';
const TASK_NAME_CLEAN_CSS = 'clean-css';
const TASK_NAME_CSS = 'css';
const TASK_NAME_WATCH = 'watch';

gulp.task(TASK_NAME_CLEAN_CSS, () => del([
    'compiled/css',
]));

gulp.task(TASK_NAME_CLEAN, () => del([
    'compiled',
]));

gulp.task(
    TASK_NAME_CSS,
    [
        TASK_NAME_CLEAN_CSS,
    ],
    () => gulp
        .src('./app/app.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([
            atImport(),
            autoprefixer({
                browsers: ['last 5 version'],
            }),
            csso(),
        ]))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./compiled/css')));

gulp.task(TASK_NAME_DEFAULT, [
    TASK_NAME_CSS,
]);

gulp.task(TASK_NAME_WATCH, () => {
    gulp.watch([
        'app/**/*.css',
    ], [
        TASK_NAME_CSS,
    ]);
});
