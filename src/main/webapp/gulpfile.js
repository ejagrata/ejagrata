var gulp = require('gulp'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    minify = require('gulp-minify'),
    uglify = require('gulp-uglify');
/**
 *   file list
 **/
var htmlList = ['*.html', 'modules/*/*.html', 'modules/*/*/*.html', 'modules/*/*/*/*.html'],

    vendorJs = ['js/jquery.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/scrollreveal/dist/scrollreveal.min.js'],

    angularCore = ['node_modules/angular/angular.min.js', 'node_modules/angular-ui-router/release/angular-ui-router.min.js', 'node_modules/angular-animate/angular-animate.min.js', 'node_modules/angular-aria/angular-aria.min.js', 'node_modules/angular-cookies/angular-cookies.min.js'],
    
    angularMaterial =  [ 'node_modules/angular-material/angular-material.min.js'],
    
    angularBootstrap =  [ 'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'],

    appJs = ['*.js', '!gulpfile.js', 'modules/*/*.js', 'modules/*/*/*.js', 'modules/*/*/*/*.js', 'common/*.js'],

    vendorCss = ['node_modules/bootstrap/dist/css/bootstrap.min.css', 'css/animate.css', 'css/icomoon.css', 'css/magnific-popup.css', 'css/superfish.css', 'css/style.css', 'node_modules/angular-material/angular-material.min.css'],

    appCss = ['modules/*/*.css', 'modules/*/*/*.css'];

/**
 * task to compile all HTML files in the project folder
 **/
gulp.task('compile-html', function () {
    gulp.src(htmlList)
        .pipe(connect.reload());
});

/**
 * task to compile all JS files in the project folder
 * outputs the concatinated files to build/script.js
 **/
gulp.task('compile-js', function () {
    gulp.src(vendorJs)
        .pipe(uglify())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('build'));
    gulp.src(angularCore)
        .pipe(uglify())
        .pipe(concat('angular.js'))
        .pipe(gulp.dest('build'));
    gulp.src(angularMaterial)
        .pipe(uglify())
        .pipe(concat('material.js'))
        .pipe(gulp.dest('build'));
    gulp.src(angularBootstrap)
        .pipe(uglify())
        .pipe(concat('ui-bootstrap.js'))
        .pipe(gulp.dest('build'));
    gulp.src(appJs)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('build'))
        .pipe(connect.reload());
});

/**
 * task to compile all CSS files in the project folder
 * outputs the concatinated files to build/style.js
 **/
gulp.task('compile-css', function () {
    gulp.src(vendorCss.concat(appCss))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('build'))
        .pipe(connect.reload());
});

/**
 * task to WATCH all registered files
 **/
gulp.task('watch', function () {
    gulp.watch(htmlList, ['compile-html']);
    gulp.watch(appJs, ['compile-js']);
    gulp.watch(vendorCss, ['compile-css']);
    gulp.watch(appCss, ['compile-css']);
});

/**
 * task to start server
 **/
gulp.task('connect', function () {
    connect.server({
        livereload: true
    })
});

/**
 * default gulp task
 **/
gulp.task('build', ['connect', 'compile-html', 'compile-js', 'compile-css', 'watch']);