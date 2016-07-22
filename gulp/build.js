'use strict';

var path = require('path');
var gulp = require('gulp');
var fs = require('fs');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del', 'run-sequence']
});

function generateJSString(file) {
  return fs.readFileSync(file, 'utf8')
    .replace(/\'/g, "\\'")
    .split(/\r?\n/)
    .filter(function (line) {
      return line !== ''
    })
    .join("' +\n '");
}

gulp.task('other', function () {
  var fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('clean', function () {
  return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
});

gulp.task('injectFiles', function () {
  //Find generated scripts (with hashes)
  var files = fs.readdirSync(conf.paths.dist);
  var script = "";
  var style = "";

  for (var i = 0; i < files.length; i++) {
    if (files[i].indexOf('script-') === 0) {
      script = files[i];
    }
    else if (files[i].indexOf('style-') === 0) {
      style = files[i];
    }
  }

  //Inject the JS
  return gulp.src(path.join(conf.paths.src, '/datacamp-light.js'))
    .pipe($.replace("{{scriptLink}}", script))
    .pipe($.replace("{{styleLink}}", style))
    .pipe($.replace("{{version}}", conf.version))
    .pipe($.replace("{{poweredBy}}", generateJSString(conf.paths.tmp + '/views/poweredBy.html')))
    .pipe($.replace("{{mainView}}", generateJSString(conf.paths.tmp + '/views/main.html')))
    .pipe($.replace("{{mainStyle}}", generateJSString(conf.paths.src + '/styles/main.css')))
    .pipe($.uglify({preserveComments: $.uglifySaveLicense})).on('error', conf.errorHandler('Uglify'))
    .pipe($.rename('datacamp-light-latest.min.js'))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('example', function () {
  return gulp.src(path.join(conf.paths.example, '/standalone-*.html'))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('build', ['scripts', 'styles', 'views', 'other', 'example'], function () {
  $.runSequence('injectFiles');
});
