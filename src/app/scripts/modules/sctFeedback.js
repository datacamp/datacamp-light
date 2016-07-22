'use strict';

angular.module('dataCampLight.directives').directive('sctFeedback', ['NotificationService', function (NotificationService) {
  // ------------------------
  // --- Exported Methods ---
  // ------------------------
  return {
    restrict: 'EA',
    link: function (scope) {

      scope.$on('output::sct', function writeOutput(_, sct) {
        NotificationService.create(sct.message, sct.correct ? "success" : "error");
      });
    }
  };
}]);
