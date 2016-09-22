var gulp = require('gulp');
var notify = require('gulp-notify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var ngAnnotate = require('browserify-ngannotate');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var merge = require('merge-stream');
var sass = require('gulp-sass');
var del = require('del');

var htmlFiles = 'app/modules/**/*.html';
var jsFiles = 'app/modules/**/*.js';
var scssFiles = 'app/styles/**/*.scss';

var projectDirs = {
  src: 'app',
  dest: 'build/'
};

var interceptErrors = function (error) {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};

gulp.task('browserify', ['views'], function () {
  return browserify('./app/app.js')
    .transform(babelify, {presets: ["es2015"]})
    .transform(ngAnnotate)
    .bundle()
    .on('error', interceptErrors)
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('app.js'))
    // Start piping stream to tasks!
    .pipe(gulp.dest(projectDirs.dest));
});

gulp.task('clean', function () {
  return del.sync([projectDirs.dest]);
});

gulp.task('sass', function () {
  return gulp.src('./app/styles/app.scss')
    .pipe(sass().on('error', interceptErrors))
    .pipe(gulp.dest(projectDirs.dest + 'styles/'));
});

gulp.task('uglify', function () {
  return gulp.src(projectDirs.dest + 'app.js')
    .pipe(uglify())
    .pipe(gulp.dest(projectDirs.dest));
});

gulp.task('html', function () {
  return gulp.src('app/index.html')
    .on('error', interceptErrors)
    .pipe(gulp.dest(projectDirs.dest));
});

gulp.task('views', function () {
  return gulp.src(htmlFiles)
    .pipe(templateCache({
      standalone: true
    }))
    .on('error', interceptErrors)
    .pipe(rename('app.templates.js'))
    .pipe(gulp.dest('app/modules/config/'));
});

gulp.task('assets', ['html', 'browserify', 'sass']);

gulp.task('serve', ['assets'], function () {

  browserSync.init(['./build/**/**.**'], {
    server: 'build',
    port: 9000,
    ui: {
      port: 9001
    }
  });

  gulp.watch('app/index.html', ['html']);
  gulp.watch(htmlFiles, ['views']);
  gulp.watch(jsFiles, ['browserify']);
  gulp.watch(scssFiles, ['sass']);
});
