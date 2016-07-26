'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files']
});

var _ = require('lodash');

gulp.task('views', function () {
  return gulp.src(path.join(conf.paths.src, '/views/*.html'))
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    }))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/views')));
});

gulp.task('injectViews', function () {
  //Inject the CSS
  return gulp.src(path.join(conf.paths.src, '/datacamp-light.js'))
    .pipe(replace("{{mainView}}", generateJSString(conf.paths.tmp + '/views/main.html')))
    .pipe(replace("{{poweredBy}}", generateJSString(conf.paths.tmp + '/views/poweredBy.html')))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});
