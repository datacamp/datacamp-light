'use strict';

angular.module('dataCampLight.directives').directive('resizeLayout', ['$window', '$timeout', function ($window, $timeout) {
  // ------------------------
  // --- Exported Methods ---
  // ------------------------
  return {
    restrict: 'A',
    link: function (scope, element) {
      var MINI_THRESHHOLD = 900;

      var pane, sctFeedbackContainer, miniConsoleTarget, fullConsoleTarget, miniPlotTarget, fullPlotTarget;

      $timeout(function () {
        //It's in a timeout so that the #console is already in the DOM before we execute it
        pane = element.find(".dcl-left-pane .dcl-content--tab-body");
        sctFeedbackContainer = pane.children(".sct-feedback-container");
        miniConsoleTarget = pane.children(".dcl-console-mini-target");
        miniPlotTarget = pane.children(".dcl-plots-mini-target");
        fullConsoleTarget = element.find(".dcl-console-full-target");
        fullPlotTarget = element.find(".dcl-plots-full-target");
        checkMiniLayout();
        if (scope.useMiniLayout)
          scope.$broadcast("editor::resize");
      });

      function checkMiniLayout() {
        var beMini = element.width() < MINI_THRESHHOLD;
        if (beMini === scope.useMiniLayout) return;
        scope.useMiniLayout = beMini;

        if (beMini) {
          miniConsoleTarget.append(element.find(".dcl-console"));
          miniPlotTarget.append(element.find(".dcl-plots-container"));

          // Minor feature idea:
          // If console has focus and we go to mini layout, show it as active tab
        } else {
          fullConsoleTarget.append(element.find(".dcl-console"));
          fullPlotTarget.append(element.find(".dcl-plots-container"));
          scope.removeMiniConsole();
        }
        scrollConsoleToBottom();

        scope.$apply();
      }

      function performResize() {
        var resizeHeight = pane.height() - sctFeedbackContainer.height();
        miniConsoleTarget.height(resizeHeight);
        scope.$broadcast("editor::resize", resizeHeight);
      }

      function scrollConsoleToBottom() {
        scope.$broadcast("console::scrolltobottom");
      }

      scope.$on("layout::resize", function () {
        $timeout(function () {
          performResize();
        });
        scrollConsoleToBottom();
      });

      angular.element($window).bind('resize', function () {
        checkMiniLayout();
        performResize();
      });
    }
  };
}]);
