(function () {
  'use strict';

  angular.module('dataCampLight.controllers').controller('NormalExerciseController', ['$scope', '$rootElement', '$timeout', 'BackendSessionManager', 'NotificationService', 'ExerciseLoader', 'RenderService', NormalExerciseController]);

  function NormalExerciseController($scope, $rootElement, BackendSessionManager, NotificationService, ExerciseLoader, RenderService) {
    var currentCode;
    var lineError = null;

    var exercise = ExerciseLoader.getExercise($rootElement);

    var backend = BackendSessionManager.createBackend(exercise.language, exercise, RenderService.calculateRenderDimensions());

    //Wait until DOM is loaded and calculate the RenderDimensions again
    $rootElement.ready(function () {
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
