/**
 * requires
 */
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const runSequence = require('run-sequence');
const browserSync = require('browser-sync');
const babelify = require('babelify');
const browserify = require('browserify');
const transform = require('vinyl-transform');
const through2 = require('through2');
const fs = require('fs');

/**
 * consts
 */
const PATH_SRC = 'src';
const PATH_DIST = 'dist';
const MARKUP = '/**/*.html';
const SCRIPT = '/**/*.js';
const plumberOptions = {
    errorHandler: function(error) {
        console.log(error.messageFormatted);
        this.emit('end');
    }
};

/**
 * tasks
 */
gulp.task('build:markup', function() {
    return gulp.src(PATH_SRC + '/index.html')
        .pipe($.plumber(plumberOptions))
        .pipe(gulp.dest(PATH_DIST));
});
gulp.task('build:script', function() {
    return gulp.src(PATH_SRC + '/js/main.js')
        .pipe(through2.obj(function(file, encode, callback) {
            browserify(file.path, {
                    debug: true
                })
                .transform(babelify, {
                    presets: ['es2015', 'stage-0']
                })
                .bundle(function(err, res) {
                    if (err) {
                        return callback(err);
                    }
                    file.contents = res;
                    callback(null, file)
                });
        }))
        .pipe($.plumber())
        .pipe($.uglify())
        .pipe(gulp.dest(PATH_DIST));
});
gulp.task('build', [
    'build:markup',
    'build:script',
]);

/**
 * ローカルwebサーバーの起動
 * $ serve
 */
gulp.task('serve', function() {
    browserSync({
        host: 'localhost',
        port: 8000,
        server: {
            baseDir: PATH_DIST,
            directory: true
        }
    });
});

/**
 * ブラウザのオートリロード
 * $ reload
 */
gulp.task('reload', function() {
    return browserSync.reload();
});

/**
 * 変更ファイルの監視
 * $ watch
 */
gulp.task('watch', ['serve'], function() {
    gulp.watch(PATH_SRC + '/index.html', function() {
        runSequence('build:markup', 'reload');
    });
    gulp.watch(PATH_SRC + '/**/*.js', function() {
        runSequence('build:script', 'reload');
    });
});

/**
 * デフォルト
 * $ gulp
 */
gulp.task('default', [
    'build', 'watch'
]);
