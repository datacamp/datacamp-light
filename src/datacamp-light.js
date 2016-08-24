/*
 DataCamp Light
 Version {{version}}
 */

(function () {
  'use strict';

  var MIN_HEIGHT = 300;
  var DCL_URL = "https://cdn.datacamp.com/dcl/";

  //Logic for 'Powered By DataCamp'
  function checkPoweredBy() {
    function domainMatches(domain) {
      return location.hostname.match(domain) !== null
    }

    function changeLink(url) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].getElementsByTagName('a')[0].href = url;
      }
    }

    function removePoweredBy() {
      while (elements[0]) {
        elements[0].parentNode.removeChild(elements[0]);
      }
    }

    var elements = document.getElementsByClassName('powered-by-datacamp');
    if (domainMatches("r-bloggers.com")) {
      changeLink("https://www.datacamp.com?tap_a=5644-dce66f&tap_s=10907-287229");
    } else if (domainMatches("datacamp.com")) {
      removePoweredBy();
    }
  }

  //Initialises the DIV for the DCL exercise: Load HTML, sets height, etc
  function createContainer(exercise_DOM) {
    exercise_DOM.className += ' datacamp-exercise';

    // Calculate height
    var height;
    if ("height" in exercise_DOM.dataset && exercise_DOM.dataset["height"] !== 'auto') {
      var user_height = Math.round(exercise_DOM.dataset["height"]);
      if (!isNaN(user_height)) {
        if (user_height >= MIN_HEIGHT) {
          exercise_DOM.style.height = user_height + "px";
          var style_attribute = "height:" + user_height + "px;";
          exercise_DOM.setAttribute("style", style_attribute);
        } else {
          console.log("The height attribute should be >= " + MIN_HEIGHT + ".");
        }
      } else {
        console.log("Invalid height attribute.");
      }
    }

    //Wrap encoded data for easier handling
    if ("encoded" in exercise_DOM.dataset) {
      exercise_DOM.innerHTML = '<div class="encoded">' + exercise_DOM.innerHTML.trim() + '</div>';
    }

    //Load angular app HTML
    exercise_DOM.innerHTML += '{{mainView}}';

    //Powered By DataCamp
    var htmlString = '{{poweredBy}}';
    var div = document.createElement('div');
    div.innerHTML = htmlString;
    var element = div.firstChild;
    exercise_DOM.parentNode.insertBefore(element, exercise_DOM.nextSibling);
  }

  function loadScriptAsync(file) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = file;
    script.charset = "utf-8";

    insertTag('body', script);
  }

  function loadStyle(file) {
    var style = document.createElement("link");
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.href = file;

    insertTag('head', style);
  }

  window.renderAddedDataCampExercises=function() {
    var exercises = document.querySelectorAll("[data-datacamp-exercise]");

    if (exercises.length === 0) {
      console.log("No DataCamp Light exercises found. Make sure the exercise has the 'data-datacamp-exercise' attribute.");
    }

    for (var i = 0; i < exercises.length; i++) {
      (function (index) {
        var exercise_DOM = exercises[index];

        if ((' ' + exercise_DOM.className + ' ').indexOf(' datacamp-exercise ') > -1) {
          // We use this check to see if the exercise is already replaced.
          return;
        }

        // Create the DCL angular app div
        createContainer(exercise_DOM);
      })(i);
    }
  }

  function initDataCampExercises() {
    window.renderAddedDataCampExercises()
    checkPoweredBy();
    loadScriptAsync(DCL_URL + '{{scriptLink}}');
  }

  function insertAllStyles() {
    insertCSS();

    var links = [
      DCL_URL + "{{styleLink}}",
      "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
    ];

    for (var i = 0; i < links.length; i++) {
      loadStyle(links[i]);
    }
  }

  function insertTag(parent, element) {
    document.getElementsByTagName(parent)[0].appendChild(element);
  }

  function insertCSS() {
    var style = document.createElement('style');
    style.type = 'text/css';
    insertTag('head', style);

    var css = '{{mainStyle}}';

    if (style.styleSheet)
      style.styleSheet.cssText = css;
    else
      style.innerHTML = css;
  }

  function isAlreadyExecuted() {
    return (typeof(window.renderAddedDataCampExercises) == "function")
  }

  if (!isAlreadyExecuted()) {
    insertAllStyles();
    if (document.readyState == "complete" || document.readyState == "loaded") {
      initDataCampExercises();
    } else {
      document.addEventListener('DOMContentLoaded', initDataCampExercises);
    }
  } else {
    console.log('Warning: tried to load DataCamp Light multiple times.')
  }
})();

