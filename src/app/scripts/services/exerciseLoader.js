'use strict';

angular.module('dataCampLight.services').factory('ExerciseLoader', ['$log', function ($log) {
  return {
    getExercise: getExercise
  };

  function getExercise(elm) {
    var exercise;
    //Parse exercise
    if (elm.data('encoded')) {
      //Get encoded data
      var encoded = angular.element(elm[0].querySelector('.encoded')).remove().text().trim();
      //Parse
      exercise = angular.fromJson(atob(decodeURIComponent(encoded)));
      //language
      if (!exercise.language) {
        exercise.language = getExerciseLanguage();
      }
    } else {
      parseExercise(elm[0].querySelectorAll('[data-type]'));
    }

    setContainerHeight();
    elm.removeAttr('data-datacamp-exercise');

    //Log exercise with encoded version
    $log.log("Exercise Sample Code:", exercise.sample);
    $log.log("ENCODED VERSION:", encodeURIComponent(btoa(angular.toJson(exercise))));

    return exercise;

    //---------------
    //--- Helpers ---
    //---------------

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
          el.hide();
        }
      }

      //Parse language from root tag
      exercise.language = getExerciseLanguage();
    }

    function getExerciseLanguage() {
      return ("lang" in elm.data()) ? elm.data()["lang"] : "";
    }

    function unescapeHtml(safe) {
      return safe.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/<br( .*?)?\/?>/g, "\n")
        .replace(/<!--(.*?)-->/g, '');
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

    function setContainerHeight() {
      if (elm.data('height') === 'auto') {
        var sampleLinesLength = exercise.sample.split(/\r?\n/).length;
        elm.height(75 + (sampleLinesLength) * 16);
      }
    }
  }
}]);
