'use strict';

angular.module('dataCampLight.directives').directive('resizeLayout', ['$window', '$timeout', 'RenderService', function ($window, $timeout, RenderService) {
  // ------------------------
  // --- Exported Methods ---
  // ------------------------
  return {
    restrict: 'A',
    link: function (scope, element) {
      var MINI_THRESHHOLD = 900;

      var leftPane, rightPane, sctFeedbackContainer, miniConsoleTarget, fullConsoleTarget, miniPlotTarget, fullPlotTarget;

      $timeout(function () {
        //It's in a timeout so that the console is already in the DOM before we execute it
        leftPane = element.find(".dcl-left-pane .dcl-content--tab-body");
        rightPane = element.find(".dcl-right-pane .dcl-content--tab-body");
        sctFeedbackContainer = leftPane.children(".sct-feedback-container");
        miniConsoleTarget = leftPane.children(".dcl-console-mini-target");
        miniPlotTarget = leftPane.children(".dcl-plots-mini-target");
        fullConsoleTarget = element.find(".dcl-console-full-target");
        fullPlotTarget = element.find(".dcl-plots-full-target");
        checkMiniLayout();
        if (scope.useMiniLayout) {
          scope.$broadcast("editor::resize");
          scope.$broadcast("console::resize");
        }
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

      function performResize(full) {
        var leftHeight = leftPane.height() - sctFeedbackContainer.height();
        scope.$broadcast("editor::resize", leftHeight);

        if (full || scope.useMiniLayout) {
          var rightHeight = scope.useMiniLayout ? leftHeight : rightPane.height();
          if (scope.useMiniLayout)
            miniConsoleTarget.height(leftHeight);
          scope.$broadcast("console::resize", rightHeight);

          scope.$broadcast('plots::resize', RenderService.calculateRenderDimensions());
        }
      }

      function scrollConsoleToBottom() {
        scope.$broadcast("console::scrolltobottom");
      }

      scope.$on("layout::resize", function () {
        $timeout(function () {
          performResize(false);
        });
      });

      var resizeTimeout;
      angular.element($window).bind('resize', function () {
        $timeout.cancel(resizeTimeout);
        resizeTimeout = $timeout(function () {
          resizeTimeout = null;
          checkMiniLayout();
          performResize(true);
        }, 500);
      });
    }
  };
}]);
