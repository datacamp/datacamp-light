(function () {
  'use strict';

  angular.module('dataCampLight.directives', []);
  angular.module('dataCampLight.controllers', []);
  angular.module('dataCampLight.services', []);

  angular
    .module('dataCampLight', [
      'ui.bootstrap',
      'angular-growl',
      'ngSanitize',
      'ngCookies',
      'dataCampLight.directives',
      'dataCampLight.controllers',
      'dataCampLight.services'
    ]);
})();
