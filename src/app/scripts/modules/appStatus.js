'use strict';

angular.module('dataCampLight.directives').directive('appStatus', ['$timeout', '$animate', function ($timeout, $animate) {
  // ------------------------
  // --- Exported Methods ---
  // ------------------------
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'app/views/partials/app_status.html',
    link: function (scope, element) {
      var messageTimer;
      var MESSAGE_TIME = 3000;

      scope.isLoading = false;
      scope.isBusy = false;
      scope.isBroken = true;
      scope.appStatusText = "Session Inactive";

      var appStatus = element;
      var appStatusText = appStatus.find(".dcl-app-status-text");
      appStatusText.hide();

      function cancelMessageTimer() {
        if (messageTimer != null) {
          $timeout.cancel(messageTimer);
          messageTimer = null;
        }
      }

      function startMessageTimer() {
        messageTimer = $timeout(function () {
          if (!appStatus.is(":hover")) {
            appStatusText.fadeOut(1000);
          }
        }, MESSAGE_TIME);
      }

      scope.$on('session::loading', function (_, text) {
        cancelMessageTimer();
        scope.appStatusText = text;
        appStatusText.fadeIn(500);
        scope.isLoading = true;
        scope.isBusy = false;
      });


      scope.$on('session::busy', function (_, text) {
        scope.appStatusText = text;
        if (!scope.isLoading) {
          scope.isBusy = true;
        }
      });

      scope.$on('session::broken', function (_, text) {
        scope.appStatusText = text;
        appStatusText.fadeIn(500);
        startMessageTimer();
        scope.isBroken = true;
        scope.isLoading = false;
        scope.isBusy = false;
      });

      scope.$on('session::ready', function () {
        scope.appStatusText = "Workspace Ready";
        if (scope.isLoading) {
          appStatusText.fadeIn(500);
          startMessageTimer();
          scope.isLoading = false;
        }
        scope.isBusy = false;
        scope.isBroken = false;
      });

      scope.$watch("appStatusText", function (val, oldVal) {
        if (val === oldVal) return; // Skip initial call
        if (val !== "") {
          $animate.addClass(appStatusText, "highlight").then(function () {
            $timeout(function () {
              $animate.removeClass(appStatusText, "highlight");
            }, 500);
          });
        }
      });

      appStatus.on("mouseenter", function () {
        if (appStatusText.is(':animated')) {
          appStatusText.stop().animate({opacity: '100'});
        } else {
          appStatusText.fadeIn(500);
        }
      });

      appStatus.on("mouseleave", function () {
        if (!scope.isLoading) {
          appStatusText.fadeOut(1000);
        }
      });
    }
  };
}]);
