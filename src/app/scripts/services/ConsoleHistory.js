'use strict';

angular.module('dataCampLight.services').factory('ConsoleHistory', function () {

  function ConsoleHistory(editor) {

    //private members
    var commands = [];
    var currentCommandIndex = -1;
    var editorLineValueBeforeHistoryAction;

    this.getCommands = function () {
      return commands.slice(0);
    };

    this.addCommand = function (command) {
      command = command.trim();
      var commandArr = command.split("\n");
      if (commandArr.length > 1) {
        for (var i = 0; i < commandArr.length; i++) {
          this.addCommand(commandArr[i]);
        }
      } else {
        if (command !== "" && !isSameAsLastCommand(command)) {
          commands.push(command);
        }
        this.resetCommandIndex();
      }

    };

    this.getCommand = function (index) {
      return commands[index];
    };

    this.getCurrentCommandIndex = function () {
      return currentCommandIndex;
    };

    this.previous = function () {
      if (currentCommandIndex === -1) { //meaning first time in history
        editorLineValueBeforeHistoryAction = editor.getInputLine();
        currentCommandIndex = commands.length;
      }
      if (currentCommandIndex > 0) {
        currentCommandIndex--;
      }
      var command = this.getCommand(currentCommandIndex);
      if (angular.isUndefined(command)) { //meaning there is no history
        command = editorLineValueBeforeHistoryAction;
      }
      return command;
    };

    this.next = function () {
      if (currentCommandIndex < (commands.length - 1)) {
        currentCommandIndex++;
        return this.getCommand(currentCommandIndex);
      } else {
        currentCommandIndex = commands.length;
        return editorLineValueBeforeHistoryAction;
      }
    };

    this.resetCommandIndex = function () {
      currentCommandIndex = -1;
    };

    //private methods
    function isSameAsLastCommand(command) {
      var lastCommand = commands[commands.length - 1];
      return lastCommand === command;
    }

  }

  return ConsoleHistory;
});
