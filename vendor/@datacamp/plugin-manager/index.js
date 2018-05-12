!(function(e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
      ? define([], t)
      : "object" == typeof exports
        ? (exports.PluginManager = t())
        : (e.PluginManager = t());
})(this, function() {
  return (function(e) {
    function t(r) {
      if (n[r]) return n[r].exports;
      var i = (n[r] = { exports: {}, id: r, loaded: !1 });
      return e[r].call(i.exports, i, i.exports, t), (i.loaded = !0), i.exports;
    }
    var n = {};
    return (t.m = e), (t.c = n), (t.p = ""), t(0);
  })([
    function(e, t, n) {
      "use strict";
      function r(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function i(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      function u(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function o(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      }
      function s(e, t) {
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
        (t.PLUGIN_NAME = void 0);
      var a = (function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        c = n(1),
        l = r(c),
        f = (function(e) {
          function t() {
            u(this, t);
            var e = o(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).call(this)
            );
            return (e.plugins = {}), e;
          }
          return (
            s(t, e),
            a(t, [
              {
                key: "subscribeToPlugin",
                value: function(e, t) {
                  var n = this;
                  return t.subscribe(function(t) {
                    return n.setState(i({}, e, t));
                  });
                },
              },
              {
                key: "register",
                value: function(e, t) {
                  if (this.plugins[e]) return this.plugins[e].instance;
                  for (
                    var n = arguments.length,
                      r = Array(n > 2 ? n - 2 : 0),
                      i = 2;
                    i < n;
                    i++
                  )
                    r[i - 2] = arguments[i];
                  var u = new (Function.prototype.bind.apply(
                      t,
                      [null].concat(r)
                    ))(),
                    o = this.subscribeToPlugin(e, u);
                  return (this.plugins[e] = { instance: u, unsubscribe: o }), u;
                },
              },
              {
                key: "remove",
                value: function(e) {
                  var t = this.plugins[e];
                  return !!t && (t.unsubscribe(), delete this.plugins[e], !0);
                },
              },
              {
                key: "get",
                value: function(e) {
                  return (this.plugins[e] && this.plugins[e].instance) || null;
                },
              },
              {
                key: "checkValidPlugin",
                value: function(e) {
                  if (
                    !Object.prototype.isPrototypeOf.call(l.default, e) &&
                    e !== l.default
                  )
                    throw new TypeError(
                      e.name + " is not a subclass of " + l.default.name
                    );
                },
              },
            ]),
            t
          );
        })(l.default);
      t.PLUGIN_NAME = "PluginManager";
      t.default = f;
    },
    function(e, t, n) {
      !(function(t, n) {
        e.exports = n();
      })(this, function() {
        return (function(e) {
          function t(r) {
            if (n[r]) return n[r].exports;
            var i = (n[r] = { exports: {}, id: r, loaded: !1 });
            return (
              e[r].call(i.exports, i, i.exports, t), (i.loaded = !0), i.exports
            );
          }
          var n = {};
          return (t.m = e), (t.c = n), (t.p = ""), t(0);
        })([
          function(e, t) {
            "use strict";
            function n(e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            }
            Object.defineProperty(t, "__esModule", { value: !0 });
            var r =
                Object.assign ||
                function(e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n)
                      Object.prototype.hasOwnProperty.call(n, r) &&
                        (e[r] = n[r]);
                  }
                  return e;
                },
              i = (function() {
                function e(e, t) {
                  for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    (r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      "value" in r && (r.writable = !0),
                      Object.defineProperty(e, r.key, r);
                  }
                }
                return function(t, n, r) {
                  return n && e(t.prototype, n), r && e(t, r), t;
                };
              })(),
              u = (function() {
                function e() {
                  n(this, e),
                    (this.state = {}),
                    (this.subscriberCount = 0),
                    (this.subscribers = {});
                }
                return (
                  i(e, [
                    {
                      key: "subscribe",
                      value: function(e) {
                        var t = this,
                          n = ++this.subscriberCount;
                        return (
                          e(this.state),
                          (this.subscribers[n] = e),
                          function() {
                            return delete t.subscribers[n];
                          }
                        );
                      },
                    },
                    {
                      key: "getState",
                      value: function() {
                        return this.state;
                      },
                    },
                    {
                      key: "mergeNewState",
                      value: function(e) {
                        return r({}, this.state, e);
                      },
                    },
                    {
                      key: "setState",
                      value: function(e) {
                        this.state = this.mergeNewState(e);
                        for (var t in this.subscribers)
                          this.subscribers[t](this.state);
                      },
                    },
                  ]),
                  e
                );
              })();
            (t.PLUGIN_NAME = "Plugin"), (t.default = u);
          },
        ]);
      });
    },
  ]);
});
