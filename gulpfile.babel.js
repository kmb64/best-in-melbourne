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
var istanbul = require('gulp-babel-istanbul');
var jasmine = require('gulp-jasmine');
var reporters = require('jasmine-reporters');
import gulpProtractor from 'gulp-protractor';

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

gulp.task('test:unit', [], function () {
  return gulp.src([jsFiles, '!app/modules/**/test/*.js'])
    .pipe(istanbul({
      includeUntested : true
    }))
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src('app/modules/**/test/*.spec.js')
        .pipe(jasmine({
          verbose: true,
          reporter: new reporters.TerminalReporter({verbosity: 3, color: true})
        }))
        .pipe(istanbul.writeReports());
    })
    .on('error', interceptErrors);
});

gulp.task('protractor:webdriver-update', [], gulpProtractor.webdriver_update);

gulp.task('test:functional', ['protractor:webdriver-update', 'serve:test'], function () {

  return gulp.src(['app/modules/**/test/*.fn.js'])
    .pipe(gulpProtractor.protractor())
    .on('error', interceptErrors)
    .on('end', () => {
      browserSync.exit();
    });
});

gulp.task('test', ['test:unit', 'test:functional']);

gulp.task('assets', ['html', 'browserify', 'sass']);

gulp.task('serve', ['assets'], () => {
  browserSync.init(['./build/**/**.**'], {
    server: 'build',
    port: 9000
  });

  gulp.watch('app/index.html', ['html']);
  gulp.watch(htmlFiles, ['views']);
  gulp.watch(jsFiles, ['browserify']);
  gulp.watch(scssFiles, ['sass']);
});

gulp.task('serve:test', ['assets'], () => {

  return browserSync.init({
    server: 'build',
    port: 9000,
    open : false
  });

});
