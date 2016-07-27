'use strict';

angular.module('dataCampLight.services').factory('BackendSessionManager', ['$http', '$timeout', '$interval', '$rootScope', 'url', 'RBackend', 'PythonBackend', '$q', '$cookies', '$window', '$log', 'RenderService', function ($http, $timeout, $interval, $rootScope, url, RBackend, PythonBackend, $q, $cookies, $window, $log, RenderService) {
  var MIN_POLL_INTERVAL = 1500;
  var MAX_POLL_INTERVAL = 10000;

  var LINE_PRINT_INTERVAL = 100;
  var RETRY_MIN_DELAY = 2000;
  var RETRY_JITTER = 8000;

  var newCount, backend;
  var sid = null;
  var authentication_token;
  var keepAlive;
  var sessionCounter = 0;
  var newRequestCanceller, readRequestCanceller, inputRequestCanceller;

  function logError(message, extra) {
    var logObject = {
      type: "error",
      source: "frontend",
      message: "message"
    };

    if (extra) {
      for (var k in extra) {
        logObject[k] = extra[k];
      }
    }

    // TODO: send logObject to fluent!
    // The new shit's fucked
    $log.log(message);
  }

  /**
   * Inspired by http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/
   */
  function generateUUID() {
    var d;
    if (Date.now)
      d = Date.now();
    else
      d = new Date().getTime();
    if ($window.performance && angular.isFunction($window.performance.now)) {
      d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  function handleBrokenSession(sidSnapshot, error) {
    if (sid == sidSnapshot) {
      sid = null;
      var msg = ["Your session has been disconnected."];
      if (error.data === "Invalid SID") {
        msg.push("You might have been idle for too long or have another session active.");
      } else if (error.data === "Session crashed") {
        msg.push("The performed operation was too resource-intensive.");
      }
      broadcastEvent('session::broken', msg.join(' '));
    }
  }

  function handleHTTPErrors(sidSnapshot, error) {
    switch (error.status) {
      case 0: {
        // refused/timed out
        // TODO: tell the user what happened

        //this is called for both cancel and refuse
        //In case of cancel nothing should happen
        //In case of refuse, message should be showed and other requests should be cancelled
        //timeouts cancelled.
        if (readRequestCanceller != null)
          handleBrokenSession(sidSnapshot, error);
      }
        break;

      case -1: {
        // This is normal, don't do anything.
      }
        break;

      case 403: {
        handleBrokenSession(sidSnapshot, error);
      }
        break;

      default: {
        logError("the multiplexer gave us an error (handleHTTPErrors): " + angular.toJson(error));
      }
        break;
    }
  }

  function sendKeepAlive(pollInterval) {
    $timeout.cancel(keepAlive);

    keepAlive = $timeout(function () {
      if (sid != null) {
        var sidSnapshot = sid;
        readRequestCanceller = $q.defer();
        $http.post(
          url.sessionManager + 'read?sid=' + sid + '&newCount=' + newCount,
          angular.toJson({random: Date.now(), authentication_token: authentication_token}),
          {responseType: 'text', timeout: readRequestCanceller.promise}
        ).then(handleInputResponse, function (error) {
          handleHTTPErrors(sidSnapshot, error);
        });
        sendKeepAlive(Math.min(pollInterval * 1.2, MAX_POLL_INTERVAL));
      }
    }, pollInterval);

  }

  function sendInput(input, cb) {
    // POST a string to the backend and call cb on successful responses

    // this probably means our code is wrong
    if (sid === null) {
      logError('don\'t call sendInput with no session active!');
      return;
    }

    var sidSnapshot = sid;
    inputRequestCanceller = $q.defer();
    $http.post(
      url.sessionManager + 'input?sid=' + sid + '&newCount=' + newCount,
      angular.toJson({command: input, authentication_token: authentication_token}),
      {responseType: 'text', timeout: inputRequestCanceller.promise}
    ).then(cb, function (error) {
      handleHTTPErrors(sidSnapshot, error);
    });
    sendKeepAlive(MIN_POLL_INTERVAL);
  }

  function sendCall(command, message) {
    if (!command) return;
    // little helper function to call backend functions
    broadcastEvent("session::busy", message ? message : "Executing...");
    sendInput(command, function (response) {
      handleInputResponse(response);
    });
  }

  function executeInitSessionRequest() {
    sendCall(backend.getInitCommand(), "Setting Up Workspace");
  }

  function executeNewSessionRequest(forceNew) {
    if (newRequestCanceller != null) {
      newRequestCanceller.resolve("New '?new' request send before previous one finished.");
      newRequestCanceller = null;
    }
    newRequestCanceller = $q.defer();

    var counterSnapshot = sessionCounter;

    //If cookies are not supported (could be due sandboxed iframe -> snippet), don't require storing the UUID.
    var cookiesSupported = true;

    try {
      authentication_token = $cookies.get('UUID');
    } catch (e) {
      cookiesSupported = false;
    }
    if (typeof(authentication_token) === 'undefined') {
      authentication_token = generateUUID();
    }
    if (cookiesSupported) {
      $cookies.put('UUID', authentication_token);
    }

    $http.post(
      url.sessionManager + 'new?language=' + backend.language + "&force_new=" + forceNew,
      angular.toJson({
        authentication_token: authentication_token,
        email: authentication_token
      }),
      {responseType: 'text', timeout: newRequestCanceller.promise}
    ).then(function (response) {
      newRequestCanceller = null;

      if (sessionCounter == counterSnapshot) {
        sid = response.data.id;
        newCount = response.data.newCount;
        executeInitSessionRequest();
      }
    }, function () {
      if (sessionCounter == counterSnapshot) {
        $timeout(function () {
          executeNewSessionRequest(forceNew)
        }, RETRY_MIN_DELAY + Math.random() * RETRY_JITTER);
      }
    });
  }

  function broadcastEvent(eventName, message) {
    $rootScope.$broadcast(eventName, message);
  }

  function unmangleJSON(str) {
    // responses from R contain strings that are almost json, but
    // include things like \n (backslash n, not a new line). for
    // example:
    //
    //     [\n {\n \"type\": \"output\",\n\"payload\": \"[1] 5\\n\" \n} \n]
    //
    // so we need to shoehorn those strings into something that
    // JSON.parse understands. specifically, this function makes
    // the following replacements:
    //
    //     "[\n" -> "["
    //     "{\n" -> "{"
    //     ",\n" -> ","
    //
    //     "\n]" -> "]"
    //     "\n}" -> "}"
    //
    //     "\x" -> "x" for all x

    // TODO(refactor): this is super fragile and will definitely
    // need reviewing if you change the backend's JSON library
    // Note: Pythonbackend also makes use of this function!

    return str.replace(/([{\[,])\\n/g, '$1').replace(/\\n([}\]])/g, '$1').replace(/\\(.)/g, '$1');
  }

  function handleInputResponse(response) {
    if (inputRequestCanceller == null) return;

    // take a response from the backend and extract the bit we
    // actually care about
    var emptyResponse = true;
    var match;
    while ((match = backend.getConfig().responseRegex.exec(response.data))) {
      var output = unmangleJSON(match[1]);
      emptyResponse = false;

      try {
        angular.forEach(angular.fromJson(output), function (line, idx) {
          $timeout(function () {
            backend.parseInputResponseLine(line);
          }, (idx + 1) * LINE_PRINT_INTERVAL);
        });
      }
      catch (err) {
        logError("we couldn't parse a response from the backend (handleInputResponse): " + angular.toJson(err),
          {line: match[1]});
      }
    }

    if (!emptyResponse) {
      sendKeepAlive(MAX_POLL_INTERVAL);
      broadcastEvent("session::ready");
    }
  }

  // ----------------------
  // -- Exported Methods --
  // ----------------------
  return {

    createBackend: function (programmingLanguage, exercise, renderDimensions) {
      if (angular.isUndefined(renderDimensions)) {
        renderDimensions = {
          'height': 640,
          'width': 640
        };
      }

      if (programmingLanguage === 'python') {
        backend = new PythonBackend(exercise, renderDimensions);
      }
      else if (programmingLanguage === 'revolution') {
        backend = new RBackend(exercise, 'revo', renderDimensions);
      }
      else {
        backend = new RBackend(exercise, 'r', renderDimensions);
      }

      return backend;
    },

    sessionActive: function () {
      return sid !== null;
    },

    /*
     * start the multiplexer session
     */
    startSession: function () {
      sessionCounter++;
      backend.setRenderDimensions(RenderService.calculateRenderDimensions());
      executeNewSessionRequest(false);
      broadcastEvent("session::loading", "Setting Up Workspace");
    },

    /*
     * Submit code
     * @param code (string): the code that will be submitted
     * @param echo (boolean): if R should send the code back or only the output. (optional)
     */
    submitCode: function (code, echo) {
      sendCall(backend.getSubmitCommand(code, echo));
    },

    runConsole: function (code, echo) {
      sendCall(backend.getConsoleCommand(code, echo));
    },

    getBackendConfig: function () {
      return backend.getConfig();
    },

    //Returns if resize is immediate (not necessary).
    resize: function (renderDimensions, index) {
      if (!sid) return;
      var cmd = backend.getResizeCommand(renderDimensions, index);
      if (cmd !== null) {
        sendCall(cmd);
        return false;
      } else {
        return true;
      }
    }
  };
}]);
