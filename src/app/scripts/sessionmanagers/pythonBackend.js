'use strict';

angular.module('dataCampLight.services').constant('PYTHON_CONFIG', {
  prompt: 'In [{count}]: ',
  newlineBeforePrompt: true,
  outputLabel: 'Out[{count}]: ',
  extension: 'py',
  console: 'IPython Shell',
  responseRegex: /\'(.*)\'\r?\n/g,
  aceMode: 'ace/mode/python',
  aceModeConsole: 'ace/mode/python_console'
})
  .factory('PythonBackend', ['$rootScope', 'PYTHON_CONFIG', function ($rootScope, PYTHON_CONFIG) {
    var currentCode, currentExercise, renderDimensions;

    function PythonBackend(exercise, renderDims) {
      renderDimensions = renderDims;
      currentExercise = exercise;
    }

    function formatCall(data, python_call) {
      // gives us a string that we can send to the backend to run python_call(data)

      // the json needs some fudging before we can use it because it:
      // 1. gets interpreted by Python and then by a JSON parser
      //    so we escape all the escapes
      // 2. gets wrapped in single quotes
      //    so we escape all the existing single quotes
      var fudged = angular.toJson(data).replace(/\\/g, '\\\\').replace(/'/g, "\\'");

      return python_call + "('" + fudged + "')";
    }

    function generateCodeObject(code, filename) {
      currentCode = code;
      return {
        DC_CODE: code,
        DC_FILENAME: filename
      }
    }

    PythonBackend.prototype.language = "python";

    PythonBackend.prototype.getConfig = function () {
      return PYTHON_CONFIG;
    };

    PythonBackend.prototype.getInitCommand = function () {
      var data = {
        DC_PEC: currentExercise.pre_exercise_code,
        DC_SCT: currentExercise.sct,
        DC_SOLUTION: currentExercise.solution,
        DC_RENDER_HEIGHT: renderDimensions.height,
        DC_RENDER_WIDTH: renderDimensions.width
      };
      return formatCall(data, "init");
    };

    PythonBackend.prototype.getSubmitCommand = function (code) {
      return formatCall(generateCodeObject(code, "script.py"), 'submit');
    };

    PythonBackend.prototype.getConsoleCommand = function (code) {
      return formatCall(generateCodeObject(code, "<stdin>"), 'console');
    };

    PythonBackend.prototype.setRenderDimensions = function (renderDims) {
      renderDimensions = renderDims;
    };

    PythonBackend.prototype.getResizeCommand = function (dimensions, index) {
      return null;
    };

    function prepareScriptOutput(output, filename) {
      var lines = output.split("\n");
      var result = "\n<" + filename + "> output:\n    " + lines.join("\n    ");
      return result;
    }

    /*
     * Parses a single 'line' coming from python
     * Depending on the type of the line, different output will be shown or generated.
     * @param line (object): the line of code that will be parsed
     */
    PythonBackend.prototype.parseInputResponseLine = function (line) {
      var payload = line.payload;
      switch (line.type) {
        case 'script-output':
          $rootScope.$broadcast('output::output', prepareScriptOutput(payload.output, payload.script_name));
          break;
        case 'output':
          $rootScope.$broadcast('output::output', payload);
          break;
        case 'result':
          $rootScope.$broadcast('output::result', payload);
          break;
        case 'graph':
          $rootScope.$broadcast('output::plot', payload);
          break;
        case 'error':
          $rootScope.$broadcast('output::error', "\n" + payload);
          break;
        case 'backend-error':
          $rootScope.$broadcast('output::error', "\n" + payload);
          break;
        case 'sct':
          payload.submittedCode = currentCode;
          $rootScope.$broadcast('output::sct', payload);
          break;
      }
    };

    return PythonBackend;
  }]);
