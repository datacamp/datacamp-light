'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var gzip = require('gulp-gzip');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files']
});

var _ = require('lodash');

gulp.task('partials', function () {
  return gulp.src(path.join(conf.paths.src, '/app/**/*.html'))
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'dataCampLight',
      root: 'app'
    }))
    .pipe(gulp.dest(conf.paths.tmp));
});

gulp.task('scripts', ['partials'], function () {
  var vendorFiles = _.concat(['bower_components/**/dist/jquery.js'], $.mainBowerFiles(), path.join(conf.paths.src, '/app/**/*.min.js'));

  var angularFiles = [
    path.join(conf.paths.src, '/app/**/*.module.js'),
    path.join(conf.paths.src, '/app/**/*.js'),
    path.join(conf.paths.tmp, '/templateCacheHtml.js')
  ];

  var customFiles = path.join(conf.paths.src, '/scripts/*.js');

  return gulp.src(_.concat(vendorFiles, angularFiles, customFiles))
    .pipe($.filter('**/*.js'))
    .pipe($.concat('script.js'))
    .pipe($.uglify({preserveComments: $.uglifySaveLicense})).on('error', conf.errorHandler('Uglify'))
    .pipe($.rev())
    .pipe(gzip())
    .pipe(gulp.dest(conf.paths.dist));
});
