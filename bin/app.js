require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"7DQuTt":[function(require,module,exports){
var prelude, ref$, head, filter;
module.exports = (ref$ = prelude = require('prelude-ls'), head = ref$.head, filter = ref$.filter, ref$);
import$(module.exports, {
  select: function(){
    return head(filter.apply(this, arguments));
  }
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}
},{"prelude-ls":26}],"helpers/index":[function(require,module,exports){
module.exports=require('7DQuTt');
},{}],"index":[function(require,module,exports){
module.exports=require('HtQ974');
},{}],"HtQ974":[function(require,module,exports){
var log, setup, jqx, pages;
log = require('log');
setup = require('init/setup');
jqx = require('init/jqx');
pages = require('pages/loader');
if (typeof console != 'undefined' && console !== null) {
  if (typeof console.group === 'function') {
    console.group("Setup");
  }
}
setup.useJqueryShortcuts();
setup.useJqueryCors();
setup.setDefaultEasing();
jqx.useExtension('exists', 'mutuallyExclusive');
if (typeof console != 'undefined' && console !== null) {
  if (typeof console.groupEnd === 'function') {
    console.groupEnd();
  }
}
$(function(){
  if (typeof console != 'undefined' && console !== null) {
    if (typeof console.group === 'function') {
      console.group("DOM");
    }
  }
  jqx.autoInvoke(true);
  pages.autoLoad();
  if (typeof console != 'undefined' && console !== null) {
    if (typeof console.groupEnd === 'function') {
      console.groupEnd();
    }
  }
  return typeof console != 'undefined' && console !== null ? typeof console.group === 'function' ? console.group("Ready") : void 8 : void 8;
});
},{"init/jqx":"HewvhT","init/setup":"zhZxh1","log":"oCgNLj","pages/loader":"xcWogM"}],"HewvhT":[function(require,module,exports){
var log, helpers, ref$, pub, sub, extensions, slice$ = [].slice;
log = require('log');
helpers = require('helpers/index');
ref$ = require('modules/pubsub'), pub = ref$.pub, sub = ref$.sub;
extensions = function($){
  $ == null && ($ = jQuery);
  return {
    exists: function(){
      return this.length > 0;
    },
    clickToggle: function(cname){
      return this.on('click', function(){
        return $(this).toggleClass(cname);
      });
    },
    mutuallyExclusive: function(activeClass, setFirst){
      var $all;
      activeClass == null && (activeClass = 'active');
      setFirst == null && (setFirst = false);
      $all = this;
      if (setFirst) {
        $all.first().addClass(activeClass);
      }
      return this.on('click', function(){
        var $this;
        $this = $(this);
        $all.removeClass(activeClass);
        if (!$t.hasClass(activeClass)) {
          return $this.addClass(activeClass);
        }
      });
    },
    groupBy: function(ƒ_groupKey){
      var map, sets, jqGroup;
      map = helpers.Obj.map;
      sets = {};
      jqGroup = function(items){
        var g, i$, len$, item;
        g = null;
        for (i$ = 0, len$ = items.length; i$ < len$; ++i$) {
          item = items[i$];
          if (g != null) {
            g = g.add(item);
          } else {
            g = $(item);
          }
        }
        return g;
      };
      this.each(function(){
        var key$;
        return (sets[key$ = ƒ_groupKey(this)] || (sets[key$] = [])).push(this);
      });
      return map(jqGroup, sets);
    },
    event: function(){
      log("JQX::jq-event", this.length);
      return this.on('click', function(){
        var ref$, event, eventData, dataArgs;
        ref$ = $(this).data(), event = ref$.event, eventData = ref$.eventData;
        dataArgs = eventData != null
          ? String(eventData).split(',')
          : [];
        pub.apply(this, [event].concat(dataArgs));
        return false;
      });
    }
  };
}();
exports.useExtension = function(){
  var names, i$, len$, name, that, results$ = [];
  names = slice$.call(arguments);
  log("App::Setup - loading JQX", names);
  for (i$ = 0, len$ = names.length; i$ < len$; ++i$) {
    name = names[i$];
    if ((that = extensions[name]) != null) {
      results$.push(jQuery.fn[name] = that);
    } else {
      results$.push(log("  ... no such extension: " + name));
    }
  }
  return results$;
};
exports.autoInvoke = function(now){
  var runJqx;
  now == null && (now = false);
  runJqx = function(){
    var sets, name, $group, results$ = [];
    log("App::Setup - running JQX AutoInvoker");
    exports.useExtension('groupBy');
    sets = $('[class*="jq-"]').groupBy(function(el){
      var that;
      if (that = el.className.match(/jq-([-\w]*)/)) {
        return that[1];
      } else {
        return '';
      }
    });
    for (name in sets) {
      $group = sets[name];
      results$.push(typeof $group[name] === 'function' ? $group[name]() : void 8);
    }
    return results$;
  };
  if (now) {
    return runJqx();
  } else {
    return jQuery(runJqx);
  }
};
},{"helpers/index":"7DQuTt","log":"oCgNLj","modules/pubsub":"JBKw/A"}],"init/jqx":[function(require,module,exports){
module.exports=require('HewvhT');
},{}],"init/setup":[function(require,module,exports){
module.exports=require('zhZxh1');
},{}],"zhZxh1":[function(require,module,exports){
exports.useJqueryShortcuts = function(){
  jQuery.D = jQuery(document);
  jQuery.W = jQuery(window);
  return jQuery.B = jQuery('body');
};
exports.useJqueryCors = function(){
  return jQuery.support.cors = true;
};
exports.setDefaultEasing = function(){
  return TweenMax.defaultEasing = Power2.easeInOut;
};
},{}],"NvjisE":[function(require,module,exports){
var log, that;
log = require('log');
if ((that = window.Config) != null) {
  log('App::Setup - Configuration detected:', that);
} else {
  log('App::Setup - No external configuration');
}
module.exports = window.Config;
},{"log":"oCgNLj"}],"modules/config":[function(require,module,exports){
module.exports=require('NvjisE');
},{}],"oCgNLj":[function(require,module,exports){
var log, slice$ = [].slice;
module.exports = log = (typeof console != 'undefined' && console !== null ? console.log : void 8) == null
  ? function(){
    return arguments[0];
  }
  : typeof console.log !== 'function'
    ? function(){
      var args;
      args = slice$.call(arguments);
      console.log(args.join(' '));
      return arguments[0];
    }
    : function(){
      console.log.apply(console, arguments);
      return arguments[0];
    };
},{}],"modules/log":[function(require,module,exports){
module.exports=require('oCgNLj');
},{}],"modules/pubsub":[function(require,module,exports){
module.exports=require('JBKw/A');
},{}],"JBKw/A":[function(require,module,exports){
var PUB_SPY, channels, slice$ = [].slice;
PUB_SPY = false;
channels = {};
module.exports = {
  pub: function(ch){
    var msg, i$, ref$, len$, fn, that, results$ = [];
    msg = slice$.call(arguments, 1);
    if (PUB_SPY) {
      log.apply(null, [" >> " + ch + " ->"].concat(msg));
    }
    for (i$ = 0, len$ = (ref$ = channels[ch] || (channels[ch] = [])).length; i$ < len$; ++i$) {
      fn = ref$[i$];
      if (fn != null) {
        fn.apply(this, msg);
      }
    }
    if ((that = channels.all) != null) {
      for (i$ = 0, len$ = that.length; i$ < len$; ++i$) {
        fn = that[i$];
        results$.push(fn != null ? fn.apply(this, [ch].concat(msg)) : void 8);
      }
      return results$;
    }
  },
  sub: function(){
    var i$, chs, fn, len$, ch, results$ = [];
    chs = 0 < (i$ = arguments.length - 1) ? slice$.call(arguments, 0, i$) : (i$ = 0, []), fn = arguments[i$];
    for (i$ = 0, len$ = chs.length; i$ < len$; ++i$) {
      ch = chs[i$];
      results$.push((channels[ch] || (channels[ch] = [])).push(fn));
    }
    return results$;
  },
  subMany: function(obj){
    var ch, fn, results$ = [];
    for (ch in obj) {
      fn = obj[ch];
      results$.push(this.sub(ch, fn));
    }
    return results$;
  },
  enableSpying: function(toggle){
    toggle == null && (toggle = true);
    return PUB_SPY = toggle;
  }
};
},{}],"00IbuA":[function(require,module,exports){
var log;
log = require('log');
module.exports = function($page, $$){
  return log("Default page loaded");
};
},{"log":"oCgNLj"}],"pages/default":[function(require,module,exports){
module.exports=require('00IbuA');
},{}],"pages/loader":[function(require,module,exports){
module.exports=require('xcWogM');
},{}],"xcWogM":[function(require,module,exports){
var log, ref$, map, filter, id;
log = require('log');
ref$ = require('helpers/index'), map = ref$.map, filter = ref$.filter, id = ref$.id;
exports.detectPageControllers = function(){
  var scopes, names, i$, len$, el, results$ = {};
  scopes = $('[data-page-controller]').toArray();
  names = filter(id, map(function(it){
    return $(it).data('page-controller');
  }, scopes));
  if (names.length) {
    log("App::Setup - detecting page controllers", names);
    for (i$ = 0, len$ = scopes.length; i$ < len$; ++i$) {
      el = scopes[i$];
      results$[$(el).data('page-controller')] = $(el);
    }
    return results$;
  }
};
exports.loadPage = function(name){
  var $scope, page;
  $scope = $("[data-page-controller=" + name + "]");
  if (name == null || name === "") {
    return log("No controller name given: '" + name + "'.");
  } else if ($scope.exists() && (page = require("pages/" + name))) {
    return page($scope, $);
  } else {
    return log("No such page controller: '" + name + "'.");
  }
};
exports.autoLoad = function(){
  var name, ref$, _, results$ = [];
  for (name in ref$ = exports.detectPageControllers()) {
    _ = ref$[name];
    results$.push(exports.loadPage(name));
  }
  return results$;
};
},{"helpers/index":"7DQuTt","log":"oCgNLj"}],"widgets/base":[function(require,module,exports){
module.exports=require('7ucIDd');
},{}],"7ucIDd":[function(require,module,exports){
var log, ref$, concat, union, idGen, Widget;
log = require('log');
ref$ = require('helpers/index'), log = ref$.log, concat = ref$.concat, union = ref$.union;
idGen = function(){
  var i;
  i = 0;
  return function(){
    return i = i + 1;
  };
}();
module.exports = Widget = (function(){
  Widget.displayName = 'Widget';
  var prototype = Widget.prototype, constructor = Widget;
  function Widget($host, config){
    config == null && (config = {});
    this.id = idGen();
    this.type = $host.data('widget');
    this.dom = {
      main: $host
    };
    this.state = {};
    this.log = function(){
      return log.apply(null, union(["Widget[" + this.type + "](" + this.id + ") -"], arguments));
    };
    this.config = import$(import$(clone$(this.defaults || {}), this.json), config);
    this.log('created', this.config);
  }
  return Widget;
}());
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}
function clone$(it){
  function fun(){} fun.prototype = it;
  return new fun;
}
},{"helpers/index":"7DQuTt","log":"oCgNLj"}],21:[function(require,module,exports){
var curry, flip, fix, apply;
curry = function(f){
  return curry$(f);
};
flip = curry$(function(f, x, y){
  return f(y, x);
});
fix = function(f){
  return function(g, x){
    return function(){
      return f(g(g)).apply(null, arguments);
    };
  }(function(g, x){
    return function(){
      return f(g(g)).apply(null, arguments);
    };
  });
};
apply = curry$(function(f, list){
  return f.apply(null, list);
});
module.exports = {
  curry: curry,
  flip: flip,
  fix: fix,
  apply: apply
};
function curry$(f, bound){
  var context,
  _curry = function(args) {
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}

},{}],22:[function(require,module,exports){
var each, map, compact, filter, reject, partition, find, head, first, tail, last, initial, empty, reverse, unique, fold, foldl, fold1, foldl1, foldr, foldr1, unfoldr, concat, concatMap, flatten, difference, intersection, union, countBy, groupBy, andList, orList, any, all, sort, sortWith, sortBy, sum, product, mean, average, maximum, minimum, scan, scanl, scan1, scanl1, scanr, scanr1, slice, take, drop, splitAt, takeWhile, dropWhile, span, breakList, zip, zipWith, zipAll, zipAllWith, toString$ = {}.toString, slice$ = [].slice;
each = curry$(function(f, xs){
  var i$, len$, x;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    f(x);
  }
  return xs;
});
map = curry$(function(f, xs){
  var i$, len$, x, results$ = [];
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    results$.push(f(x));
  }
  return results$;
});
compact = curry$(function(xs){
  var i$, len$, x, results$ = [];
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    if (x) {
      results$.push(x);
    }
  }
  return results$;
});
filter = curry$(function(f, xs){
  var i$, len$, x, results$ = [];
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    if (f(x)) {
      results$.push(x);
    }
  }
  return results$;
});
reject = curry$(function(f, xs){
  var i$, len$, x, results$ = [];
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    if (!f(x)) {
      results$.push(x);
    }
  }
  return results$;
});
partition = curry$(function(f, xs){
  var passed, failed, i$, len$, x;
  passed = [];
  failed = [];
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    (f(x) ? passed : failed).push(x);
  }
  return [passed, failed];
});
find = curry$(function(f, xs){
  var i$, len$, x;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    if (f(x)) {
      return x;
    }
  }
});
head = first = function(xs){
  if (!xs.length) {
    return;
  }
  return xs[0];
};
tail = function(xs){
  if (!xs.length) {
    return;
  }
  return xs.slice(1);
};
last = function(xs){
  if (!xs.length) {
    return;
  }
  return xs[xs.length - 1];
};
initial = function(xs){
  var len;
  len = xs.length;
  if (!len) {
    return;
  }
  return xs.slice(0, len - 1);
};
empty = function(xs){
  return !xs.length;
};
reverse = function(xs){
  return xs.concat().reverse();
};
unique = function(xs){
  var result, i$, len$, x;
  result = [];
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    if (!in$(x, result)) {
      result.push(x);
    }
  }
  return result;
};
fold = foldl = curry$(function(f, memo, xs){
  var i$, len$, x;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    memo = f(memo, x);
  }
  return memo;
});
fold1 = foldl1 = curry$(function(f, xs){
  return fold(f, xs[0], xs.slice(1));
});
foldr = curry$(function(f, memo, xs){
  return fold(f, memo, xs.concat().reverse());
});
foldr1 = curry$(function(f, xs){
  var ys;
  ys = xs.concat().reverse();
  return fold(f, ys[0], ys.slice(1));
});
unfoldr = curry$(function(f, b){
  var result, x, that;
  result = [];
  x = b;
  while ((that = f(x)) != null) {
    result.push(that[0]);
    x = that[1];
  }
  return result;
});
concat = function(xss){
  return [].concat.apply([], xss);
};
concatMap = curry$(function(f, xs){
  var x;
  return [].concat.apply([], (function(){
    var i$, ref$, len$, results$ = [];
    for (i$ = 0, len$ = (ref$ = xs).length; i$ < len$; ++i$) {
      x = ref$[i$];
      results$.push(f(x));
    }
    return results$;
  }()));
});
flatten = curry$(function(xs){
  var x;
  return [].concat.apply([], (function(){
    var i$, ref$, len$, results$ = [];
    for (i$ = 0, len$ = (ref$ = xs).length; i$ < len$; ++i$) {
      x = ref$[i$];
      if (toString$.call(x).slice(8, -1) === 'Array') {
        results$.push(flatten(x));
      } else {
        results$.push(x);
      }
    }
    return results$;
  }()));
});
difference = function(xs){
  var yss, results, i$, len$, x, j$, len1$, ys;
  yss = slice$.call(arguments, 1);
  results = [];
  outer: for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    for (j$ = 0, len1$ = yss.length; j$ < len1$; ++j$) {
      ys = yss[j$];
      if (in$(x, ys)) {
        continue outer;
      }
    }
    results.push(x);
  }
  return results;
};
intersection = function(xs){
  var yss, results, i$, len$, x, j$, len1$, ys;
  yss = slice$.call(arguments, 1);
  results = [];
  outer: for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    for (j$ = 0, len1$ = yss.length; j$ < len1$; ++j$) {
      ys = yss[j$];
      if (!in$(x, ys)) {
        continue outer;
      }
    }
    results.push(x);
  }
  return results;
};
union = function(){
  var xss, results, i$, len$, xs, j$, len1$, x;
  xss = slice$.call(arguments);
  results = [];
  for (i$ = 0, len$ = xss.length; i$ < len$; ++i$) {
    xs = xss[i$];
    for (j$ = 0, len1$ = xs.length; j$ < len1$; ++j$) {
      x = xs[j$];
      if (!in$(x, results)) {
        results.push(x);
      }
    }
  }
  return results;
};
countBy = curry$(function(f, xs){
  var results, i$, len$, x, key;
  results = {};
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    key = f(x);
    if (key in results) {
      results[key] += 1;
    } else {
      results[key] = 1;
    }
  }
  return results;
});
groupBy = curry$(function(f, xs){
  var results, i$, len$, x, key;
  results = {};
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    key = f(x);
    if (key in results) {
      results[key].push(x);
    } else {
      results[key] = [x];
    }
  }
  return results;
});
andList = function(xs){
  var i$, len$, x;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    if (!x) {
      return false;
    }
  }
  return true;
};
orList = function(xs){
  var i$, len$, x;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    if (x) {
      return true;
    }
  }
  return false;
};
any = curry$(function(f, xs){
  var i$, len$, x;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    if (f(x)) {
      return true;
    }
  }
  return false;
});
all = curry$(function(f, xs){
  var i$, len$, x;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    if (!f(x)) {
      return false;
    }
  }
  return true;
});
sort = function(xs){
  return xs.concat().sort(function(x, y){
    if (x > y) {
      return 1;
    } else if (x < y) {
      return -1;
    } else {
      return 0;
    }
  });
};
sortWith = curry$(function(f, xs){
  if (!xs.length) {
    return [];
  }
  return xs.concat().sort(f);
});
sortBy = curry$(function(f, xs){
  if (!xs.length) {
    return [];
  }
  return xs.concat().sort(function(x, y){
    if (f(x) > f(y)) {
      return 1;
    } else if (f(x) < f(y)) {
      return -1;
    } else {
      return 0;
    }
  });
});
sum = function(xs){
  var result, i$, len$, x;
  result = 0;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    result += x;
  }
  return result;
};
product = function(xs){
  var result, i$, len$, x;
  result = 1;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    x = xs[i$];
    result *= x;
  }
  return result;
};
mean = average = function(xs){
  var sum, len, i$, i;
  sum = 0;
  len = xs.length;
  for (i$ = 0; i$ < len; ++i$) {
    i = i$;
    sum += xs[i];
  }
  return sum / len;
};
maximum = function(xs){
  var max, i$, ref$, len$, x;
  max = xs[0];
  for (i$ = 0, len$ = (ref$ = xs.slice(1)).length; i$ < len$; ++i$) {
    x = ref$[i$];
    if (x > max) {
      max = x;
    }
  }
  return max;
};
minimum = function(xs){
  var min, i$, ref$, len$, x;
  min = xs[0];
  for (i$ = 0, len$ = (ref$ = xs.slice(1)).length; i$ < len$; ++i$) {
    x = ref$[i$];
    if (x < min) {
      min = x;
    }
  }
  return min;
};
scan = scanl = curry$(function(f, memo, xs){
  var last, x;
  last = memo;
  return [memo].concat((function(){
    var i$, ref$, len$, results$ = [];
    for (i$ = 0, len$ = (ref$ = xs).length; i$ < len$; ++i$) {
      x = ref$[i$];
      results$.push(last = f(last, x));
    }
    return results$;
  }()));
});
scan1 = scanl1 = curry$(function(f, xs){
  if (!xs.length) {
    return;
  }
  return scan(f, xs[0], xs.slice(1));
});
scanr = curry$(function(f, memo, xs){
  xs = xs.concat().reverse();
  return scan(f, memo, xs).reverse();
});
scanr1 = curry$(function(f, xs){
  if (!xs.length) {
    return;
  }
  xs = xs.concat().reverse();
  return scan(f, xs[0], xs.slice(1)).reverse();
});
slice = curry$(function(x, y, xs){
  return xs.slice(x, y);
});
take = curry$(function(n, xs){
  if (n <= 0) {
    return xs.slice(0, 0);
  } else if (!xs.length) {
    return xs;
  } else {
    return xs.slice(0, n);
  }
});
drop = curry$(function(n, xs){
  if (n <= 0 || !xs.length) {
    return xs;
  } else {
    return xs.slice(n);
  }
});
splitAt = curry$(function(n, xs){
  return [take(n, xs), drop(n, xs)];
});
takeWhile = curry$(function(p, xs){
  var len, i;
  len = xs.length;
  if (!len) {
    return xs;
  }
  i = 0;
  while (i < len && p(xs[i])) {
    i += 1;
  }
  return xs.slice(0, i);
});
dropWhile = curry$(function(p, xs){
  var len, i;
  len = xs.length;
  if (!len) {
    return xs;
  }
  i = 0;
  while (i < len && p(xs[i])) {
    i += 1;
  }
  return xs.slice(i);
});
span = curry$(function(p, xs){
  return [takeWhile(p, xs), dropWhile(p, xs)];
});
breakList = curry$(function(p, xs){
  return span(compose$([not$, p]), xs);
});
zip = curry$(function(xs, ys){
  var result, len, i$, len$, i, x;
  result = [];
  len = ys.length;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    i = i$;
    x = xs[i$];
    if (i === len) {
      break;
    }
    result.push([x, ys[i]]);
  }
  return result;
});
zipWith = curry$(function(f, xs, ys){
  var result, len, i$, len$, i, x;
  result = [];
  len = ys.length;
  for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
    i = i$;
    x = xs[i$];
    if (i === len) {
      break;
    }
    result.push(f(x, ys[i]));
  }
  return result;
});
zipAll = function(){
  var xss, minLength, i$, len$, xs, ref$, i, lresult$, j$, results$ = [];
  xss = slice$.call(arguments);
  minLength = 9e9;
  for (i$ = 0, len$ = xss.length; i$ < len$; ++i$) {
    xs = xss[i$];
    minLength <= (ref$ = xs.length) || (minLength = ref$);
  }
  for (i$ = 0; i$ < minLength; ++i$) {
    i = i$;
    lresult$ = [];
    for (j$ = 0, len$ = xss.length; j$ < len$; ++j$) {
      xs = xss[j$];
      lresult$.push(xs[i]);
    }
    results$.push(lresult$);
  }
  return results$;
};
zipAllWith = function(f){
  var xss, minLength, i$, len$, xs, ref$, i, results$ = [];
  xss = slice$.call(arguments, 1);
  minLength = 9e9;
  for (i$ = 0, len$ = xss.length; i$ < len$; ++i$) {
    xs = xss[i$];
    minLength <= (ref$ = xs.length) || (minLength = ref$);
  }
  for (i$ = 0; i$ < minLength; ++i$) {
    i = i$;
    results$.push(f.apply(null, (fn$())));
  }
  return results$;
  function fn$(){
    var i$, ref$, len$, results$ = [];
    for (i$ = 0, len$ = (ref$ = xss).length; i$ < len$; ++i$) {
      xs = ref$[i$];
      results$.push(xs[i]);
    }
    return results$;
  }
};
module.exports = {
  each: each,
  map: map,
  filter: filter,
  compact: compact,
  reject: reject,
  partition: partition,
  find: find,
  head: head,
  first: first,
  tail: tail,
  last: last,
  initial: initial,
  empty: empty,
  reverse: reverse,
  difference: difference,
  intersection: intersection,
  union: union,
  countBy: countBy,
  groupBy: groupBy,
  fold: fold,
  fold1: fold1,
  foldl: foldl,
  foldl1: foldl1,
  foldr: foldr,
  foldr1: foldr1,
  unfoldr: unfoldr,
  andList: andList,
  orList: orList,
  any: any,
  all: all,
  unique: unique,
  sort: sort,
  sortWith: sortWith,
  sortBy: sortBy,
  sum: sum,
  product: product,
  mean: mean,
  average: average,
  concat: concat,
  concatMap: concatMap,
  flatten: flatten,
  maximum: maximum,
  minimum: minimum,
  scan: scan,
  scan1: scan1,
  scanl: scanl,
  scanl1: scanl1,
  scanr: scanr,
  scanr1: scanr1,
  slice: slice,
  take: take,
  drop: drop,
  splitAt: splitAt,
  takeWhile: takeWhile,
  dropWhile: dropWhile,
  span: span,
  breakList: breakList,
  zip: zip,
  zipWith: zipWith,
  zipAll: zipAll,
  zipAllWith: zipAllWith
};
function curry$(f, bound){
  var context,
  _curry = function(args) {
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}
function in$(x, arr){
  var i = -1, l = arr.length >>> 0;
  while (++i < l) if (x === arr[i] && i in arr) return true;
  return false;
}
function compose$(fs){
  return function(){
    var i, args = arguments;
    for (i = fs.length; i > 0; --i) { args = [fs[i-1].apply(this, args)]; }
    return args[0];
  };
}
function not$(x){ return !x; }

},{}],23:[function(require,module,exports){
var max, min, negate, abs, signum, quot, rem, div, mod, recip, pi, tau, exp, sqrt, ln, pow, sin, tan, cos, asin, acos, atan, atan2, truncate, round, ceiling, floor, isItNaN, even, odd, gcd, lcm;
max = curry$(function(x$, y$){
  return x$ > y$ ? x$ : y$;
});
min = curry$(function(x$, y$){
  return x$ < y$ ? x$ : y$;
});
negate = function(x){
  return -x;
};
abs = Math.abs;
signum = function(x){
  if (x < 0) {
    return -1;
  } else if (x > 0) {
    return 1;
  } else {
    return 0;
  }
};
quot = curry$(function(x, y){
  return ~~(x / y);
});
rem = curry$(function(x$, y$){
  return x$ % y$;
});
div = curry$(function(x, y){
  return Math.floor(x / y);
});
mod = curry$(function(x$, y$){
  var ref$;
  return ((x$) % (ref$ = y$) + ref$) % ref$;
});
recip = (function(it){
  return 1 / it;
});
pi = Math.PI;
tau = pi * 2;
exp = Math.exp;
sqrt = Math.sqrt;
ln = Math.log;
pow = curry$(function(x$, y$){
  return Math.pow(x$, y$);
});
sin = Math.sin;
tan = Math.tan;
cos = Math.cos;
asin = Math.asin;
acos = Math.acos;
atan = Math.atan;
atan2 = curry$(function(x, y){
  return Math.atan2(x, y);
});
truncate = function(x){
  return ~~x;
};
round = Math.round;
ceiling = Math.ceil;
floor = Math.floor;
isItNaN = function(x){
  return x !== x;
};
even = function(x){
  return x % 2 === 0;
};
odd = function(x){
  return x % 2 !== 0;
};
gcd = curry$(function(x, y){
  var z;
  x = Math.abs(x);
  y = Math.abs(y);
  while (y !== 0) {
    z = x % y;
    x = y;
    y = z;
  }
  return x;
});
lcm = curry$(function(x, y){
  return Math.abs(Math.floor(x / gcd(x, y) * y));
});
module.exports = {
  max: max,
  min: min,
  negate: negate,
  abs: abs,
  signum: signum,
  quot: quot,
  rem: rem,
  div: div,
  mod: mod,
  recip: recip,
  pi: pi,
  tau: tau,
  exp: exp,
  sqrt: sqrt,
  ln: ln,
  pow: pow,
  sin: sin,
  tan: tan,
  cos: cos,
  acos: acos,
  asin: asin,
  atan: atan,
  atan2: atan2,
  truncate: truncate,
  round: round,
  ceiling: ceiling,
  floor: floor,
  isItNaN: isItNaN,
  even: even,
  odd: odd,
  gcd: gcd,
  lcm: lcm
};
function curry$(f, bound){
  var context,
  _curry = function(args) {
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}

},{}],24:[function(require,module,exports){
var values, keys, pairsToObj, objToPairs, listsToObj, objToLists, empty, each, map, compact, filter, reject, partition, find;
values = function(object){
  var i$, x, results$ = [];
  for (i$ in object) {
    x = object[i$];
    results$.push(x);
  }
  return results$;
};
keys = function(object){
  var x, results$ = [];
  for (x in object) {
    results$.push(x);
  }
  return results$;
};
pairsToObj = function(object){
  var i$, len$, x, results$ = {};
  for (i$ = 0, len$ = object.length; i$ < len$; ++i$) {
    x = object[i$];
    results$[x[0]] = x[1];
  }
  return results$;
};
objToPairs = function(object){
  var key, value, results$ = [];
  for (key in object) {
    value = object[key];
    results$.push([key, value]);
  }
  return results$;
};
listsToObj = curry$(function(keys, values){
  var i$, len$, i, key, results$ = {};
  for (i$ = 0, len$ = keys.length; i$ < len$; ++i$) {
    i = i$;
    key = keys[i$];
    results$[key] = values[i];
  }
  return results$;
});
objToLists = function(objectect){
  var keys, values, key, value;
  keys = [];
  values = [];
  for (key in objectect) {
    value = objectect[key];
    keys.push(key);
    values.push(value);
  }
  return [keys, values];
};
empty = function(object){
  var x;
  for (x in object) {
    return false;
  }
  return true;
};
each = curry$(function(f, object){
  var i$, x;
  for (i$ in object) {
    x = object[i$];
    f(x);
  }
  return object;
});
map = curry$(function(f, object){
  var k, x, results$ = {};
  for (k in object) {
    x = object[k];
    results$[k] = f(x);
  }
  return results$;
});
compact = curry$(function(object){
  var k, x, results$ = {};
  for (k in object) {
    x = object[k];
if (x) {
      results$[k] = x;
    }
  }
  return results$;
});
filter = curry$(function(f, object){
  var k, x, results$ = {};
  for (k in object) {
    x = object[k];
if (f(x)) {
      results$[k] = x;
    }
  }
  return results$;
});
reject = curry$(function(f, object){
  var k, x, results$ = {};
  for (k in object) {
    x = object[k];
if (!f(x)) {
      results$[k] = x;
    }
  }
  return results$;
});
partition = curry$(function(f, object){
  var passed, failed, k, x;
  passed = {};
  failed = {};
  for (k in object) {
    x = object[k];
    (f(x) ? passed : failed)[k] = x;
  }
  return [passed, failed];
});
find = curry$(function(f, object){
  var i$, x;
  for (i$ in object) {
    x = object[i$];
    if (f(x)) {
      return x;
    }
  }
});
module.exports = {
  values: values,
  keys: keys,
  pairsToObj: pairsToObj,
  objToPairs: objToPairs,
  listsToObj: listsToObj,
  objToLists: objToLists,
  empty: empty,
  each: each,
  map: map,
  filter: filter,
  compact: compact,
  reject: reject,
  partition: partition,
  find: find
};
function curry$(f, bound){
  var context,
  _curry = function(args) {
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}

},{}],25:[function(require,module,exports){
var split, join, lines, unlines, words, unwords, chars, unchars, reverse, repeat;
split = curry$(function(sep, str){
  return str.split(sep);
});
join = curry$(function(sep, xs){
  return xs.join(sep);
});
lines = function(str){
  if (!str.length) {
    return [];
  }
  return str.split('\n');
};
unlines = function(it){
  return it.join('\n');
};
words = function(str){
  if (!str.length) {
    return [];
  }
  return str.split(/[ ]+/);
};
unwords = function(it){
  return it.join(' ');
};
chars = function(it){
  return it.split('');
};
unchars = function(it){
  return it.join('');
};
reverse = function(str){
  return str.split('').reverse().join('');
};
repeat = curry$(function(n, str){
  var out, res$, i$;
  res$ = [];
  for (i$ = 0; i$ < n; ++i$) {
    res$.push(str);
  }
  out = res$;
  return out.join('');
});
module.exports = {
  split: split,
  join: join,
  lines: lines,
  unlines: unlines,
  words: words,
  unwords: unwords,
  chars: chars,
  unchars: unchars,
  reverse: reverse,
  repeat: repeat
};
function curry$(f, bound){
  var context,
  _curry = function(args) {
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}

},{}],26:[function(require,module,exports){
var Func, List, Obj, Str, Num, id, isType, replicate, prelude, toString$ = {}.toString;
Func = require('./Func.js');
List = require('./List.js');
Obj = require('./Obj.js');
Str = require('./Str.js');
Num = require('./Num.js');
id = function(x){
  return x;
};
isType = curry$(function(type, x){
  return toString$.call(x).slice(8, -1) === type;
});
replicate = curry$(function(n, x){
  var i$, results$ = [];
  for (i$ = 0; i$ < n; ++i$) {
    results$.push(x);
  }
  return results$;
});
Str.empty = List.empty;
Str.slice = List.slice;
Str.take = List.take;
Str.drop = List.drop;
Str.splitAt = List.splitAt;
Str.takeWhile = List.takeWhile;
Str.dropWhile = List.dropWhile;
Str.span = List.span;
Str.breakStr = List.breakList;
prelude = {
  Func: Func,
  List: List,
  Obj: Obj,
  Str: Str,
  Num: Num,
  id: id,
  isType: isType,
  replicate: replicate
};
prelude.each = List.each;
prelude.map = List.map;
prelude.filter = List.filter;
prelude.compact = List.compact;
prelude.reject = List.reject;
prelude.partition = List.partition;
prelude.find = List.find;
prelude.head = List.head;
prelude.first = List.first;
prelude.tail = List.tail;
prelude.last = List.last;
prelude.initial = List.initial;
prelude.empty = List.empty;
prelude.reverse = List.reverse;
prelude.difference = List.difference;
prelude.intersection = List.intersection;
prelude.union = List.union;
prelude.countBy = List.countBy;
prelude.groupBy = List.groupBy;
prelude.fold = List.fold;
prelude.foldl = List.foldl;
prelude.fold1 = List.fold1;
prelude.foldl1 = List.foldl1;
prelude.foldr = List.foldr;
prelude.foldr1 = List.foldr1;
prelude.unfoldr = List.unfoldr;
prelude.andList = List.andList;
prelude.orList = List.orList;
prelude.any = List.any;
prelude.all = List.all;
prelude.unique = List.unique;
prelude.sort = List.sort;
prelude.sortWith = List.sortWith;
prelude.sortBy = List.sortBy;
prelude.sum = List.sum;
prelude.product = List.product;
prelude.mean = List.mean;
prelude.average = List.average;
prelude.concat = List.concat;
prelude.concatMap = List.concatMap;
prelude.flatten = List.flatten;
prelude.maximum = List.maximum;
prelude.minimum = List.minimum;
prelude.scan = List.scan;
prelude.scanl = List.scanl;
prelude.scan1 = List.scan1;
prelude.scanl1 = List.scanl1;
prelude.scanr = List.scanr;
prelude.scanr1 = List.scanr1;
prelude.slice = List.slice;
prelude.take = List.take;
prelude.drop = List.drop;
prelude.splitAt = List.splitAt;
prelude.takeWhile = List.takeWhile;
prelude.dropWhile = List.dropWhile;
prelude.span = List.span;
prelude.breakList = List.breakList;
prelude.zip = List.zip;
prelude.zipWith = List.zipWith;
prelude.zipAll = List.zipAll;
prelude.zipAllWith = List.zipAllWith;
prelude.apply = Func.apply;
prelude.curry = Func.curry;
prelude.flip = Func.flip;
prelude.fix = Func.fix;
prelude.split = Str.split;
prelude.join = Str.join;
prelude.lines = Str.lines;
prelude.unlines = Str.unlines;
prelude.words = Str.words;
prelude.unwords = Str.unwords;
prelude.chars = Str.chars;
prelude.unchars = Str.unchars;
prelude.values = Obj.values;
prelude.keys = Obj.keys;
prelude.pairsToObj = Obj.pairsToObj;
prelude.objToPairs = Obj.objToPairs;
prelude.listsToObj = Obj.listsToObj;
prelude.objToLists = Obj.objToLists;
prelude.max = Num.max;
prelude.min = Num.min;
prelude.negate = Num.negate;
prelude.abs = Num.abs;
prelude.signum = Num.signum;
prelude.quot = Num.quot;
prelude.rem = Num.rem;
prelude.div = Num.div;
prelude.mod = Num.mod;
prelude.recip = Num.recip;
prelude.pi = Num.pi;
prelude.tau = Num.tau;
prelude.exp = Num.exp;
prelude.sqrt = Num.sqrt;
prelude.ln = Num.ln;
prelude.pow = Num.pow;
prelude.sin = Num.sin;
prelude.tan = Num.tan;
prelude.cos = Num.cos;
prelude.acos = Num.acos;
prelude.asin = Num.asin;
prelude.atan = Num.atan;
prelude.atan2 = Num.atan2;
prelude.truncate = Num.truncate;
prelude.round = Num.round;
prelude.ceiling = Num.ceiling;
prelude.floor = Num.floor;
prelude.isItNaN = Num.isItNaN;
prelude.even = Num.even;
prelude.odd = Num.odd;
prelude.gcd = Num.gcd;
prelude.lcm = Num.lcm;
prelude.VERSION = '1.0.3';
module.exports = prelude;
function curry$(f, bound){
  var context,
  _curry = function(args) {
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}

},{"./Func.js":21,"./List.js":22,"./Num.js":23,"./Obj.js":24,"./Str.js":25}]},{},["HtQ974"])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvdGltZGF3c29uL0RvY3VtZW50cy9Xb3JraW5nL34gVGFidWxhL1NpdGUvc3JjL3NjcmlwdC9oZWxwZXJzL2luZGV4LmxzIiwiL1VzZXJzL3RpbWRhd3Nvbi9Eb2N1bWVudHMvV29ya2luZy9+IFRhYnVsYS9TaXRlL3NyYy9zY3JpcHQvaW5kZXgubHMiLCIvVXNlcnMvdGltZGF3c29uL0RvY3VtZW50cy9Xb3JraW5nL34gVGFidWxhL1NpdGUvc3JjL3NjcmlwdC9pbml0L2pxeC5scyIsIi9Vc2Vycy90aW1kYXdzb24vRG9jdW1lbnRzL1dvcmtpbmcvfiBUYWJ1bGEvU2l0ZS9zcmMvc2NyaXB0L2luaXQvc2V0dXAubHMiLCIvVXNlcnMvdGltZGF3c29uL0RvY3VtZW50cy9Xb3JraW5nL34gVGFidWxhL1NpdGUvc3JjL3NjcmlwdC9tb2R1bGVzL2NvbmZpZy5scyIsIi9Vc2Vycy90aW1kYXdzb24vRG9jdW1lbnRzL1dvcmtpbmcvfiBUYWJ1bGEvU2l0ZS9zcmMvc2NyaXB0L21vZHVsZXMvbG9nLmxzIiwiL1VzZXJzL3RpbWRhd3Nvbi9Eb2N1bWVudHMvV29ya2luZy9+IFRhYnVsYS9TaXRlL3NyYy9zY3JpcHQvbW9kdWxlcy9wdWJzdWIubHMiLCIvVXNlcnMvdGltZGF3c29uL0RvY3VtZW50cy9Xb3JraW5nL34gVGFidWxhL1NpdGUvc3JjL3NjcmlwdC9wYWdlcy9kZWZhdWx0LmxzIiwiL1VzZXJzL3RpbWRhd3Nvbi9Eb2N1bWVudHMvV29ya2luZy9+IFRhYnVsYS9TaXRlL3NyYy9zY3JpcHQvcGFnZXMvbG9hZGVyLmxzIiwiL1VzZXJzL3RpbWRhd3Nvbi9Eb2N1bWVudHMvV29ya2luZy9+IFRhYnVsYS9TaXRlL3NyYy9zY3JpcHQvd2lkZ2V0cy9iYXNlLmxzIiwiL1VzZXJzL3RpbWRhd3Nvbi9Eb2N1bWVudHMvV29ya2luZy9+IFRhYnVsYS9ub2RlX21vZHVsZXMvcHJlbHVkZS1scy9saWIvRnVuYy5qcyIsIi9Vc2Vycy90aW1kYXdzb24vRG9jdW1lbnRzL1dvcmtpbmcvfiBUYWJ1bGEvbm9kZV9tb2R1bGVzL3ByZWx1ZGUtbHMvbGliL0xpc3QuanMiLCIvVXNlcnMvdGltZGF3c29uL0RvY3VtZW50cy9Xb3JraW5nL34gVGFidWxhL25vZGVfbW9kdWxlcy9wcmVsdWRlLWxzL2xpYi9OdW0uanMiLCIvVXNlcnMvdGltZGF3c29uL0RvY3VtZW50cy9Xb3JraW5nL34gVGFidWxhL25vZGVfbW9kdWxlcy9wcmVsdWRlLWxzL2xpYi9PYmouanMiLCIvVXNlcnMvdGltZGF3c29uL0RvY3VtZW50cy9Xb3JraW5nL34gVGFidWxhL25vZGVfbW9kdWxlcy9wcmVsdWRlLWxzL2xpYi9TdHIuanMiLCIvVXNlcnMvdGltZGF3c29uL0RvY3VtZW50cy9Xb3JraW5nL34gVGFidWxhL25vZGVfbW9kdWxlcy9wcmVsdWRlLWxzL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDWEE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDN0dBOzs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2ZBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ0pBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbInZhciBwcmVsdWRlLCByZWYkLCBoZWFkLCBmaWx0ZXI7XG5tb2R1bGUuZXhwb3J0cyA9IChyZWYkID0gcHJlbHVkZSA9IHJlcXVpcmUoJ3ByZWx1ZGUtbHMnKSwgaGVhZCA9IHJlZiQuaGVhZCwgZmlsdGVyID0gcmVmJC5maWx0ZXIsIHJlZiQpO1xuaW1wb3J0JChtb2R1bGUuZXhwb3J0cywge1xuICBzZWxlY3Q6IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIGhlYWQoZmlsdGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG59KTtcbmZ1bmN0aW9uIGltcG9ydCQob2JqLCBzcmMpe1xuICB2YXIgb3duID0ge30uaGFzT3duUHJvcGVydHk7XG4gIGZvciAodmFyIGtleSBpbiBzcmMpIGlmIChvd24uY2FsbChzcmMsIGtleSkpIG9ialtrZXldID0gc3JjW2tleV07XG4gIHJldHVybiBvYmo7XG59IiwibW9kdWxlLmV4cG9ydHM9cmVxdWlyZSgnSHRROTc0Jyk7IiwidmFyIGxvZywgaGVscGVycywgcmVmJCwgcHViLCBzdWIsIGV4dGVuc2lvbnMsIHNsaWNlJCA9IFtdLnNsaWNlO1xubG9nID0gcmVxdWlyZSgnbG9nJyk7XG5oZWxwZXJzID0gcmVxdWlyZSgnaGVscGVycy9pbmRleCcpO1xucmVmJCA9IHJlcXVpcmUoJ21vZHVsZXMvcHVic3ViJyksIHB1YiA9IHJlZiQucHViLCBzdWIgPSByZWYkLnN1YjtcbmV4dGVuc2lvbnMgPSBmdW5jdGlvbigkKXtcbiAgJCA9PSBudWxsICYmICgkID0galF1ZXJ5KTtcbiAgcmV0dXJuIHtcbiAgICBleGlzdHM6IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gdGhpcy5sZW5ndGggPiAwO1xuICAgIH0sXG4gICAgY2xpY2tUb2dnbGU6IGZ1bmN0aW9uKGNuYW1lKXtcbiAgICAgIHJldHVybiB0aGlzLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiAkKHRoaXMpLnRvZ2dsZUNsYXNzKGNuYW1lKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgbXV0dWFsbHlFeGNsdXNpdmU6IGZ1bmN0aW9uKGFjdGl2ZUNsYXNzLCBzZXRGaXJzdCl7XG4gICAgICB2YXIgJGFsbDtcbiAgICAgIGFjdGl2ZUNsYXNzID09IG51bGwgJiYgKGFjdGl2ZUNsYXNzID0gJ2FjdGl2ZScpO1xuICAgICAgc2V0Rmlyc3QgPT0gbnVsbCAmJiAoc2V0Rmlyc3QgPSBmYWxzZSk7XG4gICAgICAkYWxsID0gdGhpcztcbiAgICAgIGlmIChzZXRGaXJzdCkge1xuICAgICAgICAkYWxsLmZpcnN0KCkuYWRkQ2xhc3MoYWN0aXZlQ2xhc3MpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyICR0aGlzO1xuICAgICAgICAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICRhbGwucmVtb3ZlQ2xhc3MoYWN0aXZlQ2xhc3MpO1xuICAgICAgICBpZiAoISR0Lmhhc0NsYXNzKGFjdGl2ZUNsYXNzKSkge1xuICAgICAgICAgIHJldHVybiAkdGhpcy5hZGRDbGFzcyhhY3RpdmVDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZ3JvdXBCeTogZnVuY3Rpb24oxpJfZ3JvdXBLZXkpe1xuICAgICAgdmFyIG1hcCwgc2V0cywganFHcm91cDtcbiAgICAgIG1hcCA9IGhlbHBlcnMuT2JqLm1hcDtcbiAgICAgIHNldHMgPSB7fTtcbiAgICAgIGpxR3JvdXAgPSBmdW5jdGlvbihpdGVtcyl7XG4gICAgICAgIHZhciBnLCBpJCwgbGVuJCwgaXRlbTtcbiAgICAgICAgZyA9IG51bGw7XG4gICAgICAgIGZvciAoaSQgPSAwLCBsZW4kID0gaXRlbXMubGVuZ3RoOyBpJCA8IGxlbiQ7ICsraSQpIHtcbiAgICAgICAgICBpdGVtID0gaXRlbXNbaSRdO1xuICAgICAgICAgIGlmIChnICE9IG51bGwpIHtcbiAgICAgICAgICAgIGcgPSBnLmFkZChpdGVtKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZyA9ICQoaXRlbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBnO1xuICAgICAgfTtcbiAgICAgIHRoaXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICB2YXIga2V5JDtcbiAgICAgICAgcmV0dXJuIChzZXRzW2tleSQgPSDGkl9ncm91cEtleSh0aGlzKV0gfHwgKHNldHNba2V5JF0gPSBbXSkpLnB1c2godGhpcyk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBtYXAoanFHcm91cCwgc2V0cyk7XG4gICAgfSxcbiAgICBldmVudDogZnVuY3Rpb24oKXtcbiAgICAgIGxvZyhcIkpRWDo6anEtZXZlbnRcIiwgdGhpcy5sZW5ndGgpO1xuICAgICAgcmV0dXJuIHRoaXMub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHJlZiQsIGV2ZW50LCBldmVudERhdGEsIGRhdGFBcmdzO1xuICAgICAgICByZWYkID0gJCh0aGlzKS5kYXRhKCksIGV2ZW50ID0gcmVmJC5ldmVudCwgZXZlbnREYXRhID0gcmVmJC5ldmVudERhdGE7XG4gICAgICAgIGRhdGFBcmdzID0gZXZlbnREYXRhICE9IG51bGxcbiAgICAgICAgICA/IFN0cmluZyhldmVudERhdGEpLnNwbGl0KCcsJylcbiAgICAgICAgICA6IFtdO1xuICAgICAgICBwdWIuYXBwbHkodGhpcywgW2V2ZW50XS5jb25jYXQoZGF0YUFyZ3MpKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSgpO1xuZXhwb3J0cy51c2VFeHRlbnNpb24gPSBmdW5jdGlvbigpe1xuICB2YXIgbmFtZXMsIGkkLCBsZW4kLCBuYW1lLCB0aGF0LCByZXN1bHRzJCA9IFtdO1xuICBuYW1lcyA9IHNsaWNlJC5jYWxsKGFyZ3VtZW50cyk7XG4gIGxvZyhcIkFwcDo6U2V0dXAgLSBsb2FkaW5nIEpRWFwiLCBuYW1lcyk7XG4gIGZvciAoaSQgPSAwLCBsZW4kID0gbmFtZXMubGVuZ3RoOyBpJCA8IGxlbiQ7ICsraSQpIHtcbiAgICBuYW1lID0gbmFtZXNbaSRdO1xuICAgIGlmICgodGhhdCA9IGV4dGVuc2lvbnNbbmFtZV0pICE9IG51bGwpIHtcbiAgICAgIHJlc3VsdHMkLnB1c2goalF1ZXJ5LmZuW25hbWVdID0gdGhhdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdHMkLnB1c2gobG9nKFwiICAuLi4gbm8gc3VjaCBleHRlbnNpb246IFwiICsgbmFtZSkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0cyQ7XG59O1xuZXhwb3J0cy5hdXRvSW52b2tlID0gZnVuY3Rpb24obm93KXtcbiAgdmFyIHJ1bkpxeDtcbiAgbm93ID09IG51bGwgJiYgKG5vdyA9IGZhbHNlKTtcbiAgcnVuSnF4ID0gZnVuY3Rpb24oKXtcbiAgICB2YXIgc2V0cywgbmFtZSwgJGdyb3VwLCByZXN1bHRzJCA9IFtdO1xuICAgIGxvZyhcIkFwcDo6U2V0dXAgLSBydW5uaW5nIEpRWCBBdXRvSW52b2tlclwiKTtcbiAgICBleHBvcnRzLnVzZUV4dGVuc2lvbignZ3JvdXBCeScpO1xuICAgIHNldHMgPSAkKCdbY2xhc3MqPVwianEtXCJdJykuZ3JvdXBCeShmdW5jdGlvbihlbCl7XG4gICAgICB2YXIgdGhhdDtcbiAgICAgIGlmICh0aGF0ID0gZWwuY2xhc3NOYW1lLm1hdGNoKC9qcS0oWy1cXHddKikvKSkge1xuICAgICAgICByZXR1cm4gdGhhdFsxXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICB9KTtcbiAgICBmb3IgKG5hbWUgaW4gc2V0cykge1xuICAgICAgJGdyb3VwID0gc2V0c1tuYW1lXTtcbiAgICAgIHJlc3VsdHMkLnB1c2godHlwZW9mICRncm91cFtuYW1lXSA9PT0gJ2Z1bmN0aW9uJyA/ICRncm91cFtuYW1lXSgpIDogdm9pZCA4KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHMkO1xuICB9O1xuICBpZiAobm93KSB7XG4gICAgcmV0dXJuIHJ1bkpxeCgpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBqUXVlcnkocnVuSnF4KTtcbiAgfVxufTsiLCJtb2R1bGUuZXhwb3J0cz1yZXF1aXJlKCd6aFp4aDEnKTsiLCJ2YXIgbG9nLCB0aGF0O1xubG9nID0gcmVxdWlyZSgnbG9nJyk7XG5pZiAoKHRoYXQgPSB3aW5kb3cuQ29uZmlnKSAhPSBudWxsKSB7XG4gIGxvZygnQXBwOjpTZXR1cCAtIENvbmZpZ3VyYXRpb24gZGV0ZWN0ZWQ6JywgdGhhdCk7XG59IGVsc2Uge1xuICBsb2coJ0FwcDo6U2V0dXAgLSBObyBleHRlcm5hbCBjb25maWd1cmF0aW9uJyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IHdpbmRvdy5Db25maWc7IiwidmFyIGxvZywgc2xpY2UkID0gW10uc2xpY2U7XG5tb2R1bGUuZXhwb3J0cyA9IGxvZyA9ICh0eXBlb2YgY29uc29sZSAhPSAndW5kZWZpbmVkJyAmJiBjb25zb2xlICE9PSBudWxsID8gY29uc29sZS5sb2cgOiB2b2lkIDgpID09IG51bGxcbiAgPyBmdW5jdGlvbigpe1xuICAgIHJldHVybiBhcmd1bWVudHNbMF07XG4gIH1cbiAgOiB0eXBlb2YgY29uc29sZS5sb2cgIT09ICdmdW5jdGlvbidcbiAgICA/IGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgYXJncztcbiAgICAgIGFyZ3MgPSBzbGljZSQuY2FsbChhcmd1bWVudHMpO1xuICAgICAgY29uc29sZS5sb2coYXJncy5qb2luKCcgJykpO1xuICAgICAgcmV0dXJuIGFyZ3VtZW50c1swXTtcbiAgICB9XG4gICAgOiBmdW5jdGlvbigpe1xuICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiBhcmd1bWVudHNbMF07XG4gICAgfTsiLCJtb2R1bGUuZXhwb3J0cz1yZXF1aXJlKCdKQkt3L0EnKTsiLCJ2YXIgbG9nO1xubG9nID0gcmVxdWlyZSgnbG9nJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCRwYWdlLCAkJCl7XG4gIHJldHVybiBsb2coXCJEZWZhdWx0IHBhZ2UgbG9hZGVkXCIpO1xufTsiLCJtb2R1bGUuZXhwb3J0cz1yZXF1aXJlKCd4Y1dvZ00nKTsiLCJtb2R1bGUuZXhwb3J0cz1yZXF1aXJlKCc3dWNJRGQnKTsiLCJ2YXIgY3VycnksIGZsaXAsIGZpeCwgYXBwbHk7XG5jdXJyeSA9IGZ1bmN0aW9uKGYpe1xuICByZXR1cm4gY3VycnkkKGYpO1xufTtcbmZsaXAgPSBjdXJyeSQoZnVuY3Rpb24oZiwgeCwgeSl7XG4gIHJldHVybiBmKHksIHgpO1xufSk7XG5maXggPSBmdW5jdGlvbihmKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKGcsIHgpe1xuICAgIHJldHVybiBmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIGYoZyhnKSkuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9KGZ1bmN0aW9uKGcsIHgpe1xuICAgIHJldHVybiBmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIGYoZyhnKSkuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9KTtcbn07XG5hcHBseSA9IGN1cnJ5JChmdW5jdGlvbihmLCBsaXN0KXtcbiAgcmV0dXJuIGYuYXBwbHkobnVsbCwgbGlzdCk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBjdXJyeTogY3VycnksXG4gIGZsaXA6IGZsaXAsXG4gIGZpeDogZml4LFxuICBhcHBseTogYXBwbHlcbn07XG5mdW5jdGlvbiBjdXJyeSQoZiwgYm91bmQpe1xuICB2YXIgY29udGV4dCxcbiAgX2N1cnJ5ID0gZnVuY3Rpb24oYXJncykge1xuICAgIHJldHVybiBmLmxlbmd0aCA+IDEgPyBmdW5jdGlvbigpe1xuICAgICAgdmFyIHBhcmFtcyA9IGFyZ3MgPyBhcmdzLmNvbmNhdCgpIDogW107XG4gICAgICBjb250ZXh0ID0gYm91bmQgPyBjb250ZXh0IHx8IHRoaXMgOiB0aGlzO1xuICAgICAgcmV0dXJuIHBhcmFtcy5wdXNoLmFwcGx5KHBhcmFtcywgYXJndW1lbnRzKSA8XG4gICAgICAgICAgZi5sZW5ndGggJiYgYXJndW1lbnRzLmxlbmd0aCA/XG4gICAgICAgIF9jdXJyeS5jYWxsKGNvbnRleHQsIHBhcmFtcykgOiBmLmFwcGx5KGNvbnRleHQsIHBhcmFtcyk7XG4gICAgfSA6IGY7XG4gIH07XG4gIHJldHVybiBfY3VycnkoKTtcbn1cbiIsInZhciBlYWNoLCBtYXAsIGNvbXBhY3QsIGZpbHRlciwgcmVqZWN0LCBwYXJ0aXRpb24sIGZpbmQsIGhlYWQsIGZpcnN0LCB0YWlsLCBsYXN0LCBpbml0aWFsLCBlbXB0eSwgcmV2ZXJzZSwgdW5pcXVlLCBmb2xkLCBmb2xkbCwgZm9sZDEsIGZvbGRsMSwgZm9sZHIsIGZvbGRyMSwgdW5mb2xkciwgY29uY2F0LCBjb25jYXRNYXAsIGZsYXR0ZW4sIGRpZmZlcmVuY2UsIGludGVyc2VjdGlvbiwgdW5pb24sIGNvdW50QnksIGdyb3VwQnksIGFuZExpc3QsIG9yTGlzdCwgYW55LCBhbGwsIHNvcnQsIHNvcnRXaXRoLCBzb3J0QnksIHN1bSwgcHJvZHVjdCwgbWVhbiwgYXZlcmFnZSwgbWF4aW11bSwgbWluaW11bSwgc2Nhbiwgc2NhbmwsIHNjYW4xLCBzY2FubDEsIHNjYW5yLCBzY2FucjEsIHNsaWNlLCB0YWtlLCBkcm9wLCBzcGxpdEF0LCB0YWtlV2hpbGUsIGRyb3BXaGlsZSwgc3BhbiwgYnJlYWtMaXN0LCB6aXAsIHppcFdpdGgsIHppcEFsbCwgemlwQWxsV2l0aCwgdG9TdHJpbmckID0ge30udG9TdHJpbmcsIHNsaWNlJCA9IFtdLnNsaWNlO1xuZWFjaCA9IGN1cnJ5JChmdW5jdGlvbihmLCB4cyl7XG4gIHZhciBpJCwgbGVuJCwgeDtcbiAgZm9yIChpJCA9IDAsIGxlbiQgPSB4cy5sZW5ndGg7IGkkIDwgbGVuJDsgKytpJCkge1xuICAgIHggPSB4c1tpJF07XG4gICAgZih4KTtcbiAgfVxuICByZXR1cm4geHM7XG59KTtcbm1hcCA9IGN1cnJ5JChmdW5jdGlvbihmLCB4cyl7XG4gIHZhciBpJCwgbGVuJCwgeCwgcmVzdWx0cyQgPSBbXTtcbiAgZm9yIChpJCA9IDAsIGxlbiQgPSB4cy5sZW5ndGg7IGkkIDwgbGVuJDsgKytpJCkge1xuICAgIHggPSB4c1tpJF07XG4gICAgcmVzdWx0cyQucHVzaChmKHgpKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0cyQ7XG59KTtcbmNvbXBhY3QgPSBjdXJyeSQoZnVuY3Rpb24oeHMpe1xuICB2YXIgaSQsIGxlbiQsIHgsIHJlc3VsdHMkID0gW107XG4gIGZvciAoaSQgPSAwLCBsZW4kID0geHMubGVuZ3RoOyBpJCA8IGxlbiQ7ICsraSQpIHtcbiAgICB4ID0geHNbaSRdO1xuICAgIGlmICh4KSB7XG4gICAgICByZXN1bHRzJC5wdXNoKHgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0cyQ7XG59KTtcbmZpbHRlciA9IGN1cnJ5JChmdW5jdGlvbihmLCB4cyl7XG4gIHZhciBpJCwgbGVuJCwgeCwgcmVzdWx0cyQgPSBbXTtcbiAgZm9yIChpJCA9IDAsIGxlbiQgPSB4cy5sZW5ndGg7IGkkIDwgbGVuJDsgKytpJCkge1xuICAgIHggPSB4c1tpJF07XG4gICAgaWYgKGYoeCkpIHtcbiAgICAgIHJlc3VsdHMkLnB1c2goeCk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRzJDtcbn0pO1xucmVqZWN0ID0gY3VycnkkKGZ1bmN0aW9uKGYsIHhzKXtcbiAgdmFyIGkkLCBsZW4kLCB4LCByZXN1bHRzJCA9IFtdO1xuICBmb3IgKGkkID0gMCwgbGVuJCA9IHhzLmxlbmd0aDsgaSQgPCBsZW4kOyArK2kkKSB7XG4gICAgeCA9IHhzW2kkXTtcbiAgICBpZiAoIWYoeCkpIHtcbiAgICAgIHJlc3VsdHMkLnB1c2goeCk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRzJDtcbn0pO1xucGFydGl0aW9uID0gY3VycnkkKGZ1bmN0aW9uKGYsIHhzKXtcbiAgdmFyIHBhc3NlZCwgZmFpbGVkLCBpJCwgbGVuJCwgeDtcbiAgcGFzc2VkID0gW107XG4gIGZhaWxlZCA9IFtdO1xuICBmb3IgKGkkID0gMCwgbGVuJCA9IHhzLmxlbmd0aDsgaSQgPCBsZW4kOyArK2kkKSB7XG4gICAgeCA9IHhzW2kkXTtcbiAgICAoZih4KSA/IHBhc3NlZCA6IGZhaWxlZCkucHVzaCh4KTtcbiAgfVxuICByZXR1cm4gW3Bhc3NlZCwgZmFpbGVkXTtcbn0pO1xuZmluZCA9IGN1cnJ5JChmdW5jdGlvbihmLCB4cyl7XG4gIHZhciBpJCwgbGVuJCwgeDtcbiAgZm9yIChpJCA9IDAsIGxlbiQgPSB4cy5sZW5ndGg7IGkkIDwgbGVuJDsgKytpJCkge1xuICAgIHggPSB4c1tpJF07XG4gICAgaWYgKGYoeCkpIHtcbiAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgfVxufSk7XG5oZWFkID0gZmlyc3QgPSBmdW5jdGlvbih4cyl7XG4gIGlmICgheHMubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHJldHVybiB4c1swXTtcbn07XG50YWlsID0gZnVuY3Rpb24oeHMpe1xuICBpZiAoIXhzLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICByZXR1cm4geHMuc2xpY2UoMSk7XG59O1xubGFzdCA9IGZ1bmN0aW9uKHhzKXtcbiAgaWYgKCF4cy5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgcmV0dXJuIHhzW3hzLmxlbmd0aCAtIDFdO1xufTtcbmluaXRpYWwgPSBmdW5jdGlvbih4cyl7XG4gIHZhciBsZW47XG4gIGxlbiA9IHhzLmxlbmd0aDtcbiAgaWYgKCFsZW4pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgcmV0dXJuIHhzLnNsaWNlKDAsIGxlbiAtIDEpO1xufTtcbmVtcHR5ID0gZnVuY3Rpb24oeHMpe1xuICByZXR1cm4gIXhzLmxlbmd0aDtcbn07XG5yZXZlcnNlID0gZnVuY3Rpb24oeHMpe1xuICByZXR1cm4geHMuY29uY2F0KCkucmV2ZXJzZSgpO1xufTtcbnVuaXF1ZSA9IGZ1bmN0aW9uKHhzKXtcbiAgdmFyIHJlc3VsdCwgaSQsIGxlbiQsIHg7XG4gIHJlc3VsdCA9IFtdO1xuICBmb3IgKGkkID0gMCwgbGVuJCA9IHhzLmxlbmd0aDsgaSQgPCBsZW4kOyArK2kkKSB7XG4gICAgeCA9IHhzW2kkXTtcbiAgICBpZiAoIWluJCh4LCByZXN1bHQpKSB7XG4gICAgICByZXN1bHQucHVzaCh4KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5mb2xkID0gZm9sZGwgPSBjdXJyeSQoZnVuY3Rpb24oZiwgbWVtbywgeHMpe1xuICB2YXIgaSQsIGxlbiQsIHg7XG4gIGZvciAoaSQgPSAwLCBsZW4kID0geHMubGVuZ3RoOyBpJCA8IGxlbiQ7ICsraSQpIHtcbiAgICB4ID0geHNbaSRdO1xuICAgIG1lbW8gPSBmKG1lbW8sIHgpO1xuICB9XG4gIHJldHVybiBtZW1vO1xufSk7XG5mb2xkMSA9IGZvbGRsMSA9IGN1cnJ5JChmdW5jdGlvbihmLCB4cyl7XG4gIHJldHVybiBmb2xkKGYsIHhzWzBdLCB4cy5zbGljZSgxKSk7XG59KTtcbmZvbGRyID0gY3VycnkkKGZ1bmN0aW9uKGYsIG1lbW8sIHhzKXtcbiAgcmV0dXJuIGZvbGQoZiwgbWVtbywgeHMuY29uY2F0KCkucmV2ZXJzZSgpKTtcbn0pO1xuZm9sZHIxID0gY3VycnkkKGZ1bmN0aW9uKGYsIHhzKXtcbiAgdmFyIHlzO1xuICB5cyA9IHhzLmNvbmNhdCgpLnJldmVyc2UoKTtcbiAgcmV0dXJuIGZvbGQoZiwgeXNbMF0sIHlzLnNsaWNlKDEpKTtcbn0pO1xudW5mb2xkciA9IGN1cnJ5JChmdW5jdGlvbihmLCBiKXtcbiAgdmFyIHJlc3VsdCwgeCwgdGhhdDtcbiAgcmVzdWx0ID0gW107XG4gIHggPSBiO1xuICB3aGlsZSAoKHRoYXQgPSBmKHgpKSAhPSBudWxsKSB7XG4gICAgcmVzdWx0LnB1c2godGhhdFswXSk7XG4gICAgeCA9IHRoYXRbMV07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuY29uY2F0ID0gZnVuY3Rpb24oeHNzKXtcbiAgcmV0dXJuIFtdLmNvbmNhdC5hcHBseShbXSwgeHNzKTtcbn07XG5jb25jYXRNYXAgPSBjdXJyeSQoZnVuY3Rpb24oZiwgeHMpe1xuICB2YXIgeDtcbiAgcmV0dXJuIFtdLmNvbmNhdC5hcHBseShbXSwgKGZ1bmN0aW9uKCl7XG4gICAgdmFyIGkkLCByZWYkLCBsZW4kLCByZXN1bHRzJCA9IFtdO1xuICAgIGZvciAoaSQgPSAwLCBsZW4kID0gKHJlZiQgPSB4cykubGVuZ3RoOyBpJCA8IGxlbiQ7ICsraSQpIHtcbiAgICAgIHggPSByZWYkW2kkXTtcbiAgICAgIHJlc3VsdHMkLnB1c2goZih4KSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzJDtcbiAgfSgpKSk7XG59KTtcbmZsYXR0ZW4gPSBjdXJyeSQoZnVuY3Rpb24oeHMpe1xuICB2YXIgeDtcbiAgcmV0dXJuIFtdLmNvbmNhdC5hcHBseShbXSwgKGZ1bmN0aW9uKCl7XG4gICAgdmFyIGkkLCByZWYkLCBsZW4kLCByZXN1bHRzJCA9IFtdO1xuICAgIGZvciAoaSQgPSAwLCBsZW4kID0gKHJlZiQgPSB4cykubGVuZ3RoOyBpJCA8IGxlbiQ7ICsraSQpIHtcbiAgICAgIHggPSByZWYkW2kkXTtcbiAgICAgIGlmICh0b1N0cmluZyQuY2FsbCh4KS5zbGljZSg4LCAtMSkgPT09ICdBcnJheScpIHtcbiAgICAgICAgcmVzdWx0cyQucHVzaChmbGF0dGVuKHgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdHMkLnB1c2goeCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzJDtcbiAgfSgpKSk7XG59KTtcbmRpZmZlcmVuY2UgPSBmdW5jdGlvbih4cyl7XG4gIHZhciB5c3MsIHJlc3VsdHMsIGkkLCBsZW4kLCB4LCBqJCwgbGVuMSQsIHlzO1xuICB5c3MgPSBzbGljZSQuY2FsbChhcmd1bWVudHMsIDEpO1xuICByZXN1bHRzID0gW107XG4gIG91dGVyOiBmb3IgKGkkID0gMCwgbGVuJCA9IHhzLmxlbmd0aDsgaSQgPCBsZW4kOyArK2kkKSB7XG4gICAgeCA9IHhzW2kkXTtcbiAgICBmb3IgKGokID0gMCwgbGVuMSQgPSB5c3MubGVuZ3RoOyBqJCA8IGxlbjEkOyArK2okKSB7XG4gICAgICB5cyA9IHlzc1tqJF07XG4gICAgICBpZiAoaW4kKHgsIHlzKSkge1xuICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0cy5wdXNoKHgpO1xuICB9XG4gIHJldHVybiByZXN1bHRzO1xufTtcbmludGVyc2VjdGlvbiA9IGZ1bmN0aW9uKHhzKXtcbiAgdmFyIHlzcywgcmVzdWx0cywgaSQsIGxlbiQsIHgsIGokLCBsZW4xJCwgeXM7XG4gIHlzcyA9IHNsaWNlJC5jYWxsKGFyZ3VtZW50cywgMSk7XG4gIHJlc3VsdHMgPSBbXTtcbiAgb3V0ZXI6IGZvciAoaSQgPSAwLCBsZW4kID0geHMubGVuZ3RoOyBpJCA8IGxlbiQ7ICsraSQpIHtcbiAgICB4ID0geHNbaSRdO1xuICAgIGZvciAoaiQgPSAwLCBsZW4xJCA9IHlzcy5sZW5ndGg7IGokIDwgbGVuMSQ7ICsraiQpIHtcbiAgICAgIHlzID0geXNzW2okXTtcbiAgICAgIGlmICghaW4kKHgsIHlzKSkge1xuICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0cy5wdXNoKHgpO1xuICB9XG4gIHJldHVybiByZXN1bHRzO1xufTtcbnVuaW9uID0gZnVuY3Rpb24oKXtcbiAgdmFyIHhzcywgcmVzdWx0cywgaSQsIGxlbiQsIHhzLCBqJCwgbGVuMSQsIHg7XG4gIHhzcyA9IHNsaWNlJC5jYWxsKGFyZ3VtZW50cyk7XG4gIHJlc3VsdHMgPSBbXTtcbiAgZm9yIChpJCA9IDAsIGxlbiQgPSB4c3MubGVuZ3RoOyBpJCA8IGxlbiQ7ICsraSQpIHtcbiAgICB4cyA9IHhzc1tpJF07XG4gICAgZm9yIChqJCA9IDAsIGxlbjEkID0geHMubGVuZ3RoOyBqJCA8IGxlbjEkOyArK2okKSB7XG4gICAgICB4ID0geHNbaiRdO1xuICAgICAgaWYgKCFpbiQoeCwgcmVzdWx0cykpIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKHgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0cztcbn07XG5jb3VudEJ5ID0gY3VycnkkKGZ1bmN0aW9uKGYsIHhzKXtcbiAgdmFyIHJlc3VsdHMsIGkkLCBsZW4kLCB4LCBrZXk7XG4gIHJlc3VsdHMgPSB7fTtcbiAgZm9yIChpJCA9IDAsIGxlbiQgPSB4cy5sZW5ndGg7IGkkIDwgbGVuJDsgKytpJCkge1xuICAgIHggPSB4c1tpJF07XG4gICAga2V5ID0gZih4KTtcbiAgICBpZiAoa2V5IGluIHJlc3VsdHMpIHtcbiAgICAgIHJlc3VsdHNba2V5XSArPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRzW2tleV0gPSAxO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0cztcbn0pO1xuZ3JvdXBCeSA9IGN1cnJ5JChmdW5jdGlvbihmLCB4cyl7XG4gIHZhciByZXN1bHRzLCBpJCwgbGVuJCwgeCwga2V5O1xuICByZXN1bHRzID0ge307XG4gIGZvciAoaSQgPSAwLCBsZW4kID0geHMubGVuZ3RoOyBpJCA8IGxlbiQ7ICsraSQpIHtcbiAgICB4ID0geHNbaSRdO1xuICAgIGtleSA9IGYoeCk7XG4gICAgaWYgKGtleSBpbiByZXN1bHRzKSB7XG4gICAgICByZXN1bHRzW2tleV0ucHVzaCh4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0c1trZXldID0gW3hdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0cztcbn0pO1xuYW5kTGlzdCA9IGZ1bmN0aW9uKHhzKXtcbiAgdmFyIGkkLCBsZW4kLCB4O1xuICBmb3IgKGkkID0gMCwgbGVuJCA9IHhzLmxlbmd0aDsgaSQgPCBsZW4kOyArK2kkKSB7XG4gICAgeCA9IHhzW2kkXTtcbiAgICBpZiAoIXgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xub3JMaXN0ID0gZnVuY3Rpb24oeHMpe1xuICB2YXIgaSQsIGxlbiQsIHg7XG4gIGZvciAoaSQgPSAwLCBsZW4kID0geHMubGVuZ3RoOyBpJCA8IGxlbiQ7ICsraSQpIHtcbiAgICB4ID0geHNbaSRdO1xuICAgIGlmICh4KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcbmFueSA9IGN1cnJ5JChmdW5jdGlvbihmLCB4cyl7XG4gIHZhciBpJCwgbGVuJCwgeDtcbiAgZm9yIChpJCA9IDAsIGxlbiQgPSB4cy5sZW5ndGg7IGkkIDwgbGVuJDsgKytpJCkge1xuICAgIHggPSB4c1tpJF07XG4gICAgaWYgKGYoeCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59KTtcbmFsbCA9IGN1cnJ5JChmdW5jdGlvbihmLCB4cyl7XG4gIHZhciBpJCwgbGVuJCwgeDtcbiAgZm9yIChpJCA9IDAsIGxlbiQgPSB4cy5sZW5ndGg7IGkkIDwgbGVuJDsgKytpJCkge1xuICAgIHggPSB4c1tpJF07XG4gICAgaWYgKCFmKHgpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufSk7XG5zb3J0ID0gZnVuY3Rpb24oeHMpe1xuICByZXR1cm4geHMuY29uY2F0KCkuc29ydChmdW5jdGlvbih4LCB5KXtcbiAgICBpZiAoeCA+IHkpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoeCA8IHkpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICB9KTtcbn07XG5zb3J0V2l0aCA9IGN1cnJ5JChmdW5jdGlvbihmLCB4cyl7XG4gIGlmICgheHMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIHJldHVybiB4cy5jb25jYXQoKS5zb3J0KGYpO1xufSk7XG5zb3J0QnkgPSBjdXJyeSQoZnVuY3Rpb24oZiwgeHMpe1xuICBpZiAoIXhzLmxlbmd0aCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICByZXR1cm4geHMuY29uY2F0KCkuc29ydChmdW5jdGlvbih4LCB5KXtcbiAgICBpZiAoZih4KSA+IGYoeSkpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZih4KSA8IGYoeSkpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICB9KTtcbn0pO1xuc3VtID0gZnVuY3Rpb24oeHMpe1xuICB2YXIgcmVzdWx0LCBpJCwgbGVuJCwgeDtcbiAgcmVzdWx0ID0gMDtcbiAgZm9yIChpJCA9IDAsIGxlbiQgPSB4cy5sZW5ndGg7IGkkIDwgbGVuJDsgKytpJCkge1xuICAgIHggPSB4c1tpJF07XG4gICAgcmVzdWx0ICs9IHg7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5wcm9kdWN0ID0gZnVuY3Rpb24oeHMpe1xuICB2YXIgcmVzdWx0LCBpJCwgbGVuJCwgeDtcbiAgcmVzdWx0ID0gMTtcbiAgZm9yIChpJCA9IDAsIGxlbiQgPSB4cy5sZW5ndGg7IGkkIDwgbGVuJDsgKytpJCkge1xuICAgIHggPSB4c1tpJF07XG4gICAgcmVzdWx0ICo9IHg7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5tZWFuID0gYXZlcmFnZSA9IGZ1bmN0aW9uKHhzKXtcbiAgdmFyIHN1bSwgbGVuLCBpJCwgaTtcbiAgc3VtID0gMDtcbiAgbGVuID0geHMubGVuZ3RoO1xuICBmb3IgKGkkID0gMDsgaSQgPCBsZW47ICsraSQpIHtcbiAgICBpID0gaSQ7XG4gICAgc3VtICs9IHhzW2ldO1xuICB9XG4gIHJldHVybiBzdW0gLyBsZW47XG59O1xubWF4aW11bSA9IGZ1bmN0aW9uKHhzKXtcbiAgdmFyIG1heCwgaSQsIHJlZiQsIGxlbiQsIHg7XG4gIG1heCA9IHhzWzBdO1xuICBmb3IgKGkkID0gMCwgbGVuJCA9IChyZWYkID0geHMuc2xpY2UoMSkpLmxlbmd0aDsgaSQgPCBsZW4kOyArK2kkKSB7XG4gICAgeCA9IHJlZiRbaSRdO1xuICAgIGlmICh4ID4gbWF4KSB7XG4gICAgICBtYXggPSB4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gbWF4O1xufTtcbm1pbmltdW0gPSBmdW5jdGlvbih4cyl7XG4gIHZhciBtaW4sIGkkLCByZWYkLCBsZW4kLCB4O1xuICBtaW4gPSB4c1swXTtcbiAgZm9yIChpJCA9IDAsIGxlbiQgPSAocmVmJCA9IHhzLnNsaWNlKDEpKS5sZW5ndGg7IGkkIDwgbGVuJDsgKytpJCkge1xuICAgIHggPSByZWYkW2kkXTtcbiAgICBpZiAoeCA8IG1pbikge1xuICAgICAgbWluID0geDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1pbjtcbn07XG5zY2FuID0gc2NhbmwgPSBjdXJyeSQoZnVuY3Rpb24oZiwgbWVtbywgeHMpe1xuICB2YXIgbGFzdCwgeDtcbiAgbGFzdCA9IG1lbW87XG4gIHJldHVybiBbbWVtb10uY29uY2F0KChmdW5jdGlvbigpe1xuICAgIHZhciBpJCwgcmVmJCwgbGVuJCwgcmVzdWx0cyQgPSBbXTtcbiAgICBmb3IgKGkkID0gMCwgbGVuJCA9IChyZWYkID0geHMpLmxlbmd0aDsgaSQgPCBsZW4kOyArK2kkKSB7XG4gICAgICB4ID0gcmVmJFtpJF07XG4gICAgICByZXN1bHRzJC5wdXNoKGxhc3QgPSBmKGxhc3QsIHgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHMkO1xuICB9KCkpKTtcbn0pO1xuc2NhbjEgPSBzY2FubDEgPSBjdXJyeSQoZnVuY3Rpb24oZiwgeHMpe1xuICBpZiAoIXhzLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICByZXR1cm4gc2NhbihmLCB4c1swXSwgeHMuc2xpY2UoMSkpO1xufSk7XG5zY2FuciA9IGN1cnJ5JChmdW5jdGlvbihmLCBtZW1vLCB4cyl7XG4gIHhzID0geHMuY29uY2F0KCkucmV2ZXJzZSgpO1xuICByZXR1cm4gc2NhbihmLCBtZW1vLCB4cykucmV2ZXJzZSgpO1xufSk7XG5zY2FucjEgPSBjdXJyeSQoZnVuY3Rpb24oZiwgeHMpe1xuICBpZiAoIXhzLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICB4cyA9IHhzLmNvbmNhdCgpLnJldmVyc2UoKTtcbiAgcmV0dXJuIHNjYW4oZiwgeHNbMF0sIHhzLnNsaWNlKDEpKS5yZXZlcnNlKCk7XG59KTtcbnNsaWNlID0gY3VycnkkKGZ1bmN0aW9uKHgsIHksIHhzKXtcbiAgcmV0dXJuIHhzLnNsaWNlKHgsIHkpO1xufSk7XG50YWtlID0gY3VycnkkKGZ1bmN0aW9uKG4sIHhzKXtcbiAgaWYgKG4gPD0gMCkge1xuICAgIHJldHVybiB4cy5zbGljZSgwLCAwKTtcbiAgfSBlbHNlIGlmICgheHMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHhzO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB4cy5zbGljZSgwLCBuKTtcbiAgfVxufSk7XG5kcm9wID0gY3VycnkkKGZ1bmN0aW9uKG4sIHhzKXtcbiAgaWYgKG4gPD0gMCB8fCAheHMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHhzO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB4cy5zbGljZShuKTtcbiAgfVxufSk7XG5zcGxpdEF0ID0gY3VycnkkKGZ1bmN0aW9uKG4sIHhzKXtcbiAgcmV0dXJuIFt0YWtlKG4sIHhzKSwgZHJvcChuLCB4cyldO1xufSk7XG50YWtlV2hpbGUgPSBjdXJyeSQoZnVuY3Rpb24ocCwgeHMpe1xuICB2YXIgbGVuLCBpO1xuICBsZW4gPSB4cy5sZW5ndGg7XG4gIGlmICghbGVuKSB7XG4gICAgcmV0dXJuIHhzO1xuICB9XG4gIGkgPSAwO1xuICB3aGlsZSAoaSA8IGxlbiAmJiBwKHhzW2ldKSkge1xuICAgIGkgKz0gMTtcbiAgfVxuICByZXR1cm4geHMuc2xpY2UoMCwgaSk7XG59KTtcbmRyb3BXaGlsZSA9IGN1cnJ5JChmdW5jdGlvbihwLCB4cyl7XG4gIHZhciBsZW4sIGk7XG4gIGxlbiA9IHhzLmxlbmd0aDtcbiAgaWYgKCFsZW4pIHtcbiAgICByZXR1cm4geHM7XG4gIH1cbiAgaSA9IDA7XG4gIHdoaWxlIChpIDwgbGVuICYmIHAoeHNbaV0pKSB7XG4gICAgaSArPSAxO1xuICB9XG4gIHJldHVybiB4cy5zbGljZShpKTtcbn0pO1xuc3BhbiA9IGN1cnJ5JChmdW5jdGlvbihwLCB4cyl7XG4gIHJldHVybiBbdGFrZVdoaWxlKHAsIHhzKSwgZHJvcFdoaWxlKHAsIHhzKV07XG59KTtcbmJyZWFrTGlzdCA9IGN1cnJ5JChmdW5jdGlvbihwLCB4cyl7XG4gIHJldHVybiBzcGFuKGNvbXBvc2UkKFtub3QkLCBwXSksIHhzKTtcbn0pO1xuemlwID0gY3VycnkkKGZ1bmN0aW9uKHhzLCB5cyl7XG4gIHZhciByZXN1bHQsIGxlbiwgaSQsIGxlbiQsIGksIHg7XG4gIHJlc3VsdCA9IFtdO1xuICBsZW4gPSB5cy5sZW5ndGg7XG4gIGZvciAoaSQgPSAwLCBsZW4kID0geHMubGVuZ3RoOyBpJCA8IGxlbiQ7ICsraSQpIHtcbiAgICBpID0gaSQ7XG4gICAgeCA9IHhzW2kkXTtcbiAgICBpZiAoaSA9PT0gbGVuKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgcmVzdWx0LnB1c2goW3gsIHlzW2ldXSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuemlwV2l0aCA9IGN1cnJ5JChmdW5jdGlvbihmLCB4cywgeXMpe1xuICB2YXIgcmVzdWx0LCBsZW4sIGkkLCBsZW4kLCBpLCB4O1xuICByZXN1bHQgPSBbXTtcbiAgbGVuID0geXMubGVuZ3RoO1xuICBmb3IgKGkkID0gMCwgbGVuJCA9IHhzLmxlbmd0aDsgaSQgPCBsZW4kOyArK2kkKSB7XG4gICAgaSA9IGkkO1xuICAgIHggPSB4c1tpJF07XG4gICAgaWYgKGkgPT09IGxlbikge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJlc3VsdC5wdXNoKGYoeCwgeXNbaV0pKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufSk7XG56aXBBbGwgPSBmdW5jdGlvbigpe1xuICB2YXIgeHNzLCBtaW5MZW5ndGgsIGkkLCBsZW4kLCB4cywgcmVmJCwgaSwgbHJlc3VsdCQsIGokLCByZXN1bHRzJCA9IFtdO1xuICB4c3MgPSBzbGljZSQuY2FsbChhcmd1bWVudHMpO1xuICBtaW5MZW5ndGggPSA5ZTk7XG4gIGZvciAoaSQgPSAwLCBsZW4kID0geHNzLmxlbmd0aDsgaSQgPCBsZW4kOyArK2kkKSB7XG4gICAgeHMgPSB4c3NbaSRdO1xuICAgIG1pbkxlbmd0aCA8PSAocmVmJCA9IHhzLmxlbmd0aCkgfHwgKG1pbkxlbmd0aCA9IHJlZiQpO1xuICB9XG4gIGZvciAoaSQgPSAwOyBpJCA8IG1pbkxlbmd0aDsgKytpJCkge1xuICAgIGkgPSBpJDtcbiAgICBscmVzdWx0JCA9IFtdO1xuICAgIGZvciAoaiQgPSAwLCBsZW4kID0geHNzLmxlbmd0aDsgaiQgPCBsZW4kOyArK2okKSB7XG4gICAgICB4cyA9IHhzc1tqJF07XG4gICAgICBscmVzdWx0JC5wdXNoKHhzW2ldKTtcbiAgICB9XG4gICAgcmVzdWx0cyQucHVzaChscmVzdWx0JCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHMkO1xufTtcbnppcEFsbFdpdGggPSBmdW5jdGlvbihmKXtcbiAgdmFyIHhzcywgbWluTGVuZ3RoLCBpJCwgbGVuJCwgeHMsIHJlZiQsIGksIHJlc3VsdHMkID0gW107XG4gIHhzcyA9IHNsaWNlJC5jYWxsKGFyZ3VtZW50cywgMSk7XG4gIG1pbkxlbmd0aCA9IDllOTtcbiAgZm9yIChpJCA9IDAsIGxlbiQgPSB4c3MubGVuZ3RoOyBpJCA8IGxlbiQ7ICsraSQpIHtcbiAgICB4cyA9IHhzc1tpJF07XG4gICAgbWluTGVuZ3RoIDw9IChyZWYkID0geHMubGVuZ3RoKSB8fCAobWluTGVuZ3RoID0gcmVmJCk7XG4gIH1cbiAgZm9yIChpJCA9IDA7IGkkIDwgbWluTGVuZ3RoOyArK2kkKSB7XG4gICAgaSA9IGkkO1xuICAgIHJlc3VsdHMkLnB1c2goZi5hcHBseShudWxsLCAoZm4kKCkpKSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHMkO1xuICBmdW5jdGlvbiBmbiQoKXtcbiAgICB2YXIgaSQsIHJlZiQsIGxlbiQsIHJlc3VsdHMkID0gW107XG4gICAgZm9yIChpJCA9IDAsIGxlbiQgPSAocmVmJCA9IHhzcykubGVuZ3RoOyBpJCA8IGxlbiQ7ICsraSQpIHtcbiAgICAgIHhzID0gcmVmJFtpJF07XG4gICAgICByZXN1bHRzJC5wdXNoKHhzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHMkO1xuICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGVhY2g6IGVhY2gsXG4gIG1hcDogbWFwLFxuICBmaWx0ZXI6IGZpbHRlcixcbiAgY29tcGFjdDogY29tcGFjdCxcbiAgcmVqZWN0OiByZWplY3QsXG4gIHBhcnRpdGlvbjogcGFydGl0aW9uLFxuICBmaW5kOiBmaW5kLFxuICBoZWFkOiBoZWFkLFxuICBmaXJzdDogZmlyc3QsXG4gIHRhaWw6IHRhaWwsXG4gIGxhc3Q6IGxhc3QsXG4gIGluaXRpYWw6IGluaXRpYWwsXG4gIGVtcHR5OiBlbXB0eSxcbiAgcmV2ZXJzZTogcmV2ZXJzZSxcbiAgZGlmZmVyZW5jZTogZGlmZmVyZW5jZSxcbiAgaW50ZXJzZWN0aW9uOiBpbnRlcnNlY3Rpb24sXG4gIHVuaW9uOiB1bmlvbixcbiAgY291bnRCeTogY291bnRCeSxcbiAgZ3JvdXBCeTogZ3JvdXBCeSxcbiAgZm9sZDogZm9sZCxcbiAgZm9sZDE6IGZvbGQxLFxuICBmb2xkbDogZm9sZGwsXG4gIGZvbGRsMTogZm9sZGwxLFxuICBmb2xkcjogZm9sZHIsXG4gIGZvbGRyMTogZm9sZHIxLFxuICB1bmZvbGRyOiB1bmZvbGRyLFxuICBhbmRMaXN0OiBhbmRMaXN0LFxuICBvckxpc3Q6IG9yTGlzdCxcbiAgYW55OiBhbnksXG4gIGFsbDogYWxsLFxuICB1bmlxdWU6IHVuaXF1ZSxcbiAgc29ydDogc29ydCxcbiAgc29ydFdpdGg6IHNvcnRXaXRoLFxuICBzb3J0Qnk6IHNvcnRCeSxcbiAgc3VtOiBzdW0sXG4gIHByb2R1Y3Q6IHByb2R1Y3QsXG4gIG1lYW46IG1lYW4sXG4gIGF2ZXJhZ2U6IGF2ZXJhZ2UsXG4gIGNvbmNhdDogY29uY2F0LFxuICBjb25jYXRNYXA6IGNvbmNhdE1hcCxcbiAgZmxhdHRlbjogZmxhdHRlbixcbiAgbWF4aW11bTogbWF4aW11bSxcbiAgbWluaW11bTogbWluaW11bSxcbiAgc2Nhbjogc2NhbixcbiAgc2NhbjE6IHNjYW4xLFxuICBzY2FubDogc2NhbmwsXG4gIHNjYW5sMTogc2NhbmwxLFxuICBzY2Fucjogc2NhbnIsXG4gIHNjYW5yMTogc2NhbnIxLFxuICBzbGljZTogc2xpY2UsXG4gIHRha2U6IHRha2UsXG4gIGRyb3A6IGRyb3AsXG4gIHNwbGl0QXQ6IHNwbGl0QXQsXG4gIHRha2VXaGlsZTogdGFrZVdoaWxlLFxuICBkcm9wV2hpbGU6IGRyb3BXaGlsZSxcbiAgc3Bhbjogc3BhbixcbiAgYnJlYWtMaXN0OiBicmVha0xpc3QsXG4gIHppcDogemlwLFxuICB6aXBXaXRoOiB6aXBXaXRoLFxuICB6aXBBbGw6IHppcEFsbCxcbiAgemlwQWxsV2l0aDogemlwQWxsV2l0aFxufTtcbmZ1bmN0aW9uIGN1cnJ5JChmLCBib3VuZCl7XG4gIHZhciBjb250ZXh0LFxuICBfY3VycnkgPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgcmV0dXJuIGYubGVuZ3RoID4gMSA/IGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgcGFyYW1zID0gYXJncyA/IGFyZ3MuY29uY2F0KCkgOiBbXTtcbiAgICAgIGNvbnRleHQgPSBib3VuZCA/IGNvbnRleHQgfHwgdGhpcyA6IHRoaXM7XG4gICAgICByZXR1cm4gcGFyYW1zLnB1c2guYXBwbHkocGFyYW1zLCBhcmd1bWVudHMpIDxcbiAgICAgICAgICBmLmxlbmd0aCAmJiBhcmd1bWVudHMubGVuZ3RoID9cbiAgICAgICAgX2N1cnJ5LmNhbGwoY29udGV4dCwgcGFyYW1zKSA6IGYuYXBwbHkoY29udGV4dCwgcGFyYW1zKTtcbiAgICB9IDogZjtcbiAgfTtcbiAgcmV0dXJuIF9jdXJyeSgpO1xufVxuZnVuY3Rpb24gaW4kKHgsIGFycil7XG4gIHZhciBpID0gLTEsIGwgPSBhcnIubGVuZ3RoID4+PiAwO1xuICB3aGlsZSAoKytpIDwgbCkgaWYgKHggPT09IGFycltpXSAmJiBpIGluIGFycikgcmV0dXJuIHRydWU7XG4gIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGNvbXBvc2UkKGZzKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgdmFyIGksIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgZm9yIChpID0gZnMubGVuZ3RoOyBpID4gMDsgLS1pKSB7IGFyZ3MgPSBbZnNbaS0xXS5hcHBseSh0aGlzLCBhcmdzKV07IH1cbiAgICByZXR1cm4gYXJnc1swXTtcbiAgfTtcbn1cbmZ1bmN0aW9uIG5vdCQoeCl7IHJldHVybiAheDsgfVxuIiwidmFyIG1heCwgbWluLCBuZWdhdGUsIGFicywgc2lnbnVtLCBxdW90LCByZW0sIGRpdiwgbW9kLCByZWNpcCwgcGksIHRhdSwgZXhwLCBzcXJ0LCBsbiwgcG93LCBzaW4sIHRhbiwgY29zLCBhc2luLCBhY29zLCBhdGFuLCBhdGFuMiwgdHJ1bmNhdGUsIHJvdW5kLCBjZWlsaW5nLCBmbG9vciwgaXNJdE5hTiwgZXZlbiwgb2RkLCBnY2QsIGxjbTtcbm1heCA9IGN1cnJ5JChmdW5jdGlvbih4JCwgeSQpe1xuICByZXR1cm4geCQgPiB5JCA/IHgkIDogeSQ7XG59KTtcbm1pbiA9IGN1cnJ5JChmdW5jdGlvbih4JCwgeSQpe1xuICByZXR1cm4geCQgPCB5JCA/IHgkIDogeSQ7XG59KTtcbm5lZ2F0ZSA9IGZ1bmN0aW9uKHgpe1xuICByZXR1cm4gLXg7XG59O1xuYWJzID0gTWF0aC5hYnM7XG5zaWdudW0gPSBmdW5jdGlvbih4KXtcbiAgaWYgKHggPCAwKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9IGVsc2UgaWYgKHggPiAwKSB7XG4gICAgcmV0dXJuIDE7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbn07XG5xdW90ID0gY3VycnkkKGZ1bmN0aW9uKHgsIHkpe1xuICByZXR1cm4gfn4oeCAvIHkpO1xufSk7XG5yZW0gPSBjdXJyeSQoZnVuY3Rpb24oeCQsIHkkKXtcbiAgcmV0dXJuIHgkICUgeSQ7XG59KTtcbmRpdiA9IGN1cnJ5JChmdW5jdGlvbih4LCB5KXtcbiAgcmV0dXJuIE1hdGguZmxvb3IoeCAvIHkpO1xufSk7XG5tb2QgPSBjdXJyeSQoZnVuY3Rpb24oeCQsIHkkKXtcbiAgdmFyIHJlZiQ7XG4gIHJldHVybiAoKHgkKSAlIChyZWYkID0geSQpICsgcmVmJCkgJSByZWYkO1xufSk7XG5yZWNpcCA9IChmdW5jdGlvbihpdCl7XG4gIHJldHVybiAxIC8gaXQ7XG59KTtcbnBpID0gTWF0aC5QSTtcbnRhdSA9IHBpICogMjtcbmV4cCA9IE1hdGguZXhwO1xuc3FydCA9IE1hdGguc3FydDtcbmxuID0gTWF0aC5sb2c7XG5wb3cgPSBjdXJyeSQoZnVuY3Rpb24oeCQsIHkkKXtcbiAgcmV0dXJuIE1hdGgucG93KHgkLCB5JCk7XG59KTtcbnNpbiA9IE1hdGguc2luO1xudGFuID0gTWF0aC50YW47XG5jb3MgPSBNYXRoLmNvcztcbmFzaW4gPSBNYXRoLmFzaW47XG5hY29zID0gTWF0aC5hY29zO1xuYXRhbiA9IE1hdGguYXRhbjtcbmF0YW4yID0gY3VycnkkKGZ1bmN0aW9uKHgsIHkpe1xuICByZXR1cm4gTWF0aC5hdGFuMih4LCB5KTtcbn0pO1xudHJ1bmNhdGUgPSBmdW5jdGlvbih4KXtcbiAgcmV0dXJuIH5+eDtcbn07XG5yb3VuZCA9IE1hdGgucm91bmQ7XG5jZWlsaW5nID0gTWF0aC5jZWlsO1xuZmxvb3IgPSBNYXRoLmZsb29yO1xuaXNJdE5hTiA9IGZ1bmN0aW9uKHgpe1xuICByZXR1cm4geCAhPT0geDtcbn07XG5ldmVuID0gZnVuY3Rpb24oeCl7XG4gIHJldHVybiB4ICUgMiA9PT0gMDtcbn07XG5vZGQgPSBmdW5jdGlvbih4KXtcbiAgcmV0dXJuIHggJSAyICE9PSAwO1xufTtcbmdjZCA9IGN1cnJ5JChmdW5jdGlvbih4LCB5KXtcbiAgdmFyIHo7XG4gIHggPSBNYXRoLmFicyh4KTtcbiAgeSA9IE1hdGguYWJzKHkpO1xuICB3aGlsZSAoeSAhPT0gMCkge1xuICAgIHogPSB4ICUgeTtcbiAgICB4ID0geTtcbiAgICB5ID0gejtcbiAgfVxuICByZXR1cm4geDtcbn0pO1xubGNtID0gY3VycnkkKGZ1bmN0aW9uKHgsIHkpe1xuICByZXR1cm4gTWF0aC5hYnMoTWF0aC5mbG9vcih4IC8gZ2NkKHgsIHkpICogeSkpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWF4OiBtYXgsXG4gIG1pbjogbWluLFxuICBuZWdhdGU6IG5lZ2F0ZSxcbiAgYWJzOiBhYnMsXG4gIHNpZ251bTogc2lnbnVtLFxuICBxdW90OiBxdW90LFxuICByZW06IHJlbSxcbiAgZGl2OiBkaXYsXG4gIG1vZDogbW9kLFxuICByZWNpcDogcmVjaXAsXG4gIHBpOiBwaSxcbiAgdGF1OiB0YXUsXG4gIGV4cDogZXhwLFxuICBzcXJ0OiBzcXJ0LFxuICBsbjogbG4sXG4gIHBvdzogcG93LFxuICBzaW46IHNpbixcbiAgdGFuOiB0YW4sXG4gIGNvczogY29zLFxuICBhY29zOiBhY29zLFxuICBhc2luOiBhc2luLFxuICBhdGFuOiBhdGFuLFxuICBhdGFuMjogYXRhbjIsXG4gIHRydW5jYXRlOiB0cnVuY2F0ZSxcbiAgcm91bmQ6IHJvdW5kLFxuICBjZWlsaW5nOiBjZWlsaW5nLFxuICBmbG9vcjogZmxvb3IsXG4gIGlzSXROYU46IGlzSXROYU4sXG4gIGV2ZW46IGV2ZW4sXG4gIG9kZDogb2RkLFxuICBnY2Q6IGdjZCxcbiAgbGNtOiBsY21cbn07XG5mdW5jdGlvbiBjdXJyeSQoZiwgYm91bmQpe1xuICB2YXIgY29udGV4dCxcbiAgX2N1cnJ5ID0gZnVuY3Rpb24oYXJncykge1xuICAgIHJldHVybiBmLmxlbmd0aCA+IDEgPyBmdW5jdGlvbigpe1xuICAgICAgdmFyIHBhcmFtcyA9IGFyZ3MgPyBhcmdzLmNvbmNhdCgpIDogW107XG4gICAgICBjb250ZXh0ID0gYm91bmQgPyBjb250ZXh0IHx8IHRoaXMgOiB0aGlzO1xuICAgICAgcmV0dXJuIHBhcmFtcy5wdXNoLmFwcGx5KHBhcmFtcywgYXJndW1lbnRzKSA8XG4gICAgICAgICAgZi5sZW5ndGggJiYgYXJndW1lbnRzLmxlbmd0aCA/XG4gICAgICAgIF9jdXJyeS5jYWxsKGNvbnRleHQsIHBhcmFtcykgOiBmLmFwcGx5KGNvbnRleHQsIHBhcmFtcyk7XG4gICAgfSA6IGY7XG4gIH07XG4gIHJldHVybiBfY3VycnkoKTtcbn1cbiIsInZhciB2YWx1ZXMsIGtleXMsIHBhaXJzVG9PYmosIG9ialRvUGFpcnMsIGxpc3RzVG9PYmosIG9ialRvTGlzdHMsIGVtcHR5LCBlYWNoLCBtYXAsIGNvbXBhY3QsIGZpbHRlciwgcmVqZWN0LCBwYXJ0aXRpb24sIGZpbmQ7XG52YWx1ZXMgPSBmdW5jdGlvbihvYmplY3Qpe1xuICB2YXIgaSQsIHgsIHJlc3VsdHMkID0gW107XG4gIGZvciAoaSQgaW4gb2JqZWN0KSB7XG4gICAgeCA9IG9iamVjdFtpJF07XG4gICAgcmVzdWx0cyQucHVzaCh4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0cyQ7XG59O1xua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCl7XG4gIHZhciB4LCByZXN1bHRzJCA9IFtdO1xuICBmb3IgKHggaW4gb2JqZWN0KSB7XG4gICAgcmVzdWx0cyQucHVzaCh4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0cyQ7XG59O1xucGFpcnNUb09iaiA9IGZ1bmN0aW9uKG9iamVjdCl7XG4gIHZhciBpJCwgbGVuJCwgeCwgcmVzdWx0cyQgPSB7fTtcbiAgZm9yIChpJCA9IDAsIGxlbiQgPSBvYmplY3QubGVuZ3RoOyBpJCA8IGxlbiQ7ICsraSQpIHtcbiAgICB4ID0gb2JqZWN0W2kkXTtcbiAgICByZXN1bHRzJFt4WzBdXSA9IHhbMV07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHMkO1xufTtcbm9ialRvUGFpcnMgPSBmdW5jdGlvbihvYmplY3Qpe1xuICB2YXIga2V5LCB2YWx1ZSwgcmVzdWx0cyQgPSBbXTtcbiAgZm9yIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgdmFsdWUgPSBvYmplY3Rba2V5XTtcbiAgICByZXN1bHRzJC5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHMkO1xufTtcbmxpc3RzVG9PYmogPSBjdXJyeSQoZnVuY3Rpb24oa2V5cywgdmFsdWVzKXtcbiAgdmFyIGkkLCBsZW4kLCBpLCBrZXksIHJlc3VsdHMkID0ge307XG4gIGZvciAoaSQgPSAwLCBsZW4kID0ga2V5cy5sZW5ndGg7IGkkIDwgbGVuJDsgKytpJCkge1xuICAgIGkgPSBpJDtcbiAgICBrZXkgPSBrZXlzW2kkXTtcbiAgICByZXN1bHRzJFtrZXldID0gdmFsdWVzW2ldO1xuICB9XG4gIHJldHVybiByZXN1bHRzJDtcbn0pO1xub2JqVG9MaXN0cyA9IGZ1bmN0aW9uKG9iamVjdGVjdCl7XG4gIHZhciBrZXlzLCB2YWx1ZXMsIGtleSwgdmFsdWU7XG4gIGtleXMgPSBbXTtcbiAgdmFsdWVzID0gW107XG4gIGZvciAoa2V5IGluIG9iamVjdGVjdCkge1xuICAgIHZhbHVlID0gb2JqZWN0ZWN0W2tleV07XG4gICAga2V5cy5wdXNoKGtleSk7XG4gICAgdmFsdWVzLnB1c2godmFsdWUpO1xuICB9XG4gIHJldHVybiBba2V5cywgdmFsdWVzXTtcbn07XG5lbXB0eSA9IGZ1bmN0aW9uKG9iamVjdCl7XG4gIHZhciB4O1xuICBmb3IgKHggaW4gb2JqZWN0KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufTtcbmVhY2ggPSBjdXJyeSQoZnVuY3Rpb24oZiwgb2JqZWN0KXtcbiAgdmFyIGkkLCB4O1xuICBmb3IgKGkkIGluIG9iamVjdCkge1xuICAgIHggPSBvYmplY3RbaSRdO1xuICAgIGYoeCk7XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn0pO1xubWFwID0gY3VycnkkKGZ1bmN0aW9uKGYsIG9iamVjdCl7XG4gIHZhciBrLCB4LCByZXN1bHRzJCA9IHt9O1xuICBmb3IgKGsgaW4gb2JqZWN0KSB7XG4gICAgeCA9IG9iamVjdFtrXTtcbiAgICByZXN1bHRzJFtrXSA9IGYoeCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHMkO1xufSk7XG5jb21wYWN0ID0gY3VycnkkKGZ1bmN0aW9uKG9iamVjdCl7XG4gIHZhciBrLCB4LCByZXN1bHRzJCA9IHt9O1xuICBmb3IgKGsgaW4gb2JqZWN0KSB7XG4gICAgeCA9IG9iamVjdFtrXTtcbmlmICh4KSB7XG4gICAgICByZXN1bHRzJFtrXSA9IHg7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRzJDtcbn0pO1xuZmlsdGVyID0gY3VycnkkKGZ1bmN0aW9uKGYsIG9iamVjdCl7XG4gIHZhciBrLCB4LCByZXN1bHRzJCA9IHt9O1xuICBmb3IgKGsgaW4gb2JqZWN0KSB7XG4gICAgeCA9IG9iamVjdFtrXTtcbmlmIChmKHgpKSB7XG4gICAgICByZXN1bHRzJFtrXSA9IHg7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRzJDtcbn0pO1xucmVqZWN0ID0gY3VycnkkKGZ1bmN0aW9uKGYsIG9iamVjdCl7XG4gIHZhciBrLCB4LCByZXN1bHRzJCA9IHt9O1xuICBmb3IgKGsgaW4gb2JqZWN0KSB7XG4gICAgeCA9IG9iamVjdFtrXTtcbmlmICghZih4KSkge1xuICAgICAgcmVzdWx0cyRba10gPSB4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0cyQ7XG59KTtcbnBhcnRpdGlvbiA9IGN1cnJ5JChmdW5jdGlvbihmLCBvYmplY3Qpe1xuICB2YXIgcGFzc2VkLCBmYWlsZWQsIGssIHg7XG4gIHBhc3NlZCA9IHt9O1xuICBmYWlsZWQgPSB7fTtcbiAgZm9yIChrIGluIG9iamVjdCkge1xuICAgIHggPSBvYmplY3Rba107XG4gICAgKGYoeCkgPyBwYXNzZWQgOiBmYWlsZWQpW2tdID0geDtcbiAgfVxuICByZXR1cm4gW3Bhc3NlZCwgZmFpbGVkXTtcbn0pO1xuZmluZCA9IGN1cnJ5JChmdW5jdGlvbihmLCBvYmplY3Qpe1xuICB2YXIgaSQsIHg7XG4gIGZvciAoaSQgaW4gb2JqZWN0KSB7XG4gICAgeCA9IG9iamVjdFtpJF07XG4gICAgaWYgKGYoeCkpIHtcbiAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgfVxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdmFsdWVzOiB2YWx1ZXMsXG4gIGtleXM6IGtleXMsXG4gIHBhaXJzVG9PYmo6IHBhaXJzVG9PYmosXG4gIG9ialRvUGFpcnM6IG9ialRvUGFpcnMsXG4gIGxpc3RzVG9PYmo6IGxpc3RzVG9PYmosXG4gIG9ialRvTGlzdHM6IG9ialRvTGlzdHMsXG4gIGVtcHR5OiBlbXB0eSxcbiAgZWFjaDogZWFjaCxcbiAgbWFwOiBtYXAsXG4gIGZpbHRlcjogZmlsdGVyLFxuICBjb21wYWN0OiBjb21wYWN0LFxuICByZWplY3Q6IHJlamVjdCxcbiAgcGFydGl0aW9uOiBwYXJ0aXRpb24sXG4gIGZpbmQ6IGZpbmRcbn07XG5mdW5jdGlvbiBjdXJyeSQoZiwgYm91bmQpe1xuICB2YXIgY29udGV4dCxcbiAgX2N1cnJ5ID0gZnVuY3Rpb24oYXJncykge1xuICAgIHJldHVybiBmLmxlbmd0aCA+IDEgPyBmdW5jdGlvbigpe1xuICAgICAgdmFyIHBhcmFtcyA9IGFyZ3MgPyBhcmdzLmNvbmNhdCgpIDogW107XG4gICAgICBjb250ZXh0ID0gYm91bmQgPyBjb250ZXh0IHx8IHRoaXMgOiB0aGlzO1xuICAgICAgcmV0dXJuIHBhcmFtcy5wdXNoLmFwcGx5KHBhcmFtcywgYXJndW1lbnRzKSA8XG4gICAgICAgICAgZi5sZW5ndGggJiYgYXJndW1lbnRzLmxlbmd0aCA/XG4gICAgICAgIF9jdXJyeS5jYWxsKGNvbnRleHQsIHBhcmFtcykgOiBmLmFwcGx5KGNvbnRleHQsIHBhcmFtcyk7XG4gICAgfSA6IGY7XG4gIH07XG4gIHJldHVybiBfY3VycnkoKTtcbn1cbiIsInZhciBzcGxpdCwgam9pbiwgbGluZXMsIHVubGluZXMsIHdvcmRzLCB1bndvcmRzLCBjaGFycywgdW5jaGFycywgcmV2ZXJzZSwgcmVwZWF0O1xuc3BsaXQgPSBjdXJyeSQoZnVuY3Rpb24oc2VwLCBzdHIpe1xuICByZXR1cm4gc3RyLnNwbGl0KHNlcCk7XG59KTtcbmpvaW4gPSBjdXJyeSQoZnVuY3Rpb24oc2VwLCB4cyl7XG4gIHJldHVybiB4cy5qb2luKHNlcCk7XG59KTtcbmxpbmVzID0gZnVuY3Rpb24oc3RyKXtcbiAgaWYgKCFzdHIubGVuZ3RoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIHJldHVybiBzdHIuc3BsaXQoJ1xcbicpO1xufTtcbnVubGluZXMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdC5qb2luKCdcXG4nKTtcbn07XG53b3JkcyA9IGZ1bmN0aW9uKHN0cil7XG4gIGlmICghc3RyLmxlbmd0aCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICByZXR1cm4gc3RyLnNwbGl0KC9bIF0rLyk7XG59O1xudW53b3JkcyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0LmpvaW4oJyAnKTtcbn07XG5jaGFycyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0LnNwbGl0KCcnKTtcbn07XG51bmNoYXJzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQuam9pbignJyk7XG59O1xucmV2ZXJzZSA9IGZ1bmN0aW9uKHN0cil7XG4gIHJldHVybiBzdHIuc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKTtcbn07XG5yZXBlYXQgPSBjdXJyeSQoZnVuY3Rpb24obiwgc3RyKXtcbiAgdmFyIG91dCwgcmVzJCwgaSQ7XG4gIHJlcyQgPSBbXTtcbiAgZm9yIChpJCA9IDA7IGkkIDwgbjsgKytpJCkge1xuICAgIHJlcyQucHVzaChzdHIpO1xuICB9XG4gIG91dCA9IHJlcyQ7XG4gIHJldHVybiBvdXQuam9pbignJyk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzcGxpdDogc3BsaXQsXG4gIGpvaW46IGpvaW4sXG4gIGxpbmVzOiBsaW5lcyxcbiAgdW5saW5lczogdW5saW5lcyxcbiAgd29yZHM6IHdvcmRzLFxuICB1bndvcmRzOiB1bndvcmRzLFxuICBjaGFyczogY2hhcnMsXG4gIHVuY2hhcnM6IHVuY2hhcnMsXG4gIHJldmVyc2U6IHJldmVyc2UsXG4gIHJlcGVhdDogcmVwZWF0XG59O1xuZnVuY3Rpb24gY3VycnkkKGYsIGJvdW5kKXtcbiAgdmFyIGNvbnRleHQsXG4gIF9jdXJyeSA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICByZXR1cm4gZi5sZW5ndGggPiAxID8gZnVuY3Rpb24oKXtcbiAgICAgIHZhciBwYXJhbXMgPSBhcmdzID8gYXJncy5jb25jYXQoKSA6IFtdO1xuICAgICAgY29udGV4dCA9IGJvdW5kID8gY29udGV4dCB8fCB0aGlzIDogdGhpcztcbiAgICAgIHJldHVybiBwYXJhbXMucHVzaC5hcHBseShwYXJhbXMsIGFyZ3VtZW50cykgPFxuICAgICAgICAgIGYubGVuZ3RoICYmIGFyZ3VtZW50cy5sZW5ndGggP1xuICAgICAgICBfY3VycnkuY2FsbChjb250ZXh0LCBwYXJhbXMpIDogZi5hcHBseShjb250ZXh0LCBwYXJhbXMpO1xuICAgIH0gOiBmO1xuICB9O1xuICByZXR1cm4gX2N1cnJ5KCk7XG59XG4iLCJ2YXIgRnVuYywgTGlzdCwgT2JqLCBTdHIsIE51bSwgaWQsIGlzVHlwZSwgcmVwbGljYXRlLCBwcmVsdWRlLCB0b1N0cmluZyQgPSB7fS50b1N0cmluZztcbkZ1bmMgPSByZXF1aXJlKCcuL0Z1bmMuanMnKTtcbkxpc3QgPSByZXF1aXJlKCcuL0xpc3QuanMnKTtcbk9iaiA9IHJlcXVpcmUoJy4vT2JqLmpzJyk7XG5TdHIgPSByZXF1aXJlKCcuL1N0ci5qcycpO1xuTnVtID0gcmVxdWlyZSgnLi9OdW0uanMnKTtcbmlkID0gZnVuY3Rpb24oeCl7XG4gIHJldHVybiB4O1xufTtcbmlzVHlwZSA9IGN1cnJ5JChmdW5jdGlvbih0eXBlLCB4KXtcbiAgcmV0dXJuIHRvU3RyaW5nJC5jYWxsKHgpLnNsaWNlKDgsIC0xKSA9PT0gdHlwZTtcbn0pO1xucmVwbGljYXRlID0gY3VycnkkKGZ1bmN0aW9uKG4sIHgpe1xuICB2YXIgaSQsIHJlc3VsdHMkID0gW107XG4gIGZvciAoaSQgPSAwOyBpJCA8IG47ICsraSQpIHtcbiAgICByZXN1bHRzJC5wdXNoKHgpO1xuICB9XG4gIHJldHVybiByZXN1bHRzJDtcbn0pO1xuU3RyLmVtcHR5ID0gTGlzdC5lbXB0eTtcblN0ci5zbGljZSA9IExpc3Quc2xpY2U7XG5TdHIudGFrZSA9IExpc3QudGFrZTtcblN0ci5kcm9wID0gTGlzdC5kcm9wO1xuU3RyLnNwbGl0QXQgPSBMaXN0LnNwbGl0QXQ7XG5TdHIudGFrZVdoaWxlID0gTGlzdC50YWtlV2hpbGU7XG5TdHIuZHJvcFdoaWxlID0gTGlzdC5kcm9wV2hpbGU7XG5TdHIuc3BhbiA9IExpc3Quc3BhbjtcblN0ci5icmVha1N0ciA9IExpc3QuYnJlYWtMaXN0O1xucHJlbHVkZSA9IHtcbiAgRnVuYzogRnVuYyxcbiAgTGlzdDogTGlzdCxcbiAgT2JqOiBPYmosXG4gIFN0cjogU3RyLFxuICBOdW06IE51bSxcbiAgaWQ6IGlkLFxuICBpc1R5cGU6IGlzVHlwZSxcbiAgcmVwbGljYXRlOiByZXBsaWNhdGVcbn07XG5wcmVsdWRlLmVhY2ggPSBMaXN0LmVhY2g7XG5wcmVsdWRlLm1hcCA9IExpc3QubWFwO1xucHJlbHVkZS5maWx0ZXIgPSBMaXN0LmZpbHRlcjtcbnByZWx1ZGUuY29tcGFjdCA9IExpc3QuY29tcGFjdDtcbnByZWx1ZGUucmVqZWN0ID0gTGlzdC5yZWplY3Q7XG5wcmVsdWRlLnBhcnRpdGlvbiA9IExpc3QucGFydGl0aW9uO1xucHJlbHVkZS5maW5kID0gTGlzdC5maW5kO1xucHJlbHVkZS5oZWFkID0gTGlzdC5oZWFkO1xucHJlbHVkZS5maXJzdCA9IExpc3QuZmlyc3Q7XG5wcmVsdWRlLnRhaWwgPSBMaXN0LnRhaWw7XG5wcmVsdWRlLmxhc3QgPSBMaXN0Lmxhc3Q7XG5wcmVsdWRlLmluaXRpYWwgPSBMaXN0LmluaXRpYWw7XG5wcmVsdWRlLmVtcHR5ID0gTGlzdC5lbXB0eTtcbnByZWx1ZGUucmV2ZXJzZSA9IExpc3QucmV2ZXJzZTtcbnByZWx1ZGUuZGlmZmVyZW5jZSA9IExpc3QuZGlmZmVyZW5jZTtcbnByZWx1ZGUuaW50ZXJzZWN0aW9uID0gTGlzdC5pbnRlcnNlY3Rpb247XG5wcmVsdWRlLnVuaW9uID0gTGlzdC51bmlvbjtcbnByZWx1ZGUuY291bnRCeSA9IExpc3QuY291bnRCeTtcbnByZWx1ZGUuZ3JvdXBCeSA9IExpc3QuZ3JvdXBCeTtcbnByZWx1ZGUuZm9sZCA9IExpc3QuZm9sZDtcbnByZWx1ZGUuZm9sZGwgPSBMaXN0LmZvbGRsO1xucHJlbHVkZS5mb2xkMSA9IExpc3QuZm9sZDE7XG5wcmVsdWRlLmZvbGRsMSA9IExpc3QuZm9sZGwxO1xucHJlbHVkZS5mb2xkciA9IExpc3QuZm9sZHI7XG5wcmVsdWRlLmZvbGRyMSA9IExpc3QuZm9sZHIxO1xucHJlbHVkZS51bmZvbGRyID0gTGlzdC51bmZvbGRyO1xucHJlbHVkZS5hbmRMaXN0ID0gTGlzdC5hbmRMaXN0O1xucHJlbHVkZS5vckxpc3QgPSBMaXN0Lm9yTGlzdDtcbnByZWx1ZGUuYW55ID0gTGlzdC5hbnk7XG5wcmVsdWRlLmFsbCA9IExpc3QuYWxsO1xucHJlbHVkZS51bmlxdWUgPSBMaXN0LnVuaXF1ZTtcbnByZWx1ZGUuc29ydCA9IExpc3Quc29ydDtcbnByZWx1ZGUuc29ydFdpdGggPSBMaXN0LnNvcnRXaXRoO1xucHJlbHVkZS5zb3J0QnkgPSBMaXN0LnNvcnRCeTtcbnByZWx1ZGUuc3VtID0gTGlzdC5zdW07XG5wcmVsdWRlLnByb2R1Y3QgPSBMaXN0LnByb2R1Y3Q7XG5wcmVsdWRlLm1lYW4gPSBMaXN0Lm1lYW47XG5wcmVsdWRlLmF2ZXJhZ2UgPSBMaXN0LmF2ZXJhZ2U7XG5wcmVsdWRlLmNvbmNhdCA9IExpc3QuY29uY2F0O1xucHJlbHVkZS5jb25jYXRNYXAgPSBMaXN0LmNvbmNhdE1hcDtcbnByZWx1ZGUuZmxhdHRlbiA9IExpc3QuZmxhdHRlbjtcbnByZWx1ZGUubWF4aW11bSA9IExpc3QubWF4aW11bTtcbnByZWx1ZGUubWluaW11bSA9IExpc3QubWluaW11bTtcbnByZWx1ZGUuc2NhbiA9IExpc3Quc2NhbjtcbnByZWx1ZGUuc2NhbmwgPSBMaXN0LnNjYW5sO1xucHJlbHVkZS5zY2FuMSA9IExpc3Quc2NhbjE7XG5wcmVsdWRlLnNjYW5sMSA9IExpc3Quc2NhbmwxO1xucHJlbHVkZS5zY2FuciA9IExpc3Quc2NhbnI7XG5wcmVsdWRlLnNjYW5yMSA9IExpc3Quc2NhbnIxO1xucHJlbHVkZS5zbGljZSA9IExpc3Quc2xpY2U7XG5wcmVsdWRlLnRha2UgPSBMaXN0LnRha2U7XG5wcmVsdWRlLmRyb3AgPSBMaXN0LmRyb3A7XG5wcmVsdWRlLnNwbGl0QXQgPSBMaXN0LnNwbGl0QXQ7XG5wcmVsdWRlLnRha2VXaGlsZSA9IExpc3QudGFrZVdoaWxlO1xucHJlbHVkZS5kcm9wV2hpbGUgPSBMaXN0LmRyb3BXaGlsZTtcbnByZWx1ZGUuc3BhbiA9IExpc3Quc3BhbjtcbnByZWx1ZGUuYnJlYWtMaXN0ID0gTGlzdC5icmVha0xpc3Q7XG5wcmVsdWRlLnppcCA9IExpc3QuemlwO1xucHJlbHVkZS56aXBXaXRoID0gTGlzdC56aXBXaXRoO1xucHJlbHVkZS56aXBBbGwgPSBMaXN0LnppcEFsbDtcbnByZWx1ZGUuemlwQWxsV2l0aCA9IExpc3QuemlwQWxsV2l0aDtcbnByZWx1ZGUuYXBwbHkgPSBGdW5jLmFwcGx5O1xucHJlbHVkZS5jdXJyeSA9IEZ1bmMuY3Vycnk7XG5wcmVsdWRlLmZsaXAgPSBGdW5jLmZsaXA7XG5wcmVsdWRlLmZpeCA9IEZ1bmMuZml4O1xucHJlbHVkZS5zcGxpdCA9IFN0ci5zcGxpdDtcbnByZWx1ZGUuam9pbiA9IFN0ci5qb2luO1xucHJlbHVkZS5saW5lcyA9IFN0ci5saW5lcztcbnByZWx1ZGUudW5saW5lcyA9IFN0ci51bmxpbmVzO1xucHJlbHVkZS53b3JkcyA9IFN0ci53b3JkcztcbnByZWx1ZGUudW53b3JkcyA9IFN0ci51bndvcmRzO1xucHJlbHVkZS5jaGFycyA9IFN0ci5jaGFycztcbnByZWx1ZGUudW5jaGFycyA9IFN0ci51bmNoYXJzO1xucHJlbHVkZS52YWx1ZXMgPSBPYmoudmFsdWVzO1xucHJlbHVkZS5rZXlzID0gT2JqLmtleXM7XG5wcmVsdWRlLnBhaXJzVG9PYmogPSBPYmoucGFpcnNUb09iajtcbnByZWx1ZGUub2JqVG9QYWlycyA9IE9iai5vYmpUb1BhaXJzO1xucHJlbHVkZS5saXN0c1RvT2JqID0gT2JqLmxpc3RzVG9PYmo7XG5wcmVsdWRlLm9ialRvTGlzdHMgPSBPYmoub2JqVG9MaXN0cztcbnByZWx1ZGUubWF4ID0gTnVtLm1heDtcbnByZWx1ZGUubWluID0gTnVtLm1pbjtcbnByZWx1ZGUubmVnYXRlID0gTnVtLm5lZ2F0ZTtcbnByZWx1ZGUuYWJzID0gTnVtLmFicztcbnByZWx1ZGUuc2lnbnVtID0gTnVtLnNpZ251bTtcbnByZWx1ZGUucXVvdCA9IE51bS5xdW90O1xucHJlbHVkZS5yZW0gPSBOdW0ucmVtO1xucHJlbHVkZS5kaXYgPSBOdW0uZGl2O1xucHJlbHVkZS5tb2QgPSBOdW0ubW9kO1xucHJlbHVkZS5yZWNpcCA9IE51bS5yZWNpcDtcbnByZWx1ZGUucGkgPSBOdW0ucGk7XG5wcmVsdWRlLnRhdSA9IE51bS50YXU7XG5wcmVsdWRlLmV4cCA9IE51bS5leHA7XG5wcmVsdWRlLnNxcnQgPSBOdW0uc3FydDtcbnByZWx1ZGUubG4gPSBOdW0ubG47XG5wcmVsdWRlLnBvdyA9IE51bS5wb3c7XG5wcmVsdWRlLnNpbiA9IE51bS5zaW47XG5wcmVsdWRlLnRhbiA9IE51bS50YW47XG5wcmVsdWRlLmNvcyA9IE51bS5jb3M7XG5wcmVsdWRlLmFjb3MgPSBOdW0uYWNvcztcbnByZWx1ZGUuYXNpbiA9IE51bS5hc2luO1xucHJlbHVkZS5hdGFuID0gTnVtLmF0YW47XG5wcmVsdWRlLmF0YW4yID0gTnVtLmF0YW4yO1xucHJlbHVkZS50cnVuY2F0ZSA9IE51bS50cnVuY2F0ZTtcbnByZWx1ZGUucm91bmQgPSBOdW0ucm91bmQ7XG5wcmVsdWRlLmNlaWxpbmcgPSBOdW0uY2VpbGluZztcbnByZWx1ZGUuZmxvb3IgPSBOdW0uZmxvb3I7XG5wcmVsdWRlLmlzSXROYU4gPSBOdW0uaXNJdE5hTjtcbnByZWx1ZGUuZXZlbiA9IE51bS5ldmVuO1xucHJlbHVkZS5vZGQgPSBOdW0ub2RkO1xucHJlbHVkZS5nY2QgPSBOdW0uZ2NkO1xucHJlbHVkZS5sY20gPSBOdW0ubGNtO1xucHJlbHVkZS5WRVJTSU9OID0gJzEuMC4zJztcbm1vZHVsZS5leHBvcnRzID0gcHJlbHVkZTtcbmZ1bmN0aW9uIGN1cnJ5JChmLCBib3VuZCl7XG4gIHZhciBjb250ZXh0LFxuICBfY3VycnkgPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgcmV0dXJuIGYubGVuZ3RoID4gMSA/IGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgcGFyYW1zID0gYXJncyA/IGFyZ3MuY29uY2F0KCkgOiBbXTtcbiAgICAgIGNvbnRleHQgPSBib3VuZCA/IGNvbnRleHQgfHwgdGhpcyA6IHRoaXM7XG4gICAgICByZXR1cm4gcGFyYW1zLnB1c2guYXBwbHkocGFyYW1zLCBhcmd1bWVudHMpIDxcbiAgICAgICAgICBmLmxlbmd0aCAmJiBhcmd1bWVudHMubGVuZ3RoID9cbiAgICAgICAgX2N1cnJ5LmNhbGwoY29udGV4dCwgcGFyYW1zKSA6IGYuYXBwbHkoY29udGV4dCwgcGFyYW1zKTtcbiAgICB9IDogZjtcbiAgfTtcbiAgcmV0dXJuIF9jdXJyeSgpO1xufVxuIl19
;