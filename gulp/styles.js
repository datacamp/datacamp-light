'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files']
});

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('stylesInject', function () {
  var sassOptions = {
    style: 'compressed'
  };

  var injectFiles = gulp.src([
    path.join(conf.paths.src, '/app/**/*.scss'),
    path.join('!' + conf.paths.src, '/app/index.scss')
  ], {read: false});

  var injectOptions = {
    transform: function (filePath) {
      filePath = filePath.replace(conf.paths.src + '/app/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  return gulp.src([
    path.join(conf.paths.src, '/app/index.scss')
  ])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/styles/')));
});

gulp.task('styles', ['stylesInject'], function () {
  return gulp.src(_.concat($.mainBowerFiles(), path.join(conf.paths.tmp, '/styles/*.css')))
    .pipe($.filter('**/*.css'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.concatCss("style.css"))
    .pipe($.cssWrap({selector:'.datacamp-exercise'}))
    .pipe($.cleanCss({processImport: false}))
    .pipe($.rev())
    .pipe(gulp.dest(conf.paths.dist));
});
