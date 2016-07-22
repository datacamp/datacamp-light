'use strict';

angular.module('dataCampLight.directives').directive('codeEditor', ['BackendSessionManager', '$window', '$timeout', function (BackendSessionManager, $window, $timeout) {
  // ------------------------
  // --- Exported Methods ---
  // ------------------------
  return {
    restrict: 'EA',
    replace: true,
    require: '?ngModel',
    scope: {
      control: '=' // Export a control object
    },
    link: function (scope, elm, attrs, ngModel) {
      var acee, session, Range = ace.require('ace/range').Range;
      scope.editor = scope.control || {};

      // -------------------------
      // ----- Configuration -----
      // -------------------------
      acee = $window.ace.edit(elm[0]);
      acee.renderer.setShowGutter(true);
      acee.setHighlightActiveLine(true);
      acee.setHighlightGutterLine(true);
      acee.setShowPrintMargin(false);
      acee.setFontSize('12.8px');
      acee.$blockScrolling = Infinity;

      session = acee.getSession();
      acee.setTheme('ace/theme/crimson_editor');
      session.setUseWrapMode(true);
      session.setMode(BackendSessionManager.getBackendConfig().aceMode);
      $timeout(function() {
        acee.renderer.updateFull(true);
        acee.resize();
      });

      /*
       * Bind the ngModel to the value of the ace editor.
       */
      if (angular.isDefined(ngModel)) {
        ngModel.$formatters.push(function (value) {
          if (angular.isUndefined(value) || value === null) {
            return '';
          }
          else if (angular.isObject(value) || angular.isArray(value)) {
            throw new Error('ace editor cannot use an object or an array as a model');
          }
          return value;
        });

        ngModel.$render = function () {
          session.setValue(ngModel.$viewValue);
        };
      }

      // ------------------------
      // -------- Events --------
      // ------------------------
      session.on('change', function () {
        var newValue = session.getValue();
        if (newValue !== scope.$eval(attrs.value) && !scope.$$phase) {
          if (angular.isDefined(ngModel)) {
            ngModel.$setViewValue(newValue);
          }
        }
      });

      acee.on('focus', function () {
        if (!BackendSessionManager.sessionActive()) {
          BackendSessionManager.startSession();
        }
      });

      scope.$on("editor::resize", function (_, resizeHeight) {
        if (angular.isDefined(resizeHeight))
          elm.height(resizeHeight);
        acee.renderer.updateFull(true);
        acee.resize();
      });

      // ------------------------
      // ------ Line Error ------
      // ------------------------

      var lastMarker = null; // LineError + marker
      var lastStart = 0; // LineError + marker
      var lastEnd = 0; // LineError + marker

      function removeMarker() {
        // Remove previous marker
        if (lastMarker !== null) {
          session.removeMarker(lastMarker);
          for (var i = lastStart; i < lastEnd; i++) {
            session.removeGutterDecoration(i, "error-gutter");
          }
          lastMarker = null;
        }
      }

      scope.editor.cleanLineError = removeMarker;
      scope.editor.showLineError = function (lineError) {
        removeMarker();
        acee.gotoLine(lineError['line-start'], lineError['column-start'] - 1, true); // Puts active line on the error line
        acee.scrollToLine(lineError['line-start'], true, true, angular.noop()); // Scrolls to the error line
        lastMarker = session.addMarker(
          new Range(lineError['line-start'] - 1, lineError['column-start'] - 1, lineError['line-end'] - 1, lineError['column-end']),
          "error-line",
          (lineError['full-line'] ? 'fullLine' : 'line'),
          false
        );
        lastStart = lineError['line-start'] - 1;
        lastEnd = lineError['line-end'];
        for (var i = lastStart; i < lastEnd; i++) {
          session.addGutterDecoration(i, "error-gutter");
        }
      };
    }
  };
}]);
