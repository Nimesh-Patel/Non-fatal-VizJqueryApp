'use strict';
const proxy         = require('./proxy/config.js');
let gulp            = require('gulp'),
    sourceMaps      = require('gulp-sourcemaps'),
    webpack         = require("webpack"),
    webpackConfig   = require("./webpack.js"),
    gulpPlugin      = require('gulp-load-plugins')(),
    browserSync     = require('browser-sync').create(),
    sass            = require('gulp-sass'),
    autoprefixer    = require('autoprefixer'),
    postcss         = require('gulp-postcss'),
    minifyCss       = require('gulp-minify-css'),
    historyFallback = require('connect-history-api-fallback'),
    clean           = require('gulp-clean'),
    gulpCopy        = require('gulp-copy'),
    imagemin        = require('gulp-imagemin'), 
    rename          = require("gulp-rename");

gulp.task('reload-js', ['scripts'], function(done) {
  //  browserSync.reload();
    done();
});

gulp.task('reload-css', ['styles'], function(done) {
  //  browserSync.reload();
    done();
});

gulp.task('styles', function() {
    return gulp.src('./client/assets/styles/index.scss')
        .pipe(sass())
        .pipe(sourceMaps.write({includeContent: true}))
        .pipe(sourceMaps.init({loadMaps: true}))
        .pipe(postcss([
            autoprefixer({
                browsers : ["> 1%", "last 2 versions"]
            })
        ]))
        .pipe(sourceMaps.write('.'))
        .pipe(minifyCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./public/'));
});

gulp.task('scripts', function(cb) {
    webpack(webpackConfig.DEVELOPMENT_CONFIG, function(err, stats) {
        if (err) {
            throw new gulpPlugin.util.PluginError('webpack', err);
        }
        gulpPlugin.util.log('[webpack]', stats.toString({
            colors: true
        }));
        cb();
    });
});

gulp.task('prod-scripts', function(cb) {
    webpack(webpackConfig.PRODUCTION_CONFIG, function(err, stats) {
        if (err) {
            throw new gulpPlugin.util.PluginError('webpack', err);
        }
        gulpPlugin.util.log('[webpack]', stats.toString({
            colors: true
        }));
        cb();
    });
});

gulp.task('browser-sync', ['scripts', 'styles'], function() {
    // browserSync.init({
    //     port: proxy.selectedProxy.CLIENT_PORT,
    //     server: {
    //         baseDir: "./",
    //         index: 'index.html'
    //     },
    //     middleware: [
    //         historyFallback()
    //     ]
    // });
});

gulp.task('clean', function () {
    return gulp.src('public/', {read: false})
        .pipe(clean());
});

gulp.task('clean-dist', function() {
    return gulp.src('dist/', {read: false})
        .pipe(clean());
});

gulp.task('copy-html', function () {
    return gulp.src('index.html')
        .pipe(gulpCopy('dist/'));
});

gulp.task('copy-public', function () {
    return gulp.src('public/**')
        .pipe(gulpCopy('dist/'));
});

gulp.task('minify-img', () =>
	gulp.src('client/assets/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/assets/images'))
);

gulp.task('server-clean', function () {
    return gulp.src('dist/server/', {read: false})
        .pipe(clean());
});
gulp.task('server-script', () => {
    gulp.src(['server/**', '!server/config/**'])
        .pipe(gulp.dest('dist/server'))
});
gulp.task('server-proxy', () => {
    gulp.src('proxy/config.prod.js')
    .pipe(rename('config.js'))
    .pipe(gulp.dest('dist/proxy/'))
});
gulp.task('copy-package', () => {
    gulp.src('./package.json')
    .pipe(gulp.dest('dist/'))
});
gulp.task('server-config', () => {
    gulp.src('./server/config/config.prod.js')
    .pipe(rename('config.js'))
    .pipe(gulp.dest('./dist/server/config/'))
});
gulp.task('server-clean-config', function () {
    return gulp.src('./dist/server/config/', {read: false})
        .pipe(clean());
});
gulp.task('watch', function() {
    gulp.watch('client/app/**/*.js', ['reload-js']);
    gulp.watch('client/assets/styles/*.scss', ['reload-css']);
    gulp.watch('client/app/**/*.scss', ['reload-css']);
    gulp.watch('client/app/**/*.hbs', ['reload-js']);
});
gulp.task('compile', ['prod-scripts', 'styles']);
// gulp.task('bundle', ['copy-html', 'copy-public', 'minify-img']);
gulp.task('bundle', ['copy-html', 'copy-public']);
// Gulp Serve for Development (public/)
gulp.task('serve', ['clean', 'browser-sync', 'watch']);
// Gulp Build for Deployment (dist/)
gulp.task('build', ['compile'], function() {
    gulp.start('bundle');
});
gulp.task('build-server', ['copy-package',  'server-script', 'server-proxy', 'server-config']);