var gulp = require('gulp');
var del = require('del');
var postcss = require('gulp-postcss');
var atImport = require('postcss-import');
var autoprefixer = require('autoprefixer');

gulp.task('clean-css', function() {
    return del([
        'compiled/css'
    ]);
});

gulp.task('clean', function() {
    return del([
        'compiled'
    ]);
});

gulp.task('css', [
    'clean-css'
], function () {
    return gulp
        .src('./app/app.css')
        .pipe(postcss([
            atImport(),
            autoprefixer({
                browsers: ['last 5 version']
            })
        ]))
        .pipe(gulp.dest('./compiled/css'));
});

gulp.task('default', [
    'css'
]);

gulp.task('watch', function () {
    gulp.watch([
        'app/**/*.css'
    ], [
        'css'
    ]);
});
