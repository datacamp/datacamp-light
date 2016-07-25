'use strict';

angular.module('dataCampLight.directives').directive('console', ['$window', 'BackendSessionManager', 'ConsoleHistory', function ($window, BackendSessionManager, ConsoleHistory) {

  var editor, session, cursor, Range, pre;
  var currentPrompt;
  var promptCount = 1;
  var pastePre = "... ";
  var editorLocked = false;
  var backendConfig = false;

  Range = ace.require("ace/range").Range;

  function getOutputLabel() {
    var outputLabel = "";
    if (backendConfig.outputLabel) {
      var count = promptCount - 1;
      if (count <= 0) {
        count = 1;
      }
      outputLabel = backendConfig.outputLabel.replace("{count}", count);
    }
    return outputLabel;
  }

  return {
    restrict: 'EA',
    scope: {
      control: '=' // Export a control object
    },
    link: function (scope, elm) {
      var startingSession = false;
      var enableCommands = true;

      scope.console = scope.control || {};
      scope.console.isFocused = false;
      scope.console.isActive = false;

      backendConfig = BackendSessionManager.getBackendConfig();

      // -------------------------
      // ----- Configuration -----
      // -------------------------

      editor = $window.ace.edit(elm[0]);
      editor.renderer.setShowGutter(false);
      editor.setHighlightActiveLine(false);
      editor.setHighlightGutterLine(false);
      editor.setDisplayIndentGuides(false);
      editor.setShowPrintMargin(false);
      editor.setBehavioursEnabled(true);
      editor.setFontSize('12.8px');
      editor.$blockScrolling = Infinity;

      var consoleHistory = new ConsoleHistory(editor);

      editor.commands.removeCommand("findnext");
      editor.commands.removeCommand("findprevious");
      editor.commands.removeCommand("find");
      editor.commands.removeCommand("replace");
      editor.commands.removeCommand("togglecomment");
      // editor.commands.removeCommand("gotoline");
      editor.commands.removeCommand("foldall");
      editor.commands.removeCommand("unfoldall");
      editor.commands.removeCommand("touppercase");
      editor.commands.removeCommand("tolowercase");

      session = editor.getSession();
      session.setUseWrapMode(true);
      editor.setTheme('ace/theme/crimson_editor');

      pre = backendConfig.prompt;
      promptCount = 1;
      session.setMode(backendConfig.aceModeConsole);
      clearConsole();
      goToLastLineAndLineEnd();

      function executeCode(code) {
        if (code.match(/system(.*?)/) !== null) {
          appendRawText("\nYou can't use system functions.");
        } else {
          if ($.trim(code).length > 0) {
            promptCount++;
            lockConsole();
            if (BackendSessionManager.sessionActive()) {
              //Session is already active, just execute the code.
              BackendSessionManager.runConsole(code, false);
            } else {
              // The function that will get called after the session is initialized properly.
              var turnOffListener = scope.$on('session::ready', function () {
                turnOffListener();
                BackendSessionManager.runConsole(code, false);
              });

              //First create a session
              startingSession = true;
              BackendSessionManager.startSession();
            }

          }
        }
      }

      function appendPre(notNewLine) {
        currentPrompt = pre.replace("{count}", promptCount);
        var txt = currentPrompt;
        if (!notNewLine) {
          if (backendConfig.newlineBeforePrompt) {
            txt = "\n\n" + txt;
          } else {
            txt = "\n" + txt;
          }
        }
        appendRawText(txt);
        editor.gotoLine(editor.session.getLength());
      }

      function printText(text) {
        var row = session.getLength() - 1;
        session.removeFullLines(row, row); //remove line because it contains pre
        if (!backendConfig.newlineBeforePrompt && row !== 0) {
          appendRawText("\n");
        }
        appendRawText(text);
        appendPre();
      }

      function replaceText(text) {
        var row = session.getLength() - 1;
        session.replace(new Range(row, 0, row, Number.MAX_VALUE), text);
      }

      function appendRawText(text) {
        session.insert({
          row: session.getLength(),
          column: 0
        }, text);
      }

      editor.getLastLine = function () {
        return editor.session.getLine(editor.session.getLength() - 1);
      };

      editor.getInputLine = function () {
        return editor.getLastLine().substring(currentPrompt.length);
      };

      editor.getInputCode = function () {
        var code = editor.session.getLine(editor.session.getLength() - 1);

        if (code.substr(0, currentPrompt.length) === currentPrompt) {
          code = code.substring(currentPrompt.length);
        } else if (code.substr(0, pastePre.length) === pastePre) {

          code = code.substring(pastePre.length);
          for (var i = editor.session.getLength() - 2; i >= 0; i--) {
            var line = editor.session.getLine(i);
            if (line.substr(0, pastePre.length) === pastePre) {//equals to startsWith but is not supported yet in all browsers, or is but not in all versions
              line = line.substring(pastePre.length);
              code = line + "\n" + code;
            } else if (line.substr(0, currentPrompt.length) === currentPrompt) {
              line = line.substring(currentPrompt.length);
              code = line + "\n" + code;
              break;
            }
          }

        }

        return code;
      };

      function goToLastLineAndLineEnd() {
        var row = editor.session.getLength() - 1;
        var column = editor.session.getLine(row).length;
        editor.gotoLine(row + 1, column, true);
      }

      function clearConsole() {
        editor.setValue("", 1);
        appendPre(true);
        removeMarkers();
      }

      function removeMarkers() {
        for (var i = session.$backMarkers.length - 1; i >= 0; i--) {
          session.removeMarker(session.$backMarkers[i].id);
        }
      }

      // -------------------------
      // ------ Key Binding ------
      // -------------------------

      editor.commands.addCommand({
        name: 'key_up',
        bindKey: {win: 'Up', mac: 'Up'},
        exec: function (editor) {
          replaceText(currentPrompt + consoleHistory.previous());
        },
        readOnly: true
      });

      editor.commands.addCommand({
        name: 'key_down',
        bindKey: {win: 'Down', mac: 'Down'},
        exec: function (editor) {
          replaceText(currentPrompt + consoleHistory.next());
        },
        readOnly: true
      });

      editor.commands.addCommand({
        name: 'return_key',
        bindKey: {win: 'Return', mac: 'Return'},
        exec: function (editor) {
          if (editorLocked || !enableCommands) return;
          var codeWithoutPre = editor.getInputCode();
          consoleHistory.addCommand(codeWithoutPre);
          executeCode(codeWithoutPre);
          appendPre();
        },
        readOnly: true
      });

      editor.commands.addCommand({
        name: 'gotoline', //override gotoline with an clear
        bindKey: {win: 'Ctrl-L', mac: 'Command-L'},
        exec: function (editor) {
          clearConsole();
        },
        readOnly: true // false if this command should not apply in readOnly mode
      });

      editor.commands.addCommand({
        name: 'select-line',
        bindKey: {win: 'Ctrl-A', mac: 'Command-A'},
        exec: function (editor) {
          var cursorPosition = editor.getCursorPosition();

          if (editor.session.getLength() - 1 === cursorPosition.row) {
            var line = editor.getLastLine();
            editor.selection.setRange(new Range(cursorPosition.row, currentPrompt.length, cursorPosition.row, line.length));
          }
        },
        readOnly: true // false if this command should not apply in readOnly mode
      });

      editor.keyBinding.addKeyboardHandler({ //make text input always appended to end of last line in case the input is not on the last line
        handleKeyboard: function (data, hash, keyString, keyCode, event) {
          var cusorPostion = editor.selection.getCursor();
          if (hash === -1 && cusorPostion.row !== editor.session.getLength() - 1) { //meaning input else hash is equal to a modifier key
            goToLastLineAndLineEnd();
          }
        }
      });

      // ----------------------
      // ------- Events -------
      // ----------------------

      // Takes care of proper cursor placement.
      editor.selection.on("changeCursor", function () {
        var new_pos = editor.getCursorPosition();

        if (new_pos.row === editor.session.getLength() - 1) {
          editor.setReadOnly(editorLocked);
          editor.renderer.$cursorLayer.element.style.display = "";
          if (new_pos.column < currentPrompt.length) { //cannot set cursor on prompt element
            editor.moveCursorTo(new_pos.row, currentPrompt.length);
          }
          cursor = editor.getCursorPosition();
        } else {
          editor.setReadOnly(true);
          editor.renderer.$cursorLayer.element.style.display = "none";
        }
      });

      editor.on("paste", function (obj) {
        var text = obj.text;
        text = text.replace("\n\r", "\n");
        var textSplitted = text.split("\n");
        if (textSplitted.length > 0) {
          for (var i = textSplitted.length - 1; i >= 1; i--) {
            textSplitted[i] = pastePre + textSplitted[i];
          }
        }
        obj.text = textSplitted.join("\n");

      });

      editor.on('focus', function () {
        if (!BackendSessionManager.sessionActive()) {
          BackendSessionManager.startSession();
        }
      });

      /*
       * Show an error in the console
       * @param error (string): the error message that will be shown
       */
      scope.$on('output::error', function writeError(_, error) {
        printText(error);
      });

      /*
       * Show a message in the console
       * @param msg (string): the message that will be shown
       */
      scope.$on('output::message', function writeMessage(_, msg) {
        consoleHistory.addCommand(msg);
        printText(pre + msg);
      });

      /*
       * Show code output in the console
       * @param msg (string): the code output that will be shown
       */
      scope.$on('output::output', function writeOutput(_, msg) {
        printText(msg);
      });

      /*
       * Show code result in the console
       * @param msg (string): the code result that will be shown
       */
      scope.$on('output::result', function (_, msg) {
        var outputLabel = getOutputLabel();
        printText(outputLabel + msg);
      });

      scope.$on('session::busy', function () {
        lockConsole();
      });

      scope.$on('session::loading', function () {
        enableCommands = false
      });

      scope.$on('session::ready', function () {
        // We don't want to start the console if a new session is being started
        if (startingSession) {
          startingSession = false;
        } else {
          unlockConsole();
        }
      });

      scope.$on('session::broken', function (_, text) {
        clearConsole();
        promptCount = 1;
      });

      scope.$on('console::scrolltobottom', function () {
        goToLastLineAndLineEnd();
      });

      scope.$on("console::resize", function (_, resizeHeight) {
        if (angular.isDefined(resizeHeight))
          elm.height(resizeHeight);
        editor.renderer.updateFull(true);
        editor.resize(true);
        goToLastLineAndLineEnd();
      });

      function lockConsole() {
        editor.setReadOnly(true);
        editorLocked = true;
      }

      function unlockConsole() {
        editor.setReadOnly(false);
        editorLocked = false;
        enableCommands = true;
      }
    }
  };
}]);
