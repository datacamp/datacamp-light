'use strict';

angular.module('dataCampLight.services').constant('R_CONFIG', {
  prompt: '> ',
  newlineBeforePrompt: false,
  extension: 'R',
  console: 'R Console',
  responseRegex: /\[1\] "(.*)"\r?\n/g,
  aceMode: 'ace/mode/r',
  aceModeConsole: 'ace/mode/r_console'
})
  .factory('RBackend', ['$rootScope', 'R_CONFIG', '$window', function ($rootScope, R_CONFIG, $window) {
    var currentCode, currentExercise, renderDimensions;

    function RBackend(exercise, courseLanguage, renderDims) {
      currentExercise = exercise;
      currentExercise.type = "NormalExercise";
      renderDimensions = renderDims;
      this.language = courseLanguage;
    }

    /*
     * Generate the data object that will be send to R
     * @param code (string): the code that will be send to R (optional)
     * @return (object) the object that can be send to R
     */
    function generateDataObject(code) {
      currentCode = code;
      var data = {
        DC_PEC: currentExercise.pre_exercise_code,
        DC_SCT: currentExercise.sct,
        DC_SOLUTION: currentExercise.solution,
        DC_RENDER_HEIGHT: renderDimensions.height,
        DC_RENDER_WIDTH: renderDimensions.width,
        DC_TYPE: currentExercise.type
      };

      if (angular.isDefined(code)) {
        data.DC_CODE = code;
      }

      return data;
    }

    function formatRCall(data, rcall) {
      // gives us a string that we can send to the backend to run rcall(data)

      // the json needs some fudging before we can use it because it:
      // 1. gets interpreted by R and then by a JSON parser
      //    so we escape all the escapes
      // 2. gets wrapped in single quotes
      //    so we escape all the existing single quotes
      var fudged = angular.toJson(data).replace(/\\/g, '\\\\').replace(/'/g, "\\'");

      // next we split it into chunks because R can't cope with big
      // (>4096 chars) lines. we need to take care not to split on a
      // backslash because that causes headaches
      var CHUNK_LENGTH = 2048;
      var lines = [];
      var lastEnd = 0;

      while (lastEnd < fudged.length) {
        var end = lastEnd + CHUNK_LENGTH;

        while (fudged[end] == '\\' && end > lastEnd) {
          end--;
        }

        // if someone gives us all backslashes we can take an
        // even number of them. do -1 because we +1 it in just a second
        if (end == lastEnd) {
          end = lastEnd + CHUNK_LENGTH + (CHUNK_LENGTH % 2) - 1;
        }

        // +1 so we include the character at fudged[ end ]
        lines.push("DC_DATA = paste0(DC_DATA, '" + fudged.substring(lastEnd, end + 1) + "')");
        lastEnd = end + 1;
      }
      return "DC_DATA = ''\n" + lines.join('\n') + "\nexecute(DC_DATA)";
    }

    RBackend.prototype.getConfig = function () {
      return R_CONFIG;
    };

    RBackend.prototype.getInitCommand = function () {
      var data = generateDataObject();
      data.DC_COMMAND = 'init';
      return formatRCall(data);
    };

    RBackend.prototype.getSubmitCommand = function (code, echo) {
      var data = generateDataObject(code);
      data.DC_ECHO = echo || false;
      data.DC_COMMAND = 'submit';
      return formatRCall(data);
    };

    RBackend.prototype.getConsoleCommand = function (code, echo) {
      var data = generateDataObject(code);
      data.DC_CODE = code;
      data.DC_ECHO = angular.isDefined(echo) ? echo : true;
      data.DC_COMMAND = 'console';
      return formatRCall(data);
    };

    RBackend.prototype.setRenderDimensions = function (renderDims) {
      renderDimensions = renderDims;
    };

    RBackend.prototype.getResizeCommand = function (dimensions, index) {
      renderDimensions = dimensions;
      var data = {
        DC_RENDER_HEIGHT: dimensions.height,
        DC_RENDER_WIDTH: dimensions.width
      };
      if (angular.isDefined(index)) {
        data.DC_FIGURE_INDEX = index;
      }
      data.DC_COMMAND = 'resize';
      return formatRCall(data);
    };

    /*
     * Parses a single 'line' coming from R
     * Depending on the type of the line, different output will be shown or generated.
     * @param line (object): the line of code that will be parsed
     */
    RBackend.prototype.parseInputResponseLine = function (line) {
      var payload = line.payload;
      switch (line.type) {
        case 'code':
          $rootScope.$broadcast('output::message', payload);
          break;
        case 'output':
          $rootScope.$broadcast('output::output', payload);
          break;
        case 'iframe':
          $rootScope.$broadcast('output::html', payload); // Unimplemented
          break;
        case 'html_link':
          $rootScope.$broadcast('output::html_link', payload); // Unimplemented
          break;
        case 'pdf_link':
          $rootScope.$broadcast('output::pdf_link', payload); // Unimplemented
          break;
        case 'graph':
          $rootScope.$broadcast('output::plot', payload);
          break;
        case 'help':
          var myWindow = $window.open('http://www.rdocumentation.org/goto/' + payload, '_blank');
          if (angular.isUndefined(myWindow)) {
            $rootScope.$broadcast('output::message', 'Make sure to enable pop-ups. The help file didn\'t open automatically because your browser doesn\'t allow pop-ups.');
          }
          break;
        case 'r-error':
        case 'r-message':
        case 'r-warning':
        case 'error':
        case 'parse-error':
          $rootScope.$broadcast('output::error', payload);
          break;
        case 'figure-resize':
          $rootScope.$broadcast('plot::resized', payload);
          break;
        case 'sct':
          payload.submittedCode = currentCode;
          $rootScope.$broadcast('output::sct', payload);
          break;
      }
    };

    return RBackend;
  }]);
