var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var cleanCSS    = require('gulp-clean-css');
var concat      = require('gulp-concat');

gulp.task('bootstrap', function() {
    return gulp.src(['src/css/bootstrap/*.scss'])
        .pipe(sass())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('bootstrap.min.css'))
        .pipe(gulp.dest("dist/css/"))
        .pipe(browserSync.stream());
});

gulp.task('sass', function() {
    return gulp.src(['src/css/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
    return gulp.src(['src/*.html'])
        .pipe(gulp.dest("dist/"));
});

gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("dist/js/"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('watch', function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch(['src/css/bootstrap/*.scss'], ['bootstrap']);
    gulp.watch(['src/css/*.scss'], ['sass']);
    gulp.watch(['src/*.html'], ['html']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['js', 'bootstrap', 'sass', 'html', 'watch']);
