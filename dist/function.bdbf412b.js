// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"function.js":[function(require,module,exports) {
var _this = this;

//1 函数参数的扩展
function func1(x, y) {
  y = y || 'world';
  console.log(x, y);
} //传统的函数参数默认值


func1('hello'); //hello world

func1('hello', 'hangzhou'); //hello world

func1('hello', ''); //hello world 传统的参数默认值方法 弊端:当赋值为''时,任然使用了默认值 事实上只有当y===undefined时,会触发使用默认值 

function func2(x) {
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'world';
  console.log(x, y);
} //es6改进后的函数参数


func2('hello'); //hello world 

func2('hello', 'hangzhou'); //hello hangzhou

func2('hello', ''); //hello 此值应为比较合理的

func2('hello', undefined); //hello world undefined触发参数默认值

func2('', undefined); //world

func2('hello', null); //hello null
// function func3(x, x, y=3) {
//     console.log(x, x, y)
// }
// func3(1, 2, 3); 报错 当使用函数参数默认值时,不允许出现参数重复的情况
//2 与解构赋值默认值结合使用

function func4(_ref) {
  var x = _ref.x,
      _ref$y = _ref.y,
      y = _ref$y === void 0 ? 2 : _ref$y;
  console.log(x, y);
}

func4({}); //undefined 2

func4({
  x: 1,
  y: 2
}); //1 2

func4({
  x: 1
}); //1 2
// func4(); TypeError: cannot read property 'x' of undefined 函数func4的参数是个对象,只有当参数为对象时,才能进行解构赋值,否则会报错

function func5() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      x = _ref2.x,
      _ref2$y = _ref2.y,
      y = _ref2$y === void 0 ? 2 : _ref2$y;

  console.log(x, y);
}

func5(); //undefined 2 函数参数对象默认值为空对象
//3 rest参数 rest是个数组

function func6() {
  var sum = 0;

  for (var _len = arguments.length, arrs = new Array(_len), _key = 0; _key < _len; _key++) {
    arrs[_key] = arguments[_key];
  }

  for (var _i = 0, _arrs = arrs; _i < _arrs.length; _i++) {
    var val = _arrs[_i];
    sum += val;
  }

  console.log(sum);
}

func6(1, 2, 3); //6

function func7(a, b) {
  for (var _len2 = arguments.length, rest = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    rest[_key2 - 2] = arguments[_key2];
  }

  console.log(rest);
}

func7(1, 2, 3, 4, 5); //[3,4,5] rest参数只能放在最后

console.log(function (a) {}.length); //函数参数的length 不包括rest参数

var f = function f() {};

console.log(f.name); //f 函数name属性
//4 箭头函数

var d = function d() {
  return 1;
}; //相当于 var d = function () {retrun 5}


var sum = function sum(sum1, sum2) {
  return sum1 + sum2;
};

console.log(sum(1, 2)); //3

var add = function add(sum1, sum2, sum3) {
  return console.log(sum1 + sum2 + sum3);
};

add(3, 4, 5); //12 多行语句时,加大括号,用retrun返回

[1, 2, 3].map(function (x) {
  return x * x;
});

var full = function full(_ref3) {
  var first = _ref3.first,
      last = _ref3.last;
  return first + '' + last;
}; //与变量结构结合使用


var numbers = function numbers() {
  for (var _len3 = arguments.length, nums = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    nums[_key3] = arguments[_key3];
  }

  return console.log(nums);
};

numbers(1, 2, 3, 4, 5); //[1,2,3,4,5]与rest参数结合使用
//箭头函数使用注意点 
// function Timer() {
//     this.s1 = 0;
//     this.s2 = 0;
//     setInterval(() => this.s1++, 1000);
//     setInterval(function () {
//         this.s2++
//     }, 1000)
// }
// var timer = new Timer();
// setInterval(() => console.log('s1:', timer.s1), 3100); //s1: 3 箭头函数的this总是指向定义时的作用域,箭头函数没有this,所有此处的s1=0
// setInterval(() => console.log('s2:', timer.s2), 3100); //s2: 0 普通函数的this指向运行时的作用域(全局对象)
//箭头函数this问题  头函数默认不会使用自己的this，而是会和外层的this保持一致，最外层的this就是window对象。

function func8() {
  console.log(this);
}

func8(); //window

var func9 = {
  a: function a() {
    console.log(this);
  }
};
func9.a(); //object对象

var func10 = {
  b: function b() {
    return console.log(_this);
  }
};
func10.b(); //window
//vue中 
//注意，不应该使用箭头函数来定义 method 函数 (例如 plus: () => this.a++)。
//理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例，this.a 将是 undefined。
// js继承

function demo() {
  this.a = 1;
  this.b = 2;
}

var o = new demo();
console.log(o.a); //1

demo.prototype.b = 3;
demo.prototype.c = 4;
console.log([o.a, o.b, o.c, o.d]); //[1,2,4]

var extent = {
  a: 2,
  m: function m() {
    return this.a + 2;
  }
};
console.log(extent.a);
var extent2 = Object.create(extent);
console.log(extent2.a);
extent2.a = 3;
console.log(extent2.m()); //自身属性a=3

console.log(extent.m()); //原型对象属性未变 a=2
},{}],"C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57027" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/Administrator/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","function.js"], null)
//# sourceMappingURL=/function.bdbf412b.js.map