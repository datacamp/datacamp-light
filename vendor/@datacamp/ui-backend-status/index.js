"use strict";
function _interopDefault(e) {
  return e && "object" == typeof e && "default" in e ? e["default"] : e;
}
var React = _interopDefault(require("react")),
  PropTypes = _interopDefault(require("prop-types")),
  faCircle = {
    prefix: "fas",
    iconName: "circle",
    icon: [
      512,
      512,
      [],
      "f111",
      "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z",
    ],
  };
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
var noop$1 = function() {},
  _WINDOW = {},
  _DOCUMENT = {},
  _MUTATION_OBSERVER$1 = null,
  _PERFORMANCE = { mark: noop$1, measure: noop$1 };
try {
  "undefined" != typeof window && (_WINDOW = window),
    "undefined" != typeof document && (_DOCUMENT = document),
    "undefined" != typeof MutationObserver &&
      (_MUTATION_OBSERVER$1 = MutationObserver),
    "undefined" != typeof performance && (_PERFORMANCE = performance);
} catch (t) {}
var _ref = _WINDOW.navigator || {},
  _ref$userAgent = _ref.userAgent,
  userAgent = _ref$userAgent === void 0 ? "" : _ref$userAgent,
  WINDOW = _WINDOW,
  DOCUMENT = _DOCUMENT,
  MUTATION_OBSERVER = _MUTATION_OBSERVER$1,
  PERFORMANCE = _PERFORMANCE,
  IS_BROWSER = !!WINDOW.document,
  IS_DOM =
    !!DOCUMENT.documentElement &&
    !!DOCUMENT.head &&
    "function" == typeof DOCUMENT.addEventListener &&
    "function" == typeof DOCUMENT.createElement,
  IS_IE = ~userAgent.indexOf("MSIE") || ~userAgent.indexOf("Trident/"),
  NAMESPACE_IDENTIFIER = "___FONT_AWESOME___",
  UNITS_IN_GRID = 16,
  DEFAULT_FAMILY_PREFIX = "fa",
  DEFAULT_REPLACEMENT_CLASS = "svg-inline--fa",
  DATA_FA_I2SVG = "data-fa-i2svg",
  DATA_FA_PSEUDO_ELEMENT = "data-fa-pseudo-element",
  HTML_CLASS_I2SVG_BASE_CLASS = "fontawesome-i2svg",
  PRODUCTION = (function() {
    try {
      return !1;
    } catch (t) {
      return !1;
    }
  })(),
  oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  oneToTwenty = oneToTen.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
  ATTRIBUTES_WATCHED_FOR_MUTATION = [
    "class",
    "data-prefix",
    "data-icon",
    "data-fa-transform",
    "data-fa-mask",
  ],
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
      for (var a, r = 0; r < t.length; r++)
        (a = t[r]),
          (a.enumerable = a.enumerable || !1),
          (a.configurable = !0),
          "value" in a && (a.writable = !0),
          Object.defineProperty(e, a.key, a);
    }
    return function(t, a, i) {
      return a && e(t.prototype, a), i && e(t, i), t;
    };
  })(),
  _extends =
    Object.assign ||
    function(e) {
      for (var t, a = 1; a < arguments.length; a++)
        for (var i in ((t = arguments[a]), t))
          Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
      return e;
    },
  toConsumableArray = function(e) {
    if (Array.isArray(e)) {
      for (var t = 0, a = Array(e.length); t < e.length; t++) a[t] = e[t];
      return a;
    }
    return Array.from(e);
  },
  initial = WINDOW.FontAwesomeConfig || {},
  initialKeys = Object.keys(initial),
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
    initial
  );
_default.autoReplaceSvg || (_default.observeMutations = !1);
var config$1 = _extends({}, _default);
WINDOW.FontAwesomeConfig = config$1;
function update(e) {
  var t = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : {},
    a = t.asNewDefault,
    i = Object.keys(config$1),
    r =
      a !== void 0 && a
        ? function(e) {
            return ~i.indexOf(e) && !~initialKeys.indexOf(e);
          }
        : function(e) {
            return ~i.indexOf(e);
          };
  Object.keys(e).forEach(function(t) {
    r(t) && (config$1[t] = e[t]);
  });
}
function auto(e) {
  update({ autoReplaceSvg: e, observeMutations: e });
}
var w = WINDOW || {};
w[NAMESPACE_IDENTIFIER] || (w[NAMESPACE_IDENTIFIER] = {}),
  w[NAMESPACE_IDENTIFIER].styles || (w[NAMESPACE_IDENTIFIER].styles = {}),
  w[NAMESPACE_IDENTIFIER].hooks || (w[NAMESPACE_IDENTIFIER].hooks = {}),
  w[NAMESPACE_IDENTIFIER].shims || (w[NAMESPACE_IDENTIFIER].shims = []);
var namespace = w[NAMESPACE_IDENTIFIER],
  functions = [],
  listener = function e() {
    DOCUMENT.removeEventListener("DOMContentLoaded", e),
      (loaded = 1),
      functions.map(function(e) {
        return e();
      });
  },
  loaded = !1;
IS_DOM &&
  ((loaded = (DOCUMENT.documentElement.doScroll
    ? /^loaded|^c/
    : /^loaded|^i|^c/).test(DOCUMENT.readyState)),
  !loaded && DOCUMENT.addEventListener("DOMContentLoaded", listener));
var domready = function(e) {
    IS_DOM && (loaded ? setTimeout(e, 0) : functions.push(e));
  },
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
function bunker(e) {
  try {
    e();
  } catch (t) {
    if (!PRODUCTION) throw t;
  }
}
function insertCss(e) {
  if (e && IS_DOM) {
    var t = DOCUMENT.createElement("style");
    t.setAttribute("type", "text/css"), (t.innerHTML = e);
    for (
      var a = DOCUMENT.head.childNodes, r = null, n = a.length - 1;
      -1 < n;
      n--
    ) {
      var i = a[n],
        s = (i.tagName || "").toUpperCase();
      -1 < ["STYLE", "LINK"].indexOf(s) && (r = i);
    }
    return DOCUMENT.head.insertBefore(t, r), e;
  }
}
var _uniqueId = 0;
function nextUniqueId() {
  return _uniqueId++, _uniqueId;
}
function toArray(e) {
  for (var t = [], a = (e || []).length >>> 0; a--; ) t[a] = e[a];
  return t;
}
function classArray(e) {
  return e.classList
    ? toArray(e.classList)
    : (e.getAttribute("class") || "").split(" ").filter(function(e) {
        return e;
      });
}
function getIconName(e, t) {
  var a = t.split("-"),
    i = a[0],
    r = a.slice(1).join("-");
  return i !== e || "" === r || isReserved(r) ? null : r;
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
    .reduce(function(t, a) {
      return t + (a + '="' + htmlEscape(e[a]) + '" ');
    }, "")
    .trim();
}
function joinStyles(e) {
  return Object.keys(e || {}).reduce(function(t, a) {
    return t + (a + ": " + e[a] + ";");
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
    a = e.containerWidth,
    i = e.iconWidth,
    r = "translate(" + 32 * t.x + ", " + 32 * t.y + ") ",
    n =
      "scale(" +
      t.size / 16 * (t.flipX ? -1 : 1) +
      ", " +
      t.size / 16 * (t.flipY ? -1 : 1) +
      ") ",
    s = "rotate(" + t.rotate + " 0 0)";
  return {
    outer: { transform: "translate(" + a / 2 + " 256)" },
    inner: { transform: r + " " + n + " " + s },
    path: { transform: "translate(" + -1 * (i / 2) + " -256)" },
  };
}
function transformForCss(e) {
  var t = e.transform,
    a = e.width,
    i = void 0 === a ? UNITS_IN_GRID : a,
    r = e.height,
    n = void 0 === r ? UNITS_IN_GRID : r,
    s = e.startCentered,
    o = void 0 !== s && s,
    l = "";
  return (
    (l +=
      o && IS_IE
        ? "translate(" + (t.x / d - i / 2) + "em, " + (t.y / d - n / 2) + "em) "
        : o
          ? "translate(calc(-50% + " +
            t.x / d +
            "em), calc(-50% + " +
            t.y / d +
            "em)) "
          : "translate(" + t.x / d + "em, " + t.y / d + "em) "),
    (l +=
      "scale(" +
      t.size / d * (t.flipX ? -1 : 1) +
      ", " +
      t.size / d * (t.flipY ? -1 : 1) +
      ") "),
    (l += "rotate(" + t.rotate + "deg) "),
    l
  );
}
var ALL_SPACE = { x: 0, y: 0, width: "100%", height: "100%" },
  makeIconMasking = function(e) {
    var t = e.children,
      a = e.attributes,
      i = e.main,
      r = e.mask,
      n = e.transform,
      s = i.width,
      o = i.icon,
      l = r.width,
      f = r.icon,
      c = transformForSvg({ transform: n, containerWidth: l, iconWidth: s }),
      d = {
        tag: "rect",
        attributes: _extends({}, ALL_SPACE, { fill: "white" }),
      },
      u = {
        tag: "g",
        attributes: _extends({}, c.inner),
        children: [
          {
            tag: "path",
            attributes: _extends({}, o.attributes, c.path, { fill: "black" }),
          },
        ],
      },
      m = { tag: "g", attributes: _extends({}, c.outer), children: [u] },
      p = "mask-" + nextUniqueId(),
      g = "clip-" + nextUniqueId(),
      h = {
        tag: "mask",
        attributes: _extends({}, ALL_SPACE, {
          id: p,
          maskUnits: "userSpaceOnUse",
          maskContentUnits: "userSpaceOnUse",
        }),
        children: [d, m],
      };
    return (
      t.push(
        {
          tag: "defs",
          children: [
            { tag: "clipPath", attributes: { id: g }, children: [f] },
            h,
          ],
        },
        {
          tag: "rect",
          attributes: _extends(
            {
              fill: "currentColor",
              "clip-path": "url(#" + g + ")",
              mask: "url(#" + p + ")",
            },
            ALL_SPACE
          ),
        }
      ),
      { children: t, attributes: a }
    );
  },
  makeIconStandard = function(e) {
    var t = e.children,
      a = e.attributes,
      i = e.main,
      r = e.transform,
      n = e.styles,
      s = joinStyles(n);
    if ((0 < s.length && (a.style = s), transformIsMeaningful(r))) {
      var o = transformForSvg({
        transform: r,
        containerWidth: i.width,
        iconWidth: i.width,
      });
      t.push({
        tag: "g",
        attributes: _extends({}, o.outer),
        children: [
          {
            tag: "g",
            attributes: _extends({}, o.inner),
            children: [
              {
                tag: i.icon.tag,
                children: i.icon.children,
                attributes: _extends({}, i.icon.attributes, o.path),
              },
            ],
          },
        ],
      });
    } else t.push(i.icon);
    return { children: t, attributes: a };
  },
  asIcon = function(e) {
    var t = e.children,
      a = e.main,
      i = e.mask,
      r = e.attributes,
      n = e.styles,
      s = e.transform;
    if (transformIsMeaningful(s) && a.found && !i.found) {
      var o = a.width,
        l = a.height,
        f = { x: o / l / 2, y: 0.5 };
      r.style = joinStyles(
        _extends({}, n, {
          "transform-origin": f.x + s.x / 16 + "em " + (f.y + s.y / 16) + "em",
        })
      );
    }
    return [{ tag: "svg", attributes: r, children: t }];
  },
  asSymbol = function(e) {
    var t = e.prefix,
      a = e.iconName,
      i = e.children,
      r = e.attributes,
      n = e.symbol,
      s = !0 === n ? t + "-" + config$1.familyPrefix + "-" + a : n;
    return [
      {
        tag: "svg",
        attributes: { style: "display: none;" },
        children: [
          {
            tag: "symbol",
            attributes: _extends({}, r, { id: s }),
            children: i,
          },
        ],
      },
    ];
  };
function makeInlineSvgAbstract(e) {
  var t = e.icons,
    a = t.main,
    i = t.mask,
    r = e.prefix,
    n = e.iconName,
    s = e.transform,
    o = e.symbol,
    l = e.title,
    f = e.extra,
    c = e.watchable,
    d = i.found ? i : a,
    u = d.width,
    m = d.height,
    p = "fa-w-" + Math.ceil(16 * (u / m)),
    g = [config$1.replacementClass, n ? config$1.familyPrefix + "-" + n : "", p]
      .concat(f.classes)
      .join(" "),
    h = {
      children: [],
      attributes: _extends({}, f.attributes, {
        "data-prefix": r,
        "data-icon": n,
        class: g,
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 " + u + " " + m,
      }),
    };
  void 0 !== c && c && (h.attributes[DATA_FA_I2SVG] = ""),
    l &&
      h.children.push({
        tag: "title",
        attributes: {
          id: h.attributes["aria-labelledby"] || "title-" + nextUniqueId(),
        },
        children: [l],
      });
  var b = _extends({}, h, {
      prefix: r,
      iconName: n,
      main: a,
      mask: i,
      transform: s,
      symbol: o,
      styles: f.styles,
    }),
    y = i.found && a.found ? makeIconMasking(b) : makeIconStandard(b),
    x = y.children,
    w = y.attributes;
  return (b.children = x), (b.attributes = w), o ? asSymbol(b) : asIcon(b);
}
function makeLayersTextAbstract(e) {
  var t = e.content,
    a = e.width,
    i = e.height,
    r = e.transform,
    n = e.title,
    s = e.extra,
    o = e.watchable,
    l = _extends({}, s.attributes, n ? { title: n } : {}, {
      class: s.classes.join(" "),
    });
  void 0 !== o && o && (l[DATA_FA_I2SVG] = "");
  var f = _extends({}, s.styles);
  transformIsMeaningful(r) &&
    ((f.transform = transformForCss({
      transform: r,
      startCentered: !0,
      width: a,
      height: i,
    })),
    (f["-webkit-transform"] = f.transform));
  var c = joinStyles(f);
  0 < c.length && (l.style = c);
  var d = [];
  return (
    d.push({ tag: "span", attributes: l, children: [t] }),
    n &&
      d.push({ tag: "span", attributes: { class: "sr-only" }, children: [n] }),
    d
  );
}
var noop$2 = function() {},
  p =
    config$1.measurePerformance &&
    PERFORMANCE &&
    PERFORMANCE.mark &&
    PERFORMANCE.measure
      ? PERFORMANCE
      : { mark: noop$2, measure: noop$2 },
  preamble = 'FA "5.0.7"',
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
var bindInternal4 = function(e, t) {
  return function(i, a, r, n) {
    return e.call(t, i, a, r, n);
  };
};
var reduce = function(e, t, a, r) {
    var n,
      i,
      s,
      o = Object.keys(e),
      l = o.length,
      f = r === void 0 ? t : bindInternal4(t, r);
    for (
      void 0 === a ? ((n = 1), (s = e[o[0]])) : ((n = 0), (s = a));
      n < l;
      n++
    )
      (i = o[n]), (s = f(s, e[i], i, e));
    return s;
  },
  styles$2 = namespace.styles,
  shims = namespace.shims,
  _byUnicode = {},
  _byLigature = {},
  _byOldName = {},
  build = function() {
    var e = function(e) {
      return reduce(
        styles$2,
        function(t, a, i) {
          return (t[i] = reduce(a, e, {})), t;
        },
        {}
      );
    };
    (_byUnicode = e(function(e, t, a) {
      return (e[t[3]] = a), e;
    })),
      (_byLigature = e(function(e, t, a) {
        var i = t[2];
        return (
          (e[a] = a),
          i.forEach(function(t) {
            e[t] = a;
          }),
          e
        );
      }));
    _byOldName = reduce(
      shims,
      function(e, t) {
        var a = t[0],
          i = t[1],
          r = t[2];
        return (
          "far" !== i || "far" in styles$2 || (i = "fas"),
          (e[a] = { prefix: i, iconName: r }),
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
var styles$1 = namespace.styles,
  emptyCanonicalIcon = function() {
    return { prefix: null, iconName: null, rest: [] };
  };
function getCanonicalIcon(e) {
  return e.reduce(function(e, t) {
    var a = getIconName(config$1.familyPrefix, t);
    if (styles$1[t]) e.prefix = t;
    else if (a) {
      var i = "fa" === e.prefix ? byOldName(a) : {};
      (e.iconName = i.iconName || a), (e.prefix = i.prefix || e.prefix);
    } else
      t !== config$1.replacementClass &&
        0 !== t.indexOf("fa-w-") &&
        e.rest.push(t);
    return e;
  }, emptyCanonicalIcon());
}
function iconFromMapping(e, t, a) {
  if (e && e[t] && e[t][a]) return { prefix: t, iconName: a, icon: e[t][a] };
}
function toHtml(e) {
  var t = e.tag,
    a = e.attributes,
    i = a === void 0 ? {} : a,
    r = e.children,
    n = r === void 0 ? [] : r;
  return "string" == typeof e
    ? htmlEscape(e)
    : "<" +
      t +
      " " +
      joinAttributes(i) +
      ">" +
      n.map(toHtml).join("") +
      "</" +
      t +
      ">";
}
var noop$1$1 = function() {};
function isWatched(e) {
  var t = e.getAttribute ? e.getAttribute(DATA_FA_I2SVG) : null;
  return "string" == typeof t;
}
function getMutator() {
  if (!0 === config$1.autoReplaceSvg) return mutators.replace;
  var e = mutators[config$1.autoReplaceSvg];
  return e || mutators.replace;
}
var mutators = {
  replace: function(e) {
    var t = e[0],
      a = e[1],
      i = a
        .map(function(e) {
          return toHtml(e);
        })
        .join("\n");
    if (t.parentNode && t.outerHTML)
      t.outerHTML =
        i +
        (config$1.keepOriginalSource && "svg" !== t.tagName.toLowerCase()
          ? "<!-- " + t.outerHTML + " -->"
          : "");
    else if (t.parentNode) {
      var r = document.createElement("span");
      t.parentNode.replaceChild(r, t), (r.outerHTML = i);
    }
  },
  nest: function(e) {
    var t = e[0],
      a = e[1];
    if (~classArray(t).indexOf(config$1.replacementClass))
      return mutators.replace(e);
    var i = new RegExp(config$1.familyPrefix + "-.*");
    delete a[0].attributes.style;
    var r = a[0].attributes.class.split(" ").reduce(function(e, t) {
      return (
        t === config$1.replacementClass || t.match(i)
          ? e.toSvg.push(t)
          : e.toNode.push(t),
        e
      );
    }, { toNode: [], toSvg: [] });
    a[0].attributes.class = r.toSvg.join(" ");
    var n = a
      .map(function(e) {
        return toHtml(e);
      })
      .join("\n");
    t.setAttribute("class", r.toNode.join(" ")),
      t.setAttribute(DATA_FA_I2SVG, ""),
      (t.innerHTML = n);
  },
};
function perform(e, t) {
  var a = "function" == typeof t ? t : noop$1$1;
  if (0 === e.length) a();
  else {
    var i =
      WINDOW.requestAnimationFrame ||
      function(e) {
        return e();
      };
    i(function() {
      var t = getMutator(),
        i = perf.begin("mutate");
      e.map(t), i(), a();
    });
  }
}
var disabled = !1;
function disableObservation(e) {
  (disabled = !0), e(), (disabled = !1);
}
var mo = null;
function observe(e) {
  if (MUTATION_OBSERVER) {
    var t = e.treeCallback,
      a = e.nodeCallback,
      i = e.pseudoElementsCallback;
    (mo = new MUTATION_OBSERVER(function(e) {
      disabled ||
        toArray(e).forEach(function(e) {
          if (
            ("childList" === e.type &&
              0 < e.addedNodes.length &&
              !isWatched(e.addedNodes[0]) &&
              (config$1.searchPseudoElements && i(e.target), t(e.target)),
            "attributes" === e.type &&
              e.target.parentNode &&
              config$1.searchPseudoElements &&
              i(e.target.parentNode),
            "attributes" === e.type &&
              isWatched(e.target) &&
              ~ATTRIBUTES_WATCHED_FOR_MUTATION.indexOf(e.attributeName))
          )
            if ("class" === e.attributeName) {
              var r = getCanonicalIcon(classArray(e.target)),
                n = r.prefix,
                s = r.iconName;
              n && e.target.setAttribute("data-prefix", n),
                s && e.target.setAttribute("data-icon", s);
            } else a(e.target);
        });
    })),
      IS_DOM &&
        mo.observe(DOCUMENT.getElementsByTagName("body")[0], {
          childList: !0,
          attributes: !0,
          characterData: !0,
          subtree: !0,
        });
  }
}
function disconnect() {
  mo && mo.disconnect();
}
var styleParser = function(e) {
  var t = e.getAttribute("style"),
    a = [];
  return (
    t &&
      (a = t.split(";").reduce(function(e, t) {
        var a = t.split(":"),
          i = a[0],
          r = a.slice(1);
        return i && 0 < r.length && (e[i] = r.join(":").trim()), e;
      }, {})),
    a
  );
};
function toHex(e) {
  for (var t, a = "", r = 0; r < e.length; r++)
    (t = e.charCodeAt(r).toString(16)), (a += ("000" + t).slice(-4));
  return a;
}
var classParser = function(e) {
    var t = e.getAttribute("data-prefix"),
      a = e.getAttribute("data-icon"),
      i = void 0 === e.innerText ? "" : e.innerText.trim(),
      r = getCanonicalIcon(classArray(e));
    return (
      t && a && ((r.prefix = t), (r.iconName = a)),
      r.prefix && 1 < i.length
        ? (r.iconName = byLigature(r.prefix, e.innerText))
        : r.prefix &&
          1 === i.length &&
          (r.iconName = byUnicode(r.prefix, toHex(e.innerText))),
      r
    );
  },
  parseTransformString = function(e) {
    var t = { size: 16, x: 0, y: 0, flipX: !1, flipY: !1, rotate: 0 };
    return e
      ? e
          .toLowerCase()
          .split(" ")
          .reduce(function(e, t) {
            var a = t.toLowerCase().split("-"),
              i = a[0],
              r = a.slice(1).join("-");
            return i && "h" === r
              ? ((e.flipX = !0), e)
              : i && "v" === r
                ? ((e.flipY = !0), e)
                : ((r = parseFloat(r)), isNaN(r))
                  ? e
                  : ("grow" === i
                      ? (e.size += r)
                      : "shrink" === i
                        ? (e.size -= r)
                        : "left" === i
                          ? (e.x -= r)
                          : "right" === i
                            ? (e.x += r)
                            : "up" === i
                              ? (e.y -= r)
                              : "down" === i
                                ? (e.y += r)
                                : "rotate" === i ? (e.rotate += r) : void 0,
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
      a = e.getAttribute("title");
    return (
      config$1.autoA11y &&
        (a
          ? (t["aria-labelledby"] =
              config$1.replacementClass + "-title-" + nextUniqueId())
          : (t["aria-hidden"] = "true")),
      t
    );
  },
  maskParser = function(e) {
    var t = e.getAttribute("data-fa-mask");
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
    a = t.iconName,
    i = t.prefix,
    r = t.rest,
    n = styleParser(e),
    s = transformParser(e),
    o = symbolParser(e),
    l = attributesParser(e),
    f = maskParser(e);
  return {
    iconName: a,
    title: e.getAttribute("title"),
    prefix: i,
    transform: s,
    symbol: o,
    mask: f,
    extra: { classes: r, styles: n, attributes: l },
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
  styles = namespace.styles,
  LAYERS_TEXT_CLASSNAME = "fa-layers-text",
  FONT_FAMILY_PATTERN = /Font Awesome 5 (Solid|Regular|Light|Brands)/,
  STYLE_TO_PREFIX = {
    Solid: "fas",
    Regular: "far",
    Light: "fal",
    Brands: "fab",
  };
function findIcon(e, t) {
  var a = { found: !1, width: 512, height: 512, icon: missing };
  if (e && t && styles[t] && styles[t][e]) {
    var i = styles[t][e],
      r = i[0],
      n = i[1],
      s = i.slice(4);
    a = {
      found: !0,
      width: r,
      height: n,
      icon: { tag: "path", attributes: { fill: "currentColor", d: s[0] } },
    };
  } else if (e && t && !config$1.showMissingIcons)
    throw new MissingIcon(
      "Icon is missing for prefix " + t + " with icon name " + e
    );
  return a;
}
function generateSvgReplacementMutation(e, t) {
  var a = t.iconName,
    i = t.title,
    r = t.prefix,
    n = t.transform,
    s = t.symbol,
    o = t.mask,
    l = t.extra;
  return [
    e,
    makeInlineSvgAbstract({
      icons: { main: findIcon(a, r), mask: findIcon(o.iconName, o.prefix) },
      prefix: r,
      iconName: a,
      transform: n,
      symbol: s,
      mask: o,
      title: i,
      extra: l,
      watchable: !0,
    }),
  ];
}
function generateLayersText(e, t) {
  var a = t.title,
    i = t.transform,
    r = t.extra,
    n = null,
    s = null;
  if (IS_IE) {
    var o = parseInt(getComputedStyle(e).fontSize, 10),
      l = e.getBoundingClientRect();
    (n = l.width / o), (s = l.height / o);
  }
  return (
    config$1.autoA11y && !a && (r.attributes["aria-hidden"] = "true"),
    [
      e,
      makeLayersTextAbstract({
        content: e.innerHTML,
        width: n,
        height: s,
        transform: i,
        title: a,
        extra: r,
        watchable: !0,
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
function remove(e) {
  "function" == typeof e.remove
    ? e.remove()
    : e && e.parentNode && e.parentNode.removeChild(e);
}
function searchPseudoElements(e) {
  if (IS_DOM) {
    var t = perf.begin("searchPseudoElements");
    disableObservation(function() {
      toArray(e.querySelectorAll("*")).forEach(function(e) {
        [":before", ":after"].forEach(function(t) {
          var a = WINDOW.getComputedStyle(e, t),
            r = a.getPropertyValue("font-family").match(FONT_FAMILY_PATTERN),
            n = toArray(e.children),
            s = n.filter(function(e) {
              return e.getAttribute(DATA_FA_PSEUDO_ELEMENT) === t;
            })[0];
          if (
            (s &&
              (s.nextSibling &&
                -1 <
                  s.nextSibling.textContent.indexOf(DATA_FA_PSEUDO_ELEMENT) &&
                remove(s.nextSibling),
              remove(s),
              (s = null)),
            r && !s)
          ) {
            var o = a.getPropertyValue("content"),
              l = DOCUMENT.createElement("i");
            l.setAttribute("class", "" + STYLE_TO_PREFIX[r[1]]),
              l.setAttribute(DATA_FA_PSEUDO_ELEMENT, t),
              (l.innerText = 3 === o.length ? o.substr(1, 1) : o),
              ":before" === t
                ? e.insertBefore(l, e.firstChild)
                : e.appendChild(l);
          }
        });
      });
    }),
      t();
  }
}
function onTree(e) {
  var t = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : null;
  if (IS_DOM) {
    var a = DOCUMENT.documentElement.classList,
      i = function(e) {
        return a.add(HTML_CLASS_I2SVG_BASE_CLASS + "-" + e);
      },
      r = function(e) {
        return a.remove(HTML_CLASS_I2SVG_BASE_CLASS + "-" + e);
      },
      n = Object.keys(styles),
      s = ["." + LAYERS_TEXT_CLASSNAME + ":not([" + DATA_FA_I2SVG + "])"]
        .concat(
          n.map(function(e) {
            return "." + e + ":not([" + DATA_FA_I2SVG + "])";
          })
        )
        .join(", ");
    if (0 !== s.length) {
      var o = toArray(e.querySelectorAll(s));
      if (0 < o.length) i("pending"), r("complete");
      else return;
      var l = perf.begin("onTree"),
        f = o.reduce(function(e, t) {
          try {
            var a = generateMutation(t);
            a && e.push(a);
          } catch (t) {
            !PRODUCTION && t instanceof MissingIcon && console.error(t);
          }
          return e;
        }, []);
      l(),
        perform(f, function() {
          i("active"),
            i("complete"),
            r("pending"),
            "function" == typeof t && t();
        });
    }
  }
}
function onNode(e) {
  var t = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : null,
    a = generateMutation(e);
  a && perform([a], t);
}
var baseStyles =
    'svg:not(:root).svg-inline--fa {\n  overflow: visible; }\n\n.svg-inline--fa {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -.125em; }\n  .svg-inline--fa.fa-lg {\n    vertical-align: -.225em; }\n  .svg-inline--fa.fa-w-1 {\n    width: 0.0625em; }\n  .svg-inline--fa.fa-w-2 {\n    width: 0.125em; }\n  .svg-inline--fa.fa-w-3 {\n    width: 0.1875em; }\n  .svg-inline--fa.fa-w-4 {\n    width: 0.25em; }\n  .svg-inline--fa.fa-w-5 {\n    width: 0.3125em; }\n  .svg-inline--fa.fa-w-6 {\n    width: 0.375em; }\n  .svg-inline--fa.fa-w-7 {\n    width: 0.4375em; }\n  .svg-inline--fa.fa-w-8 {\n    width: 0.5em; }\n  .svg-inline--fa.fa-w-9 {\n    width: 0.5625em; }\n  .svg-inline--fa.fa-w-10 {\n    width: 0.625em; }\n  .svg-inline--fa.fa-w-11 {\n    width: 0.6875em; }\n  .svg-inline--fa.fa-w-12 {\n    width: 0.75em; }\n  .svg-inline--fa.fa-w-13 {\n    width: 0.8125em; }\n  .svg-inline--fa.fa-w-14 {\n    width: 0.875em; }\n  .svg-inline--fa.fa-w-15 {\n    width: 0.9375em; }\n  .svg-inline--fa.fa-w-16 {\n    width: 1em; }\n  .svg-inline--fa.fa-w-17 {\n    width: 1.0625em; }\n  .svg-inline--fa.fa-w-18 {\n    width: 1.125em; }\n  .svg-inline--fa.fa-w-19 {\n    width: 1.1875em; }\n  .svg-inline--fa.fa-w-20 {\n    width: 1.25em; }\n  .svg-inline--fa.fa-pull-left {\n    margin-right: .3em;\n    width: auto; }\n  .svg-inline--fa.fa-pull-right {\n    margin-left: .3em;\n    width: auto; }\n  .svg-inline--fa.fa-border {\n    height: 1.5em; }\n  .svg-inline--fa.fa-li {\n    width: 2em; }\n  .svg-inline--fa.fa-fw {\n    width: 1.25em; }\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0; }\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -.125em;\n  width: 1em; }\n  .fa-layers svg.svg-inline--fa {\n    -webkit-transform-origin: center center;\n            transform-origin: center center; }\n\n.fa-layers-text, .fa-layers-counter {\n  display: inline-block;\n  position: absolute;\n  text-align: center; }\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center; }\n\n.fa-layers-counter {\n  background-color: #ff253a;\n  border-radius: 1em;\n  color: #fff;\n  height: 1.5em;\n  line-height: 1;\n  max-width: 5em;\n  min-width: 1.5em;\n  overflow: hidden;\n  padding: .25em;\n  right: 0;\n  text-overflow: ellipsis;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right; }\n\n.fa-layers-bottom-right {\n  bottom: 0;\n  right: 0;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right; }\n\n.fa-layers-bottom-left {\n  bottom: 0;\n  left: 0;\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left; }\n\n.fa-layers-top-right {\n  right: 0;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right; }\n\n.fa-layers-top-left {\n  left: 0;\n  right: auto;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top left;\n          transform-origin: top left; }\n\n.fa-lg {\n  font-size: 1.33333em;\n  line-height: 0.75em;\n  vertical-align: -.0667em; }\n\n.fa-xs {\n  font-size: .75em; }\n\n.fa-sm {\n  font-size: .875em; }\n\n.fa-1x {\n  font-size: 1em; }\n\n.fa-2x {\n  font-size: 2em; }\n\n.fa-3x {\n  font-size: 3em; }\n\n.fa-4x {\n  font-size: 4em; }\n\n.fa-5x {\n  font-size: 5em; }\n\n.fa-6x {\n  font-size: 6em; }\n\n.fa-7x {\n  font-size: 7em; }\n\n.fa-8x {\n  font-size: 8em; }\n\n.fa-9x {\n  font-size: 9em; }\n\n.fa-10x {\n  font-size: 10em; }\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em; }\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: 2.5em;\n  padding-left: 0; }\n  .fa-ul > li {\n    position: relative; }\n\n.fa-li {\n  left: -2em;\n  position: absolute;\n  text-align: center;\n  width: 2em;\n  line-height: inherit; }\n\n.fa-border {\n  border: solid 0.08em #eee;\n  border-radius: .1em;\n  padding: .2em .25em .15em; }\n\n.fa-pull-left {\n  float: left; }\n\n.fa-pull-right {\n  float: right; }\n\n.fa.fa-pull-left,\n.fas.fa-pull-left,\n.far.fa-pull-left,\n.fal.fa-pull-left,\n.fab.fa-pull-left {\n  margin-right: .3em; }\n\n.fa.fa-pull-right,\n.fas.fa-pull-right,\n.far.fa-pull-right,\n.fal.fa-pull-right,\n.fab.fa-pull-right {\n  margin-left: .3em; }\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n          animation: fa-spin 2s infinite linear; }\n\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n          animation: fa-spin 1s infinite steps(8); }\n\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n.fa-rotate-90 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg); }\n\n.fa-rotate-180 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg); }\n\n.fa-rotate-270 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg); }\n\n.fa-flip-horizontal {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)";\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1); }\n\n.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1); }\n\n.fa-flip-horizontal.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1); }\n\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical {\n  -webkit-filter: none;\n          filter: none; }\n\n.fa-stack {\n  display: inline-block;\n  height: 2em;\n  position: relative;\n  width: 2em; }\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0; }\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1em; }\n\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2em; }\n\n.fa-inverse {\n  color: #fff; }\n\n.sr-only {\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px; }\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  clip: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  position: static;\n  width: auto; }\n',
  css = function() {
    var e = config$1.familyPrefix,
      t = config$1.replacementClass,
      a = baseStyles;
    if (e !== DEFAULT_FAMILY_PREFIX || t !== DEFAULT_REPLACEMENT_CLASS) {
      var i = /\.fa\-/g,
        r = /\.svg-inline--fa/g;
      a = a.replace(i, "." + e + "-").replace(r, "." + t);
    }
    return a;
  };
function define(e, t) {
  var a = Object.keys(t).reduce(function(e, a) {
    var i = t[a],
      r = !!i.icon;
    return r ? (e[i.iconName] = i.icon) : (e[a] = i), e;
  }, {});
  "function" == typeof namespace.hooks.addPack
    ? namespace.hooks.addPack(e, a)
    : (namespace.styles[e] = _extends({}, namespace.styles[e] || {}, a)),
    "fas" === e && define("fa", t);
}
var Library = (function() {
  function e() {
    classCallCheck(this, e), (this.definitions = {});
  }
  return (
    createClass(e, [
      {
        key: "add",
        value: function() {
          for (
            var e = this, t = arguments.length, a = Array(t), i = 0;
            i < t;
            i++
          )
            a[i] = arguments[i];
          var r = a.reduce(this._pullDefinitions, {});
          Object.keys(r).forEach(function(t) {
            (e.definitions[t] = _extends({}, e.definitions[t] || {}, r[t])),
              define(t, r[t]);
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
          var a = t.prefix && t.iconName && t.icon ? { 0: t } : t;
          return (
            Object.keys(a).map(function(t) {
              var i = a[t],
                r = i.prefix,
                n = i.iconName,
                s = i.icon;
              e[r] || (e[r] = {}), (e[r][n] = s);
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
    a = e[1],
    i = e.slice(4);
  return {
    found: !0,
    width: t,
    height: a,
    icon: { tag: "path", attributes: { fill: "currentColor", d: i[0] } },
  };
}
var _cssInserted = !1;
function ensureCss() {
  config$1.autoAddCss &&
    (!_cssInserted && insertCss(css()), (_cssInserted = !0));
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
        if (IS_DOM) {
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
    a = t === void 0 ? "fa" : t,
    i = e.iconName;
  return i
    ? iconFromMapping(library.definitions, a, i) ||
      iconFromMapping(namespace.styles, a, i)
    : void 0;
}
function resolveIcons(e) {
  return function(t) {
    var a = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
      i = (t || {}).icon ? t : findIconDefinition(t || {}),
      r = a.mask;
    return (
      r && (r = (r || {}).icon ? r : findIconDefinition(r || {})),
      e(i, _extends({}, a, { mask: r }))
    );
  };
}
var library = new Library(),
  noAuto = function() {
    auto(!1), disconnect();
  },
  dom = {
    i2svg: function() {
      var e =
        0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : {};
      if (IS_DOM) {
        ensureCss();
        var t = e.node,
          a = t === void 0 ? DOCUMENT : t,
          i = e.callback,
          r = i === void 0 ? function() {} : i;
        config$1.searchPseudoElements && searchPseudoElements(a), onTree(a, r);
      }
    },
    css: css,
    insertCss: function() {
      insertCss(css());
    },
  },
  parse = {
    transform: function(e) {
      return parseTransformString(e);
    },
  },
  icon = resolveIcons(function(e) {
    var t = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : {},
      a = t.transform,
      i = a === void 0 ? meaninglessTransform : a,
      r = t.symbol,
      n = t.mask,
      s = n === void 0 ? null : n,
      o = t.title,
      l = o === void 0 ? null : o,
      f = t.classes,
      c = f === void 0 ? [] : f,
      d = t.attributes,
      u = d === void 0 ? {} : d,
      m = t.styles,
      p = m === void 0 ? {} : m;
    if (e) {
      var g = e.prefix,
        h = e.iconName,
        b = e.icon;
      return apiObject(_extends({ type: "icon" }, e), function() {
        return (
          ensureCss(),
          config$1.autoA11y &&
            (l
              ? (u["aria-labelledby"] =
                  config$1.replacementClass + "-title-" + nextUniqueId())
              : (u["aria-hidden"] = "true")),
          makeInlineSvgAbstract({
            icons: {
              main: prepIcon(b),
              mask: s
                ? prepIcon(s.icon)
                : { found: !1, width: null, height: null, icon: {} },
            },
            prefix: g,
            iconName: h,
            transform: _extends({}, meaninglessTransform, i),
            symbol: r !== void 0 && r,
            title: l,
            extra: { attributes: u, styles: p, classes: c },
          })
        );
      });
    }
  }),
  text = function(e) {
    var t = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : {},
      a = t.transform,
      i = a === void 0 ? meaninglessTransform : a,
      r = t.title,
      n = r === void 0 ? null : r,
      s = t.classes,
      o = s === void 0 ? [] : s,
      l = t.attributes,
      f = l === void 0 ? {} : l,
      c = t.styles,
      d = c === void 0 ? {} : c;
    return apiObject({ type: "text", content: e }, function() {
      return (
        ensureCss(),
        makeLayersTextAbstract({
          content: e,
          transform: _extends({}, meaninglessTransform, i),
          title: n,
          extra: {
            attributes: f,
            styles: d,
            classes: [config$1.familyPrefix + "-layers-text"].concat(
              toConsumableArray(o)
            ),
          },
        })
      );
    });
  },
  layer = function(e) {
    return apiObject({ type: "layer" }, function() {
      ensureCss();
      var t = [];
      return (
        e(function(e) {
          Array.isArray(e)
            ? e.map(function(e) {
                t = t.concat(e.abstract);
              })
            : (t = t.concat(e.abstract));
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
  api$1 = {
    noAuto: noAuto,
    dom: dom,
    library: library,
    parse: parse,
    findIconDefinition: findIconDefinition,
    icon: icon,
    text: text,
    layer: layer,
  },
  autoReplace = function() {
    IS_DOM && config$1.autoReplaceSvg && api$1.dom.i2svg({ node: DOCUMENT });
  };
function bootstrap() {
  IS_BROWSER &&
    (!WINDOW.FontAwesome && (WINDOW.FontAwesome = api$1),
    domready(function() {
      0 < Object.keys(namespace.styles).length && autoReplace(),
        config$1.observeMutations &&
          "function" == typeof MutationObserver &&
          observe({
            treeCallback: onTree,
            nodeCallback: onNode,
            pseudoElementsCallback: searchPseudoElements,
          });
    })),
    (namespace.hooks = _extends({}, namespace.hooks, {
      addPack: function(e, t) {
        (namespace.styles[e] = _extends({}, namespace.styles[e] || {}, t)),
          build(),
          autoReplace();
      },
      addShims: function(e) {
        var t;
        (t = namespace.shims).push.apply(t, toConsumableArray(e)),
          build(),
          autoReplace();
      },
    }));
}
Object.defineProperty(api$1, "config", {
  get: function() {
    return config$1;
  },
  set: function(e) {
    update(e);
  },
}),
  IS_DOM && bunker(bootstrap);
var config$1$1 = api$1.config,
  index_es = Object.freeze({
    config: config$1$1,
    icon: icon,
    noAuto: noAuto,
    layer: layer,
    text: text,
    library: library,
    dom: dom,
    parse: parse,
    findIconDefinition: findIconDefinition,
    default: api$1,
  }),
  require$$0 = (index_es && api$1) || index_es,
  reactFontawesome = createCommonjsModule(function(e) {
    (function(t, a) {
      e.exports = a(require$$0, PropTypes, React);
    })(commonjsGlobal, function(e, t, a) {
      "use strict";
      function r(e) {
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
            var a = t.indexOf(":"),
              i = d.camelize(t.slice(0, a)),
              n = t.slice(a + 1).trim();
            return i.startsWith("webkit") ? (e[r(i)] = n) : (e[i] = n), e;
          }, {});
      }
      function n(e, t) {
        var a =
            2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {},
          r = (t.children || []).map(n.bind(null, e)),
          s = Object.keys(t.attributes || {}).reduce(
            function(e, a) {
              var r = t.attributes[a];
              return (
                "class" === a
                  ? ((e.attrs.className = r), delete t.attributes["class"])
                  : "style" === a
                    ? (e.attrs.style = i(r))
                    : 0 === a.indexOf("aria-") || 0 === a.indexOf("data-")
                      ? (e.attrs[a.toLowerCase()] = r)
                      : (e.attrs[d.camelize(a)] = r),
                e
              );
            },
            { attrs: {} }
          ),
          o = a.style,
          l = void 0 === o ? {} : o,
          f = h(a, ["style"]);
        return (
          (s.attrs.style = g({}, s.attrs.style, l)),
          e.apply(void 0, [t.tag, g({}, s.attrs, f)].concat(b(r)))
        );
      }
      function s(e, t) {
        return (Array.isArray(t) && 0 < t.length) || (!Array.isArray(t) && t)
          ? p({}, e, t)
          : {};
      }
      function o(e) {
        var t,
          a = ((t = {
            "fa-spin": e.spin,
            "fa-pulse": e.pulse,
            "fa-fw": e.fixedWidth,
            "fa-border": e.border,
            "fa-li": e.listItem,
            "fa-flip-horizontal": "horizontal" === e.flip || "both" === e.flip,
            "fa-flip-vertical": "vertical" === e.flip || "both" === e.flip,
          }),
          p(t, "fa-" + e.size, null !== e.size),
          p(t, "fa-rotate-" + e.rotation, null !== e.rotation),
          p(t, "fa-pull-" + e.pull, null !== e.pull),
          t);
        return Object.keys(a)
          .map(function(e) {
            return a[e] ? e : null;
          })
          .filter(function(e) {
            return e;
          });
      }
      function l(e) {
        return null === e
          ? null
          : "object" === ("undefined" == typeof e ? "undefined" : u(e)) &&
            e.prefix &&
            e.iconName
            ? e
            : Array.isArray(e) && 2 === e.length
              ? { prefix: e[0], iconName: e[1] }
              : "string" == typeof e ? { prefix: "fas", iconName: e } : void 0;
      }
      function f(t) {
        var i = t.icon,
          r = t.mask,
          c = t.symbol,
          d = t.className,
          u = l(i),
          m = s("classes", [].concat(b(o(t)), b(d.split(" ")))),
          p = s(
            "transform",
            "string" == typeof t.transform
              ? e.parse.transform(t.transform)
              : t.transform
          ),
          h = s("mask", l(r)),
          y = e.icon(u, g({}, m, p, h, { symbol: c }));
        if (!y) return x("Could not find icon", u), null;
        var w = y.abstract,
          k = n.bind(null, a.createElement),
          v = {};
        return (
          Object.keys(t).forEach(function(e) {
            f.defaultProps.hasOwnProperty(e) || (v[e] = t[e]);
          }),
          k(w[0], v)
        );
      }
      (e = e && e.hasOwnProperty("default") ? e["default"] : e),
        (t = t && t.hasOwnProperty("default") ? t["default"] : t),
        (a = a && a.hasOwnProperty("default") ? a["default"] : a);
      var c =
          "undefined" == typeof window
            ? "undefined" == typeof commonjsGlobal
              ? "undefined" == typeof self ? {} : self
              : commonjsGlobal
            : window,
        d = (function(e, t) {
          return (t = { exports: {} }), e(t, t.exports), t.exports;
        })(function(e) {
          (function(t) {
            var a = function(e, t, r) {
                if (!c(t) || u(t) || m(t) || p(t) || f(t)) return t;
                var n,
                  s = 0,
                  i = 0;
                if (d(t))
                  for (n = [], i = t.length; s < i; s++) n.push(a(e, t[s], r));
                else
                  for (var o in ((n = {}), t))
                    Object.prototype.hasOwnProperty.call(t, o) &&
                      (n[e(o, r)] = a(e, t[o], r));
                return n;
              },
              i = function(e, t) {
                t = t || {};
                var a = t.separator || "_",
                  i = t.split || /(?=[A-Z])/;
                return e.split(i).join(a);
              },
              r = function(e) {
                return l(e)
                  ? e
                  : ((e = e.replace(/[\-_\s]+(.)?/g, function(e, t) {
                      return t ? t.toUpperCase() : "";
                    })),
                    e.substr(0, 1).toLowerCase() + e.substr(1));
              },
              n = function(e) {
                var t = r(e);
                return t.substr(0, 1).toUpperCase() + t.substr(1);
              },
              s = function(e, t) {
                return i(e, t).toLowerCase();
              },
              o = Object.prototype.toString,
              f = function(e) {
                return "function" == typeof e;
              },
              c = function(e) {
                return e === Object(e);
              },
              d = function(e) {
                return "[object Array]" == o.call(e);
              },
              u = function(e) {
                return "[object Date]" == o.call(e);
              },
              m = function(e) {
                return "[object RegExp]" == o.call(e);
              },
              p = function(e) {
                return "[object Boolean]" == o.call(e);
              },
              l = function(e) {
                return (e -= 0), e === e;
              },
              g = function(e, t) {
                var a = t && "process" in t ? t.process : t;
                return "function" == typeof a
                  ? function(t, i) {
                      return a(t, e, i);
                    }
                  : e;
              },
              h = {
                camelize: r,
                decamelize: s,
                pascalize: n,
                depascalize: s,
                camelizeKeys: function(e, t) {
                  return a(g(r, t), e);
                },
                decamelizeKeys: function(e, t) {
                  return a(g(s, t), e, t);
                },
                pascalizeKeys: function(e, t) {
                  return a(g(n, t), e);
                },
                depascalizeKeys: function() {
                  return this.decamelizeKeys.apply(this, arguments);
                },
              };
            e.exports ? (e.exports = h) : (t.humps = h);
          })(c);
        }),
        u =
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
        m = (function() {
          function e(e) {
            this.value = e;
          }
          function t(t) {
            function a(r, n) {
              try {
                var s = t[r](n),
                  o = s.value;
                o instanceof e
                  ? Promise.resolve(o.value).then(
                      function(e) {
                        a("next", e);
                      },
                      function(e) {
                        a("throw", e);
                      }
                    )
                  : i(s.done ? "return" : "normal", s.value);
              } catch (e) {
                i("throw", e);
              }
            }
            function i(e, t) {
              "return" === e
                ? r.resolve({ value: t, done: !0 })
                : "throw" === e
                  ? r.reject(t)
                  : r.resolve({ value: t, done: !1 }),
                (r = r.next),
                r ? a(r.key, r.arg) : (n = null);
            }
            var r, n;
            (this._invoke = function(e, t) {
              return new Promise(function(i, s) {
                var o = { key: e, arg: t, resolve: i, reject: s, next: null };
                n ? (n = n.next = o) : ((r = n = o), a(e, t));
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
        p = function(e, t, a) {
          return (
            t in e
              ? Object.defineProperty(e, t, {
                  value: a,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = a),
            e
          );
        },
        g =
          Object.assign ||
          function(e) {
            for (var t, a = 1; a < arguments.length; a++)
              for (var i in ((t = arguments[a]), t))
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e;
          },
        h = function(e, t) {
          var a = {};
          for (var r in e)
            0 <= t.indexOf(r) ||
              (Object.prototype.hasOwnProperty.call(e, r) && (a[r] = e[r]));
          return a;
        },
        b = function(e) {
          if (Array.isArray(e)) {
            for (var t = 0, a = Array(e.length); t < e.length; t++) a[t] = e[t];
            return a;
          }
          return Array.from(e);
        },
        y = !1;
      try {
        y = !1;
      } catch (t) {}
      var x = function() {
        if (!y && console && "function" == typeof console.error) {
          var e;
          (e = console).error.apply(e, arguments);
        }
      };
      return (
        (f.propTypes = {
          border: t.bool,
          className: t.string,
          mask: t.oneOfType([t.object, t.array, t.string]),
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
        (f.defaultProps = {
          border: !1,
          className: "",
          mask: null,
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
        e.noAuto(),
        f
      );
    });
  }),
  styles$1$1 = {
    backendStatus: "_backendStatus_17b2u_1",
    busy: "_busy_17b2u_12",
    broken: "_broken_17b2u_15",
    none: "_none_17b2u_18",
    ready: "_ready_17b2u_21",
    statusText: "_statusText_17b2u_24",
    animation: "_animation_17b2u_27",
    hidden: "_hidden_17b2u_41",
    icon: "_icon_17b2u_44",
  },
  asyncGenerator = (function() {
    function e(e) {
      this.value = e;
    }
    function t(t) {
      function a(r, n) {
        try {
          var s = t[r](n),
            o = s.value;
          o instanceof e
            ? Promise.resolve(o.value).then(
                function(e) {
                  a("next", e);
                },
                function(e) {
                  a("throw", e);
                }
              )
            : i(s.done ? "return" : "normal", s.value);
        } catch (e) {
          i("throw", e);
        }
      }
      function i(e, t) {
        "return" === e
          ? r.resolve({ value: t, done: !0 })
          : "throw" === e ? r.reject(t) : r.resolve({ value: t, done: !1 });
        (r = r.next), r ? a(r.key, r.arg) : (n = null);
      }
      var r, n;
      (this._invoke = function(e, t) {
        return new Promise(function(i, s) {
          var o = { key: e, arg: t, resolve: i, reject: s, next: null };
          n ? (n = n.next = o) : ((r = n = o), a(e, t));
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
      for (var a, r = 0; r < t.length; r++)
        (a = t[r]),
          (a.enumerable = a.enumerable || !1),
          (a.configurable = !0),
          "value" in a && (a.writable = !0),
          Object.defineProperty(e, a.key, a);
    }
    return function(t, a, i) {
      return a && e(t.prototype, a), i && e(t, i), t;
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
  BACKEND_STATUS = {
    BUSY: { code: "busy", text: "Session Busy" },
    BROKEN: { code: "broken", text: "Session Broken" },
    READY: { code: "ready", text: "Workspace Ready" },
    NONE: { code: "none", text: "" },
  },
  BackendStatus$1 = (function(e) {
    function t(e) {
      classCallCheck$1(this, t);
      var a = possibleConstructorReturn(
        this,
        (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)
      );
      return (
        (a.state = { statusTextVisible: !1 }),
        (a.showStatusText = a.showStatusText.bind(a)),
        (a.hideStatusText = a.hideStatusText.bind(a)),
        a
      );
    }
    return (
      inherits(t, e),
      createClass$1(t, [
        {
          key: "getStatusClass",
          value: function() {
            switch (this.props.status.code) {
              case BACKEND_STATUS.BROKEN.code:
                return styles$1$1.broken;
              case BACKEND_STATUS.READY.code:
                return styles$1$1.ready;
              case BACKEND_STATUS.NONE.code:
                return styles$1$1.none;
              case BACKEND_STATUS.BUSY.code:
              case BACKEND_STATUS.PENDING.code:
              case BACKEND_STATUS.EXECUTING_CODE.code:
              default:
                return styles$1$1.busy;
            }
          },
        },
        {
          key: "getStatusText",
          value: function() {
            return this.props.status.text;
          },
        },
        {
          key: "isReady",
          value: function() {
            return this.props.status.code === BACKEND_STATUS.READY.code;
          },
        },
        {
          key: "isPending",
          value: function() {
            return this.props.status.code === BACKEND_STATUS.PENDING.code;
          },
        },
        {
          key: "showStatusText",
          value: function() {
            this.setState({ statusTextVisible: !0 });
          },
        },
        {
          key: "hideStatusText",
          value: function() {
            this.setState({ statusTextVisible: !1 });
          },
        },
        {
          key: "render",
          value: function() {
            return React.createElement(
              "div",
              {
                className:
                  styles$1$1.backendStatus +
                  " " +
                  (this.props.className || "") +
                  " " +
                  this.getStatusClass(),
                onMouseEnter: this.showStatusText,
                onMouseLeave: this.hideStatusText,
              },
              React.createElement(reactFontawesome, {
                icon: faCircle,
                className: "" + styles$1$1.icon,
              }),
              React.createElement(
                "span",
                {
                  className:
                    styles$1$1.statusText +
                    " " +
                    (this.state.statusTextVisible ? "" : styles$1$1.hidden),
                },
                this.getStatusText()
              )
            );
          },
        },
      ]),
      t
    );
  })(React.Component),
  backendStatusShape = {
    className: PropTypes.string,
    status: PropTypes.shape({
      code: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  };
(BackendStatus$1.propTypes = backendStatusShape),
  (module.exports = BackendStatus$1);
