var gulp          = require('gulp');
var notify        = require('gulp-notify');
var source        = require('vinyl-source-stream');
var browserify    = require('browserify');
var babelify      = require('babelify');
var ngAnnotate    = require('browserify-ngannotate');
var browserSync   = require('browser-sync').create();
var rename        = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var uglify        = require('gulp-uglify');
var merge         = require('merge-stream');
var sass = require('gulp-sass');
var del = require('del');

// Where our files are located
var jsFiles   = "src/js/**/*.js";
var scssFiles = "src/css/**/*.scss";
var viewFiles = "src/js/**/*.html";

var interceptErrors = function(error) {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};

gulp.task('clean', function() {
  return del.sync(['dist', 'build']);
});


gulp.task('sass', function () {
  return gulp.src(scssFiles)
    .pipe(sass().on('error', interceptErrors))
    .pipe(gulp.dest('./build/css/'));
});


gulp.task('browserify', ['views'], function() {
  return browserify('./src/js/app.js')
    .transform(babelify, {presets: ["es2015"]})
    .transform(ngAnnotate)
    .bundle()
    .on('error', interceptErrors)
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('main.js'))
    // Start piping stream to tasks!
    .pipe(gulp.dest('./build/'));
});

gulp.task('html', function() {
  return gulp.src("src/index.html")
    .on('error', interceptErrors)
    .pipe(gulp.dest('./build/'));
});

gulp.task('fonts', function() {
  return gulp.src("src/fonts/*.*")
    .on('error', interceptErrors)
    .pipe(gulp.dest('./build/fonts'));
});

gulp.task('images', function() {
  return gulp.src("src/images/*.*")
    .on('error', interceptErrors)
    .pipe(gulp.dest('./build/images'));
});

gulp.task('views', function() {
  return gulp.src(viewFiles)
    .pipe(templateCache({
      standalone: true
    }))
    .on('error', interceptErrors)
    .pipe(rename("app.templates.js"))
    .pipe(gulp.dest('./src/js/config/'));
});

// This task is used for building production ready
// minified JS/CSS files into the dist/ folder
gulp.task('build', ['html', 'browserify', 'sass'], function() {
  var html = gulp.src(["build/index.html"])
    .pipe(gulp.dest('./dist/'));

  var js = gulp.src("build/main.js")
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));

  var css = gulp.src("build/css/*.css")
    .pipe(gulp.dest('./dist/css'));

  var fonts =  gulp.src("src/fonts/*.*")
    .pipe(gulp.dest('./dist/fonts'));

  var images =  gulp.src("src/images/*.*")
    .pipe(gulp.dest('./dist/images'));

  var firebase =  gulp.src(["src/firebase.json", "src/database.rules.json", "src/.firebaserc"])
    .pipe(gulp.dest('./dist/'));

  return merge(html,js);
});

gulp.task('default', ['html', 'browserify', 'sass', 'fonts', 'images'], function() {

  browserSync.init(['./build/**/**.**'], {
    server: "./build",
    port: 9000,
    notify: false,
    ui: {
      port: 9001
    }
  });

  gulp.watch("src/index.html", ['html']);
  gulp.watch(viewFiles, ['views']);
  gulp.watch(jsFiles, ['browserify']);
  gulp.watch(scssFiles, ['sass']);
});
