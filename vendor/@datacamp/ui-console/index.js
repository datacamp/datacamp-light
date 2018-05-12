!(function(e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t(
        require("prop-types"),
        require("react"),
        require("lodash"),
        require("react-ace"),
        require("brace/mode/r"),
        require("brace/mode/python"),
        require("brace/mode/sql"),
        require("brace/theme/crimson_editor"),
        require("brace/ext/language_tools")
      ))
    : "function" == typeof define && define.amd
      ? define(
          [
            "prop-types",
            "react",
            "lodash",
            "react-ace",
            "brace/mode/r",
            "brace/mode/python",
            "brace/mode/sql",
            "brace/theme/crimson_editor",
            "brace/ext/language_tools",
          ],
          t
        )
      : "object" == typeof exports
        ? (exports.DCConsole = t(
            require("prop-types"),
            require("react"),
            require("lodash"),
            require("react-ace"),
            require("brace/mode/r"),
            require("brace/mode/python"),
            require("brace/mode/sql"),
            require("brace/theme/crimson_editor"),
            require("brace/ext/language_tools")
          ))
        : (e.DCConsole = t(
            e["prop-types"],
            e.react,
            e.lodash,
            e["react-ace"],
            e["brace/mode/r"],
            e["brace/mode/python"],
            e["brace/mode/sql"],
            e["brace/theme/crimson_editor"],
            e["brace/ext/language_tools"]
          ));
})(this, function(e, t, n, o, r, i, a, u, s) {
  return (function(e) {
    function t(o) {
      if (n[o]) return n[o].exports;
      var r = (n[o] = { i: o, l: !1, exports: {} });
      return e[o].call(r.exports, r, r.exports, t), (r.l = !0), r.exports;
    }
    var n = {};
    return (
      (t.m = e),
      (t.c = n),
      (t.d = function(e, n, o) {
        t.o(e, n) ||
          Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: o,
          });
      }),
      (t.n = function(e) {
        var n =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return t.d(n, "a", n), n;
      }),
      (t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (t.p = ""),
      t((t.s = 3))
    );
  })([
    function(e, t) {
      e.exports = n;
    },
    function(e, n) {
      e.exports = t;
    },
    function(t, n) {
      t.exports = e;
    },
    function(e, t, n) {
      "use strict";
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function r(e) {
        if (Array.isArray(e)) {
          for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
          return n;
        }
        return Array.from(e);
      }
      function i(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function a(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      }
      function u(e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof t
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          },
        })),
          t &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, t)
              : (e.__proto__ = t));
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.getEditor = void 0);
      var s =
          Object.assign ||
          function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var o in n)
                Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
            }
            return e;
          },
        l = (function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var o = t[n];
              (o.enumerable = o.enumerable || !1),
                (o.configurable = !0),
                "value" in o && (o.writable = !0),
                Object.defineProperty(e, o.key, o);
            }
          }
          return function(t, n, o) {
            return n && e(t.prototype, n), o && e(t, o), t;
          };
        })(),
        c = n(1),
        p = o(c),
        m = n(2),
        d = o(m),
        f = n(4),
        g = n(5),
        h = o(g),
        C = n(6),
        v = o(C),
        x = n(13),
        y = (function(e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e)
            for (var n in e)
              Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          return (t.default = e), t;
        })(x),
        b = n(14),
        P = o(b),
        _ = n(15),
        L = o(_),
        A = n(16),
        k = n(17),
        w = o(k),
        R = (function(e) {
          function t(e, n) {
            i(this, t);
            var o = a(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)
            );
            return (
              (o.consoleId = e.consoleId),
              o.resetPromptCount(),
              (o.commandHistory = new L.default()),
              (o.ranges = []),
              o
            );
          }
          return (
            u(t, e),
            l(t, [
              {
                key: "editorDidMount",
                value: function(e) {
                  var t = this,
                    n = this.props,
                    o = n.id,
                    r = n.pre_exercise_code,
                    i = n.solution,
                    a = n.type,
                    u = n.sct,
                    s = n.language,
                    l = n.getCompletions,
                    c = n.setCompletionsCallback,
                    p = n.code,
                    m = n.onFocusChanged;
                  if (this.getLangConfig().hasCompleter) {
                    var d = new f.BackendCompleter(s, l, c, o, r, i, a, u, s);
                    (0, f.addCompleter)(e, d),
                      (0, f.enableLiveAutocompletion)(e),
                      (0, f.setAutocompletionCommand)(e, "Ctrl-Space|Tab");
                  }
                  if (
                    (e.renderer.$fontMetrics.setPolling(!0),
                    (e.container.style.lineHeight = 1.6),
                    e.selection.on("changeCursor", function() {
                      return y.onCursorChanged(
                        e,
                        t.getPrompt().length,
                        t.getLangConfig().breakLine
                      );
                    }),
                    e.on("paste", y.onPaste(this.getLangConfig().breakLine)),
                    y.appendRawText(e, p || this.getPrompt()),
                    y.putTheCursorAtTheEnd(e),
                    (0, P.default)(
                      e,
                      function() {
                        return t.ranges;
                      },
                      function() {
                        return t.getLangConfig();
                      }
                    ),
                    this.bindKeysToEditor(e),
                    e.on("focus", function() {
                      return m && m(!0);
                    }),
                    e.on("blur", function() {
                      return m && m(!1);
                    }),
                    e.getSession().setUndoManager(null),
                    this.props.setOutputCallback(this.handleOutputs.bind(this)),
                    this.resetPromptCount(),
                    e.setValue(this.getPrompt(), 1),
                    this.props.glContainer)
                  ) {
                    var g = function() {
                      e.resize(!0);
                    };
                    this.props.glContainer.on("shown", g);
                  }
                },
              },
              {
                key: "componentWillReceiveProps",
                value: function(e) {
                  var t = e.promptPrefix,
                    n = this.props.promptPrefix;
                  t !== n && this.updatePromptPrefix(n, t);
                },
              },
              {
                key: "shouldComponentUpdate",
                value: function() {
                  return !1;
                },
              },
              {
                key: "componentWillUnmount",
                value: function() {
                  this.onSaveCode();
                },
              },
              {
                key: "onSaveCode",
                value: function() {
                  this.props.saveCode({
                    id: this.props.id,
                    code: O(this.consoleId).getValue(),
                    tabKey: "console",
                    category: "consoleTabs",
                  });
                },
              },
              {
                key: "onSubmit",
                value: function(e) {
                  var t = this.props,
                    n = t.id,
                    o = t.pre_exercise_code,
                    r = t.solution,
                    i = t.type,
                    a = t.sct,
                    u = t.language;
                  this.incrementPromptCount(),
                    this.props.submitCode({
                      language: u,
                      code: e,
                      solution: r,
                      sct: a,
                      type: i,
                      command: "console",
                      pec: o,
                      id: n,
                    });
                },
              },
              {
                key: "handleOutputs",
                value: function(e) {
                  var t = this,
                    n = function(e) {
                      var n,
                        o = function(e) {
                          var t = e.output;
                          return (
                            "\n<" +
                            e.script_name +
                            "> output:\n    " +
                            (0, A.replaceHexToString)(t)
                              .split("\n")
                              .join("\n    ") +
                            "\n"
                          );
                        },
                        i = e.map(function(e) {
                          var t =
                            "script-output" === e.type
                              ? o(e.payload)
                              : (0, A.replaceHexToString)(e.payload) + "\n";
                          return s({}, e, { payload: t });
                        }),
                        a = y.printOutputs({
                          editor: O(t.consoleId),
                          lastPrompt: t.getPrompt(),
                          prompt: function() {
                            return t.getPrompt();
                          },
                          getOutputLabel: function() {
                            return t.getOutputPrompt();
                          },
                          languageConfig: t.getLangConfig(),
                          outputs: i,
                          incrementPromptCount: function() {
                            return t.incrementPromptCount();
                          },
                        });
                      (n = t.ranges).push.apply(n, r(a));
                    };
                  if (
                    (this.props.printDelay > 0
                      ? (function e(o) {
                          n([o.shift()]),
                            o.length > 0 &&
                              setTimeout(function() {
                                return e(o);
                              }, t.props.printDelay);
                        })(e)
                      : n(e),
                    this.props.glContainer &&
                      this.props.glContainer.parent &&
                      this.props.glContainer.parent.parent)
                  ) {
                    var o = this.props.glContainer.tab;
                    this.props.glContainer.parent.parent.setActiveContentItem(
                      o.contentItem
                    );
                  }
                },
              },
              {
                key: "updatePromptPrefix",
                value: function(e, t) {
                  y.replacePrompt(
                    O(this.consoleId),
                    this.getPrompt(e),
                    this.getPrompt(t)
                  );
                },
              },
              {
                key: "getLangConfig",
                value: function() {
                  return h.default[this.props.language];
                },
              },
              {
                key: "incrementPromptCount",
                value: function() {
                  this.promptCount += 1;
                },
              },
              {
                key: "getPrompt",
                value: function() {
                  var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : this.props.promptPrefix;
                  return (
                    this.lastPromptOutputCount === this.promptCount &&
                      (this.promptCount += 1),
                    this.getLangConfig().prompt(this.promptCount, e)
                  );
                },
              },
              {
                key: "getOutputPrompt",
                value: function() {
                  var e = this.promptCount - 1 || 1;
                  return (
                    e === this.lastPromptOutputCount && (e += 1),
                    (this.lastPromptOutputCount = e),
                    this.getLangConfig().outputLabel(e, this.props.promptPrefix)
                  );
                },
              },
              {
                key: "getCtrlCHandle",
                value: function() {
                  var e = this;
                  return "BokehServerExercise" === this.props.type
                    ? function() {
                        return e.props.submitCode({
                          code: "'ctrl-c'",
                          command: "bokeh_server",
                        });
                      }
                    : function() {};
                },
              },
              {
                key: "resetPromptCount",
                value: function() {
                  (this.lastPromptOutputCount = 0), (this.promptCount = 1);
                },
              },
              {
                key: "clearConsole",
                value: function() {
                  this.resetPromptCount(),
                    O(this.consoleId).setValue(this.getPrompt(), 1),
                    (this.ranges = []);
                },
              },
              {
                key: "bindKeysToEditor",
                value: function(e) {
                  var t = this;
                  y.bindEditorKeys({
                    editor: e,
                    consoleHistory: this.commandHistory,
                    prompt: function() {
                      return t.getPrompt();
                    },
                    canExecuteCommand: function() {
                      return t.props.canExecuteCommand;
                    },
                    executeCommand: function(e) {
                      return t.onSubmit(e);
                    },
                    clearConsole: function() {
                      return t.clearConsole();
                    },
                    languageConfig: function() {
                      return t.getLangConfig();
                    },
                    ctrlC: this.getCtrlCHandle(),
                  });
                },
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.children;
                  return p.default.createElement(
                    "div",
                    { className: "" + this.props.className },
                    p.default.createElement(v.default, {
                      name: "ace-code-console-" + this.consoleId,
                      mode: this.getLangConfig().mode,
                      onChange: function(e) {
                        return e;
                      },
                      onEditorLoad: function(t) {
                        e.editorDidMount(t);
                      },
                      className: w.default.console + " " + this.props.className,
                    }),
                    t
                  );
                },
              },
            ]),
            t
          );
        })(p.default.Component),
        O = function() {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
          return window.ace.edit("ace-code-console-" + e);
        };
      (t.getEditor = O),
        (R.propTypes = {
          language: d.default.string,
          code: d.default.string,
          saveCode: d.default.func,
          id: d.default.number,
          pre_exercise_code: d.default.string,
          solution: d.default.string,
          sct: d.default.string,
          type: d.default.string,
          canExecuteCommand: d.default.bool,
          submitCode: d.default.func,
          setOutputCallback: d.default.func,
          getCompletions: d.default.func,
          setCompletionsCallback: d.default.func,
          onFocusChanged: d.default.func,
          consoleId: d.default.string,
          printDelay: d.default.number,
          promptPrefix: d.default.string,
          className: d.default.string,
          glContainer: d.default.shape({ on: d.default.func }),
        });
      var T = function() {};
      (R.defaultProps = {
        language: "r",
        code: "",
        saveCode: T,
        id: 0,
        pre_exercise_code: "",
        solution: "",
        sct: "",
        type: "",
        canExecuteCommand: !0,
        submitCode: T,
        setOutputCallback: T,
        getCompletions: T,
        setCompletionsCallback: T,
        onFocusChanged: T,
        consoleId: "",
        printDelay: 100,
        promptPrefix: "",
        className: "",
      }),
        (t.default = R);
    },
    function(e, t, n) {
      !(function(t, o) {
        e.exports = (function(e) {
          return (function(e) {
            function t(o) {
              if (n[o]) return n[o].exports;
              var r = (n[o] = { exports: {}, id: o, loaded: !1 });
              return (
                e[o].call(r.exports, r, r.exports, t),
                (r.loaded = !0),
                r.exports
              );
            }
            var n = {};
            return (t.m = e), (t.c = n), (t.p = ""), t(0);
          })([
            function(e, t, n) {
              "use strict";
              function o(e) {
                return e && e.__esModule ? e : { default: e };
              }
              Object.defineProperty(t, "__esModule", { value: !0 }),
                (t.setTabCommand = t.setAutocompletionCommand = t.enableLiveAutocompletion = t.addCompleter = t.TextCompleter = t.BackendCompleter = void 0);
              var r = n(3);
              Object.defineProperty(t, "BackendCompleter", {
                enumerable: !0,
                get: function() {
                  return o(r).default;
                },
              });
              var i = n(4);
              Object.defineProperty(t, "TextCompleter", {
                enumerable: !0,
                get: function() {
                  return o(i).default;
                },
              });
              var a = n(1),
                u = function(e) {
                  if (!e.completer) {
                    var t = ace.acequire("ace/autocomplete").Autocomplete;
                    e.completer = new t();
                  }
                  (e.completer.autoInsert = !1),
                    (e.completer.autoSelect = !0),
                    (e.completer.exactMatch = !0);
                },
                s = ((t.addCompleter = function(e, t) {
                  e.completers || (e.completers = []), e.completers.push(t);
                }),
                (t.enableLiveAutocompletion = function(e) {
                  var t = ace.acequire("ace/autocomplete/util");
                  e.commands.on("afterExec", function(e) {
                    var n = e.editor,
                      o = n.completer && n.completer.activated;
                    if ("backspace" === e.command.name)
                      o && !t.getCompletionPrefix(n) && n.completer.detach();
                    else if ("insertstring" === e.command.name) {
                      var r = t.getCompletionPrefix(n);
                      r &&
                        !o &&
                        r.length > 2 &&
                        (u(n), n.completer.showPopup(n));
                    }
                  });
                }),
                (t.setAutocompletionCommand = function(e, t) {
                  e.commands.addCommand({
                    name: "startAutocomplete",
                    exec: function(e) {
                      u(e),
                        e.completer.showPopup(e),
                        e.completer.cancelContextMenu();
                    },
                    bindKey: t,
                  });
                }),
                (t.setTabCommand = function(e, t) {
                  e.commands.addCommand({
                    name: "startAutocompleteTab",
                    exec: function(e) {
                      var n = s(e, t);
                      (n = n.trim()),
                        n
                          ? e.commands.commands.startAutocomplete.exec(e)
                          : e.indent();
                    },
                    bindKey: "Tab",
                  });
                }),
                function(e, t) {
                  var n = (0, a.getAutoCompletionConfig)(t),
                    o = window.ace.acequire("ace/autocomplete/util"),
                    r = o.getCompletionPrefix(e),
                    i = e.getCursorPosition();
                  if (i && i.row && i.column) {
                    var u = e.session.getLine(i.row),
                      s = n.rules.getCompletionConfigObj(r, u, i);
                    s && s.prefix && (r = s.prefix);
                  }
                  return r;
                });
            },
            function(e, t, n) {
              !(function(t, o) {
                e.exports = (function(e) {
                  return (function(e) {
                    function t(o) {
                      if (n[o]) return n[o].exports;
                      var r = (n[o] = { exports: {}, id: o, loaded: !1 });
                      return (
                        e[o].call(r.exports, r, r.exports, t),
                        (r.loaded = !0),
                        r.exports
                      );
                    }
                    var n = {};
                    return (t.m = e), (t.c = n), (t.p = ""), t(0);
                  })([
                    function(e, t, n) {
                      "use strict";
                      Object.defineProperty(t, "__esModule", { value: !0 }),
                        (t.mapLanguageName = t.getAutoCompletionConfig = t.getAutoCompletionRules = t.getMCCommand = t.getConsoleTitle = t.getTabTitle = void 0);
                      var o = n(1),
                        r = {
                          revo: {
                            mode: "r",
                            name: "Revo",
                            prompt: function() {
                              return "> ";
                            },
                            promptToken: "operator.keyword",
                            outputLabel: function() {
                              return "";
                            },
                            newlineBeforePrompt: !1,
                            extension: "R",
                            console: "R Console",
                            editorPrefixTitle: "script",
                            responseRegex: /\[1\] "(.*)"\r?\n/g,
                            mcCommand: "DM.result = {selection}",
                            completerIgnoreRegexArr: [/#.*/g],
                            breakLine: "+ ",
                            autoCompleter: {
                              rules: o.rAutoCompletionRules,
                              identifierRegexps: [
                                /[a-zA-Z0-9_\@\.:\$?\-\u00A2-\uFFFF]/,
                              ],
                            },
                            hasCompleter: !0,
                            tabSize: 2,
                          },
                          r: {
                            mode: "r",
                            name: "R",
                            prompt: function() {
                              return "> ";
                            },
                            promptToken: "operator.keyword",
                            outputLabel: function() {
                              return "";
                            },
                            newlineBeforePrompt: !1,
                            extension: "R",
                            editorPrefixTitle: "script",
                            console: "R Console",
                            responseRegex: /\[1\] "(.*)"\r?\n/g,
                            mcCommand: "DM.result = {selection}",
                            completerIgnoreRegexArr: [/#.*/g],
                            breakLine: "+ ",
                            autoCompleter: {
                              rules: o.rAutoCompletionRules,
                              identifierRegexps: [
                                /[a-zA-Z0-9_\@\.:\$\?\-\u00A2-\uFFFF]/,
                              ],
                            },
                            hasCompleter: !0,
                            tabSize: 2,
                          },
                          python: {
                            mode: "python",
                            name: "Python",
                            prompt: function(e) {
                              return "In [" + e + "]: ";
                            },
                            promptRegex: /^(In |Out)\[\d+\]: /,
                            promptToken: "identifier",
                            newlineBeforePrompt: !0,
                            outputLabel: function(e) {
                              return "Out[" + e + "]: ";
                            },
                            extension: "py",
                            editorPrefixTitle: "script",
                            console: "IPython Shell",
                            responseRegex: /\"(.*)\"\r?\n/g,
                            mcCommand: "selected_option = {selection}",
                            completerIgnoreRegexArr: [/#.*/g],
                            breakLine: "... ",
                            hasCompleter: !0,
                            autoCompleter: {
                              rules: o.pythonAutoCompletionRules,
                              identifierRegexps: [
                                /[a-zA-Z0-9_\.\-%\u00A2-\uFFFF]/,
                              ],
                            },
                            tabSize: 4,
                          },
                          sql: {
                            mode: "sql",
                            name: "SQL",
                            prompt: function() {
                              return "";
                            },
                            extension: "sql",
                            editorPrefixTitle: "query",
                            responseRegex: /\"(.*)\"\r?\n/g,
                            mcCommand: "selected_option = {selection}",
                            tabSize: 4,
                          },
                          shell: {
                            mode: "sh",
                            name: "Shell",
                            prompt: function(e, t) {
                              return t + " $ ";
                            },
                            promptRegex: /^(In |Out)\[\d+\]: /,
                            promptToken: "identifier",
                            newlineBeforePrompt: !1,
                            outputLabel: function() {
                              return "";
                            },
                            extension: "sh",
                            editorPrefixTitle: "script",
                            console: "Terminal",
                            responseRegex: /\"(.*)\"\r?\n/g,
                            mcCommand: "selected_option = {selection}",
                            completerIgnoreRegexArr: [/#.*/g],
                            breakLine: "... ",
                            hasCompleter: !1,
                            tabSize: 4,
                          },
                        };
                      (t.default = r),
                        (t.getTabTitle = function(e, t, n) {
                          return r[t]
                            ? e +
                              "." +
                              ("RCppExercise" === n ? "cpp" : r[t].extension)
                            : e;
                        }),
                        (t.getConsoleTitle = function(e) {
                          return r[e] ? r[e].console : "console";
                        }),
                        (t.getMCCommand = function(e, t) {
                          return r[e].mcCommand.replace("{selection}", t);
                        }),
                        (t.getAutoCompletionRules = function(e) {
                          return r[e].autoCompleter.rules;
                        }),
                        (t.getAutoCompletionConfig = function(e) {
                          return r[e].autoCompleter;
                        }),
                        (t.mapLanguageName = function(e) {
                          var t = (e || "r").toLowerCase();
                          switch (t) {
                            case "revolution":
                              return "revo";
                            case "python 3":
                              return "python";
                            default:
                              return t;
                          }
                        });
                    },
                    function(e, t, n) {
                      "use strict";
                      Object.defineProperty(t, "__esModule", { value: !0 }),
                        (t.pythonAutoCompletionRules = t.rAutoCompletionRules = void 0);
                      var o = n(2),
                        r = (function(e) {
                          return e && e.__esModule ? e : { default: e };
                        })(o),
                        i = function(e) {
                          var t = e;
                          return (
                            /^[a-zA-Z0-9_\-\.]+=$/.test(e) &&
                              (t = e.split("=")[0] + " = "),
                            t
                          );
                        },
                        a = (t.rAutoCompletionRules = {
                          isPackageCompletion: function(e) {
                            return /[a-z0-9\.\-\_]+:::?[a-z0-9\.\-\_]*$/i.test(
                              e
                            );
                          },
                          isFunctionArugmentCompletion: function(e) {
                            return /[a-z0-9]+\s*\((\s*("|')?\s*[a-z0-9\.\-\_]*\s*("|')?\s*(,|=)?)*$/i.test(
                              e
                            );
                          },
                          isFunctionNamedArgumentValue: function(e) {
                            return /[a-z0-9\.\-\_]+=[a-z0-9\.\-\_]*$/i.test(e);
                          },
                          isHelpCompletion: function(e) {
                            return /^\s*\?[a-z0-9\.\-\_]*$/i.test(e);
                          },
                          isListDataframeVariable: function(e) {
                            return /[a-z0-9\.\-\_]+\$[a-z0-9\.\-\_]*$/i.test(e);
                          },
                          getPrefix: function(e, t) {
                            return (
                              e.length > t && (e = e.substring(0, t)),
                              a.isPackageCompletion(e)
                                ? e.match(
                                    /[a-z0-9\.\-\_]+:::?[a-z0-9\.\-\_]*$/i
                                  )[0]
                                : a.isFunctionArugmentCompletion(e)
                                  ? a.isFunctionNamedArgumentValue(e)
                                    ? e.match(/[a-z0-9\.\-\_]*$/i)[0]
                                    : e
                                  : a.isListDataframeVariable(e)
                                    ? e.match(
                                        /[a-z0-9\.\-\_]+\$[a-z0-9\.\-\_]*$/i
                                      )[0]
                                    : e
                            );
                          },
                          getCompletionConfigObj: function(e, t, n) {
                            if (0 !== e.length)
                              return { prefix: e, cursorPosition: e.length };
                            var o = a.getPrefix(t, n.column);
                            return (
                              0 !== o.length && {
                                prefix: o,
                                cursorPosition: o.length,
                              }
                            );
                          },
                          mapToAceCompletionList: function(e) {
                            var t = [];
                            if (r.default.isArray(e.comps))
                              t = e.comps.map(function(t, n, o) {
                                t = i(t);
                                var r = e.packages[n]
                                  ? "{" + e.packages[n] + "}"
                                  : "";
                                return {
                                  name: t,
                                  value: t,
                                  score: e.scores[n] ? e.scores[n] : 0,
                                  meta: r,
                                  type: e.types[n] ? e.types[n] : "",
                                };
                              });
                            else if (r.default.isString(e.comps)) {
                              var n = i(e.comps);
                              t.push({
                                name: n,
                                value: n,
                                meta: e.packages,
                                type: e.types,
                              });
                            }
                            return t;
                          },
                        }),
                        u = (t.pythonAutoCompletionRules = {
                          promptRegex: /^(In |Out)\[\d+\]: /,
                          getPrefix: function(e, t) {
                            return e.replace(u.promptRegex, "");
                          },
                          resultParsingCorrectness: function(e, t, n) {
                            return n;
                          },
                          getCompletionConfigObj: function(e, t, n) {
                            t = t.substring(0, n.column);
                            var o = u.getPrefix(t, e.length);
                            return { prefix: o, cursorPosition: o.length };
                          },
                          mapToAceCompletionList: function(e) {
                            return e.map(function(e, t, n) {
                              return {
                                value: e.completion,
                                meta: e.module,
                                score: e.score,
                              };
                            });
                          },
                        });
                    },
                    function(t, n) {
                      t.exports = e;
                    },
                  ]);
                })(n(2));
              })();
            },
            function(t, n) {
              t.exports = e;
            },
            function(e, t, n) {
              "use strict";
              function o(e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              }
              Object.defineProperty(t, "__esModule", { value: !0 });
              var r =
                  Object.assign ||
                  function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                      var n = arguments[t];
                      for (var o in n)
                        Object.prototype.hasOwnProperty.call(n, o) &&
                          (e[o] = n[o]);
                    }
                    return e;
                  },
                i = n(1),
                a = n(2),
                u = (function(e) {
                  return e && e.__esModule ? e : { default: e };
                })(a),
                s = function e(t, n, a) {
                  for (
                    var s = arguments.length,
                      l = Array(s > 3 ? s - 3 : 0),
                      c = 3;
                    c < s;
                    c++
                  )
                    l[c - 3] = arguments[c];
                  var p = this;
                  o(this, e);
                  var m = (0, i.getAutoCompletionConfig)(t);
                  (this.doCompletions = u.default.debounce(function(e, t) {
                    n(
                      r(
                        {
                          command: "code_completion",
                          cursorPos: e.cursorPosition,
                          autoComp: e.prefix,
                        },
                        l
                      )
                    ),
                      a(function(e) {
                        t(null, m.rules.mapToAceCompletionList(e.payload));
                      });
                  }, 100)),
                    (this.getCompletions = function(e, t, n, o, r) {
                      var i = e.session.getLine(n.row),
                        a = m.rules.getCompletionConfigObj(o, i, n);
                      return a ? void p.doCompletions(a, r) : void r(null, []);
                    }),
                    m.identifierRegexps &&
                      (this.identifierRegexps = m.identifierRegexps);
                };
              (t.default = s), (e.exports = t.default);
            },
            function(e, t) {
              "use strict";
              function n(e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              }
              Object.defineProperty(t, "__esModule", { value: !0 });
              var o = (function() {
                  function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                      var o = t[n];
                      (o.enumerable = o.enumerable || !1),
                        (o.configurable = !0),
                        "value" in o && (o.writable = !0),
                        Object.defineProperty(e, o.key, o);
                    }
                  }
                  return function(t, n, o) {
                    return n && e(t.prototype, n), o && e(t, o), t;
                  };
                })(),
                r = (function() {
                  function e(t) {
                    var o = this;
                    n(this, e),
                      (this.Range = window.ace.acequire("ace/range").Range),
                      (this.splitRegex = /[^a-zA-Z_0-9\$\-\u00C0-\u1FFF\u2C00-\uD7FF\w]+/),
                      (this.getCompletions = function(e, n, r, i, a) {
                        var u = o.wordDistance(n, r, t);
                        a(
                          null,
                          Object.keys(u).map(function(e) {
                            return {
                              caption: e,
                              value: e,
                              score: u[e],
                              meta: "local",
                            };
                          })
                        );
                      });
                  }
                  return (
                    o(e, [
                      {
                        key: "getWordIndex",
                        value: function(e, t, n) {
                          var o = e.getTextRange(
                            this.Range.fromPoints({ row: 0, column: 0 }, t)
                          );
                          return (
                            (o = this.removeComments(o, n)),
                            o.split(this.splitRegex).length - 1
                          );
                        },
                      },
                      {
                        key: "removeComments",
                        value: function(e, t) {
                          for (var n = t.length - 1; n >= 0; n--) {
                            var o = t[n];
                            e = e.replace(o, "");
                          }
                          return e;
                        },
                      },
                      {
                        key: "wordDistance",
                        value: function(e, t, n) {
                          var o = this.getWordIndex(e, t, n),
                            r = this.removeComments(e.getValue(), n).split(
                              this.splitRegex
                            ),
                            i = Object.create(null),
                            a = r[o];
                          return (
                            r.forEach(function(e, t) {
                              if (e && e !== a) {
                                var n = Math.abs(o - t),
                                  u = r.length - n;
                                i[e] ? (i[e] = Math.max(u, i[e])) : (i[e] = u);
                              }
                            }),
                            i
                          );
                        },
                      },
                    ]),
                    e
                  );
                })();
              (t.default = r), (e.exports = t.default);
            },
          ]);
        })(n(0));
      })();
    },
    function(e, t, n) {
      !(function(t, o) {
        e.exports = (function(e) {
          return (function(e) {
            function t(o) {
              if (n[o]) return n[o].exports;
              var r = (n[o] = { exports: {}, id: o, loaded: !1 });
              return (
                e[o].call(r.exports, r, r.exports, t),
                (r.loaded = !0),
                r.exports
              );
            }
            var n = {};
            return (t.m = e), (t.c = n), (t.p = ""), t(0);
          })([
            function(e, t, n) {
              "use strict";
              Object.defineProperty(t, "__esModule", { value: !0 }),
                (t.mapLanguageName = t.getAutoCompletionConfig = t.getAutoCompletionRules = t.getMCCommand = t.getConsoleTitle = t.getTabTitle = void 0);
              var o = n(1),
                r = {
                  revo: {
                    mode: "r",
                    name: "Revo",
                    prompt: function() {
                      return "> ";
                    },
                    promptToken: "operator.keyword",
                    outputLabel: function() {
                      return "";
                    },
                    newlineBeforePrompt: !1,
                    extension: "R",
                    console: "R Console",
                    editorPrefixTitle: "script",
                    responseRegex: /\[1\] "(.*)"\r?\n/g,
                    mcCommand: "DM.result = {selection}",
                    completerIgnoreRegexArr: [/#.*/g],
                    breakLine: "+ ",
                    autoCompleter: {
                      rules: o.rAutoCompletionRules,
                      identifierRegexps: [
                        /[a-zA-Z0-9_\@\.:\$?\-\u00A2-\uFFFF]/,
                      ],
                    },
                    hasCompleter: !0,
                    tabSize: 2,
                  },
                  r: {
                    mode: "r",
                    name: "R",
                    prompt: function() {
                      return "> ";
                    },
                    promptToken: "operator.keyword",
                    outputLabel: function() {
                      return "";
                    },
                    newlineBeforePrompt: !1,
                    extension: "R",
                    editorPrefixTitle: "script",
                    console: "R Console",
                    responseRegex: /\[1\] "(.*)"\r?\n/g,
                    mcCommand: "DM.result = {selection}",
                    completerIgnoreRegexArr: [/#.*/g],
                    breakLine: "+ ",
                    autoCompleter: {
                      rules: o.rAutoCompletionRules,
                      identifierRegexps: [
                        /[a-zA-Z0-9_\@\.:\$\?\-\u00A2-\uFFFF]/,
                      ],
                    },
                    hasCompleter: !0,
                    tabSize: 2,
                  },
                  python: {
                    mode: "python",
                    name: "Python",
                    prompt: function(e) {
                      return "In [" + e + "]: ";
                    },
                    promptRegex: /^(In |Out)\[\d+\]: /,
                    promptToken: "identifier",
                    newlineBeforePrompt: !0,
                    outputLabel: function(e) {
                      return "Out[" + e + "]: ";
                    },
                    extension: "py",
                    editorPrefixTitle: "script",
                    console: "IPython Shell",
                    responseRegex: /\"(.*)\"\r?\n/g,
                    mcCommand: "selected_option = {selection}",
                    completerIgnoreRegexArr: [/#.*/g],
                    breakLine: "... ",
                    hasCompleter: !0,
                    autoCompleter: {
                      rules: o.pythonAutoCompletionRules,
                      identifierRegexps: [/[a-zA-Z0-9_\.\-%\u00A2-\uFFFF]/],
                    },
                    tabSize: 4,
                  },
                  sql: {
                    mode: "sql",
                    name: "SQL",
                    prompt: function() {
                      return "";
                    },
                    extension: "sql",
                    editorPrefixTitle: "query",
                    responseRegex: /\"(.*)\"\r?\n/g,
                    mcCommand: "selected_option = {selection}",
                    tabSize: 4,
                  },
                  shell: {
                    mode: "sh",
                    name: "Shell",
                    prompt: function(e, t) {
                      return t + " $ ";
                    },
                    promptRegex: /^(In |Out)\[\d+\]: /,
                    promptToken: "identifier",
                    newlineBeforePrompt: !1,
                    outputLabel: function() {
                      return "";
                    },
                    extension: "sh",
                    editorPrefixTitle: "script",
                    console: "Terminal",
                    responseRegex: /\"(.*)\"\r?\n/g,
                    mcCommand: "selected_option = {selection}",
                    completerIgnoreRegexArr: [/#.*/g],
                    breakLine: "... ",
                    hasCompleter: !1,
                    tabSize: 4,
                  },
                };
              (t.default = r),
                (t.getTabTitle = function(e, t, n) {
                  return r[t]
                    ? e + "." + ("RCppExercise" === n ? "cpp" : r[t].extension)
                    : e;
                }),
                (t.getConsoleTitle = function(e) {
                  return r[e] ? r[e].console : "console";
                }),
                (t.getMCCommand = function(e, t) {
                  return r[e].mcCommand.replace("{selection}", t);
                }),
                (t.getAutoCompletionRules = function(e) {
                  return r[e].autoCompleter.rules;
                }),
                (t.getAutoCompletionConfig = function(e) {
                  return r[e].autoCompleter;
                }),
                (t.mapLanguageName = function(e) {
                  var t = (e || "r").toLowerCase();
                  switch (t) {
                    case "revolution":
                      return "revo";
                    case "python 3":
                      return "python";
                    default:
                      return t;
                  }
                });
            },
            function(e, t, n) {
              "use strict";
              Object.defineProperty(t, "__esModule", { value: !0 }),
                (t.pythonAutoCompletionRules = t.rAutoCompletionRules = void 0);
              var o = n(2),
                r = (function(e) {
                  return e && e.__esModule ? e : { default: e };
                })(o),
                i = function(e) {
                  var t = e;
                  return (
                    /^[a-zA-Z0-9_\-\.]+=$/.test(e) &&
                      (t = e.split("=")[0] + " = "),
                    t
                  );
                },
                a = (t.rAutoCompletionRules = {
                  isPackageCompletion: function(e) {
                    return /[a-z0-9\.\-\_]+:::?[a-z0-9\.\-\_]*$/i.test(e);
                  },
                  isFunctionArugmentCompletion: function(e) {
                    return /[a-z0-9]+\s*\((\s*("|')?\s*[a-z0-9\.\-\_]*\s*("|')?\s*(,|=)?)*$/i.test(
                      e
                    );
                  },
                  isFunctionNamedArgumentValue: function(e) {
                    return /[a-z0-9\.\-\_]+=[a-z0-9\.\-\_]*$/i.test(e);
                  },
                  isHelpCompletion: function(e) {
                    return /^\s*\?[a-z0-9\.\-\_]*$/i.test(e);
                  },
                  isListDataframeVariable: function(e) {
                    return /[a-z0-9\.\-\_]+\$[a-z0-9\.\-\_]*$/i.test(e);
                  },
                  getPrefix: function(e, t) {
                    return (
                      e.length > t && (e = e.substring(0, t)),
                      a.isPackageCompletion(e)
                        ? e.match(/[a-z0-9\.\-\_]+:::?[a-z0-9\.\-\_]*$/i)[0]
                        : a.isFunctionArugmentCompletion(e)
                          ? a.isFunctionNamedArgumentValue(e)
                            ? e.match(/[a-z0-9\.\-\_]*$/i)[0]
                            : e
                          : a.isListDataframeVariable(e)
                            ? e.match(/[a-z0-9\.\-\_]+\$[a-z0-9\.\-\_]*$/i)[0]
                            : e
                    );
                  },
                  getCompletionConfigObj: function(e, t, n) {
                    if (0 !== e.length)
                      return { prefix: e, cursorPosition: e.length };
                    var o = a.getPrefix(t, n.column);
                    return (
                      0 !== o.length && { prefix: o, cursorPosition: o.length }
                    );
                  },
                  mapToAceCompletionList: function(e) {
                    var t = [];
                    if (r.default.isArray(e.comps))
                      t = e.comps.map(function(t, n, o) {
                        t = i(t);
                        var r = e.packages[n] ? "{" + e.packages[n] + "}" : "";
                        return {
                          name: t,
                          value: t,
                          score: e.scores[n] ? e.scores[n] : 0,
                          meta: r,
                          type: e.types[n] ? e.types[n] : "",
                        };
                      });
                    else if (r.default.isString(e.comps)) {
                      var n = i(e.comps);
                      t.push({
                        name: n,
                        value: n,
                        meta: e.packages,
                        type: e.types,
                      });
                    }
                    return t;
                  },
                }),
                u = (t.pythonAutoCompletionRules = {
                  promptRegex: /^(In |Out)\[\d+\]: /,
                  getPrefix: function(e, t) {
                    return e.replace(u.promptRegex, "");
                  },
                  resultParsingCorrectness: function(e, t, n) {
                    return n;
                  },
                  getCompletionConfigObj: function(e, t, n) {
                    t = t.substring(0, n.column);
                    var o = u.getPrefix(t, e.length);
                    return { prefix: o, cursorPosition: o.length };
                  },
                  mapToAceCompletionList: function(e) {
                    return e.map(function(e, t, n) {
                      return {
                        value: e.completion,
                        meta: e.module,
                        score: e.score,
                      };
                    });
                  },
                });
            },
            function(t, n) {
              t.exports = e;
            },
          ]);
        })(n(0));
      })();
    },
    function(e, t, n) {
      "use strict";
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r = n(1),
        i = o(r),
        a = n(2),
        u = o(a),
        s = n(7),
        l = o(s);
      n(8), n(9), n(10), n(11), n(12);
      var c = function(e) {
        var t = e.name,
          n = e.code,
          o = e.mode,
          r = e.fontSize,
          a = e.onChange,
          u = e.tabSize,
          s = e.readOnly,
          c = e.highlightActiveLine,
          p = e.showGutter,
          m = e.highlightGutterLine,
          d = e.indentedSoftWrap,
          f = e.onEditorLoad,
          g = e.children,
          h = e.className;
        return i.default.createElement(
          "div",
          { className: "" + h },
          i.default.createElement(l.default, {
            className: "custom-ace-editor " + h,
            mode: o,
            theme: "crimson_editor",
            onChange: a,
            name: t,
            value: n,
            width: "",
            height: "",
            readOnly: s,
            tabSize: u,
            highlightActiveLine: c,
            editorProps: { $blockScrolling: 1 / 0, behavioursEnabled: !0 },
            onLoad: f,
            setOptions: {
              fontSize: r,
              showGutter: p,
              highlightGutterLine: m,
              showPrintMargin: !1,
              indentedSoftWrap: d,
              displayIndentGuides: !1,
              wrap: "free",
            },
          }),
          g
        );
      };
      (c.propTypes = {
        name: u.default.string.isRequired,
        code: u.default.string,
        mode: u.default.string.isRequired,
        fontSize: u.default.string,
        onChange: u.default.func,
        onEditorLoad: u.default.func,
        tabSize: u.default.number,
        highlightActiveLine: u.default.bool,
        indentedSoftWrap: u.default.bool,
        showGutter: u.default.bool,
        readOnly: u.default.bool,
        highlightGutterLine: u.default.bool,
        className: u.default.string,
      }),
        (c.defaultProps = {
          code: "",
          fontSize: "0.8em",
          tabSize: 4,
          highlightActiveLine: !1,
          showGutter: !1,
          highlightGutterLine: !1,
          indentedSoftWrap: !0,
          className: "",
        }),
        (t.default = c),
        (e.exports = t.default);
    },
    function(e, t) {
      e.exports = o;
    },
    function(e, t) {
      e.exports = r;
    },
    function(e, t) {
      e.exports = i;
    },
    function(e, t) {
      e.exports = a;
    },
    function(e, t) {
      e.exports = u;
    },
    function(e, t) {
      e.exports = s;
    },
    function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.bindEditorKeys = t.removeBindingKeys = t.printOutputs = t.replaceText = t.replacePrompt = t.printText = t.appendPre = t.appendRawText = t.getInputCode = t.putTheCursorAtTheEnd = t.getLastLine = t.removeLinesAfterIndex = t.getIndexOfLastLineWithPrompt = t.getLinesFromIndex = t.getLineAtIndex = t.onPaste = t.onCursorChanged = void 0);
      var o = n(0),
        r = (function(e) {
          return e && e.__esModule ? e : { default: e };
        })(o),
        i = window.ace.acequire("ace/range").Range,
        a = function(e) {
          var t =
            !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
          (e.renderer.$cursorLayer.element.style.display = t ? "" : "none"),
            e.setReadOnly(!t);
        },
        u = ((t.onCursorChanged = function(e, t, n) {
          var o = e.getCursorPosition();
          if (o.row === e.session.getLength() - 1) {
            a(e, !0);
            var i = r.default.startsWith(m(e), n);
            i && o.column < n.length
              ? e.moveCursorTo(o.row, n.length)
              : !i && o.column < t && e.moveCursorTo(o.row, t);
          } else a(e, !1);
        }),
        (t.onPaste = function(e) {
          return function(t) {
            var n = t.text;
            n = n.replace("\n\r", "\n");
            var o = n.split("\n"),
              i = r.default
                .map(o, function(t, n) {
                  return "" + (n > 0 ? e : "") + t;
                })
                .join("\n");
            t.text = i;
          };
        })),
        s = (t.getLineAtIndex = function(e, t) {
          return e.session.getLine(t);
        }),
        l = (t.getLinesFromIndex = function(e, t) {
          return e.session.getLines(t, 1 / 0).join("\n");
        }),
        c = (t.getIndexOfLastLineWithPrompt = function(e, t) {
          return (
            r.default.find(
              r.default.reverse(
                r.default.times(e.session.getLength(), r.default.identity)
              ),
              function(n) {
                return r.default.startsWith(s(e, n), t);
              }
            ) || 0
          );
        }),
        p = (t.removeLinesAfterIndex = function(e, t, n) {
          var o = new i(t, n().length, Number.MAX_VALUE, Number.MAX_VALUE);
          e.session.replace(o, "");
        }),
        m = (t.getLastLine = function(e) {
          return s(e, e.session.getLength() - 1);
        }),
        d = (t.putTheCursorAtTheEnd = function(e) {
          return e.gotoLine(1 / 0, 1 / 0);
        }),
        f = (t.getInputCode = function(e, t, n) {
          var o = m(e);
          if (o.startsWith(t)) o = o.substring(t.length);
          else if (o.startsWith(n)) {
            o = o.substring(n.length);
            for (var r = e.session.getLength() - 2; r >= 0; r -= 1) {
              var i = e.session.getLine(r);
              if (i.startsWith(n)) o = i.substring(n.length) + "\n" + o;
              else if (i.startsWith(t)) {
                o = i.substring(t.length) + "\n" + o;
                break;
              }
            }
          }
          return o && o.trim();
        }),
        g = (t.appendRawText = function(e, t) {
          var n = { row: e.session.getLength(), column: 0 },
            o = e.session.insert(n, t);
          return new i(n.row, n.column, o.row + 1, o.column);
        }),
        h = (t.appendPre = function(e, t, n) {
          g(e, (n.newlineBeforePrompt ? "\n" : "") + "\n" + t()), d(e);
        }),
        C = (t.printText = function(e) {
          var t = e.editor,
            n = e.text,
            o = e.token,
            i = e.lastPrompt,
            a = e.prompt,
            u = e.languageConfig,
            s = n;
          if ("code" === o) {
            var p = s.split("\n");
            if (p.length > 1) {
              var m = r.default
                .times(i.length, function() {
                  return " ";
                })
                .join("");
              s = [p[0]]
                .concat(
                  r.default.map(p.slice(1), function(e) {
                    return m + e;
                  })
                )
                .join("\n");
            }
          }
          var d = c(t, i),
            f = l(t, d).slice(r.default.size(i));
          t.session.removeFullLines(d, 1 / 0),
            0 !== d &&
              (!u.newlineBeforePrompt ||
                (u.newlineBeforePrompt && "code" === o)) &&
              g(t, "\n");
          var C = g(t, s);
          return (
            o && (C.token = o),
            h(
              t,
              function() {
                return a() + f;
              },
              u
            ),
            C
          );
        }),
        v = ((t.replacePrompt = function(e, t, n) {
          var o = c(e, t),
            a = new i(o, 0, o, r.default.size(t));
          e.session.replace(a, n);
        }),
        (t.replaceText = function(e, t) {
          var n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : 0,
            o = e.session.getLength() - 1,
            r = new i(o, n, o, Number.MAX_VALUE);
          e.session.replace(r, t);
        })),
        x = ((t.printOutputs = function(e) {
          var t = e.editor,
            n = e.lastPrompt,
            o = e.prompt,
            i = e.getOutputLabel,
            a = e.languageConfig,
            u = e.outputs,
            s = e.incrementPromptCount,
            l = function(e) {
              var t = r.default.trimEnd(e.payload);
              switch (e.type) {
                case "code":
                  var n = o() + t;
                  return s(), n;
                case "result":
                  return i() + t;
                default:
                  return t;
              }
            };
          return r.default.map(u, function(e) {
            return (
              "lock-console" === e.type
                ? t.setReadOnly(!0)
                : "unlock-console" === e.type && t.setReadOnly(!1),
              C({
                editor: t,
                text: l(e),
                token: e.type,
                lastPrompt: n,
                prompt: o,
                languageConfig: a,
              })
            );
          });
        }),
        (t.removeBindingKeys = function(e) {
          e.commands.bindKeys({
            "ctrl-h": null,
            "ctrl-j": null,
            "ctrl-k": null,
            "ctrl-s": null,
            "ctrl-r": null,
            "ctrl-o": null,
          });
        })),
        y = function(e) {
          e.commands.removeCommand("findnext"),
            e.commands.removeCommand("findprevious"),
            e.commands.removeCommand("find"),
            e.commands.removeCommand("replace"),
            e.commands.removeCommand("togglecomment"),
            e.commands.removeCommand("foldall"),
            e.commands.removeCommand("unfoldall"),
            e.commands.removeCommand("touppercase"),
            e.commands.removeCommand("tolowercase"),
            e.commands.removeCommand("key_up"),
            e.commands.removeCommand("key_down"),
            e.commands.removeCommand("return_key"),
            e.commands.removeCommand("gotoline"),
            e.commands.removeCommand("select-line"),
            x(e);
        };
      t.bindEditorKeys = function(e) {
        var t = e.editor,
          n = e.consoleHistory,
          o = e.prompt,
          r = e.clearConsole,
          a = e.languageConfig,
          s = e.canExecuteCommand,
          l = e.executeCommand,
          d = e.ctrlC,
          C = u(a().breakLine),
          x = function(e) {
            if (e) {
              var n = { text: e },
                r = c(t, o());
              p(t, r, o), C(n), v(t, o() + n.text);
            }
          },
          b = function() {
            return f(t, o(), a().breakLine);
          };
        y(t),
          t.commands.addCommand({
            name: "key_up",
            bindKey: { win: "Up", mac: "Up" },
            exec: function() {
              x(n.increment(b()));
            },
            readOnly: !0,
          }),
          t.commands.addCommand({
            name: "key_down",
            bindKey: { win: "Down", mac: "Down" },
            exec: function() {
              var e = b(),
                r = c(t, o());
              p(t, r, o), x(n.decrement(e));
            },
            readOnly: !0,
          }),
          t.commands.addCommand({
            name: "return_key",
            bindKey: { win: "Return", mac: "Return" },
            exec: function() {
              if (s()) {
                var e = b();
                e && (n.add(e), n.resetIndex(), l(e)), h(t, o, a());
              }
            },
            readOnly: !0,
          }),
          t.commands.addCommand({
            name: "break_line",
            bindKey: { win: "Shift-Return", mac: "Shift-Return" },
            exec: function() {
              var e = t.getCursorPosition(),
                n = m(t).slice(e.column);
              v(t, "", e.column);
              var o = g(t, "\n" + a().breakLine + n);
              t.gotoLine(o.end.row, o.end.column - n.length);
            },
            readOnly: !0,
          }),
          t.commands.addCommand({
            name: "gotoline",
            bindKey: { win: "Ctrl-L", mac: "Command-L|Ctrl-L" },
            exec: r,
            readOnly: !0,
          }),
          t.commands.addCommand({
            name: "stop_bokeh",
            bindKey: "Ctrl-C",
            exec: d,
            readOnly: !0,
          }),
          t.commands.addCommand({
            name: "select-line",
            bindKey: { win: "Ctrl-A", mac: "Command-A" },
            exec: function() {
              var e = t.getCursorPosition(),
                n = m(t);
              t.session.getLength() - 1 === e.row &&
                t.selection.setRange(new i(e.row, o().length, e.row, n.length));
            },
            readOnly: !0,
          });
      };
    },
    function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var o = (t.TOKEN = {
          ERROR: "error",
          OUTPUT: "output",
          RESULT: "result",
          MESSAGE: "message",
        }),
        r = (t.convertToken = function(e) {
          switch (e) {
            case "code":
              return o.MESSAGE;
            case "lock-console":
            case "unlock-console":
            case "script-output":
            case "result":
            case "output":
              return o.OUTPUT;
            case "r-message":
            case "r-warning":
            case "parse-error":
            case "r-error":
            case "backend-error":
            case "error":
              return o.ERROR;
            default:
              return "identifier";
          }
        });
      t.default = function(e, t, n) {
        var o = e.session.bgTokenizer;
        o.$tokenizeRow = function(o) {
          for (
            var i = [],
              a = e.session.getLine(o),
              u = t() || [],
              s = null,
              l = null,
              c = u.length - 1;
            c >= 0;
            c -= 1
          )
            if (((l = u[c]), l.contains(o + 1, a.length))) {
              s = l;
              break;
            }
          var p = n(),
            m = p.promptRegex || new RegExp("^" + p.prompt(1), "i"),
            d = a.match(m);
          return (
            d &&
              (i.push({ type: p.promptToken, value: d[0] }),
              (a = a.substring(d[0].length, a.length))),
            i.push({ type: r(s ? s.token : null), value: a }),
            i
          );
        };
        var i = function() {};
        (o.$updateOnChange = i), (o.start = i);
      };
    },
    function(e, t, n) {
      "use strict";
      function o(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r = (function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var o = t[n];
              (o.enumerable = o.enumerable || !1),
                (o.configurable = !0),
                "value" in o && (o.writable = !0),
                Object.defineProperty(e, o.key, o);
            }
          }
          return function(t, n, o) {
            return n && e(t.prototype, n), o && e(t, o), t;
          };
        })(),
        i = (function() {
          function e() {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : [];
            o(this, e),
              (this.history = t),
              this.resetIndex(),
              (this.commandBeforeHistoryAction = "");
          }
          return (
            r(e, [
              {
                key: "resetIndex",
                value: function() {
                  this.index = -1;
                },
              },
              {
                key: "add",
                value: function(e) {
                  e !== this.history[0] && e && this.history.unshift(e);
                },
              },
              {
                key: "get",
                value: function(e) {
                  return this.history[e] || "";
                },
              },
              {
                key: "increment",
                value: function() {
                  var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : "";
                  return (
                    -1 === this.index && (this.commandBeforeHistoryAction = e),
                    this.index === this.history.length - 1
                      ? this.get(this.index)
                      : this.get(++this.index)
                  );
                },
              },
              {
                key: "decrement",
                value: function() {
                  var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : "";
                  return -1 === this.index
                    ? e
                    : 0 === this.index
                      ? ((this.index = -1), this.commandBeforeHistoryAction)
                      : this.get(--this.index);
                },
              },
              {
                key: "clear",
                value: function() {
                  (this.history = []), this.resetIndex();
                },
              },
            ]),
            e
          );
        })();
      (t.default = i), (e.exports = t.default);
    },
    function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.replaceHexToString = t.convertHexToString = void 0);
      var o = n(0),
        r = (function(e) {
          return e && e.__esModule ? e : { default: e };
        })(o);
      (t.convertHexToString = function(e) {
        var t = r.default.attempt(function() {
          for (
            var t = e.match(/[\s\S]{2}/g) || [], n = "", o = 0, r = t.length;
            o < r;
            o += 1
          )
            n += "%" + (String("0") + t[o]).slice(-2);
          return (n = decodeURIComponent(n));
        });
        return r.default.isError(t) ? "" : t;
      }),
        (t.replaceHexToString = function(e) {
          return e && e.split
            ? e
                .split("\n")
                .map(function(e) {
                  return e.replace(/<U\+([0-9a-fA-F]+)>+/g, function(e, t) {
                    var n = r.default.parseInt(t, 16),
                      o = String.fromCodePoint(n);
                    return r.default.isNaN(n) || "\0" === o ? e : o;
                  });
                })
                .join("\n")
            : e;
        });
    },
    function(e, t) {
      e.exports = { console: "Console-module__console--I4oMQ" };
    },
  ]);
});
