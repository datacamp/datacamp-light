(function () {
  'use strict';

  angular.module('dataCampLight.controllers').controller('NormalExerciseController', ['$scope', '$log', '$rootElement', '$timeout', 'BackendSessionManager', 'NotificationService','RenderService', NormalExerciseController]);

  function NormalExerciseController($scope, $log, $rootElement, $timeout, BackendSessionManager, NotificationService, RenderService) {
    var currentCode, exercise;
    var lineError = null;

    //Parse exercise
    if ($rootElement.data('encoded')) {
      //Get encoded data
      var encoded = angular.element($rootElement[0].querySelector('.encoded')).remove().text().trim();
      //Parse
      exercise = angular.fromJson(atob(decodeURIComponent(encoded)));
      //language
      if (!exercise.language) {
        exercise.language = getExerciseLanguage();
      }
    } else {
      parseExercise($rootElement[0].querySelectorAll('[data-type]'));
    }

    $rootElement.removeAttr('data-datacamp-exercise');

    //Code parsing
    function parseExercise(bodyData) {
      // Get data from DOM and then remove it so that the user can't see it in the HTML
      var el, elData;
      exercise = {};
      for (var i = 0; i < bodyData.length; i++) {
        el = angular.element(bodyData[i]);
        elData = el.data();

        if ("type" in elData) {
          var text = unescapeHtml(el.html());
          var type = elData["type"];

          if (type === "pre-exercise-code") {
            exercise.pre_exercise_code = stripIndent(text);
          }
          else if (type === "sample-code") {
            exercise.sample = stripIndent(text);
          }
          else if (type === "solution") {
            exercise.solution = stripIndent(text);
          }
          else if (type === "sct") {
            exercise.sct = stripIndent(text);
          }
          else if (type === "hint") {
            exercise.hint = text;
          }
          el.remove();
        }
      }

      //Parse language from root tag
      exercise.language = getExerciseLanguage();

      //Log exercise with encoded version
      $log.log("Exercise:", exercise);
      $log.log("ENCODED VERSION:", encodeURIComponent(btoa(angular.toJson(exercise))));
    }

    function getExerciseLanguage() {
      return ("lang" in $rootElement.data()) ? $rootElement.data()["lang"] : "";
    }

    function unescapeHtml(safe) {
      return safe.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/<br ?\/?>/g, "\n");
    }

    function trimCode(code_block) {
      var lines = code_block.split(/\r?\n/);
      if (lines.length > 1 && lines[lines.length - 1].trim() === "") {
        lines.pop();
      }
      if (lines[0].trim() === "") {
        lines.shift();
      }
      return lines.join("\n");
    }

    /**
     * Inspired by https://github.com/sindresorhus/strip-indent
     */
    function stripIndent(code_block) {
      var match = code_block.match(/^[ \t]*(?=\S)/gm);

      if (!match) {
        return trimCode(code_block);
      }

      var indent = Math.min.apply(Math, match.map(function (el) {
        return el.length;
      }));

      if (indent > 0) {
        code_block = code_block.replace(new RegExp('^[ \\t]{' + indent + '}', 'gm'), '');
      }

      return trimCode(code_block);
    }

    var backend = BackendSessionManager.createBackend(exercise.language, exercise, RenderService.calculateRenderDimensions());

    //Wait until DOM is loaded and calculate the RenderDimensions again
    $timeout(function () {
      BackendSessionManager.resize(RenderService.calculateRenderDimensions());
    });

    // Initialize scope variables
    $scope.userCode = exercise.sample;
    $scope.solutionTabShown = false;
    $scope.plotTabShown = false;
    $scope.solutionButtonShown = !exercise.hint && !!exercise.solution;
    $scope.backendConfig = backend.getConfig();

    // Tabs
    var activeLeftTabs = ["usercode"];
    var activeRightTabs = ["console"];

    // Generate control objects that will be passed to the matching directives
    $scope.editor = {};
    $scope.console = {};

    function runDeactivation(tab) {
      if (tab === "usercode") {
        currentCode = $scope.userCode; // Save the userCode to currentCode
        $scope.editor.cleanLineError();
      }
    }

    function runActivation(tab) {
      if (tab === "usercode") {
        $scope.userCode = currentCode;
        $scope.editor.cleanLineError();
        if (lineError !== null) {
          $scope.editor.showLineError(lineError);
        }
      } else if (tab === "solution") {
        $scope.userCode = exercise.solution; // Replace the code with the solution
      } else if (tab === "console") {
        $scope.$broadcast("console::resize");
      }
    }

    function getActiveTab(tabs) {
      return tabs[tabs.length - 1];
    }

    function isActiveTab(tabs, tabName) {
      return getActiveTab(tabs) === tabName;
    }

    function removeActiveTab(tabs, tabName, notActivateLast) {
      var wasActiveTab = isActiveTab(tabs, tabName);
      if (wasActiveTab) {
        runDeactivation(tabName);
      }

      for (var i = tabs.length - 1; i >= 0; i--) {
        if (tabs[i] === tabName) {
          tabs.splice(i, 1);
        }
      }

      if (!wasActiveTab || notActivateLast) return;

      runActivation(tabs[tabs.length - 1]);
    }

    function activateTab(tabs, tabName) {
      if (isActiveTab(tabs, tabName)) return;
      // Remove any appearance of the tab in the list
      removeActiveTab(tabs, tabName, true);
      // Run deactivation code of the tab that was active until now
      runDeactivation(getActiveTab(tabs));
      // Now add it
      tabs.push(tabName);
      runActivation(tabName);
    }

    $scope.activateLeftTab = function (tabName) {
      activateTab(activeLeftTabs, tabName);
    };
    $scope.isActiveLeftTab = function (tabName) {
      return isActiveTab(activeLeftTabs, tabName);
    };
    $scope.activateRightTab = function (tabName) {
      activateTab(activeRightTabs, tabName);
    };
    $scope.isActiveRightTab = function (tabName) {
      return isActiveTab(activeRightTabs, tabName);
    };

    $scope.hasHint = function () {
      return !!exercise.hint;
    };

    $scope.showHint = function () {
      NotificationService.create(exercise.hint, "warning");
      $scope.solutionButtonShown = !!exercise.solution && !$scope.solutionTabShown;
    };

    $scope.showSolutionTab = function () {
      $scope.solutionTabShown = true;
      $scope.solutionButtonShown = false;
      activateTab(activeLeftTabs, "solution");
    };

    $scope.showPlotTab = function () {
      $scope.plotTabShown = true;
      if ($scope.useMiniLayout) {
        $scope.activateLeftTab("plots");
      } else {
        $scope.activateRightTab("plots");
      }
    };

    $scope.$on('output::plot', $scope.showPlotTab);

    $scope.removeMiniConsole = function () {
      removeActiveTab(activeLeftTabs, "console");
    };

    $scope.showMiniConsole = function () {
      if ($scope.useMiniLayout && !$scope.plotTabShown) {
        $scope.activateLeftTab("console");
      }
    };

    $scope.$on('output::error', $scope.showMiniConsole);
    $scope.$on('output::message', $scope.showMiniConsole);
    $scope.$on('output::output', $scope.showMiniConsole);
    $scope.$on('output::result', $scope.showMiniConsole);

    $scope.execute = function () {
      // If there is no SCT, simply do a console command
      var action = exercise.sct ? BackendSessionManager.submitCode : BackendSessionManager.runConsole;
      if (BackendSessionManager.sessionActive()) {
        //Session is already active, just execute the code.
        action($scope.userCode, true);
      } else {
        // The function that will get called after the session is initialized properly.
        var turnOffListener = $scope.$on('session::ready', function () {
          turnOffListener();
          action($scope.userCode, true);
        });

        //First create a session
        BackendSessionManager.startSession();
      }
    };

    $scope.$watch('userCode', function (newValue) {
      if (newValue != currentCode && $scope.isActiveLeftTab('usercode')) {
        resetLineError();
      }
    });

    function resetLineError() {
      lineError = null;
      $scope.editor.cleanLineError();
    }

    $scope.$on('output::sct', function (_, payload) {
      resetLineError();
      if (!payload.correct && ('line_start' in payload) && !!parseInt(payload.line_start)) {

        var lineStart = parseInt(payload.line_start);
        var columnStart = parseInt(payload.column_start) ? parseInt(payload.column_start) : 1;

        lineError = {
          'line-start': lineStart,
          'line-end': parseInt(payload.line_end) ? parseInt(payload.line_end) : lineStart,
          'column-start': columnStart,
          'column-end': parseInt(payload.column_end) ? parseInt(payload.column_end) : columnStart,
          'full-line': !('column_start' in payload)
        };
        if ($scope.isActiveLeftTab('usercode')) {
          $scope.editor.showLineError(lineError);
        }
      }
    });
  }
})();
