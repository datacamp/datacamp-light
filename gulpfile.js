'use strict';

var gulp = require('gulp');
var fs = require('fs');

var GULP_TASK_PATH = './gulp/';

//Load all tasks
fs.readdirSync(GULP_TASK_PATH).filter(function (file) {
  return (/\.js$/i).test(file);
}).map(function (file) {
  require(GULP_TASK_PATH + file);
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
