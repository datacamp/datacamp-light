(function () {
  'use strict';

  //Load all exercise div's and bootstrap the DataCamp Light Angular app
  var exercises = document.querySelectorAll("[data-datacamp-exercise]");

  for (var i = 0; i < exercises.length; i++) {
    angular.bootstrap(exercises[i], ['dataCampLight']);
  }
})();
