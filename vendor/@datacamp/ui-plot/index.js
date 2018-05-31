"use strict";
var global$1 =
  "undefined" == typeof global
    ? "undefined" == typeof self
      ? "undefined" == typeof window ? {} : window
      : self
    : global;
function Item(e, t) {
  (this.fun = e), (this.array = t);
}
Item.prototype.run = function() {
  this.fun.apply(null, this.array);
};
var commonjsGlobal =
  "undefined" == typeof window
    ? "undefined" == typeof global
      ? "undefined" == typeof self ? {} : self
      : global
    : window;
function createCommonjsModule(e, t) {
  return (t = { exports: {} }), e(t, t.exports), t.exports;
}
var getOwnPropertySymbols = Object.getOwnPropertySymbols,
  hasOwnProperty = Object.prototype.hasOwnProperty,
  propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(e) {
  if (null === e || e === void 0)
    throw new TypeError(
      "Object.assign cannot be called with null or undefined"
    );
  return Object(e);
}
function shouldUseNative() {
  try {
    if (!Object.assign) return !1;
    var e = new String("abc");
    if (((e[5] = "de"), "5" === Object.getOwnPropertyNames(e)[0])) return !1;
    for (var t = {}, r = 0; 10 > r; r++) t["_" + String.fromCharCode(r)] = r;
    var n = Object.getOwnPropertyNames(t).map(function(e) {
      return t[e];
    });
    if ("0123456789" !== n.join("")) return !1;
    var o = {};
    return (
      [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
      ].forEach(function(e) {
        o[e] = e;
      }),
      "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, o)).join("")
    );
  } catch (e) {
    return !1;
  }
}
var objectAssign = shouldUseNative()
  ? Object.assign
  : function(e) {
      for (var t, r, n = toObject(e), o = 1; o < arguments.length; o++) {
        for (var a in ((t = Object(arguments[o])), t))
          hasOwnProperty.call(t, a) && (n[a] = t[a]);
        if (getOwnPropertySymbols) {
          r = getOwnPropertySymbols(t);
          for (var s = 0; s < r.length; s++)
            propIsEnumerable.call(t, r[s]) && (n[r[s]] = t[r[s]]);
        }
      }
      return n;
    };
var emptyObject = {};
Object.freeze(emptyObject);
var emptyObject_1 = emptyObject;
function makeEmptyFunction(e) {
  return function() {
    return e;
  };
}
var emptyFunction = function() {};
(emptyFunction.thatReturns = makeEmptyFunction),
  (emptyFunction.thatReturnsFalse = makeEmptyFunction(!1)),
  (emptyFunction.thatReturnsTrue = makeEmptyFunction(!0)),
  (emptyFunction.thatReturnsNull = makeEmptyFunction(null)),
  (emptyFunction.thatReturnsThis = function() {
    return this;
  }),
  (emptyFunction.thatReturnsArgument = function(e) {
    return e;
  });
var emptyFunction_1 = emptyFunction;
var q = "function" == typeof Symbol && Symbol["for"],
  r = q ? Symbol["for"]("react.element") : 60103,
  t = q ? Symbol["for"]("react.call") : 60104,
  u = q ? Symbol["for"]("react.return") : 60105,
  v = q ? Symbol["for"]("react.portal") : 60106,
  w = q ? Symbol["for"]("react.fragment") : 60107,
  x = "function" == typeof Symbol && Symbol.iterator;
function y(t) {
  for (
    var r = arguments.length - 1,
      n =
        "Minified React error #" +
        t +
        "; visit http://facebook.github.io/react/docs/error-decoder.html?invariant=" +
        t,
      e = 0;
    e < r;
    e++
  )
    n += "&args[]=" + encodeURIComponent(arguments[e + 1]);
  throw ((r = Error(
    n +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  )),
  (r.name = "Invariant Violation"),
  (r.framesToPop = 1),
  r);
}
var z = {
  isMounted: function() {
    return !1;
  },
  enqueueForceUpdate: function() {},
  enqueueReplaceState: function() {},
  enqueueSetState: function() {},
};
function A(t, r, n) {
  (this.props = t),
    (this.context = r),
    (this.refs = emptyObject_1),
    (this.updater = n || z);
}
(A.prototype.isReactComponent = {}),
  (A.prototype.setState = function(e, t) {
    "object" != typeof e && "function" != typeof e && null != e
      ? y("85")
      : void 0,
      this.updater.enqueueSetState(this, e, t, "setState");
  }),
  (A.prototype.forceUpdate = function(e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate");
  });
function B(t, r, n) {
  (this.props = t),
    (this.context = r),
    (this.refs = emptyObject_1),
    (this.updater = n || z);
}
function C() {}
C.prototype = A.prototype;
var D = (B.prototype = new C());
(D.constructor = B),
  objectAssign(D, A.prototype),
  (D.isPureReactComponent = !0);
function E(t, r, n) {
  (this.props = t),
    (this.context = r),
    (this.refs = emptyObject_1),
    (this.updater = n || z);
}
var F = (E.prototype = new C());
(F.constructor = E),
  objectAssign(F, A.prototype),
  (F.unstable_isAsyncReactComponent = !0),
  (F.render = function() {
    return this.props.children;
  });
var G = { current: null },
  H = Object.prototype.hasOwnProperty,
  I = { key: !0, ref: !0, __self: !0, __source: !0 };
function J(t, n, o) {
  var e,
    i = {},
    s = null,
    c = null;
  if (null != n)
    for (e in (void 0 !== n.ref && (c = n.ref),
    void 0 !== n.key && (s = "" + n.key),
    n))
      H.call(n, e) && !I.hasOwnProperty(e) && (i[e] = n[e]);
  var p = arguments.length - 2;
  if (1 == p) i.children = o;
  else if (1 < p) {
    for (var u = Array(p), f = 0; f < p; f++) u[f] = arguments[f + 2];
    i.children = u;
  }
  if (t && t.defaultProps)
    for (e in ((p = t.defaultProps), p)) void 0 === i[e] && (i[e] = p[e]);
  return { $$typeof: r, type: t, key: s, ref: c, props: i, _owner: G.current };
}
function K(e) {
  return "object" == typeof e && null !== e && e.$$typeof === r;
}
function escape$1(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    ("" + e).replace(/[=:]/g, function(e) {
      return t[e];
    })
  );
}
var L = /\/+/g,
  M = [];
function N(t, r, n, o) {
  if (M.length) {
    var i = M.pop();
    return (
      (i.result = t),
      (i.keyPrefix = r),
      (i.func = n),
      (i.context = o),
      (i.count = 0),
      i
    );
  }
  return { result: t, keyPrefix: r, func: n, context: o, count: 0 };
}
function O(e) {
  (e.result = null),
    (e.keyPrefix = null),
    (e.func = null),
    (e.context = null),
    (e.count = 0),
    10 > M.length && M.push(e);
}
function P(n, o, i, e) {
  var s = typeof n;
  ("undefined" == s || "boolean" == s) && (n = null);
  var c = !1;
  if (null === n) c = !0;
  else
    switch (s) {
      case "string":
      case "number":
        c = !0;
        break;
      case "object":
        switch (n.$$typeof) {
          case r:
          case t:
          case u:
          case v:
            c = !0;
        }
    }
  if (c) return i(e, n, "" === o ? "." + Q(n, 0) : o), 1;
  if (((c = 0), (o = "" === o ? "." : o + ":"), Array.isArray(n)))
    for (var l = 0; l < n.length; l++) {
      s = n[l];
      var p = o + Q(s, l);
      c += P(s, p, i, e);
    }
  else if (
    (null === n || "undefined" == typeof n
      ? (p = null)
      : ((p = (x && n[x]) || n["@@iterator"]),
        (p = "function" == typeof p ? p : null)),
    "function" == typeof p)
  )
    for (n = p.call(n), l = 0; !(s = n.next()).done; )
      (s = s.value), (p = o + Q(s, l++)), (c += P(s, p, i, e));
  else
    "object" === s &&
      ((i = "" + n),
      y(
        "31",
        "[object Object]" === i
          ? "object with keys {" + Object.keys(n).join(", ") + "}"
          : i,
        ""
      ));
  return c;
}
function Q(e, t) {
  return "object" == typeof e && null !== e && null != e.key
    ? escape$1(e.key)
    : t.toString(36);
}
function R(e, t) {
  e.func.call(e.context, t, e.count++);
}
function S(t, n, o) {
  var e = t.result,
    i = t.keyPrefix;
  (t = t.func.call(t.context, n, t.count++)),
    Array.isArray(t)
      ? T(t, e, o, emptyFunction_1.thatReturnsArgument)
      : null != t &&
        (K(t) &&
          ((n =
            i +
            (!t.key || (n && n.key === t.key)
              ? ""
              : ("" + t.key).replace(L, "$&/") + "/") +
            o),
          (t = {
            $$typeof: r,
            type: t.type,
            key: n,
            ref: t.ref,
            props: t.props,
            _owner: t._owner,
          })),
        e.push(t));
}
function T(t, r, n, e, o) {
  var i = "";
  null != n && (i = ("" + n).replace(L, "$&/") + "/"),
    (r = N(r, i, e, o)),
    null == t || P(t, "", S, r),
    O(r);
}
var U = {
    Children: {
      map: function(t, r, n) {
        if (null == t) return t;
        var e = [];
        return T(t, e, null, r, n), e;
      },
      forEach: function(t, r, n) {
        return null == t
          ? t
          : void ((r = N(null, null, r, n)), null == t || P(t, "", R, r), O(r));
      },
      count: function(e) {
        return null == e ? 0 : P(e, "", emptyFunction_1.thatReturnsNull, null);
      },
      toArray: function(e) {
        var t = [];
        return T(e, t, null, emptyFunction_1.thatReturnsArgument), t;
      },
      only: function(e) {
        return K(e) ? void 0 : y("143"), e;
      },
    },
    Component: A,
    PureComponent: B,
    unstable_AsyncComponent: E,
    Fragment: w,
    createElement: J,
    cloneElement: function(t, n, o) {
      var e = objectAssign({}, t.props),
        i = t.key,
        a = t.ref,
        s = t._owner;
      if (null != n) {
        if (
          (void 0 !== n.ref && ((a = n.ref), (s = G.current)),
          void 0 !== n.key && (i = "" + n.key),
          t.type && t.type.defaultProps)
        )
          var p = t.type.defaultProps;
        for (u in n)
          H.call(n, u) &&
            !I.hasOwnProperty(u) &&
            (e[u] = void 0 === n[u] && void 0 !== p ? p[u] : n[u]);
      }
      var u = arguments.length - 2;
      if (1 === u) e.children = o;
      else if (1 < u) {
        p = Array(u);
        for (var f = 0; f < u; f++) p[f] = arguments[f + 2];
        e.children = p;
      }
      return { $$typeof: r, type: t.type, key: i, ref: a, props: e, _owner: s };
    },
    createFactory: function(e) {
      var t = J.bind(null, e);
      return (t.type = e), t;
    },
    isValidElement: K,
    version: "16.2.0",
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
      ReactCurrentOwner: G,
      assign: objectAssign,
    },
  },
  V = Object.freeze({ default: U });
var validateFormat = function() {};
validateFormat = function(e) {
  if (e === void 0)
    throw new Error("invariant requires an error message argument");
};
function invariant(t, r, n, o, i, a, s, e) {
  if ((validateFormat(r), !t)) {
    var c;
    if (void 0 === r)
      c = new Error(
        "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
      );
    else {
      var l = [n, o, i, a, s, e],
        p = 0;
      (c = new Error(
        r.replace(/%s/g, function() {
          return l[p++];
        })
      )),
        (c.name = "Invariant Violation");
    }
    throw ((c.framesToPop = 1), c);
  }
}
var invariant_1 = invariant;
var warning = emptyFunction_1;
{
  var printWarning = function(e) {
    for (
      var t = arguments.length, r = Array(1 < t ? t - 1 : 0), n = 1;
      n < t;
      n++
    )
      r[n - 1] = arguments[n];
    var o = 0,
      i =
        "Warning: " +
        e.replace(/%s/g, function() {
          return r[o++];
        });
    "undefined" != typeof console && console.error(i);
    try {
      throw new Error(i);
    } catch (e) {}
  };
  warning = function(e, t) {
    if (t === void 0)
      throw new Error(
        "`warning(condition, format, ...args)` requires a warning message argument"
      );
    if (0 !== t.indexOf("Failed Composite propType: ") && !e) {
      for (
        var r = arguments.length, n = Array(2 < r ? r - 2 : 0), o = 2;
        o < r;
        o++
      )
        n[o - 2] = arguments[o];
      printWarning.apply(void 0, [t].concat(n));
    }
  };
}
var warning_1 = warning;
var ReactPropTypesSecret$1 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
  ReactPropTypesSecret_1 = ReactPropTypesSecret$1;
var invariant$1 = invariant_1,
  warning$1 = warning_1,
  ReactPropTypesSecret = ReactPropTypesSecret_1,
  loggedTypeFailures = {};
function checkPropTypes(e, t, r, n, o) {
  for (var i in e)
    if (e.hasOwnProperty(i)) {
      var a;
      try {
        invariant$1(
          "function" == typeof e[i],
          "%s: %s type `%s` is invalid; it must be a function, usually from the `prop-types` package, but received `%s`.",
          n || "React class",
          r,
          i,
          typeof e[i]
        ),
          (a = e[i](t, i, n, r, null, ReactPropTypesSecret));
      } catch (e) {
        a = e;
      }
      if (
        (warning$1(
          !a || a instanceof Error,
          "%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",
          n || "React class",
          r,
          i,
          typeof a
        ),
        a instanceof Error && !(a.message in loggedTypeFailures))
      ) {
        loggedTypeFailures[a.message] = !0;
        var s = o ? o() : "";
        warning$1(!1, "Failed %s type: %s%s", r, a.message, null == s ? "" : s);
      }
    }
}
var checkPropTypes_1 = checkPropTypes,
  react_development = createCommonjsModule(function(e) {
    "use strict";
    (function() {
      function t(e) {
        if (null === e || "undefined" == typeof e) return null;
        var t = (W && e[W]) || e[H];
        return "function" == typeof t ? t : null;
      }
      function r(e, t) {
        {
          var r = e.constructor,
            n = (r && (r.displayName || r.name)) || "ReactClass",
            o = n + "." + t;
          if (Q[o]) return;
          U(
            !1,
            "%s(...): Can only update a mounted or mounting component. This usually means you called %s() on an unmounted component. This is a no-op.\n\nPlease check the code for the %s component.",
            t,
            t,
            n
          ),
            (Q[o] = !0);
        }
      }
      function n(e, t, r) {
        (this.props = e),
          (this.context = t),
          (this.refs = z),
          (this.updater = r || G);
      }
      function o(e, t, r) {
        (this.props = e),
          (this.context = t),
          (this.refs = z),
          (this.updater = r || G);
      }
      function i() {}
      function a(e, t, r) {
        (this.props = e),
          (this.context = t),
          (this.refs = z),
          (this.updater = r || G);
      }
      function s(e) {
        if (se.call(e, "ref")) {
          var t = Object.getOwnPropertyDescriptor(e, "ref").get;
          if (t && t.isReactWarning) return !1;
        }
        return e.ref !== void 0;
      }
      function c(e) {
        if (se.call(e, "key")) {
          var t = Object.getOwnPropertyDescriptor(e, "key").get;
          if (t && t.isReactWarning) return !1;
        }
        return e.key !== void 0;
      }
      function l(e, t) {
        var r = function() {
          oe ||
            ((oe = !0),
            U(
              !1,
              "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://fb.me/react-special-props)",
              t
            ));
        };
        (r.isReactWarning = !0),
          Object.defineProperty(e, "key", { get: r, configurable: !0 });
      }
      function p(e, t) {
        var r = function() {
          ie ||
            ((ie = !0),
            U(
              !1,
              "%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://fb.me/react-special-props)",
              t
            ));
        };
        (r.isReactWarning = !0),
          Object.defineProperty(e, "ref", { get: r, configurable: !0 });
      }
      function d(e, t, r) {
        var n,
          o = {},
          a = null,
          d = null,
          u = null,
          f = null;
        if (null != t)
          for (n in (s(t) && (d = t.ref),
          c(t) && (a = "" + t.key),
          (u = void 0 === t.__self ? null : t.__self),
          (f = void 0 === t.__source ? null : t.__source),
          t))
            se.call(t, n) && !ce.hasOwnProperty(n) && (o[n] = t[n]);
        var m = arguments.length - 2;
        if (1 == m) o.children = r;
        else if (1 < m) {
          for (var y = Array(m), b = 0; b < m; b++) y[b] = arguments[b + 2];
          Object.freeze && Object.freeze(y), (o.children = y);
        }
        if (e && e.defaultProps) {
          var i = e.defaultProps;
          for (n in i) void 0 === o[n] && (o[n] = i[n]);
        }
        if (
          (a || d) &&
          ("undefined" == typeof o.$$typeof || o.$$typeof !== $)
        ) {
          var h =
            "function" == typeof e ? e.displayName || e.name || "Unknown" : e;
          a && l(o, h), d && p(o, h);
        }
        return le(e, a, d, u, f, ae.current, o);
      }
      function u(e, t) {
        var r = le(e.type, t, e.ref, e._self, e._source, e._owner, e.props);
        return r;
      }
      function f(e, t, r) {
        var n,
          o = j({}, e.props),
          a = e.key,
          l = e.ref,
          p = e._self,
          d = e._source,
          u = e._owner;
        if (null != t) {
          s(t) && ((l = t.ref), (u = ae.current)), c(t) && (a = "" + t.key);
          var f;
          for (n in (e.type && e.type.defaultProps && (f = e.type.defaultProps),
          t))
            se.call(t, n) &&
              !ce.hasOwnProperty(n) &&
              (o[n] = void 0 === t[n] && void 0 !== f ? f[n] : t[n]);
        }
        var m = arguments.length - 2;
        if (1 == m) o.children = r;
        else if (1 < m) {
          for (var y = Array(m), b = 0; b < m; b++) y[b] = arguments[b + 2];
          o.children = y;
        }
        return le(e.type, a, l, p, d, u, o);
      }
      function m(e) {
        return "object" == typeof e && null !== e && e.$$typeof === $;
      }
      function y(e) {
        var t = /[=:]/g,
          r = { "=": "=0", ":": "=2" },
          n = ("" + e).replace(t, function(e) {
            return r[e];
          });
        return "$" + n;
      }
      function b(e) {
        return ("" + e).replace(me, "$&/");
      }
      function h(e, t, r, n) {
        if (be.length) {
          var o = be.pop();
          return (
            (o.result = e),
            (o.keyPrefix = t),
            (o.func = r),
            (o.context = n),
            (o.count = 0),
            o
          );
        }
        return { result: e, keyPrefix: t, func: r, context: n, count: 0 };
      }
      function g(e) {
        (e.result = null),
          (e.keyPrefix = null),
          (e.func = null),
          (e.context = null),
          (e.count = 0),
          be.length < ye && be.push(e);
      }
      function x(e, r, n, o) {
        var a = typeof e;
        ("undefined" == a || "boolean" == a) && (e = null);
        var s = !1;
        if (null === e) s = !0;
        else
          switch (a) {
            case "string":
            case "number":
              s = !0;
              break;
            case "object":
              switch (e.$$typeof) {
                case $:
                case q:
                case V:
                case B:
                  s = !0;
              }
          }
        if (s) return n(o, e, "" === r ? de + _(e, 0) : r), 1;
        var c,
          l,
          p = 0,
          d = "" === r ? de : r + ue;
        if (Array.isArray(e))
          for (var u = 0; u < e.length; u++)
            (c = e[u]), (l = d + _(c, u)), (p += x(c, l, n, o));
        else {
          var i = t(e);
          if ("function" == typeof i) {
            i === e.entries &&
              (U(
                fe,
                "Using Maps as children is unsupported and will likely yield unexpected results. Convert it to a sequence/iterable of keyed ReactElements instead.%s",
                pe.getStackAddendum()
              ),
              (fe = !0));
            for (var f, m = i.call(e), y = 0; !(f = m.next()).done; )
              (c = f.value), (l = d + _(c, y++)), (p += x(c, l, n, o));
          } else if ("object" == a) {
            var b = "";
            b =
              " If you meant to render a collection of children, use an array instead." +
              pe.getStackAddendum();
            var h = "" + e;
            M(
              !1,
              "Objects are not valid as a React child (found: %s).%s",
              "[object Object]" == h
                ? "object with keys {" + Object.keys(e).join(", ") + "}"
                : h,
              b
            );
          }
        }
        return p;
      }
      function w(e, t, r) {
        return null == e ? 0 : x(e, "", t, r);
      }
      function _(e, t) {
        return "object" == typeof e && null !== e && null != e.key
          ? y(e.key)
          : t.toString(36);
      }
      function v(e, t) {
        var r = e.func,
          n = e.context;
        r.call(n, t, e.count++);
      }
      function k(e, t, r) {
        var n = e.result,
          o = e.keyPrefix,
          i = e.func,
          a = e.context,
          s = i.call(a, t, e.count++);
        Array.isArray(s)
          ? S(s, n, r, L.thatReturnsArgument)
          : null != s &&
            (m(s) &&
              (s = u(
                s,
                o + (s.key && (!t || t.key !== s.key) ? b(s.key) + "/" : "") + r
              )),
            n.push(s));
      }
      function S(e, t, r, n, o) {
        var i = "";
        null != r && (i = b(r) + "/");
        var a = h(t, i, n, o);
        w(e, k, a), g(a);
      }
      function E(e) {
        var t = e.type;
        return "string" == typeof t
          ? t
          : "function" == typeof t ? t.displayName || t.name : null;
      }
      function O() {
        if (ae.current) {
          var e = E(ae.current);
          if (e) return "\n\nCheck the render method of `" + e + "`.";
        }
        return "";
      }
      function A(e) {
        if (null !== e && e !== void 0 && e.__source !== void 0) {
          var t = e.__source,
            r = t.fileName.replace(/^.*[\\\/]/, ""),
            n = t.lineNumber;
          return "\n\nCheck your code at " + r + ":" + n + ".";
        }
        return "";
      }
      function P(e) {
        var t = O();
        if (!t) {
          var r = "string" == typeof e ? e : e.displayName || e.name;
          r && (t = "\n\nCheck the top-level render call using <" + r + ">.");
        }
        return t;
      }
      function N(e, t) {
        if (e._store && !e._store.validated && null == e.key) {
          e._store.validated = !0;
          var r = P(t);
          if (!ke[r]) {
            ke[r] = !0;
            var n = "";
            e &&
              e._owner &&
              e._owner !== ae.current &&
              (n = " It was passed a child from " + E(e._owner) + "."),
              (ge = e),
              U(
                !1,
                'Each child in an array or iterator should have a unique "key" prop.%s%s See https://fb.me/react-warning-keys for more information.%s',
                r,
                n,
                _e()
              ),
              (ge = null);
          }
        }
      }
      function T(e, r) {
        if ("object" == typeof e)
          if (Array.isArray(e))
            for (var n, o = 0; o < e.length; o++) (n = e[o]), m(n) && N(n, r);
          else if (m(e)) e._store && (e._store.validated = !0);
          else if (e) {
            var i = t(e);
            if ("function" == typeof i && i !== e.entries)
              for (var a, s = i.call(e); !(a = s.next()).done; )
                m(a.value) && N(a.value, r);
          }
      }
      function I(e) {
        var t = e.type;
        if ("function" == typeof t) {
          var r = t.displayName || t.name,
            n = t.propTypes;
          n
            ? ((ge = e), F(n, e.props, "prop", r, _e), (ge = null))
            : void 0 !== t.PropTypes &&
              !xe &&
              ((xe = !0),
              U(
                !1,
                "Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",
                r || "Unknown"
              )),
            "function" == typeof t.getDefaultProps &&
              U(
                t.getDefaultProps.isReactClassApproved,
                "getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead."
              );
        }
      }
      function C(e) {
        ge = e;
        var t,
          r = !0,
          n = !1;
        try {
          for (
            var o, i, a = Object.keys(e.props)[Symbol.iterator]();
            !(r = (o = a.next()).done);
            r = !0
          )
            if (((i = o.value), !ve.has(i))) {
              U(
                !1,
                "Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s",
                i,
                _e()
              );
              break;
            }
        } catch (e) {
          (n = !0), (t = e);
        } finally {
          try {
            !r && a["return"] && a["return"]();
          } finally {
            if (n) throw t;
          }
        }
        null !== e.ref &&
          U(
            !1,
            "Invalid attribute `ref` supplied to `React.Fragment`.%s",
            _e()
          ),
          (ge = null);
      }
      function R(e, t) {
        var r =
          "string" == typeof e ||
          "function" == typeof e ||
          "symbol" == typeof e ||
          "number" == typeof e;
        if (!r) {
          var n = "";
          (void 0 === e ||
            ("object" == typeof e &&
              null !== e &&
              0 === Object.keys(e).length)) &&
            (n +=
              " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var o = A(t);
          (n += o ? o : O()),
            (n += _e() || ""),
            U(
              !1,
              "React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
              null == e ? e : typeof e,
              n
            );
        }
        var a = d.apply(this, arguments);
        if (null == a) return a;
        if (r) for (var s = 2; s < arguments.length; s++) T(arguments[s], e);
        return "symbol" == typeof e && e === Y ? C(a) : I(a), a;
      }
      var j = objectAssign,
        z = emptyObject_1,
        M = invariant_1,
        U = warning_1,
        L = emptyFunction_1,
        F = checkPropTypes_1,
        D = "function" == typeof Symbol && Symbol["for"],
        $ = D ? Symbol["for"]("react.element") : 60103,
        q = D ? Symbol["for"]("react.call") : 60104,
        V = D ? Symbol["for"]("react.return") : 60105,
        B = D ? Symbol["for"]("react.portal") : 60106,
        Y = D ? Symbol["for"]("react.fragment") : 60107,
        W = "function" == typeof Symbol && Symbol.iterator,
        H = "@@iterator",
        X = function() {};
      {
        var K = function(e) {
          for (
            var t = arguments.length, r = Array(1 < t ? t - 1 : 0), n = 1;
            n < t;
            n++
          )
            r[n - 1] = arguments[n];
          var o = 0,
            i =
              "Warning: " +
              e.replace(/%s/g, function() {
                return r[o++];
              });
          "undefined" != typeof console && console.warn(i);
          try {
            throw new Error(i);
          } catch (e) {}
        };
        X = function(e, t) {
          if (t === void 0)
            throw new Error(
              "`warning(condition, format, ...args)` requires a warning message argument"
            );
          if (!e) {
            for (
              var r = arguments.length, n = Array(2 < r ? r - 2 : 0), o = 2;
              o < r;
              o++
            )
              n[o - 2] = arguments[o];
            K.apply(void 0, [t].concat(n));
          }
        };
      }
      var J = X,
        Q = {},
        G = {
          isMounted: function() {
            return !1;
          },
          enqueueForceUpdate: function(e) {
            r(e, "forceUpdate");
          },
          enqueueReplaceState: function(e) {
            r(e, "replaceState");
          },
          enqueueSetState: function(e) {
            r(e, "setState");
          },
        };
      (n.prototype.isReactComponent = {}),
        (n.prototype.setState = function(e, t) {
          "object" == typeof e || "function" == typeof e || null == e
            ? void 0
            : M(
                !1,
                "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
              ),
            this.updater.enqueueSetState(this, e, t, "setState");
        }),
        (n.prototype.forceUpdate = function(e) {
          this.updater.enqueueForceUpdate(this, e, "forceUpdate");
        });
      {
        var Z = {
            isMounted: [
              "isMounted",
              "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks.",
            ],
            replaceState: [
              "replaceState",
              "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236).",
            ],
          },
          ee = function(e, t) {
            Object.defineProperty(n.prototype, e, {
              get: function() {
                J(
                  !1,
                  "%s(...) is deprecated in plain JavaScript React classes. %s",
                  t[0],
                  t[1]
                );
              },
            });
          };
        for (var te in Z) Z.hasOwnProperty(te) && ee(te, Z[te]);
      }
      i.prototype = n.prototype;
      var re = (o.prototype = new i());
      (re.constructor = o), j(re, n.prototype), (re.isPureReactComponent = !0);
      var ne = (a.prototype = new i());
      (ne.constructor = a),
        j(ne, n.prototype),
        (ne.unstable_isAsyncReactComponent = !0),
        (ne.render = function() {
          return this.props.children;
        });
      var oe,
        ie,
        ae = { current: null },
        se = Object.prototype.hasOwnProperty,
        ce = { key: !0, ref: !0, __self: !0, __source: !0 },
        le = function(e, t, r, n, o, i, a) {
          var s = { $$typeof: $, type: e, key: t, ref: r, props: a, _owner: i };
          return (
            (s._store = {}),
            Object.defineProperty(s._store, "validated", {
              configurable: !1,
              enumerable: !1,
              writable: !0,
              value: !1,
            }),
            Object.defineProperty(s, "_self", {
              configurable: !1,
              enumerable: !1,
              writable: !1,
              value: n,
            }),
            Object.defineProperty(s, "_source", {
              configurable: !1,
              enumerable: !1,
              writable: !1,
              value: o,
            }),
            Object.freeze && (Object.freeze(s.props), Object.freeze(s)),
            s
          );
        },
        pe = {};
      (pe.getCurrentStack = null),
        (pe.getStackAddendum = function() {
          var e = pe.getCurrentStack;
          return e ? e() : null;
        });
      var de = ".",
        ue = ":",
        fe = !1,
        me = /\/+/g,
        ye = 10,
        be = [],
        he = function(e, t, r) {
          return (
            "\n    in " +
            (e || "Unknown") +
            (t
              ? " (at " +
                t.fileName.replace(/^.*[\\\/]/, "") +
                ":" +
                t.lineNumber +
                ")"
              : r ? " (created by " + r + ")" : "")
          );
        };
      var ge = null,
        xe = !1,
        we = function(e) {
          return null == e
            ? "#empty"
            : "string" == typeof e || "number" == typeof e
              ? "#text"
              : "string" == typeof e.type
                ? e.type
                : e.type === Y
                  ? "React.Fragment"
                  : e.type.displayName || e.type.name || "Unknown";
        },
        _e = function() {
          var e = "";
          if (ge) {
            var t = we(ge),
              r = ge._owner;
            e += he(t, ge._source, r && E(r));
          }
          return (e += pe.getStackAddendum() || ""), e;
        },
        ve = new Map([["children", !0], ["key", !0]]),
        ke = {},
        Se = {
          Children: {
            map: function(e, t, r) {
              if (null == e) return e;
              var n = [];
              return S(e, n, null, t, r), n;
            },
            forEach: function(e, t, r) {
              if (null == e) return e;
              var n = h(null, null, t, r);
              w(e, v, n), g(n);
            },
            count: function(e) {
              return w(e, L.thatReturnsNull, null);
            },
            toArray: function(e) {
              var t = [];
              return S(e, t, null, L.thatReturnsArgument), t;
            },
            only: function(e) {
              return (
                m(e)
                  ? void 0
                  : M(
                      !1,
                      "React.Children.only expected to receive a single React element child."
                    ),
                e
              );
            },
          },
          Component: n,
          PureComponent: o,
          unstable_AsyncComponent: a,
          Fragment: Y,
          createElement: R,
          cloneElement: function() {
            for (
              var e = f.apply(this, arguments), t = 2;
              t < arguments.length;
              t++
            )
              T(arguments[t], e.type);
            return I(e), e;
          },
          createFactory: function(e) {
            var t = R.bind(null, e);
            return (
              (t.type = e),
              Object.defineProperty(t, "type", {
                enumerable: !1,
                get: function() {
                  return (
                    J(
                      !1,
                      "Factory.type is deprecated. Access the class directly before passing it to createFactory."
                    ),
                    Object.defineProperty(this, "type", { value: e }),
                    e
                  );
                },
              }),
              t
            );
          },
          isValidElement: m,
          version: "16.2.0",
          __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
            ReactCurrentOwner: ae,
            assign: j,
          },
        };
      j(Se.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
        ReactDebugCurrentFrame: pe,
        ReactComponentTreeHook: {},
      });
      var Ee = Object.freeze({ default: Se }),
        Oe = (Ee && Se) || Ee,
        Ae = Oe["default"] ? Oe["default"] : Oe;
      e.exports = Ae;
    })();
  }),
  react = createCommonjsModule(function(e) {
    "use strict";
    e.exports = react_development;
  });
var factoryWithTypeCheckers = function(e, t) {
  function r(e) {
    var t = e && ((f && e[f]) || e[m]);
    if ("function" == typeof t) return t;
  }
  function n(e, t) {
    return e === t ? 0 !== e || 1 / e == 1 / t : e !== e && t !== t;
  }
  function o(e) {
    (this.message = e), (this.stack = "");
  }
  function a(e) {
    function r(r, a, s, c, l, p, d) {
      if (((c = c || y), (p = p || s), d !== ReactPropTypesSecret_1))
        if (t)
          invariant_1(
            !1,
            "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
          );
        else if ("undefined" != typeof console) {
          var u = c + ":" + s;
          !n[u] &&
            3 > i &&
            (warning_1(
              !1,
              "You are manually calling a React.PropTypes validation function for the `%s` prop on `%s`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.",
              p,
              c
            ),
            (n[u] = !0),
            i++);
        }
      return null == a[s]
        ? r
          ? null === a[s]
            ? new o(
                "The " +
                  l +
                  " `" +
                  p +
                  "` is marked as required " +
                  ("in `" + c + "`, but its value is `null`.")
              )
            : new o(
                "The " +
                  l +
                  " `" +
                  p +
                  "` is marked as required in " +
                  ("`" + c + "`, but its value is `undefined`.")
              )
          : null
        : e(a, s, c, l, p);
    }
    var n = {},
      i = 0,
      a = r.bind(null, !1);
    return (a.isRequired = r.bind(null, !0)), a;
  }
  function i(e) {
    return a(function(t, r, n, i, a) {
      var s = t[r],
        c = l(s);
      if (c !== e) {
        var d = p(s);
        return new o(
          "Invalid " +
            i +
            " `" +
            a +
            "` of type " +
            ("`" + d + "` supplied to `" + n + "`, expected ") +
            ("`" + e + "`.")
        );
      }
      return null;
    });
  }
  function s(t) {
    switch (typeof t) {
      case "number":
      case "string":
      case "undefined":
        return !0;
      case "boolean":
        return !t;
      case "object":
        if (Array.isArray(t)) return t.every(s);
        if (null === t || e(t)) return !0;
        var n = r(t);
        if (n) {
          var o,
            i = n.call(t);
          if (n !== t.entries) {
            for (; !(o = i.next()).done; ) if (!s(o.value)) return !1;
          } else
            for (; !(o = i.next()).done; ) {
              var a = o.value;
              if (a && !s(a[1])) return !1;
            }
        } else return !1;
        return !0;
      default:
        return !1;
    }
  }
  function c(e, t) {
    return (
      "symbol" === e ||
      "Symbol" === t["@@toStringTag"] ||
      ("function" == typeof Symbol && t instanceof Symbol)
    );
  }
  function l(e) {
    var t = typeof e;
    return Array.isArray(e)
      ? "array"
      : e instanceof RegExp ? "object" : c(t, e) ? "symbol" : t;
  }
  function p(e) {
    if ("undefined" == typeof e || null === e) return "" + e;
    var t = l(e);
    if ("object" === t) {
      if (e instanceof Date) return "date";
      if (e instanceof RegExp) return "regexp";
    }
    return t;
  }
  function d(e) {
    var t = p(e);
    return "array" === t || "object" === t
      ? "an " + t
      : "boolean" === t || "date" === t || "regexp" === t ? "a " + t : t;
  }
  function u(e) {
    return e.constructor && e.constructor.name ? e.constructor.name : y;
  }
  var f = "function" == typeof Symbol && Symbol.iterator,
    m = "@@iterator",
    y = "<<anonymous>>",
    b = {
      array: i("array"),
      bool: i("boolean"),
      func: i("function"),
      number: i("number"),
      object: i("object"),
      string: i("string"),
      symbol: i("symbol"),
      any: (function() {
        return a(emptyFunction_1.thatReturnsNull);
      })(),
      arrayOf: function(e) {
        return a(function(t, r, n, a, s) {
          if ("function" != typeof e)
            return new o(
              "Property `" +
                s +
                "` of component `" +
                n +
                "` has invalid PropType notation inside arrayOf."
            );
          var c = t[r];
          if (!Array.isArray(c)) {
            var p = l(c);
            return new o(
              "Invalid " +
                a +
                " `" +
                s +
                "` of type " +
                ("`" + p + "` supplied to `" + n + "`, expected an array.")
            );
          }
          for (var d, u = 0; u < c.length; u++)
            if (
              ((d = e(c, u, n, a, s + "[" + u + "]", ReactPropTypesSecret_1)),
              d instanceof Error)
            )
              return d;
          return null;
        });
      },
      element: (function() {
        return a(function(t, r, n, i, a) {
          var s = t[r];
          if (!e(s)) {
            var c = l(s);
            return new o(
              "Invalid " +
                i +
                " `" +
                a +
                "` of type " +
                ("`" +
                  c +
                  "` supplied to `" +
                  n +
                  "`, expected a single ReactElement.")
            );
          }
          return null;
        });
      })(),
      instanceOf: function(e) {
        return a(function(t, r, n, i, a) {
          if (!(t[r] instanceof e)) {
            var s = e.name || y,
              c = u(t[r]);
            return new o(
              "Invalid " +
                i +
                " `" +
                a +
                "` of type " +
                ("`" + c + "` supplied to `" + n + "`, expected ") +
                ("instance of `" + s + "`.")
            );
          }
          return null;
        });
      },
      node: (function() {
        return a(function(e, t, r, n, i) {
          return s(e[t])
            ? null
            : new o(
                "Invalid " +
                  n +
                  " `" +
                  i +
                  "` supplied to " +
                  ("`" + r + "`, expected a ReactNode.")
              );
        });
      })(),
      objectOf: function(e) {
        return a(function(t, r, n, i, a) {
          if ("function" != typeof e)
            return new o(
              "Property `" +
                a +
                "` of component `" +
                n +
                "` has invalid PropType notation inside objectOf."
            );
          var s = t[r],
            c = l(s);
          if ("object" !== c)
            return new o(
              "Invalid " +
                i +
                " `" +
                a +
                "` of type " +
                ("`" + c + "` supplied to `" + n + "`, expected an object.")
            );
          for (var p in s)
            if (s.hasOwnProperty(p)) {
              var d = e(s, p, n, i, a + "." + p, ReactPropTypesSecret_1);
              if (d instanceof Error) return d;
            }
          return null;
        });
      },
      oneOf: function(e) {
        return Array.isArray(e)
          ? a(function(t, r, a, s, c) {
              for (var l = t[r], p = 0; p < e.length; p++)
                if (n(l, e[p])) return null;
              var i = JSON.stringify(e);
              return new o(
                "Invalid " +
                  s +
                  " `" +
                  c +
                  "` of value `" +
                  l +
                  "` " +
                  ("supplied to `" + a + "`, expected one of " + i + ".")
              );
            })
          : (warning_1(
              !1,
              "Invalid argument supplied to oneOf, expected an instance of array."
            ),
            emptyFunction_1.thatReturnsNull);
      },
      oneOfType: function(e) {
        if (!Array.isArray(e))
          return (
            warning_1(
              !1,
              "Invalid argument supplied to oneOfType, expected an instance of array."
            ),
            emptyFunction_1.thatReturnsNull
          );
        for (var t, r = 0; r < e.length; r++)
          if (((t = e[r]), "function" != typeof t))
            return (
              warning_1(
                !1,
                "Invalid argument supplied to oneOfType. Expected an array of check functions, but received %s at index %s.",
                d(t),
                r
              ),
              emptyFunction_1.thatReturnsNull
            );
        return a(function(t, r, n, a, s) {
          for (var c, l = 0; l < e.length; l++)
            if (((c = e[l]), null == c(t, r, n, a, s, ReactPropTypesSecret_1)))
              return null;
          return new o(
            "Invalid " + a + " `" + s + "` supplied to " + ("`" + n + "`.")
          );
        });
      },
      shape: function(e) {
        return a(function(t, r, n, i, a) {
          var s = t[r],
            c = l(s);
          if ("object" !== c)
            return new o(
              "Invalid " +
                i +
                " `" +
                a +
                "` of type `" +
                c +
                "` " +
                ("supplied to `" + n + "`, expected `object`.")
            );
          for (var p in e) {
            var d = e[p];
            if (d) {
              var u = d(s, p, n, i, a + "." + p, ReactPropTypesSecret_1);
              if (u) return u;
            }
          }
          return null;
        });
      },
      exact: function(e) {
        return a(function(t, r, n, i, a) {
          var s = t[r],
            c = l(s);
          if ("object" !== c)
            return new o(
              "Invalid " +
                i +
                " `" +
                a +
                "` of type `" +
                c +
                "` " +
                ("supplied to `" + n + "`, expected `object`.")
            );
          var p = objectAssign({}, t[r], e);
          for (var d in p) {
            var u = e[d];
            if (!u)
              return new o(
                "Invalid " +
                  i +
                  " `" +
                  a +
                  "` key `" +
                  d +
                  "` supplied to `" +
                  n +
                  "`.\nBad object: " +
                  JSON.stringify(t[r], null, "  ") +
                  "\nValid keys: " +
                  JSON.stringify(Object.keys(e), null, "  ")
              );
            var f = u(s, d, n, i, a + "." + d, ReactPropTypesSecret_1);
            if (f) return f;
          }
          return null;
        });
      },
    };
  return (
    (o.prototype = Error.prototype),
    (b.checkPropTypes = checkPropTypes_1),
    (b.PropTypes = b),
    b
  );
};
var propTypes = createCommonjsModule(function(e) {
    {
      var t =
          ("function" == typeof Symbol &&
            Symbol.for &&
            Symbol.for("react.element")) ||
          60103,
        r = function(e) {
          return "object" == typeof e && null !== e && e.$$typeof === t;
        };
      e.exports = factoryWithTypeCheckers(r, !0);
    }
  }),
  noop$1 = function() {},
  _WINDOW = {},
  _DOCUMENT = {},
  _PERFORMANCE = { mark: noop$1, measure: noop$1 };
try {
  "undefined" != typeof window && (_WINDOW = window),
    "undefined" != typeof document && (_DOCUMENT = document),
    "undefined" != typeof performance && (_PERFORMANCE = performance);
} catch (t) {}
var _ref = _WINDOW.navigator || {},
  _ref$userAgent = _ref.userAgent,
  userAgent = _ref$userAgent === void 0 ? "" : _ref$userAgent,
  WINDOW = _WINDOW,
  DOCUMENT = _DOCUMENT,
  PERFORMANCE = _PERFORMANCE,
  IS_IE = ~userAgent.indexOf("MSIE") || ~userAgent.indexOf("Trident/"),
  NAMESPACE_IDENTIFIER = "___FONT_AWESOME___",
  UNITS_IN_GRID = 16,
  DEFAULT_FAMILY_PREFIX = "fa",
  DEFAULT_REPLACEMENT_CLASS = "svg-inline--fa",
  DATA_FA_REPLACEMENT = "data-fa-replacement",
  DATA_FA_PSEUDO_ELEMENT = "data-fa-pseudo-element",
  PRODUCTION = (function() {
    try {
      return !1;
    } catch (t) {
      return !1;
    }
  })(),
  oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  oneToTwenty = oneToTen.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
  RESERVED_CLASSES = [
    "xs",
    "sm",
    "lg",
    "fw",
    "ul",
    "li",
    "border",
    "pull-left",
    "pull-right",
    "spin",
    "pulse",
    "rotate-90",
    "rotate-180",
    "rotate-270",
    "flip-horizontal",
    "flip-vertical",
    "stack",
    "stack-1x",
    "stack-2x",
    "inverse",
    "layers",
    "layers-text",
    "layers-counter",
  ]
    .concat(
      oneToTen.map(function(e) {
        return e + "x";
      })
    )
    .concat(
      oneToTwenty.map(function(e) {
        return "w-" + e;
      })
    ),
  classCallCheck = function(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  },
  createClass = (function() {
    function e(e, t) {
      for (var r, n = 0; n < t.length; n++)
        (r = t[n]),
          (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
    }
    return function(t, r, n) {
      return r && e(t.prototype, r), n && e(t, n), t;
    };
  })(),
  defineProperty = function(e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r),
      e
    );
  },
  _extends =
    Object.assign ||
    function(e) {
      for (var t, r = 1; r < arguments.length; r++)
        for (var n in ((t = arguments[r]), t))
          Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
      return e;
    },
  objectWithoutProperties = function(e, t) {
    var r = {};
    for (var n in e)
      0 <= t.indexOf(n) ||
        (Object.prototype.hasOwnProperty.call(e, n) && (r[n] = e[n]));
    return r;
  },
  toConsumableArray = function(e) {
    if (Array.isArray(e)) {
      for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
      return r;
    }
    return Array.from(e);
  },
  _default = _extends(
    {
      familyPrefix: DEFAULT_FAMILY_PREFIX,
      replacementClass: DEFAULT_REPLACEMENT_CLASS,
      autoReplaceSvg: !0,
      autoAddCss: !0,
      autoA11y: !0,
      searchPseudoElements: !1,
      observeMutations: !0,
      keepOriginalSource: !0,
      measurePerformance: !1,
      showMissingIcons: !0,
    },
    WINDOW.FontAwesomeConfig || {}
  );
_default.autoReplaceSvg || (_default.observeMutations = !1);
var config$1 = _extends({}, _default);
WINDOW.FontAwesomeConfig = config$1;
function update(e) {
  var t = Object.keys(config$1);
  Object.keys(e).forEach(function(r) {
    ~t.indexOf(r) && (config$1[r] = e[r]);
  });
}
var w$1 = WINDOW || {};
w$1[NAMESPACE_IDENTIFIER] || (w$1[NAMESPACE_IDENTIFIER] = {}),
  w$1[NAMESPACE_IDENTIFIER].packs || (w$1[NAMESPACE_IDENTIFIER].packs = {}),
  w$1[NAMESPACE_IDENTIFIER].hooks || (w$1[NAMESPACE_IDENTIFIER].hooks = {}),
  w$1[NAMESPACE_IDENTIFIER].shims || (w$1[NAMESPACE_IDENTIFIER].shims = []);
var namespace = w$1[NAMESPACE_IDENTIFIER],
  d = UNITS_IN_GRID,
  meaninglessTransform = {
    size: 16,
    x: 0,
    y: 0,
    rotate: 0,
    flipX: !1,
    flipY: !1,
  };
function isReserved(e) {
  return ~RESERVED_CLASSES.indexOf(e);
}
function insertStyle(e) {
  if (e && "undefined" != typeof DOCUMENT.createElement) {
    var t = DOCUMENT.createElement("style");
    return (
      t.setAttribute("type", "text/css"),
      (t.innerHTML = e),
      DOCUMENT.head.appendChild(t),
      e
    );
  }
}
var _uniqueId = 0;
function nextUniqueId() {
  return _uniqueId++, _uniqueId;
}
function toArray(e) {
  for (var t = [], r = (e || []).length >>> 0; r--; ) t[r] = e[r];
  return t;
}
function getIconName(e, t) {
  var r = t.split("-"),
    n = r[0],
    o = r.slice(1).join("-");
  return n !== e || "" === o || isReserved(o) ? null : o;
}
function htmlEscape(e) {
  return ("" + e)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function joinAttributes(e) {
  return Object.keys(e || {})
    .reduce(function(t, r) {
      return t + (r + '="' + htmlEscape(e[r]) + '" ');
    }, "")
    .trim();
}
function joinStyles(e) {
  return Object.keys(e || {}).reduce(function(t, r) {
    return t + (r + ": " + e[r] + ";");
  }, "");
}
function transformIsMeaningful(e) {
  return (
    e.size !== meaninglessTransform.size ||
    e.x !== meaninglessTransform.x ||
    e.y !== meaninglessTransform.y ||
    e.rotate !== meaninglessTransform.rotate ||
    e.flipX ||
    e.flipY
  );
}
function transformForSvg(e) {
  var t = e.transform,
    r = e.containerWidth,
    n = e.iconWidth,
    o = "translate(" + 32 * t.x + ", " + 32 * t.y + ") ",
    i =
      "scale(" +
      t.size / 16 * (t.flipX ? -1 : 1) +
      ", " +
      t.size / 16 * (t.flipY ? -1 : 1) +
      ") ",
    a = "rotate(" + t.rotate + " 0 0)";
  return {
    outer: { transform: "translate(" + r / 2 + " 256)" },
    inner: { transform: o + " " + i + " " + a },
    path: { transform: "translate(" + -1 * (n / 2) + " -256)" },
  };
}
function transformForCss(e) {
  var t = e.transform,
    r = e.width,
    n = void 0 === r ? UNITS_IN_GRID : r,
    o = e.height,
    i = void 0 === o ? UNITS_IN_GRID : o,
    a = e.startCentered,
    s = void 0 !== a && a,
    c = "";
  return (
    (c +=
      s && IS_IE
        ? "translate(" + (t.x / d - n / 2) + "em, " + (t.y / d - i / 2) + "em) "
        : s
          ? "translate(calc(-50% + " +
            t.x / d +
            "em), calc(-50% + " +
            t.y / d +
            "em)) "
          : "translate(" + t.x / d + "em, " + t.y / d + "em) "),
    (c +=
      "scale(" +
      t.size / d * (t.flipX ? -1 : 1) +
      ", " +
      t.size / d * (t.flipY ? -1 : 1) +
      ") "),
    (c += "rotate(" + t.rotate + "deg) "),
    c
  );
}
var ALL_SPACE = { x: 0, y: 0, width: "100%", height: "100%" },
  makeIconComposition = function(e) {
    var t = e.children,
      r = e.attributes,
      n = e.main,
      o = e.compose,
      i = e.transform,
      a = n.width,
      s = n.icon,
      c = o.width,
      l = o.icon,
      p = transformForSvg({ transform: i, containerWidth: c, iconWidth: a }),
      d = {
        tag: "rect",
        attributes: _extends({}, ALL_SPACE, { fill: "white" }),
      },
      u = {
        tag: "g",
        attributes: _extends({}, p.inner),
        children: [
          {
            tag: "path",
            attributes: _extends({}, s.attributes, p.path, { fill: "black" }),
          },
        ],
      },
      f = { tag: "g", attributes: _extends({}, p.outer), children: [u] },
      m = "mask-" + nextUniqueId(),
      y = "clip-" + nextUniqueId(),
      b = {
        tag: "mask",
        attributes: _extends({}, ALL_SPACE, {
          id: m,
          maskUnits: "userSpaceOnUse",
          maskContentUnits: "userSpaceOnUse",
        }),
        children: [d, f],
      };
    return (
      t.push(
        {
          tag: "defs",
          children: [
            { tag: "clipPath", attributes: { id: y }, children: [l] },
            b,
          ],
        },
        {
          tag: "rect",
          attributes: _extends(
            {
              fill: "currentColor",
              "clip-path": "url(#" + y + ")",
              mask: "url(#" + m + ")",
            },
            ALL_SPACE
          ),
        }
      ),
      { children: t, attributes: r }
    );
  },
  makeIconStandard = function(e) {
    var t = e.children,
      r = e.attributes,
      n = e.main,
      o = e.transform,
      i = e.styles,
      a = joinStyles(i);
    if ((0 < a.length && (r.style = a), transformIsMeaningful(o))) {
      var s = transformForSvg({
        transform: o,
        containerWidth: n.width,
        iconWidth: n.width,
      });
      t.push({
        tag: "g",
        attributes: _extends({}, s.outer),
        children: [
          {
            tag: "g",
            attributes: _extends({}, s.inner),
            children: [
              {
                tag: n.icon.tag,
                children: n.icon.children,
                attributes: _extends({}, n.icon.attributes, s.path),
              },
            ],
          },
        ],
      });
    } else t.push(n.icon);
    return { children: t, attributes: r };
  },
  asIcon = function(e) {
    var t = e.children,
      r = e.main,
      n = e.compose,
      o = e.attributes,
      i = e.styles,
      a = e.transform;
    if (transformIsMeaningful(a) && r.found && !n.found) {
      var s = r.width,
        c = r.height,
        l = { x: s / c / 2, y: 0.5 };
      o.style = joinStyles(
        _extends({}, i, {
          "transform-origin": l.x + a.x / 16 + "em " + (l.y + a.y / 16) + "em",
        })
      );
    }
    return [{ tag: "svg", attributes: o, children: t }];
  },
  asSymbol = function(e) {
    var t = e.prefix,
      r = e.iconName,
      n = e.children,
      o = e.attributes,
      i = e.symbol,
      a = !0 === i ? t + "-" + config$1.familyPrefix + "-" + r : i;
    return [
      {
        tag: "svg",
        attributes: { style: "display: none;" },
        children: [
          {
            tag: "symbol",
            attributes: _extends({}, o, { id: a }),
            children: n,
          },
        ],
      },
    ];
  };
function makeInlineSvgAbstract(e) {
  var t,
    r = e.icons,
    n = r.main,
    o = r.compose,
    i = e.prefix,
    a = e.iconName,
    s = e.transform,
    c = e.symbol,
    l = e.title,
    p = e.extra,
    d = o.found ? o : n,
    u = d.width,
    f = d.height,
    m = "fa-w-" + Math.ceil(16 * (u / f)),
    y = [config$1.replacementClass, a ? config$1.familyPrefix + "-" + a : "", m]
      .concat(p.classes)
      .join(" "),
    b = {
      children: [],
      attributes: _extends(
        {},
        p.attributes,
        ((t = {}),
        defineProperty(t, DATA_FA_REPLACEMENT, "true"),
        defineProperty(t, "data-prefix", i),
        defineProperty(t, "data-icon", a),
        defineProperty(t, "class", y),
        defineProperty(t, "role", "img"),
        defineProperty(t, "xmlns", "http://www.w3.org/2000/svg"),
        defineProperty(t, "viewBox", "0 0 " + u + " " + f),
        t)
      ),
    };
  l &&
    b.children.push({
      tag: "title",
      attributes: {
        id: b.attributes["aria-labelledby"] || "title-" + nextUniqueId(),
      },
      children: [l],
    });
  var h = _extends({}, b, {
      prefix: i,
      iconName: a,
      main: n,
      compose: o,
      transform: s,
      symbol: c,
      styles: p.styles,
    }),
    g = o.found && n.found ? makeIconComposition(h) : makeIconStandard(h),
    x = g.children,
    w = g.attributes;
  return (h.children = x), (h.attributes = w), c ? asSymbol(h) : asIcon(h);
}
function makeLayersTextAbstract(e) {
  var t,
    r = e.content,
    n = e.width,
    o = e.height,
    i = e.transform,
    a = e.title,
    s = e.extra,
    c = _extends(
      {},
      s.attributes,
      a ? { title: a } : {},
      ((t = {}),
      defineProperty(t, DATA_FA_REPLACEMENT, "true"),
      defineProperty(t, "class", s.classes.join(" ")),
      t)
    ),
    l = _extends({}, s.styles);
  transformIsMeaningful(i) &&
    ((l.transform = transformForCss({
      transform: i,
      startCentered: !0,
      width: n,
      height: o,
    })),
    (l["-webkit-transform"] = l.transform));
  var p = joinStyles(l);
  0 < p.length && (c.style = p);
  var d = [];
  return (
    d.push({ tag: "span", attributes: c, children: [r] }),
    a &&
      d.push({ tag: "span", attributes: { class: "sr-only" }, children: [a] }),
    d
  );
}
var noop$1$1 = function() {},
  p =
    config$1.measurePerformance &&
    PERFORMANCE &&
    PERFORMANCE.mark &&
    PERFORMANCE.measure
      ? PERFORMANCE
      : { mark: noop$1$1, measure: noop$1$1 },
  preamble = 'FA "5.0.0-rc3"',
  begin = function(e) {
    return (
      p.mark(preamble + " " + e + " begins"),
      function() {
        return end(e);
      }
    );
  },
  end = function(e) {
    p.mark(preamble + " " + e + " ends"),
      p.measure(
        preamble + " " + e,
        preamble + " " + e + " begins",
        preamble + " " + e + " ends"
      );
  },
  perf = { begin: begin, end: end };
function toHtml(e) {
  var t = e.tag,
    r = e.attributes,
    n = r === void 0 ? {} : r,
    o = e.children,
    i = o === void 0 ? [] : o;
  return "string" == typeof e
    ? htmlEscape(e)
    : "<" +
      t +
      " " +
      joinAttributes(n) +
      ">" +
      i.map(toHtml).join("") +
      "</" +
      t +
      ">";
}
function getMutator() {
  if (!0 === config$1.autoReplaceSvg) return mutators.replace;
  var e = mutators[config$1.autoReplaceSvg];
  return e || mutators.replace;
}
var mutators = {
  replace: function(e) {
    var t = e[0],
      r = e[1],
      n = r
        .map(function(e) {
          return toHtml(e);
        })
        .join("\n");
    t.parentNode &&
      (t.outerHTML =
        n +
        (config$1.keepOriginalSource && "svg" !== t.tagName.toLowerCase()
          ? "<!-- " + t.outerHTML + " -->"
          : ""));
  },
  nest: function(e) {
    var t = e[0],
      r = e[1],
      n = r
        .map(function(e) {
          return toHtml(e);
        })
        .join("\n");
    t.innerHTML = n;
  },
};
function perform(e, t) {
  WINDOW.requestAnimationFrame &&
    WINDOW.requestAnimationFrame(function() {
      var r = getMutator(),
        n = perf.begin("mutate");
      e.map(r), "function" == typeof t && t(), n();
    });
}
function disableObservation(e) {
  e();
}
var styleParser = function(e) {
  var t = e.getAttribute("style"),
    r = [];
  return (
    t &&
      (r = t.split(";").reduce(function(e, t) {
        var r = t.split(":"),
          n = r[0],
          o = r.slice(1);
        return n && 0 < o.length && (e[n] = o.join(":").trim()), e;
      }, {})),
    r
  );
};
var bindInternal4 = function(e, t) {
  return function(r, n, o, i) {
    return e.call(t, r, n, o, i);
  };
};
var reduce = function(e, t, r, n) {
    var o,
      i,
      a,
      s = Object.keys(e),
      c = s.length,
      l = n === void 0 ? t : bindInternal4(t, n);
    for (
      void 0 === r ? ((o = 1), (a = e[s[0]])) : ((o = 0), (a = r));
      o < c;
      o++
    )
      (i = s[o]), (a = l(a, e[i], i, e));
    return a;
  },
  packs$1 = namespace.packs,
  shims = namespace.shims,
  _byUnicode = {},
  _byLigature = {},
  _byOldName = {},
  build = function() {
    var e = function(e) {
      return reduce(
        packs$1,
        function(t, r, n) {
          return (t[n] = reduce(r, e, {})), t;
        },
        {}
      );
    };
    (_byUnicode = e(function(e, t, r) {
      return (e[t[3]] = r), e;
    })),
      (_byLigature = e(function(e, t, r) {
        var n = t[2];
        return (
          (e[r] = r),
          n.forEach(function(t) {
            e[t] = r;
          }),
          e
        );
      }));
    _byOldName = reduce(
      shims,
      function(e, t) {
        var r = t[0],
          n = t[1],
          o = t[2];
        return (
          "far" !== n || "far" in packs$1 || (n = "fas"),
          (e[r] = { prefix: n, iconName: o }),
          e
        );
      },
      {}
    );
  };
build();
function byUnicode(e, t) {
  return _byUnicode[e][t];
}
function byLigature(e, t) {
  return _byLigature[e][t];
}
function byOldName(e) {
  return _byOldName[e] || { prefix: null, iconName: null };
}
function toHex(e) {
  for (var t, r = "", n = 0; n < e.length; n++)
    (t = e.charCodeAt(n).toString(16)), (r += ("000" + t).slice(-4));
  return r;
}
var packs$2 = namespace.packs,
  emptyCanonicalIcon = function() {
    return { prefix: null, iconName: null, rest: [] };
  };
function getCanonicalIcon(e) {
  return e.reduce(function(e, t) {
    var r = getIconName(config$1.familyPrefix, t);
    if (packs$2[t]) e.prefix = t;
    else if (r) {
      var n = "fa" === e.prefix ? byOldName(r) : {};
      (e.iconName = n.iconName || r), (e.prefix = n.prefix || e.prefix);
    } else
      t !== config$1.replacementClass &&
        0 !== t.indexOf("fa-w-") &&
        e.rest.push(t);
    return e;
  }, emptyCanonicalIcon());
}
function iconFromMapping(e, t, r) {
  if (e && e[t] && e[t][r]) return { prefix: t, iconName: r, icon: e[t][r] };
}
var classParser = function(e) {
    var t = e.getAttribute("data-prefix"),
      r = e.getAttribute("data-icon"),
      n = getCanonicalIcon(toArray(e.classList));
    return (
      t && r && ((n.prefix = t), (n.iconName = r)),
      n.prefix && void 0 !== e.innerText && 1 < e.innerText.length
        ? (n.iconName = byLigature(n.prefix, e.innerText))
        : n.prefix &&
          void 0 !== e.innerText &&
          1 === e.innerText.length &&
          (n.iconName = byUnicode(n.prefix, toHex(e.innerText))),
      n
    );
  },
  parseTransformString = function(e) {
    var t = { size: 16, x: 0, y: 0, flipX: !1, flipY: !1, rotate: 0 };
    return e
      ? e
          .toLowerCase()
          .split(" ")
          .reduce(function(e, t) {
            var r = t.toLowerCase().split("-"),
              n = r[0],
              o = r.slice(1).join("-");
            return n && "h" === o
              ? ((e.flipX = !0), e)
              : n && "v" === o
                ? ((e.flipY = !0), e)
                : ((o = parseFloat(o)), isNaN(o))
                  ? e
                  : ("grow" === n
                      ? (e.size += o)
                      : "shrink" === n
                        ? (e.size -= o)
                        : "left" === n
                          ? (e.x -= o)
                          : "right" === n
                            ? (e.x += o)
                            : "up" === n
                              ? (e.y -= o)
                              : "down" === n
                                ? (e.y += o)
                                : "rotate" === n ? (e.rotate += o) : void 0,
                    e);
          }, t)
      : t;
  },
  transformParser = function(e) {
    return parseTransformString(e.getAttribute("data-fa-transform"));
  },
  symbolParser = function(e) {
    var t = e.getAttribute("data-fa-symbol");
    return null !== t && (!("" !== t) || t);
  },
  attributesParser = function(e) {
    var t = toArray(e.attributes).reduce(function(e, t) {
        return (
          "class" !== e.name && "style" !== e.name && (e[t.name] = t.value), e
        );
      }, {}),
      r = e.getAttribute("title");
    return (
      config$1.autoA11y &&
        (r
          ? (t["aria-labelledby"] =
              config$1.replacementClass + "-title-" + nextUniqueId())
          : (t["aria-hidden"] = "true")),
      t
    );
  },
  composeParser = function(e) {
    var t = e.getAttribute("data-fa-compose");
    return t
      ? getCanonicalIcon(
          t.split(" ").map(function(e) {
            return e.trim();
          })
        )
      : emptyCanonicalIcon();
  };
function parseMeta(e) {
  var t = classParser(e),
    r = t.iconName,
    n = t.prefix,
    o = t.rest,
    i = styleParser(e),
    a = transformParser(e),
    s = symbolParser(e),
    c = attributesParser(e),
    l = composeParser(e);
  return {
    iconName: r,
    title: e.getAttribute("title"),
    prefix: n,
    transform: a,
    symbol: s,
    compose: l,
    extra: { classes: o, styles: i, attributes: c },
  };
}
function MissingIcon(e) {
  (this.name = "MissingIcon"),
    (this.message = e || "Icon unavailable"),
    (this.stack = new Error().stack);
}
(MissingIcon.prototype = Object.create(Error.prototype)),
  (MissingIcon.prototype.constructor = MissingIcon);
var FILL = { fill: "currentColor" },
  ANIMATION_BASE = {
    attributeType: "XML",
    repeatCount: "indefinite",
    dur: "2s",
  },
  RING = {
    tag: "path",
    attributes: _extends({}, FILL, {
      d:
        "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z",
    }),
  },
  OPACITY_ANIMATE = _extends({}, ANIMATION_BASE, { attributeName: "opacity" }),
  DOT = {
    tag: "circle",
    attributes: _extends({}, FILL, { cx: "256", cy: "364", r: "28" }),
    children: [
      {
        tag: "animate",
        attributes: _extends({}, ANIMATION_BASE, {
          attributeName: "r",
          values: "28;14;28;28;14;28;",
        }),
      },
      {
        tag: "animate",
        attributes: _extends({}, OPACITY_ANIMATE, { values: "1;0;1;1;0;1;" }),
      },
    ],
  },
  QUESTION = {
    tag: "path",
    attributes: _extends({}, FILL, {
      opacity: "1",
      d:
        "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z",
    }),
    children: [
      {
        tag: "animate",
        attributes: _extends({}, OPACITY_ANIMATE, { values: "1;0;0;0;0;1;" }),
      },
    ],
  },
  EXCLAMATION = {
    tag: "path",
    attributes: _extends({}, FILL, {
      opacity: "0",
      d:
        "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z",
    }),
    children: [
      {
        tag: "animate",
        attributes: _extends({}, OPACITY_ANIMATE, { values: "0;0;1;1;0;0;" }),
      },
    ],
  },
  missing = { tag: "g", children: [RING, DOT, QUESTION, EXCLAMATION] },
  packs = namespace.packs,
  LAYERS_TEXT_CLASSNAME = "fa-layers-text",
  FONT_FAMILY_PATTERN = /Font Awesome 5 (Solid|Regular|Light|Brands)/,
  STYLE_TO_PREFIX = {
    Solid: "fas",
    Regular: "far",
    Light: "fal",
    Brands: "fab",
  };
function findIcon(e, t) {
  var r = { found: !1, width: 512, height: 512, icon: missing };
  if (e && t && packs[t] && packs[t][e]) {
    var n = packs[t][e],
      o = n[0],
      i = n[1],
      a = n.slice(4);
    r = {
      found: !0,
      width: o,
      height: i,
      icon: { tag: "path", attributes: { fill: "currentColor", d: a[0] } },
    };
  } else if (e && t && !config$1.showMissingIcons)
    throw new MissingIcon(
      "Icon is missing for prefix " + t + " with icon name " + e
    );
  return r;
}
function generateSvgReplacementMutation(e, t) {
  var r = t.iconName,
    n = t.title,
    o = t.prefix,
    i = t.transform,
    a = t.symbol,
    s = t.compose,
    c = t.extra;
  return [
    e,
    makeInlineSvgAbstract({
      icons: { main: findIcon(r, o), compose: findIcon(s.iconName, s.prefix) },
      prefix: o,
      iconName: r,
      transform: i,
      symbol: a,
      compose: s,
      title: n,
      extra: c,
    }),
  ];
}
function generateLayersText(e, t) {
  var r = t.title,
    n = t.transform,
    o = t.extra,
    i = null,
    a = null;
  if (IS_IE) {
    var s = parseInt(getComputedStyle(e).fontSize, 10),
      c = e.getBoundingClientRect();
    (i = c.width / s), (a = c.height / s);
  }
  return (
    config$1.autoA11y && !r && (o.attributes["aria-hidden"] = "true"),
    [
      e,
      makeLayersTextAbstract({
        content: e.innerHTML,
        width: i,
        height: a,
        transform: n,
        title: r,
        extra: o,
      }),
    ]
  );
}
function generateMutation(e) {
  var t = parseMeta(e);
  return ~t.extra.classes.indexOf(LAYERS_TEXT_CLASSNAME)
    ? generateLayersText(e, t)
    : generateSvgReplacementMutation(e, t);
}
function searchPseudoElements(e) {
  var t = perf.begin("searchPseudoElements");
  disableObservation(function() {
    toArray(e.querySelectorAll("*")).reduce(function(e, t) {
      [":before", ":after"].forEach(function(e) {
        var r = WINDOW.getComputedStyle(t, e),
          n = r.getPropertyValue("font-family").match(FONT_FAMILY_PATTERN),
          o = toArray(t.children),
          a = ":before" === e ? o[0] : o.slice(-1)[0],
          s = !!a && !!a.getAttribute(DATA_FA_PSEUDO_ELEMENT);
        if (n && !s) {
          var c = r.getPropertyValue("content"),
            l = DOCUMENT.createElement("i");
          l.setAttribute("class", "" + STYLE_TO_PREFIX[n[1]]),
            l.setAttribute(DATA_FA_PSEUDO_ELEMENT, !0),
            (l.innerText = 3 === c.length ? c.substr(1, 1) : c),
            ":before" === e
              ? t.insertBefore(l, t.firstChild)
              : t.appendChild(l);
        }
      });
    });
  }),
    t();
}
function onTree(e) {
  var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null,
    r = DOCUMENT.documentElement.classList,
    n = function(e) {
      return r.add("font-awesome-i2svg-" + e);
    },
    o = function(e) {
      return r.remove("font-awesome-i2svg-" + e);
    },
    i = Object.keys(packs),
    a = ["." + LAYERS_TEXT_CLASSNAME]
      .concat(
        i.map(function(e) {
          return "." + e;
        })
      )
      .join(", ");
  if ((n("active"), n("pending"), o("complete"), 0 !== a.length)) {
    config$1.searchPseudoElements && searchPseudoElements(e);
    var s = perf.begin("onTree"),
      c = toArray(e.querySelectorAll(a)).reduce(function(e, t) {
        if (t.getAttribute(DATA_FA_REPLACEMENT)) return e;
        try {
          var r = generateMutation(t);
          r && e.push(r);
        } catch (t) {
          !PRODUCTION && t instanceof MissingIcon && console.error(t);
        }
        return e;
      }, []);
    s(),
      perform(c, function() {
        n("complete"), o("pending"), "function" == typeof t && t();
      });
  }
}
var baseStyles =
    'svg:not(:root).svg-inline--fa {\n  overflow: visible; }\n\n.svg-inline--fa {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -12.5%; }\n  .svg-inline--fa.fa-lg {\n    vertical-align: -25%; }\n  .svg-inline--fa.fa-w-1 {\n    width: 0.0625em; }\n  .svg-inline--fa.fa-w-2 {\n    width: 0.125em; }\n  .svg-inline--fa.fa-w-3 {\n    width: 0.1875em; }\n  .svg-inline--fa.fa-w-4 {\n    width: 0.25em; }\n  .svg-inline--fa.fa-w-5 {\n    width: 0.3125em; }\n  .svg-inline--fa.fa-w-6 {\n    width: 0.375em; }\n  .svg-inline--fa.fa-w-7 {\n    width: 0.4375em; }\n  .svg-inline--fa.fa-w-8 {\n    width: 0.5em; }\n  .svg-inline--fa.fa-w-9 {\n    width: 0.5625em; }\n  .svg-inline--fa.fa-w-10 {\n    width: 0.625em; }\n  .svg-inline--fa.fa-w-11 {\n    width: 0.6875em; }\n  .svg-inline--fa.fa-w-12 {\n    width: 0.75em; }\n  .svg-inline--fa.fa-w-13 {\n    width: 0.8125em; }\n  .svg-inline--fa.fa-w-14 {\n    width: 0.875em; }\n  .svg-inline--fa.fa-w-15 {\n    width: 0.9375em; }\n  .svg-inline--fa.fa-w-16 {\n    width: 1em; }\n  .svg-inline--fa.fa-w-17 {\n    width: 1.0625em; }\n  .svg-inline--fa.fa-w-18 {\n    width: 1.125em; }\n  .svg-inline--fa.fa-w-19 {\n    width: 1.1875em; }\n  .svg-inline--fa.fa-w-20 {\n    width: 1.25em; }\n  .svg-inline--fa.fa-pull-left {\n    margin-right: .3em;\n    width: auto; }\n  .svg-inline--fa.fa-pull-right {\n    margin-left: .3em;\n    width: auto; }\n  .svg-inline--fa.fa-border {\n    height: 1.5em; }\n  .svg-inline--fa.fa-li {\n    top: auto;\n    width: 1.875em; }\n  .svg-inline--fa.fa-fw {\n    width: 1.25em; }\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0; }\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -12.5%;\n  width: 1em; }\n  .fa-layers svg.svg-inline--fa {\n    -webkit-transform-origin: center center;\n            transform-origin: center center; }\n\n.fa-layers-text, .fa-layers-counter {\n  display: inline-block;\n  position: absolute;\n  text-align: center; }\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center; }\n\n.fa-layers-counter {\n  background-color: #ff253a;\n  border-radius: 1em;\n  color: #fff;\n  height: 1.5em;\n  line-height: 1;\n  max-width: 5em;\n  min-width: 1.5em;\n  overflow: hidden;\n  padding: .25em;\n  right: 0;\n  text-overflow: ellipsis;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right; }\n\n.fa-layers-bottom-right {\n  bottom: 0;\n  right: 0;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right; }\n\n.fa-layers-bottom-left {\n  bottom: 0;\n  left: 0;\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left; }\n\n.fa-layers-top-right {\n  right: 0;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right; }\n\n.fa-layers-top-left {\n  left: 0;\n  right: auto;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top left;\n          transform-origin: top left; }\n\n.fa-lg {\n  font-size: 1.33333em;\n  line-height: 0.75em;\n  vertical-align: -15%; }\n\n.fa-xs {\n  font-size: .75em; }\n\n.fa-sm {\n  font-size: .875em; }\n\n.fa-1x {\n  font-size: 1em; }\n\n.fa-2x {\n  font-size: 2em; }\n\n.fa-3x {\n  font-size: 3em; }\n\n.fa-4x {\n  font-size: 4em; }\n\n.fa-5x {\n  font-size: 5em; }\n\n.fa-6x {\n  font-size: 6em; }\n\n.fa-7x {\n  font-size: 7em; }\n\n.fa-8x {\n  font-size: 8em; }\n\n.fa-9x {\n  font-size: 9em; }\n\n.fa-10x {\n  font-size: 10em; }\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em; }\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: 1.875em;\n  padding-left: 0; }\n  .fa-ul > li {\n    position: relative; }\n\n.fa-li {\n  left: -1.875em;\n  position: absolute;\n  text-align: center;\n  top: 0.14286em;\n  width: 1.875em; }\n  .fa-li.fa-lg {\n    left: -1.625em; }\n\n.fa-border {\n  border: solid 0.08em #eee;\n  border-radius: .1em;\n  padding: .2em .25em .15em; }\n\n.fa-pull-left {\n  float: left; }\n\n.fa-pull-right {\n  float: right; }\n\n.fa.fa-pull-left,\n.fas.fa-pull-left,\n.far.fa-pull-left,\n.fal.fa-pull-left,\n.fab.fa-pull-left {\n  margin-right: .3em; }\n\n.fa.fa-pull-right,\n.fas.fa-pull-right,\n.far.fa-pull-right,\n.fal.fa-pull-right,\n.fab.fa-pull-right {\n  margin-left: .3em; }\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n          animation: fa-spin 2s infinite linear; }\n\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n          animation: fa-spin 1s infinite steps(8); }\n\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n.fa-rotate-90 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg); }\n\n.fa-rotate-180 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg); }\n\n.fa-rotate-270 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg); }\n\n.fa-flip-horizontal {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)";\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1); }\n\n.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1); }\n\n.fa-flip-horizontal.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1); }\n\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical {\n  -webkit-filter: none;\n          filter: none; }\n\n.fa-stack {\n  display: inline-block;\n  height: 2em;\n  position: relative;\n  width: 2em; }\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0; }\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1em; }\n\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2em; }\n\n.fa-inverse {\n  color: #fff; }\n\n.sr-only {\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px; }\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  clip: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  position: static;\n  width: auto; }\n',
  styles = function() {
    var e = config$1.familyPrefix,
      t = config$1.replacementClass,
      r = baseStyles;
    if (e !== DEFAULT_FAMILY_PREFIX || t !== DEFAULT_REPLACEMENT_CLASS) {
      var n = /\.fa\-/g,
        o = /\.svg-inline--fa/g;
      r = r.replace(n, "." + e + "-").replace(o, "." + t);
    }
    return r;
  },
  Library = (function() {
    function e() {
      classCallCheck(this, e), (this.definitions = {});
    }
    return (
      createClass(e, [
        {
          key: "add",
          value: function() {
            for (
              var e = this, t = arguments.length, r = Array(t), n = 0;
              n < t;
              n++
            )
              r[n] = arguments[n];
            var o = r.reduce(this._pullDefinitions, {});
            Object.keys(o).forEach(function(t) {
              e.definitions[t] = _extends({}, e.definitions[t] || {}, o[t]);
            });
          },
        },
        {
          key: "reset",
          value: function() {
            this.definitions = {};
          },
        },
        {
          key: "_pullDefinitions",
          value: function(e, t) {
            var r = t.prefix && t.iconName && t.icon ? { 0: t } : t;
            return (
              Object.keys(r).map(function(t) {
                var n = r[t],
                  o = n.prefix,
                  i = n.iconName,
                  a = n.icon;
                e[o] || (e[o] = {}), (e[o][i] = a);
              }),
              e
            );
          },
        },
      ]),
      e
    );
  })();
function prepIcon(e) {
  var t = e[0],
    r = e[1],
    n = e.slice(4);
  return {
    found: !0,
    width: t,
    height: r,
    icon: { tag: "path", attributes: { fill: "currentColor", d: n[0] } },
  };
}
var _stylesInserted = !1;
function ensureStyles() {
  config$1.autoAddCss &&
    (!_stylesInserted && insertStyle(styles()), (_stylesInserted = !0));
}
function apiObject(e, t) {
  return (
    Object.defineProperty(e, "abstract", { get: t }),
    Object.defineProperty(e, "html", {
      get: function() {
        return e.abstract.map(function(e) {
          return toHtml(e);
        });
      },
    }),
    Object.defineProperty(e, "node", {
      get: function() {
        if (DOCUMENT.createElement) {
          var t = DOCUMENT.createElement("div");
          return (t.innerHTML = e.html), t.children;
        }
      },
    }),
    e
  );
}
function findIconDefinition(e) {
  var t = e.prefix,
    r = t === void 0 ? "fa" : t,
    n = e.iconName;
  return n
    ? iconFromMapping(library.definitions, r, n) ||
      iconFromMapping(namespace.packs, r, n)
    : void 0;
}
var library = new Library(),
  api$1 = {
    dom: {
      i2svg: function() {
        var e =
          0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : {};
        ensureStyles();
        var t = e.node,
          r = t === void 0 ? DOCUMENT : t,
          n = e.callback,
          o = n === void 0 ? function() {} : n;
        onTree(r, o);
      },
      styles: styles,
      insertStyles: function() {
        insertStyle(styles());
      },
    },
    library: library,
    parse: {
      transform: function(e) {
        return parseTransformString(e);
      },
    },
    findIconDefinition: findIconDefinition,
    icon: function(e) {
      var t =
          1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : {},
        r = t.transform,
        n = r === void 0 ? meaninglessTransform : r,
        o = t.symbol,
        i = t.compose,
        a = i === void 0 ? null : i,
        s = t.title,
        c = s === void 0 ? null : s,
        l = t.classes,
        p = l === void 0 ? [] : l,
        d = t.attributes,
        u = d === void 0 ? {} : d,
        f = t.style,
        m = f === void 0 ? {} : f,
        y = e.icon ? e : findIconDefinition(e);
      if (y) {
        var b = y.prefix,
          h = y.iconName,
          g = y.icon;
        return apiObject(_extends({ type: "icon" }, e), function() {
          return (
            ensureStyles(),
            config$1.autoA11y &&
              (c
                ? (u["aria-labelledby"] =
                    config$1.replacementClass + "-title-" + nextUniqueId())
                : (u["aria-hidden"] = "true")),
            makeInlineSvgAbstract({
              icons: {
                main: prepIcon(g),
                compose: a
                  ? prepIcon(a.icon)
                  : { found: !1, width: null, height: null, icon: {} },
              },
              prefix: b,
              iconName: h,
              transform: _extends({}, meaninglessTransform, n),
              symbol: o !== void 0 && o,
              title: c,
              extra: { attributes: u, style: m, classes: p },
            })
          );
        });
      }
    },
    text: function(e) {
      var t =
          1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : {},
        r = t.transform,
        n = r === void 0 ? meaninglessTransform : r,
        o = t.title,
        i = o === void 0 ? null : o,
        a = t.classes,
        s = a === void 0 ? [] : a,
        c = t.attributes,
        l = c === void 0 ? {} : c,
        p = t.style,
        d = p === void 0 ? {} : p;
      return apiObject({ type: "text", content: e }, function() {
        return (
          ensureStyles(),
          makeLayersTextAbstract({
            content: e,
            transform: _extends({}, meaninglessTransform, n),
            title: i,
            extra: {
              attributes: l,
              style: d,
              classes: [config$1.familyPrefix + "-layers-text"].concat(
                toConsumableArray(s)
              ),
            },
          })
        );
      });
    },
    layer: function(e) {
      return apiObject({ type: "layer" }, function() {
        ensureStyles();
        var t = [];
        return (
          e(function(e) {
            t = Array.isArray(e)
              ? e.map(function(e) {
                  t = t.concat(e.abstract);
                })
              : t.concat(e.abstract);
          }),
          [
            {
              tag: "span",
              attributes: { class: config$1.familyPrefix + "-layers" },
              children: t,
            },
          ]
        );
      });
    },
  };
Object.defineProperty(api$1, "config", {
  get: function() {
    var e = config$1.autoReplaceSvg,
      t = config$1.observeMutations,
      r = config$1.showMissingIcons,
      n = objectWithoutProperties(config$1, [
        "autoReplaceSvg",
        "observeMutations",
        "showMissingIcons",
      ]);
    return n;
  },
  set: function(e) {
    update(e);
  },
});
var index_es = Object.freeze({ default: api$1 }),
  faChevronLeft = {
    prefix: "fas",
    iconName: "chevron-left",
    icon: [
      320,
      512,
      [],
      "f053",
      "M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z",
    ],
  },
  faChevronRight = {
    prefix: "fas",
    iconName: "chevron-right",
    icon: [
      320,
      512,
      [],
      "f054",
      "M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z",
    ],
  },
  faExpand = {
    prefix: "fas",
    iconName: "expand",
    icon: [
      448,
      512,
      [],
      "f065",
      "M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z",
    ],
  },
  require$$0$1 = (index_es && api$1) || index_es,
  reactFontawesome = createCommonjsModule(function(e) {
    (function(t, r) {
      e.exports = r(require$$0$1, propTypes, react);
    })(commonjsGlobal, function(e, t, r) {
      "use strict";
      function n(e) {
        if (Array.isArray(e)) {
          for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
          return r;
        }
        return Array.from(e);
      }
      function o(e) {
        return e.charAt(0).toUpperCase() + e.slice(1);
      }
      function i(e) {
        return e
          .split(";")
          .map(function(e) {
            return e.trim();
          })
          .filter(function(e) {
            return e;
          })
          .reduce(function(e, t) {
            var r = t.indexOf(":"),
              n = f.camelize(t.slice(0, r)),
              i = t.slice(r + 1).trim();
            return n.startsWith("webkit") ? (e[o(n)] = i) : (e[n] = i), e;
          }, {});
      }
      function a(e, t) {
        var r = (t.children || []).map(a.bind(null, e));
        return (
          Object.keys(t.attributes || {}).forEach(function(e) {
            var r = t.attributes[e];
            "class" === e
              ? ((t.attributes.className = r), delete t.attributes["class"])
              : "style" === e ? (t.attributes.style = i(r)) : void 0;
          }),
          e.apply(void 0, [t.tag, t.attributes].concat(n(r)))
        );
      }
      function s(e, t, r) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      function c(e, t) {
        return (Array.isArray(t) && 0 < t.length) || (!Array.isArray(t) && t)
          ? s({}, e, t)
          : {};
      }
      function l(e) {
        var t,
          r = ((t = {
            "fa-spin": e.spin,
            "fa-pulse": e.pulse,
            "fa-fw": e.fixedWidth,
            "fa-border": e.border,
            "fa-li": e.listItem,
            "fa-flip-horizontal": "horizontal" === e.flip || "both" === e.flip,
            "fa-flip-vertical": "vertical" === e.flip || "both" === e.flip,
          }),
          s(t, "fa-" + e.size, null !== e.size),
          s(t, "fa-rotate-" + e.rotation, null !== e.rotation),
          s(t, "fa-pull-" + e.pull, null !== e.pull),
          t);
        return Object.keys(r)
          .map(function(e) {
            return r[e] ? e : null;
          })
          .filter(function(e) {
            return e;
          });
      }
      function p(e) {
        return null === e
          ? null
          : "object" === ("undefined" == typeof e ? "undefined" : y(e)) &&
            e.prefix &&
            e.iconName
            ? e
            : Array.isArray(e) && 2 === e.length
              ? { prefix: e[0], iconName: e[1] }
              : "string" == typeof e ? { prefix: "fas", iconName: e } : void 0;
      }
      function d(t) {
        var n = t.icon,
          o = t.compose,
          i = t.symbol,
          s = p(n),
          d = c("classes", l(t)),
          u = c(
            "transform",
            "string" == typeof t.transform
              ? e.parse.transform(t.transform)
              : t.transform
          ),
          f = c("compose", p(o)),
          y = e.icon(s, m({}, d, u, f, { symbol: i }));
        if (!y)
          return (
            !b &&
              console &&
              "function" == typeof console.error &&
              console.error("Could not find icon", s),
            null
          );
        var h = y.abstract,
          g = a.bind(null, r.createElement);
        return g(h[0]);
      }
      (e = e && e.hasOwnProperty("default") ? e["default"] : e),
        (t = t && t.hasOwnProperty("default") ? t["default"] : t),
        (r = r && r.hasOwnProperty("default") ? r["default"] : r);
      var u =
          "undefined" == typeof window
            ? "undefined" == typeof commonjsGlobal
              ? "undefined" == typeof self ? {} : self
              : commonjsGlobal
            : window,
        f = (function(e, t) {
          return (t = { exports: {} }), e(t, t.exports), t.exports;
        })(function(e) {
          (function(t) {
            var r = function(e, t, n) {
                if (!p(t) || u(t) || f(t) || m(t) || c(t)) return t;
                var o,
                  a = 0,
                  i = 0;
                if (d(t))
                  for (o = [], i = t.length; a < i; a++) o.push(r(e, t[a], n));
                else
                  for (var s in ((o = {}), t))
                    Object.prototype.hasOwnProperty.call(t, s) &&
                      (o[e(s, n)] = r(e, t[s], n));
                return o;
              },
              n = function(e, t) {
                t = t || {};
                var r = t.separator || "_",
                  n = t.split || /(?=[A-Z])/;
                return e.split(n).join(r);
              },
              o = function(e) {
                return l(e)
                  ? e
                  : ((e = e.replace(/[\-_\s]+(.)?/g, function(e, t) {
                      return t ? t.toUpperCase() : "";
                    })),
                    e.substr(0, 1).toLowerCase() + e.substr(1));
              },
              i = function(e) {
                var t = o(e);
                return t.substr(0, 1).toUpperCase() + t.substr(1);
              },
              a = function(e, t) {
                return n(e, t).toLowerCase();
              },
              s = Object.prototype.toString,
              c = function(e) {
                return "function" == typeof e;
              },
              p = function(e) {
                return e === Object(e);
              },
              d = function(e) {
                return "[object Array]" == s.call(e);
              },
              u = function(e) {
                return "[object Date]" == s.call(e);
              },
              f = function(e) {
                return "[object RegExp]" == s.call(e);
              },
              m = function(e) {
                return "[object Boolean]" == s.call(e);
              },
              l = function(e) {
                return (e -= 0), e === e;
              },
              y = function(e, t) {
                var r = t && "process" in t ? t.process : t;
                return "function" == typeof r
                  ? function(t, n) {
                      return r(t, e, n);
                    }
                  : e;
              },
              b = {
                camelize: o,
                decamelize: a,
                pascalize: i,
                depascalize: a,
                camelizeKeys: function(e, t) {
                  return r(y(o, t), e);
                },
                decamelizeKeys: function(e, t) {
                  return r(y(a, t), e, t);
                },
                pascalizeKeys: function(e, t) {
                  return r(y(i, t), e);
                },
                depascalizeKeys: function() {
                  return this.decamelizeKeys.apply(this, arguments);
                },
              };
            e.exports ? (e.exports = b) : (t.humps = b);
          })(u);
        }),
        m =
          Object.assign ||
          function(e) {
            for (var t, r = 1; r < arguments.length; r++)
              for (var n in ((t = arguments[r]), t))
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e;
          },
        y =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function(e) {
                return typeof e;
              }
            : function(e) {
                return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              },
        b = !1;
      try {
        b = !1;
      } catch (t) {}
      return (
        (d.propTypes = {
          border: t.bool,
          compose: t.oneOfType([t.object, t.array, t.string]),
          fixedWidth: t.bool,
          flip: t.oneOf(["horizontal", "vertical", "both"]),
          icon: t.oneOfType([t.object, t.array, t.string]),
          listItem: t.bool,
          pull: t.oneOf(["right", "left"]),
          pulse: t.bool,
          name: t.string,
          rotation: t.oneOf([90, 180, 270]),
          size: t.oneOf([
            "lg",
            "xs",
            "sm",
            "1x",
            "2x",
            "3x",
            "4x",
            "5x",
            "6x",
            "7x",
            "8x",
            "9x",
            "10x",
          ]),
          spin: t.bool,
          symbol: t.oneOfType([t.bool, t.string]),
          transform: t.oneOfType([t.string, t.object]),
        }),
        (d.defaultProps = {
          border: !1,
          compose: null,
          fixedWidth: !1,
          flip: null,
          icon: null,
          listItem: !1,
          pull: null,
          pulse: !1,
          name: "",
          rotation: null,
          size: null,
          spin: !1,
          symbol: !1,
          transform: null,
        }),
        d
      );
    });
  });
var __window = "undefined" != typeof window && window,
  __self =
    "undefined" != typeof self &&
    "undefined" != typeof WorkerGlobalScope &&
    self instanceof WorkerGlobalScope &&
    self,
  __global = "undefined" != typeof commonjsGlobal && commonjsGlobal,
  _root = __window || __global || __self,
  root_1 = _root;
(function() {
  if (!_root)
    throw new Error(
      "RxJS could not find any global context (window, self, global)"
    );
})();
var root = { root: root_1 };
function isFunction(e) {
  return "function" == typeof e;
}
var isFunction_2 = isFunction,
  isFunction_1 = { isFunction: isFunction_2 };
var isArray_1 =
    Array.isArray ||
    function(e) {
      return e && "number" == typeof e.length;
    },
  isArray = { isArray: isArray_1 };
function isObject(e) {
  return null != e && "object" == typeof e;
}
var isObject_2 = isObject,
  isObject_1 = { isObject: isObject_2 };
var errorObject_1 = { e: {} },
  errorObject = { errorObject: errorObject_1 };
var tryCatchTarget;
function tryCatcher() {
  try {
    return tryCatchTarget.apply(this, arguments);
  } catch (t) {
    return (errorObject.errorObject.e = t), errorObject.errorObject;
  }
}
function tryCatch(e) {
  return (tryCatchTarget = e), tryCatcher;
}
var tryCatch_2 = tryCatch,
  tryCatch_1 = { tryCatch: tryCatch_2 };
var __extends$2 =
    (commonjsGlobal && commonjsGlobal.__extends) ||
    function(e, t) {
      function r() {
        this.constructor = e;
      }
      for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
      e.prototype =
        null === t ? Object.create(t) : ((r.prototype = t.prototype), new r());
    },
  UnsubscriptionError = (function(e) {
    function t(t) {
      e.call(this), (this.errors = t);
      var r = Error.call(
        this,
        t
          ? t.length +
            " errors occurred during unsubscription:\n  " +
            t
              .map(function(e, t) {
                return t + 1 + ") " + e.toString();
              })
              .join("\n  ")
          : ""
      );
      (this.name = r.name = "UnsubscriptionError"),
        (this.stack = r.stack),
        (this.message = r.message);
    }
    return __extends$2(t, e), t;
  })(Error),
  UnsubscriptionError_2 = UnsubscriptionError,
  UnsubscriptionError_1 = { UnsubscriptionError: UnsubscriptionError_2 };
var Subscription = (function() {
    function e(e) {
      (this.closed = !1),
        (this._parent = null),
        (this._parents = null),
        (this._subscriptions = null),
        e && (this._unsubscribe = e);
    }
    return (
      (e.prototype.unsubscribe = function() {
        var e,
          t = !1;
        if (!this.closed) {
          var r = this,
            n = r._parent,
            o = r._parents,
            i = r._unsubscribe,
            a = r._subscriptions;
          (this.closed = !0),
            (this._parent = null),
            (this._parents = null),
            (this._subscriptions = null);
          for (var s = -1, c = o ? o.length : 0; n; )
            n.remove(this), (n = (++s < c && o[s]) || null);
          if (isFunction_1.isFunction(i)) {
            var l = tryCatch_1.tryCatch(i).call(this);
            l === errorObject.errorObject &&
              ((t = !0),
              (e =
                e ||
                (errorObject.errorObject.e instanceof
                UnsubscriptionError_1.UnsubscriptionError
                  ? flattenUnsubscriptionErrors(
                      errorObject.errorObject.e.errors
                    )
                  : [errorObject.errorObject.e])));
          }
          if (isArray.isArray(a))
            for (s = -1, c = a.length; ++s < c; ) {
              var p = a[s];
              if (isObject_1.isObject(p)) {
                var l = tryCatch_1.tryCatch(p.unsubscribe).call(p);
                if (l === errorObject.errorObject) {
                  (t = !0), (e = e || []);
                  var d = errorObject.errorObject.e;
                  d instanceof UnsubscriptionError_1.UnsubscriptionError
                    ? (e = e.concat(flattenUnsubscriptionErrors(d.errors)))
                    : e.push(d);
                }
              }
            }
          if (t) throw new UnsubscriptionError_1.UnsubscriptionError(e);
        }
      }),
      (e.prototype.add = function(t) {
        if (!t || t === e.EMPTY) return e.EMPTY;
        if (t === this) return this;
        var r = t;
        switch (typeof t) {
          case "function":
            r = new e(t);
          case "object":
            if (r.closed || "function" != typeof r.unsubscribe) return r;
            if (this.closed) return r.unsubscribe(), r;
            if ("function" != typeof r._addParent) {
              var n = r;
              (r = new e()), (r._subscriptions = [n]);
            }
            break;
          default:
            throw new Error(
              "unrecognized teardown " + t + " added to Subscription."
            );
        }
        var o = this._subscriptions || (this._subscriptions = []);
        return o.push(r), r._addParent(this), r;
      }),
      (e.prototype.remove = function(e) {
        var t = this._subscriptions;
        if (t) {
          var r = t.indexOf(e);
          -1 !== r && t.splice(r, 1);
        }
      }),
      (e.prototype._addParent = function(e) {
        var t = this,
          r = t._parent,
          n = t._parents;
        r && r !== e
          ? n ? -1 === n.indexOf(e) && n.push(e) : (this._parents = [e])
          : (this._parent = e);
      }),
      (e.EMPTY = (function(e) {
        return (e.closed = !0), e;
      })(new e())),
      e
    );
  })(),
  Subscription_2 = Subscription;
function flattenUnsubscriptionErrors(e) {
  return e.reduce(function(e, t) {
    return e.concat(
      t instanceof UnsubscriptionError_1.UnsubscriptionError ? t.errors : t
    );
  }, []);
}
var Subscription_1 = { Subscription: Subscription_2 };
var empty = {
    closed: !0,
    next: function() {},
    error: function(e) {
      throw e;
    },
    complete: function() {},
  },
  Observer = { empty: empty },
  rxSubscriber = createCommonjsModule(function(e, t) {
    "use strict";
    var r = root.root.Symbol;
    (t.rxSubscriber =
      "function" == typeof r && "function" == typeof r.for
        ? r.for("rxSubscriber")
        : "@@rxSubscriber"),
      (t.$$rxSubscriber = t.rxSubscriber);
  });
var __extends$1 =
    (commonjsGlobal && commonjsGlobal.__extends) ||
    function(e, t) {
      function r() {
        this.constructor = e;
      }
      for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
      e.prototype =
        null === t ? Object.create(t) : ((r.prototype = t.prototype), new r());
    },
  Subscriber = (function(e) {
    function t(r, n, o) {
      switch ((e.call(this),
      (this.syncErrorValue = null),
      (this.syncErrorThrown = !1),
      (this.syncErrorThrowable = !1),
      (this.isStopped = !1),
      arguments.length)) {
        case 0:
          this.destination = Observer.empty;
          break;
        case 1:
          if (!r) {
            this.destination = Observer.empty;
            break;
          }
          if ("object" == typeof r) {
            r instanceof t
              ? ((this.syncErrorThrowable = r.syncErrorThrowable),
                (this.destination = r),
                this.destination.add(this))
              : ((this.syncErrorThrowable = !0),
                (this.destination = new SafeSubscriber(this, r)));
            break;
          }
        default:
          (this.syncErrorThrowable = !0),
            (this.destination = new SafeSubscriber(this, r, n, o));
      }
    }
    return (
      __extends$1(t, e),
      (t.prototype[rxSubscriber.rxSubscriber] = function() {
        return this;
      }),
      (t.create = function(e, r, n) {
        var o = new t(e, r, n);
        return (o.syncErrorThrowable = !1), o;
      }),
      (t.prototype.next = function(e) {
        this.isStopped || this._next(e);
      }),
      (t.prototype.error = function(e) {
        this.isStopped || ((this.isStopped = !0), this._error(e));
      }),
      (t.prototype.complete = function() {
        this.isStopped || ((this.isStopped = !0), this._complete());
      }),
      (t.prototype.unsubscribe = function() {
        this.closed ||
          ((this.isStopped = !0), e.prototype.unsubscribe.call(this));
      }),
      (t.prototype._next = function(e) {
        this.destination.next(e);
      }),
      (t.prototype._error = function(e) {
        this.destination.error(e), this.unsubscribe();
      }),
      (t.prototype._complete = function() {
        this.destination.complete(), this.unsubscribe();
      }),
      (t.prototype._unsubscribeAndRecycle = function() {
        var e = this,
          t = e._parent,
          r = e._parents;
        return (
          (this._parent = null),
          (this._parents = null),
          this.unsubscribe(),
          (this.closed = !1),
          (this.isStopped = !1),
          (this._parent = t),
          (this._parents = r),
          this
        );
      }),
      t
    );
  })(Subscription_1.Subscription),
  Subscriber_2 = Subscriber,
  SafeSubscriber = (function(e) {
    function t(t, r, n, o) {
      e.call(this), (this._parentSubscriber = t);
      var i,
        a = this;
      isFunction_1.isFunction(r)
        ? (i = r)
        : r &&
          ((i = r.next),
          (n = r.error),
          (o = r.complete),
          r !== Observer.empty &&
            ((a = Object.create(r)),
            isFunction_1.isFunction(a.unsubscribe) &&
              this.add(a.unsubscribe.bind(a)),
            (a.unsubscribe = this.unsubscribe.bind(this)))),
        (this._context = a),
        (this._next = i),
        (this._error = n),
        (this._complete = o);
    }
    return (
      __extends$1(t, e),
      (t.prototype.next = function(e) {
        if (!this.isStopped && this._next) {
          var t = this._parentSubscriber;
          t.syncErrorThrowable
            ? this.__tryOrSetError(t, this._next, e) && this.unsubscribe()
            : this.__tryOrUnsub(this._next, e);
        }
      }),
      (t.prototype.error = function(e) {
        if (!this.isStopped) {
          var t = this._parentSubscriber;
          if (this._error)
            t.syncErrorThrowable
              ? (this.__tryOrSetError(t, this._error, e), this.unsubscribe())
              : (this.__tryOrUnsub(this._error, e), this.unsubscribe());
          else if (!t.syncErrorThrowable) throw (this.unsubscribe(), e);
          else
            (t.syncErrorValue = e),
              (t.syncErrorThrown = !0),
              this.unsubscribe();
        }
      }),
      (t.prototype.complete = function() {
        var e = this;
        if (!this.isStopped) {
          var t = this._parentSubscriber;
          if (this._complete) {
            var r = function() {
              return e._complete.call(e._context);
            };
            t.syncErrorThrowable
              ? (this.__tryOrSetError(t, r), this.unsubscribe())
              : (this.__tryOrUnsub(r), this.unsubscribe());
          } else this.unsubscribe();
        }
      }),
      (t.prototype.__tryOrUnsub = function(e, t) {
        try {
          e.call(this._context, t);
        } catch (e) {
          throw (this.unsubscribe(), e);
        }
      }),
      (t.prototype.__tryOrSetError = function(e, t, r) {
        try {
          t.call(this._context, r);
        } catch (t) {
          return (e.syncErrorValue = t), (e.syncErrorThrown = !0), !0;
        }
        return !1;
      }),
      (t.prototype._unsubscribe = function() {
        var e = this._parentSubscriber;
        (this._context = null),
          (this._parentSubscriber = null),
          e.unsubscribe();
      }),
      t
    );
  })(Subscriber),
  Subscriber_1 = { Subscriber: Subscriber_2 };
function toSubscriber(e, t, r) {
  if (e) {
    if (e instanceof Subscriber_1.Subscriber) return e;
    if (e[rxSubscriber.rxSubscriber]) return e[rxSubscriber.rxSubscriber]();
  }
  return e || t || r
    ? new Subscriber_1.Subscriber(e, t, r)
    : new Subscriber_1.Subscriber(Observer.empty);
}
var toSubscriber_2 = toSubscriber,
  toSubscriber_1 = { toSubscriber: toSubscriber_2 },
  observable = createCommonjsModule(function(e, t) {
    "use strict";
    function r(e) {
      var t,
        r = e.Symbol;
      return (
        "function" == typeof r
          ? r.observable
            ? (t = r.observable)
            : ((t = r("observable")), (r.observable = t))
          : (t = "@@observable"),
        t
      );
    }
    (t.getSymbolObservable = r),
      (t.observable = r(root.root)),
      (t.$$observable = t.observable);
  });
function noop$2() {}
var noop_2 = noop$2,
  noop_1 = { noop: noop_2 };
function pipe() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t - 0] = arguments[t];
  return pipeFromArray(e);
}
var pipe_2 = pipe;
function pipeFromArray(e) {
  return e
    ? 1 === e.length
      ? e[0]
      : function(t) {
          return e.reduce(function(e, t) {
            return t(e);
          }, t);
        }
    : noop_1.noop;
}
var pipeFromArray_1 = pipeFromArray,
  pipe_1 = { pipe: pipe_2, pipeFromArray: pipeFromArray_1 };
var Observable = (function() {
    function e(e) {
      (this._isScalar = !1), e && (this._subscribe = e);
    }
    return (
      (e.prototype.lift = function(t) {
        var r = new e();
        return (r.source = this), (r.operator = t), r;
      }),
      (e.prototype.subscribe = function(e, t, r) {
        var n = this.operator,
          o = toSubscriber_1.toSubscriber(e, t, r);
        if (
          (n
            ? n.call(o, this.source)
            : o.add(
                this.source || !o.syncErrorThrowable
                  ? this._subscribe(o)
                  : this._trySubscribe(o)
              ),
          o.syncErrorThrowable &&
            ((o.syncErrorThrowable = !1), o.syncErrorThrown))
        )
          throw o.syncErrorValue;
        return o;
      }),
      (e.prototype._trySubscribe = function(e) {
        try {
          return this._subscribe(e);
        } catch (t) {
          (e.syncErrorThrown = !0), (e.syncErrorValue = t), e.error(t);
        }
      }),
      (e.prototype.forEach = function(e, t) {
        var r = this;
        if (
          (t ||
            (root.root.Rx && root.root.Rx.config && root.root.Rx.config.Promise
              ? (t = root.root.Rx.config.Promise)
              : root.root.Promise && (t = root.root.Promise)),
          !t)
        )
          throw new Error("no Promise impl found");
        return new t(function(t, n) {
          var o = r.subscribe(
            function(t) {
              if (o)
                try {
                  e(t);
                } catch (e) {
                  n(e), o.unsubscribe();
                }
              else e(t);
            },
            n,
            t
          );
        });
      }),
      (e.prototype._subscribe = function(e) {
        return this.source.subscribe(e);
      }),
      (e.prototype[observable.observable] = function() {
        return this;
      }),
      (e.prototype.pipe = function() {
        for (var e = [], t = 0; t < arguments.length; t++)
          e[t - 0] = arguments[t];
        return 0 === e.length ? this : pipe_1.pipeFromArray(e)(this);
      }),
      (e.prototype.toPromise = function(e) {
        var t = this;
        if (
          (e ||
            (root.root.Rx && root.root.Rx.config && root.root.Rx.config.Promise
              ? (e = root.root.Rx.config.Promise)
              : root.root.Promise && (e = root.root.Promise)),
          !e)
        )
          throw new Error("no Promise impl found");
        return new e(function(e, r) {
          var n;
          t.subscribe(
            function(e) {
              return (n = e);
            },
            function(e) {
              return r(e);
            },
            function() {
              return e(n);
            }
          );
        });
      }),
      (e.create = function(t) {
        return new e(t);
      }),
      e
    );
  })(),
  Observable_2 = Observable,
  Observable_1 = { Observable: Observable_2 };
var __extends$3 =
    (commonjsGlobal && commonjsGlobal.__extends) ||
    function(e, t) {
      function r() {
        this.constructor = e;
      }
      for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
      e.prototype =
        null === t ? Object.create(t) : ((r.prototype = t.prototype), new r());
    },
  ObjectUnsubscribedError = (function(e) {
    function t() {
      var t = e.call(this, "object unsubscribed");
      (this.name = t.name = "ObjectUnsubscribedError"),
        (this.stack = t.stack),
        (this.message = t.message);
    }
    return __extends$3(t, e), t;
  })(Error),
  ObjectUnsubscribedError_2 = ObjectUnsubscribedError,
  ObjectUnsubscribedError_1 = {
    ObjectUnsubscribedError: ObjectUnsubscribedError_2,
  };
var __extends$4 =
    (commonjsGlobal && commonjsGlobal.__extends) ||
    function(e, t) {
      function r() {
        this.constructor = e;
      }
      for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
      e.prototype =
        null === t ? Object.create(t) : ((r.prototype = t.prototype), new r());
    },
  SubjectSubscription = (function(e) {
    function t(t, r) {
      e.call(this),
        (this.subject = t),
        (this.subscriber = r),
        (this.closed = !1);
    }
    return (
      __extends$4(t, e),
      (t.prototype.unsubscribe = function() {
        if (!this.closed) {
          this.closed = !0;
          var e = this.subject,
            t = e.observers;
          if (
            ((this.subject = null),
            !(!t || 0 === t.length || e.isStopped || e.closed))
          ) {
            var r = t.indexOf(this.subscriber);
            -1 !== r && t.splice(r, 1);
          }
        }
      }),
      t
    );
  })(Subscription_1.Subscription),
  SubjectSubscription_2 = SubjectSubscription,
  SubjectSubscription_1 = { SubjectSubscription: SubjectSubscription_2 };
var __extends =
    (commonjsGlobal && commonjsGlobal.__extends) ||
    function(e, t) {
      function r() {
        this.constructor = e;
      }
      for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
      e.prototype =
        null === t ? Object.create(t) : ((r.prototype = t.prototype), new r());
    },
  SubjectSubscriber = (function(e) {
    function t(t) {
      e.call(this, t), (this.destination = t);
    }
    return __extends(t, e), t;
  })(Subscriber_1.Subscriber),
  Subject = (function(e) {
    function t() {
      e.call(this),
        (this.observers = []),
        (this.closed = !1),
        (this.isStopped = !1),
        (this.hasError = !1),
        (this.thrownError = null);
    }
    return (
      __extends(t, e),
      (t.prototype[rxSubscriber.rxSubscriber] = function() {
        return new SubjectSubscriber(this);
      }),
      (t.prototype.lift = function(e) {
        var t = new AnonymousSubject(this, this);
        return (t.operator = e), t;
      }),
      (t.prototype.next = function(e) {
        if (this.closed)
          throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        if (!this.isStopped)
          for (
            var t = this.observers, r = t.length, n = t.slice(), o = 0;
            o < r;
            o++
          )
            n[o].next(e);
      }),
      (t.prototype.error = function(e) {
        if (this.closed)
          throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        (this.hasError = !0), (this.thrownError = e), (this.isStopped = !0);
        for (
          var t = this.observers, r = t.length, n = t.slice(), o = 0;
          o < r;
          o++
        )
          n[o].error(e);
        this.observers.length = 0;
      }),
      (t.prototype.complete = function() {
        if (this.closed)
          throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        this.isStopped = !0;
        for (
          var e = this.observers, t = e.length, r = e.slice(), n = 0;
          n < t;
          n++
        )
          r[n].complete();
        this.observers.length = 0;
      }),
      (t.prototype.unsubscribe = function() {
        (this.isStopped = !0), (this.closed = !0), (this.observers = null);
      }),
      (t.prototype._trySubscribe = function(t) {
        if (this.closed)
          throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        else return e.prototype._trySubscribe.call(this, t);
      }),
      (t.prototype._subscribe = function(e) {
        if (this.closed)
          throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        else
          return this.hasError
            ? (e.error(this.thrownError), Subscription_1.Subscription.EMPTY)
            : this.isStopped
              ? (e.complete(), Subscription_1.Subscription.EMPTY)
              : (this.observers.push(e),
                new SubjectSubscription_1.SubjectSubscription(this, e));
      }),
      (t.prototype.asObservable = function() {
        var e = new Observable_1.Observable();
        return (e.source = this), e;
      }),
      (t.create = function(e, t) {
        return new AnonymousSubject(e, t);
      }),
      t
    );
  })(Observable_1.Observable),
  Subject_2 = Subject,
  AnonymousSubject = (function(e) {
    function t(t, r) {
      e.call(this), (this.destination = t), (this.source = r);
    }
    return (
      __extends(t, e),
      (t.prototype.next = function(e) {
        var t = this.destination;
        t && t.next && t.next(e);
      }),
      (t.prototype.error = function(e) {
        var t = this.destination;
        t && t.error && this.destination.error(e);
      }),
      (t.prototype.complete = function() {
        var e = this.destination;
        e && e.complete && this.destination.complete();
      }),
      (t.prototype._subscribe = function(e) {
        var t = this.source;
        return t ? this.source.subscribe(e) : Subscription_1.Subscription.EMPTY;
      }),
      t
    );
  })(Subject);
var __extends$6 =
    (commonjsGlobal && commonjsGlobal.__extends) ||
    function(e, t) {
      function r() {
        this.constructor = e;
      }
      for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
      e.prototype =
        null === t ? Object.create(t) : ((r.prototype = t.prototype), new r());
    },
  Action = (function(e) {
    function t() {
      e.call(this);
    }
    return (
      __extends$6(t, e),
      (t.prototype.schedule = function(e, t) {
        return void 0 === t && (t = 0), this;
      }),
      t
    );
  })(Subscription_1.Subscription),
  Action_2 = Action,
  Action_1 = { Action: Action_2 };
var __extends$5 =
    (commonjsGlobal && commonjsGlobal.__extends) ||
    function(e, t) {
      function r() {
        this.constructor = e;
      }
      for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
      e.prototype =
        null === t ? Object.create(t) : ((r.prototype = t.prototype), new r());
    },
  AsyncAction = (function(e) {
    function t(t, r) {
      e.call(this, t, r),
        (this.scheduler = t),
        (this.work = r),
        (this.pending = !1);
    }
    return (
      __extends$5(t, e),
      (t.prototype.schedule = function(e, t) {
        if ((void 0 === t && (t = 0), this.closed)) return this;
        (this.state = e), (this.pending = !0);
        var r = this.id,
          n = this.scheduler;
        return (
          null != r && (this.id = this.recycleAsyncId(n, r, t)),
          (this.delay = t),
          (this.id = this.id || this.requestAsyncId(n, this.id, t)),
          this
        );
      }),
      (t.prototype.requestAsyncId = function(e, t, r) {
        return (
          void 0 === r && (r = 0),
          root.root.setInterval(e.flush.bind(e, this), r)
        );
      }),
      (t.prototype.recycleAsyncId = function(e, t, r) {
        return (
          void 0 === r && (r = 0),
          null !== r && this.delay === r && !1 === this.pending
            ? t
            : (root.root.clearInterval(t) && void 0) || void 0
        );
      }),
      (t.prototype.execute = function(e, t) {
        if (this.closed) return new Error("executing a cancelled action");
        this.pending = !1;
        var r = this._execute(e, t);
        return r
          ? r
          : void (
              !1 === this.pending &&
              null != this.id &&
              (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
            );
      }),
      (t.prototype._execute = function(e) {
        var t,
          r = !1;
        try {
          this.work(e);
        } catch (n) {
          (r = !0), (t = (!!n && n) || new Error(n));
        }
        if (r) return this.unsubscribe(), t;
      }),
      (t.prototype._unsubscribe = function() {
        var e = this.id,
          t = this.scheduler,
          r = t.actions,
          n = r.indexOf(this);
        (this.work = null),
          (this.state = null),
          (this.pending = !1),
          (this.scheduler = null),
          -1 !== n && r.splice(n, 1),
          null != e && (this.id = this.recycleAsyncId(t, e, null)),
          (this.delay = null);
      }),
      t
    );
  })(Action_1.Action),
  AsyncAction_2 = AsyncAction,
  AsyncAction_1 = { AsyncAction: AsyncAction_2 };
var Scheduler = (function() {
    function e(t, r) {
      void 0 === r && (r = e.now), (this.SchedulerAction = t), (this.now = r);
    }
    return (
      (e.prototype.schedule = function(e, t, r) {
        return (
          void 0 === t && (t = 0),
          new this.SchedulerAction(this, e).schedule(r, t)
        );
      }),
      (e.now = Date.now
        ? Date.now
        : function() {
            return +new Date();
          }),
      e
    );
  })(),
  Scheduler_2 = Scheduler,
  Scheduler_1 = { Scheduler: Scheduler_2 };
var __extends$7 =
    (commonjsGlobal && commonjsGlobal.__extends) ||
    function(e, t) {
      function r() {
        this.constructor = e;
      }
      for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
      e.prototype =
        null === t ? Object.create(t) : ((r.prototype = t.prototype), new r());
    },
  AsyncScheduler = (function(e) {
    function t() {
      e.apply(this, arguments),
        (this.actions = []),
        (this.active = !1),
        (this.scheduled = void 0);
    }
    return (
      __extends$7(t, e),
      (t.prototype.flush = function(e) {
        var t = this.actions;
        if (this.active) return void t.push(e);
        var r;
        this.active = !0;
        do if ((r = e.execute(e.state, e.delay))) break;
        while ((e = t.shift()));
        if (((this.active = !1), r)) {
          for (; (e = t.shift()); ) e.unsubscribe();
          throw r;
        }
      }),
      t
    );
  })(Scheduler_1.Scheduler),
  AsyncScheduler_2 = AsyncScheduler,
  AsyncScheduler_1 = { AsyncScheduler: AsyncScheduler_2 };
var async_1 = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction),
  async = { async: async_1 };
var __extends$8 =
  (commonjsGlobal && commonjsGlobal.__extends) ||
  function(e, t) {
    function r() {
      this.constructor = e;
    }
    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
    e.prototype =
      null === t ? Object.create(t) : ((r.prototype = t.prototype), new r());
  };
function debounceTime$3(e, t) {
  return (
    void 0 === t && (t = async.async),
    function(r) {
      return r.lift(new DebounceTimeOperator(e, t));
    }
  );
}
var debounceTime_2$2 = debounceTime$3,
  DebounceTimeOperator = (function() {
    function e(e, t) {
      (this.dueTime = e), (this.scheduler = t);
    }
    return (
      (e.prototype.call = function(e, t) {
        return t.subscribe(
          new DebounceTimeSubscriber(e, this.dueTime, this.scheduler)
        );
      }),
      e
    );
  })(),
  DebounceTimeSubscriber = (function(e) {
    function t(t, r, n) {
      e.call(this, t),
        (this.dueTime = r),
        (this.scheduler = n),
        (this.debouncedSubscription = null),
        (this.lastValue = null),
        (this.hasValue = !1);
    }
    return (
      __extends$8(t, e),
      (t.prototype._next = function(e) {
        this.clearDebounce(),
          (this.lastValue = e),
          (this.hasValue = !0),
          this.add(
            (this.debouncedSubscription = this.scheduler.schedule(
              dispatchNext,
              this.dueTime,
              this
            ))
          );
      }),
      (t.prototype._complete = function() {
        this.debouncedNext(), this.destination.complete();
      }),
      (t.prototype.debouncedNext = function() {
        this.clearDebounce(),
          this.hasValue &&
            (this.destination.next(this.lastValue),
            (this.lastValue = null),
            (this.hasValue = !1));
      }),
      (t.prototype.clearDebounce = function() {
        var e = this.debouncedSubscription;
        null !== e &&
          (this.remove(e),
          e.unsubscribe(),
          (this.debouncedSubscription = null));
      }),
      t
    );
  })(Subscriber_1.Subscriber);
function dispatchNext(e) {
  e.debouncedNext();
}
var debounceTime_1 = { debounceTime: debounceTime_2$2 };
function debounceTime$2(e, t) {
  return (
    void 0 === t && (t = async.async), debounceTime_1.debounceTime(e, t)(this)
  );
}
var debounceTime_3 = debounceTime$2,
  debounceTime_2 = { debounceTime: debounceTime_3 };
"use strict",
  (Observable_1.Observable.prototype.debounceTime =
    debounceTime_2.debounceTime);
function baseClamp(e, t, r) {
  return (
    e === e &&
      (void 0 !== r && (e = e <= r ? e : r),
      void 0 !== t && (e = e >= t ? e : t)),
    e
  );
}
var freeGlobal =
    "object" == typeof global$1 &&
    global$1 &&
    global$1.Object === Object &&
    global$1,
  freeSelf = "object" == typeof self && self && self.Object === Object && self,
  root$2 = freeGlobal || freeSelf || Function("return this")(),
  Symbol$1 = root$2.Symbol;
function arrayMap(e, t) {
  for (var r = -1, n = null == e ? 0 : e.length, o = Array(n); ++r < n; )
    o[r] = t(e[r], r, e);
  return o;
}
var isArray$2 = Array.isArray,
  objectProto = Object.prototype,
  hasOwnProperty$1 = objectProto.hasOwnProperty,
  nativeObjectToString = objectProto.toString,
  symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
function getRawTag(e) {
  var t = hasOwnProperty$1.call(e, symToStringTag$1),
    r = e[symToStringTag$1];
  try {
    e[symToStringTag$1] = void 0;
  } catch (t) {}
  var n = nativeObjectToString.call(e);
  return t ? (e[symToStringTag$1] = r) : delete e[symToStringTag$1], n;
}
var objectProto$1 = Object.prototype,
  nativeObjectToString$1 = objectProto$1.toString;
function objectToString(e) {
  return nativeObjectToString$1.call(e);
}
var nullTag = "[object Null]",
  undefinedTag = "[object Undefined]",
  symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
function baseGetTag(e) {
  return null == e
    ? void 0 === e ? undefinedTag : nullTag
    : symToStringTag && symToStringTag in Object(e)
      ? getRawTag(e)
      : objectToString(e);
}
function isObjectLike(e) {
  return null != e && "object" == typeof e;
}
var symbolTag = "[object Symbol]";
function isSymbol(e) {
  return (
    "symbol" == typeof e || (isObjectLike(e) && baseGetTag(e) == symbolTag)
  );
}
var INFINITY = 1 / 0,
  symbolProto = Symbol$1 ? Symbol$1.prototype : void 0,
  symbolToString = symbolProto ? symbolProto.toString : void 0;
function baseToString(e) {
  if ("string" == typeof e) return e;
  if (isArray$2(e)) return arrayMap(e, baseToString) + "";
  if (isSymbol(e)) return symbolToString ? symbolToString.call(e) : "";
  var t = e + "";
  return "0" == t && 1 / e == -INFINITY ? "-0" : t;
}
function isObject$1(e) {
  var t = typeof e;
  return null != e && ("object" == t || "function" == t);
}
var NAN = 0 / 0,
  reTrim = /^\s+|\s+$/g,
  reIsBadHex = /^[-+]0x[0-9a-f]+$/i,
  reIsBinary = /^0b[01]+$/i,
  reIsOctal = /^0o[0-7]+$/i,
  freeParseInt = parseInt;
function toNumber(e) {
  if ("number" == typeof e) return e;
  if (isSymbol(e)) return NAN;
  if (isObject$1(e)) {
    var t = "function" == typeof e.valueOf ? e.valueOf() : e;
    e = isObject$1(t) ? t + "" : t;
  }
  if ("string" != typeof e) return 0 === e ? e : +e;
  e = e.replace(reTrim, "");
  var r = reIsBinary.test(e);
  return r || reIsOctal.test(e)
    ? freeParseInt(e.slice(2), r ? 2 : 8)
    : reIsBadHex.test(e) ? NAN : +e;
}
var INFINITY$1 = 1 / 0,
  MAX_INTEGER = 1.7976931348623157e308;
function toFinite(e) {
  if (!e) return 0 === e ? e : 0;
  if (((e = toNumber(e)), e === INFINITY$1 || e === -INFINITY$1)) {
    var t = 0 > e ? -1 : 1;
    return t * MAX_INTEGER;
  }
  return e === e ? e : 0;
}
function toInteger(e) {
  var t = toFinite(e),
    r = t % 1;
  return t === t ? (r ? t - r : t) : 0;
}
function toString(e) {
  return null == e ? "" : baseToString(e);
}
function startsWith(e, t, r) {
  return (
    (e = toString(e)),
    (r = null == r ? 0 : baseClamp(toInteger(r), 0, e.length)),
    (t = baseToString(t)),
    e.slice(r, r + t.length) == t
  );
}
var hexToBase64 = function(e) {
    for (
      var t,
        r = e
          .replace(/\r|\n/g, "")
          .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
          .replace(/ +$/, "")
          .split(" "),
        n = 32768,
        o = 0,
        i = r.length,
        a = "";
      o < i;

    )
      (t = r.slice(o, o + n)),
        (a += String.fromCharCode.apply(null, t)),
        (o += n);
    return window.btoa(a);
  },
  createImageSrc = function(e) {
    return -1 < e.indexOf("<svg")
      ? "data:image/svg+xml," + escape(e)
      : startsWith(e, "PD94")
        ? "data:image/svg+xml;base64," + e
        : "data:image/png;base64," + hexToBase64(e);
  },
  createHtmlSrc = function(e) {
    return "data:text/html;charset=utf-8," + escape(e);
  },
  styles$1 = {
    container: "_container_1g5c2_1",
    image: "_image_1g5c2_10",
    bottomBar: "_bottomBar_1g5c2_20",
    button: "_button_1g5c2_42",
    disabled: "_disabled_1g5c2_66",
  },
  asyncGenerator = (function() {
    function e(e) {
      this.value = e;
    }
    function t(t) {
      function r(o, i) {
        try {
          var a = t[o](i),
            s = a.value;
          s instanceof e
            ? Promise.resolve(s.value).then(
                function(e) {
                  r("next", e);
                },
                function(e) {
                  r("throw", e);
                }
              )
            : n(a.done ? "return" : "normal", a.value);
        } catch (e) {
          n("throw", e);
        }
      }
      function n(e, t) {
        "return" === e
          ? o.resolve({ value: t, done: !0 })
          : "throw" === e ? o.reject(t) : o.resolve({ value: t, done: !1 });
        (o = o.next), o ? r(o.key, o.arg) : (i = null);
      }
      var o, i;
      (this._invoke = function(e, t) {
        return new Promise(function(n, a) {
          var s = { key: e, arg: t, resolve: n, reject: a, next: null };
          i ? (i = i.next = s) : ((o = i = s), r(e, t));
        });
      }),
        "function" != typeof t.return && (this.return = void 0);
    }
    return (
      "function" == typeof Symbol &&
        Symbol.asyncIterator &&
        (t.prototype[Symbol.asyncIterator] = function() {
          return this;
        }),
      (t.prototype.next = function(e) {
        return this._invoke("next", e);
      }),
      (t.prototype.throw = function(e) {
        return this._invoke("throw", e);
      }),
      (t.prototype.return = function(e) {
        return this._invoke("return", e);
      }),
      {
        wrap: function(e) {
          return function() {
            return new t(e.apply(this, arguments));
          };
        },
        await: function(t) {
          return new e(t);
        },
      }
    );
  })(),
  classCallCheck$1 = function(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  },
  createClass$1 = (function() {
    function e(e, t) {
      for (var r, n = 0; n < t.length; n++)
        (r = t[n]),
          (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
    }
    return function(t, r, n) {
      return r && e(t.prototype, r), n && e(t, n), t;
    };
  })(),
  inherits = function(e, t) {
    if ("function" != typeof t && null !== t)
      throw new TypeError(
        "Super expression must either be null or a function, not " + typeof t
      );
    (e.prototype = Object.create(t && t.prototype, {
      constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
    })),
      t &&
        (Object.setPrototypeOf
          ? Object.setPrototypeOf(e, t)
          : (e.__proto__ = t));
  },
  possibleConstructorReturn = function(e, t) {
    if (!e)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return t && ("object" == typeof t || "function" == typeof t) ? t : e;
  },
  Plot$1 = (function(e) {
    function t(e, r) {
      classCallCheck$1(this, t);
      var n = possibleConstructorReturn(
        this,
        (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r)
      );
      return (
        (n.resizeObs = new Subject_2()),
        (n.expand = api$1.icon(faExpand).node[0]),
        n.expand.addEventListener("click", function() {
          n.props.expand(n.props.sources[n.props.currentIndex]);
        }),
        n
      );
    }
    return (
      inherits(t, e),
      createClass$1(t, [
        {
          key: "componentDidMount",
          value: function() {
            var e = this;
            if (this.props.glContainer) {
              var t = this;
              this.props.glContainer.on("tab", function(r) {
                0 < t.props.sources.length && r.element.append(e.expand);
              });
            }
            this.subscription = this.resizeObs
              .debounceTime(100)
              .subscribe(function(t) {
                e.props.resizePlot(
                  t.currentIndex,
                  e.props.exercise.language,
                  t.width,
                  t.height - 48
                );
              });
          },
        },
        {
          key: "componentWillUnmount",
          value: function() {
            this.subscription.unsubscribe();
          },
        },
        {
          key: "componentWillReceiveProps",
          value: function(e) {
            if (this.props.glContainer) {
              var t = this.props.glContainer.tab;
              t &&
                e.sources.length > this.props.sources.length &&
                (this.props.glContainer.parent.parent.setActiveContentItem(
                  t.contentItem
                ),
                0 === this.props.sources.length &&
                  t.element.append(this.expand));
            }
          },
        },
        {
          key: "render",
          value: function() {
            var e = this,
              t = this.props,
              r = t.sources,
              n = t.currentIndex,
              o = t.setIndex,
              i = react.createElement("img", {
                className: "" + styles$1.image,
                alt: "plot",
                role: "presentation",
                src:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
              });
            if (0 < r.length) {
              var a = r[n];
              i =
                "html" === a.type
                  ? react.createElement("iframe", {
                      className: "" + styles$1.image,
                      alt: "plot",
                      role: "presentation",
                      src: createHtmlSrc(a.src),
                      frameBorder: "0",
                    })
                  : react.createElement("img", {
                      className: "" + styles$1.image,
                      alt: "plot",
                      role: "presentation",
                      src: createImageSrc(a.src),
                    });
            }
            var s = this.props.glContainer;
            s &&
              s.on("resize", function() {
                e.resizeObs.next({
                  currentIndex: n,
                  width: s.width,
                  height: s.height,
                });
              });
            return react.createElement(
              "div",
              { className: "graphical-output-container " + styles$1.container },
              react.createElement("div", { className: "" + styles$1.image }, i),
              0 < r.length
                ? react.createElement(
                    "div",
                    { className: "" + styles$1.bottomBar },
                    react.createElement(
                      "div",
                      null,
                      !!(0 < n) &&
                        react.createElement(
                          "button",
                          {
                            className:
                              "btn btn-small btn-secondary m0 " +
                              styles$1.button,
                            onClick: function() {
                              s &&
                                e.resizeObs.next({
                                  currentIndex: n - 1,
                                  width: s.width,
                                  height: s.height,
                                }),
                                o(n - 1);
                            },
                          },
                          react.createElement(reactFontawesome, {
                            icon: faChevronLeft,
                          }),
                          "Previous Plot"
                        )
                    ),
                    react.createElement("span", null, n + 1 + "/" + r.length),
                    react.createElement(
                      "div",
                      null,
                      !!(n + 1 < r.length) &&
                        react.createElement(
                          "button",
                          {
                            className:
                              "btn btn-small btn-secondary m0 " +
                              styles$1.button,
                            onClick: function() {
                              s &&
                                e.resizeObs.next({
                                  currentIndex: n + 1,
                                  width: s.width,
                                  height: s.height,
                                }),
                                o(n + 1);
                            },
                          },
                          "Next Plot",
                          react.createElement(reactFontawesome, {
                            icon: faChevronRight,
                            style: { marginLeft: "0.5rem", marginRight: "0" },
                          })
                        )
                    )
                  )
                : react.createElement(
                    "div",
                    { className: "" + styles$1.bottomBar },
                    react.createElement("span", null, "No plots yet.")
                  )
            );
          },
        },
      ]),
      t
    );
  })(react.Component);
(Plot$1.propTypes = {
  sources: propTypes.arrayOf(
    propTypes.shape({ type: propTypes.string, src: propTypes.string })
  ),
  currentIndex: propTypes.number,
  setIndex: propTypes.func.isRequired,
  exercise: propTypes.shape({
    language: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
  }).isRequired,
  resizePlot: propTypes.func.isRequired,
  expand: propTypes.func.isRequired,
  glContainer: propTypes.object,
}),
  (Plot$1.defaultProps = { currentIndex: 0, glContainer: null }),
  (module.exports = Plot$1);
