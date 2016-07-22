'use strict';

angular.module('dataCampLight.directives').directive('actionPanel', function () {
  // ------------------------
  // --- Exported Methods ---
  // ------------------------
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'app/views/partials/action_panel.html',
    link: function (scope, element) {
      element.children('.dcl-btn').on("click", function () {
        angular.element(this).blur();
      });
    }
  };
});
