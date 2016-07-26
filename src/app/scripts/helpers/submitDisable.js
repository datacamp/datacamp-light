'use strict';

/**
 * Directive that disables a button on submit
 */
angular.module('dataCampLight.directives').directive('submitDisable', ['$timeout', function ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element) {

      function enableSubmitButtons() {
        element.removeAttr('disabled');
      }

      function disableSubmitButtons() {
        element.attr('disabled', 'disabled');
        $timeout(function () {
          element.trigger("mouseleave");
        })
      }

      scope.$on('session::broken', function () {
        enableSubmitButtons();
      });

      scope.$on('session::busy', function () {
        disableSubmitButtons();
      });

      scope.$on('session::loading', function () {
        disableSubmitButtons();
      });

      scope.$on('session::ready', function () {
        enableSubmitButtons();
      });
    }
  };
}]);
