'use strict';

angular.module('dataCampLight.services').factory('NotificationService', ['growl', '$rootScope', '$timeout', function (growl, $rootScope, $timeout) {

  function resizeLayout() {
    $timeout(function () {
      $rootScope.$broadcast("layout::resize");
    })
  }

  // ----------------------
  // -- Exported Methods --
  // ----------------------
  return {
    create: function (text, severity) {
      if ($.trim(text) !== "") {
        growl.general(text, {
          onclose: function () {
            resizeLayout();
          },
          onopen: function () {
            resizeLayout();
          }
        }, severity);
      }
    }
  };
}]);
