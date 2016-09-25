import gulp from 'gulp';
import notify from 'gulp-notify';
import source from 'vinyl-source-stream';
import browserify from 'browserify';
import babelify from 'babelify';
import ngAnnotate from 'browserify-ngannotate';
import browserSync from 'browser-sync';
import rename from 'gulp-rename';
import templateCache from 'gulp-angular-templatecache';
import uglify from 'gulp-uglify';
import sass from 'gulp-sass';
import del from 'del';
import istanbul from 'gulp-babel-istanbul';
import jasmine from 'gulp-jasmine';
import reporters from 'jasmine-reporters';
import gulpProtractor from 'gulp-protractor';
import modRewrite  from 'connect-modrewrite';

const htmlFiles = 'app/modules/**/*.html';
const jsFiles = 'app/modules/**/*.js';
const scssFiles = 'app/styles/**/*.scss';

let bs = browserSync.create();

const projectDirs = {
  src: 'app',
  dest: 'build/'
};

function interceptErrors(error) {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
}

gulp.task('browserify', ['views'], () => {
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

gulp.task('clean', () => {
  return del.sync([projectDirs.dest]);
});

gulp.task('sass', () => {
  return gulp.src('./app/styles/app.scss')
    .pipe(sass().on('error', interceptErrors))
    .pipe(gulp.dest(projectDirs.dest + 'styles/'));
});

gulp.task('uglify', () => {
  return gulp.src(projectDirs.dest + 'app.js')
    .pipe(uglify())
    .pipe(gulp.dest(projectDirs.dest));
});

gulp.task('html', () => {
  return gulp.src('app/index.html')
    .on('error', interceptErrors)
    .pipe(gulp.dest(projectDirs.dest));
});

gulp.task('views', () => {
  return gulp.src(htmlFiles)
    .pipe(templateCache({
      standalone: true
    }))
    .on('error', interceptErrors)
    .pipe(rename('app.templates.js'))
    .pipe(gulp.dest('app/modules/config/'));
});

gulp.task('test:unit', [], () => {
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

gulp.task('test:functional', ['protractor:webdriver-update', 'serve:test'], () => {

  return gulp.src(['app/modules/**/test/*.fn.js'])
    .pipe(gulpProtractor.protractor())
    .on('error', interceptErrors)
    .on('end', () => {
      bs.exit();
    });
});

gulp.task('test', ['test:unit', 'test:functional']);

gulp.task('assets', ['html', 'browserify', 'sass']);

gulp.task('serve', ['assets'], () => {
  bs.init(['./build/**/**.**'], {
    server: 'build',
    middleware: [
      modRewrite([
        '!\\.\\w+$ /index.html [L]'
      ])
    ],
    port: 9000
  });

  gulp.watch('app/index.html', ['html']);
  gulp.watch(htmlFiles, ['views']);
  gulp.watch(jsFiles, ['browserify']);
  gulp.watch(scssFiles, ['sass']);
});

gulp.task('serve:test', ['assets'], () => {

  return bs.init({
    server: 'build',
    port: 9000,
    open : false
  });

});
