'use strict';

var gulp = require('gulp');
var wrench = require('wrench');

//Load all tasks
wrench.readdirSyncRecursive('./gulp').filter(function (file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function (file) {
  require('./gulp/' + file);
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
