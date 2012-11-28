/*
 * src/ls/init/prelude.ls - File number: 0
 *
 */


(function(){
  var exports, objToFunc, each, map, filter, reject, partition, find, first, head, tail, last, initial, empty, values, keys, length, cons, append, join, reverse, foldl, fold, foldl1, fold1, foldr, foldr1, andList, orList, any, all, unique, sum, product, average, mean, concat, concatMap, listToObj, maximum, minimum, scanl, scan, scanl1, scan1, scanr, scanr1, replicate, take, drop, splitAt, takeWhile, dropWhile, span, breakIt, zip, zipWith, zipAll, zipAllWith, compose, curry, partial, id, flip, fix, lines, unlines, words, unwords, max, min, negate, abs, signum, quot, rem, div, mod, recip, pi, tau, exp, sqrt, ln, pow, sin, tan, cos, asin, acos, atan, atan2, truncate, round, ceiling, floor, isItNaN, even, odd, gcd, lcm, toString$ = {}.toString, slice$ = [].slice;
  if (typeof exports == 'undefined' || exports === null) {
    exports = {};
  }
  exports.objToFunc = objToFunc = function(obj){
    return function(key){
      return obj[key];
    };
  };
  exports.each = each = curry$(function(f, xs){
    var i$, yet$, x, j$, len$;
    if (toString$.call(xs).slice(8, -1) === 'Object') {
      for (i$ in yet$ = true, xs) {
        x = xs[i$];
        yet$ = false;
        f(x);
      } if (yet$) {
        for (j$ = 0, len$ = xs.length; j$ < len$; ++j$) {
          x = xs[j$];
          f(x);
        }
      }
    }
    return xs;
  });
  exports.map = map = curry$(function(f, xs){
    var type, key, x, res$, i$, len$, result, results$ = {};
    if (toString$.call(f).slice(8, -1) !== 'Function') {
      f = objToFunc(f);
    }
    type = toString$.call(xs).slice(8, -1);
    if (type === 'Object') {
      for (key in xs) {
        x = xs[key];
        results$[key] = f(x);
      }
      return results$;
    } else {
      res$ = [];
      for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
        x = xs[i$];
        res$.push(f(x));
      }
      result = res$;
      if (type === 'String') {
        return result.join('');
      } else {
        return result;
      }
    }
  });
  exports.filter = filter = curry$(function(f, xs){
    var type, key, x, res$, i$, len$, result, results$ = {};
    if (toString$.call(f).slice(8, -1) !== 'Function') {
      f = objToFunc(f);
    }
    type = toString$.call(xs).slice(8, -1);
    if (type === 'Object') {
      for (key in xs) {
        x = xs[key];
if (f(x)) {
          results$[key] = x;
        }
      }
      return results$;
    } else {
      res$ = [];
      for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
        x = xs[i$];
        if (f(x)) {
          res$.push(x);
        }
      }
      result = res$;
      if (type === 'String') {
        return result.join('');
      } else {
        return result;
      }
    }
  });
  exports.reject = reject = curry$(function(f, xs){
    var type, key, x, res$, i$, len$, result, results$ = {};
    if (toString$.call(f).slice(8, -1) !== 'Function') {
      f = objToFunc(f);
    }
    type = toString$.call(xs).slice(8, -1);
    if (type === 'Object') {
      for (key in xs) {
        x = xs[key];
if (!f(x)) {
          results$[key] = x;
        }
      }
      return results$;
    } else {
      res$ = [];
      for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
        x = xs[i$];
        if (!f(x)) {
          res$.push(x);
        }
      }
      result = res$;
      if (type === 'String') {
        return result.join('');
      } else {
        return result;
      }
    }
  });
  exports.partition = partition = curry$(function(f, xs){
    var type, passed, failed, key, x, i$, len$;
    if (toString$.call(f).slice(8, -1) !== 'Function') {
      f = objToFunc(f);
    }
    type = toString$.call(xs).slice(8, -1);
    if (type === 'Object') {
      passed = {};
      failed = {};
      for (key in xs) {
        x = xs[key];
        (f(x) ? passed : failed)[key] = x;
      }
    } else {
      passed = [];
      failed = [];
      for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
        x = xs[i$];
        (f(x) ? passed : failed).push(x);
      }
      if (type === 'String') {
        passed = passed.join('');
        failed = failed.join('');
      }
    }
    return [passed, failed];
  });
  exports.find = find = curry$(function(f, xs){
    var i$, x, len$;
    if (toString$.call(f).slice(8, -1) !== 'Function') {
      f = objToFunc(f);
    }
    if (toString$.call(xs).slice(8, -1) === 'Object') {
      for (i$ in xs) {
        x = xs[i$];
        if (f(x)) {
          return x;
        }
      }
    } else {
      for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
        x = xs[i$];
        if (f(x)) {
          return x;
        }
      }
    }
  });
  exports.head = head = exports.first = first = function(xs){
    if (!xs.length) {
      return;
    }
    return xs[0];
  };
  exports.tail = tail = function(xs){
    if (!xs.length) {
      return;
    }
    return xs.slice(1);
  };
  exports.last = last = function(xs){
    if (!xs.length) {
      return;
    }
    return xs[xs.length - 1];
  };
  exports.initial = initial = function(xs){
    if (!xs.length) {
      return;
    }
    return xs.slice(0, xs.length - 1);
  };
  exports.empty = empty = function(xs){
    var x;
    if (toString$.call(xs).slice(8, -1) === 'Object') {
      for (x in xs) {
        return false;
      }
      return true;
    }
    return !xs.length;
  };
  exports.values = values = function(obj){
    var i$, x, results$ = [];
    for (i$ in obj) {
      x = obj[i$];
      results$.push(x);
    }
    return results$;
  };
  exports.keys = keys = function(obj){
    var x, results$ = [];
    for (x in obj) {
      results$.push(x);
    }
    return results$;
  };
  exports.len = length = function(xs){
    if (toString$.call(xs).slice(8, -1) === 'Object') {
      xs = values(xs);
    }
    return xs.length;
  };
  exports.cons = cons = curry$(function(x, xs){
    if (toString$.call(xs).slice(8, -1) === 'String') {
      return x + xs;
    } else {
      return x(arguments, xs);
    }
  });
  exports.append = append = curry$(function(xs, ys){
    if (toString$.call(ys).slice(8, -1) === 'String') {
      return xs + ys;
    } else {
      return xs.concat(ys);
    }
  });
  exports.join = join = curry$(function(sep, xs){
    if (toString$.call(xs).slice(8, -1) === 'Object') {
      xs = values(xs);
    }
    return xs.join(sep);
  });
  exports.reverse = reverse = function(xs){
    if (toString$.call(xs).slice(8, -1) === 'String') {
      return xs.split('').reverse().join('');
    } else {
      return xs.slice().reverse();
    }
  };
  exports.fold = fold = exports.foldl = foldl = curry$(function(f, memo, xs){
    var i$, x, len$;
    if (toString$.call(xs).slice(8, -1) === 'Object') {
      for (i$ in xs) {
        x = xs[i$];
        memo = f(memo, x);
      }
    } else {
      for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
        x = xs[i$];
        memo = f(memo, x);
      }
    }
    return memo;
  });
  exports.fold1 = fold1 = exports.foldl1 = foldl1 = curry$(function(f, xs){
    return fold(f, xs[0], xs.slice(1));
  });
  exports.foldr = foldr = curry$(function(f, memo, xs){
    return fold(f, memo, xs.reverse());
  });
  exports.foldr1 = foldr1 = curry$(function(f, xs){
    xs.reverse();
    return fold(f, xs[0], xs.slice(1));
  });
  exports.andList = andList = function(xs){
    return fold(function(memo, x){
      return memo && x;
    }, true, xs);
  };
  exports.orList = orList = function(xs){
    return fold(function(memo, x){
      return memo || x;
    }, false, xs);
  };
  exports.any = any = curry$(function(f, xs){
    if (toString$.call(f).slice(8, -1) !== 'Function') {
      f = objToFunc(f);
    }
    return fold(function(memo, x){
      return memo || f(x);
    }, false, xs);
  });
  exports.all = all = curry$(function(f, xs){
    if (toString$.call(f).slice(8, -1) !== 'Function') {
      f = objToFunc(f);
    }
    return fold(function(memo, x){
      return memo && f(x);
    }, true, xs);
  });
  exports.unique = unique = function(xs){
    var result, i$, x, len$;
    result = [];
    if (toString$.call(xs).slice(8, -1) === 'Object') {
      for (i$ in xs) {
        x = xs[i$];
        if (!in$(x, result)) {
          result.push(x);
        }
      }
    } else {
      for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
        x = xs[i$];
        if (!in$(x, result)) {
          result.push(x);
        }
      }
    }
    if (toString$.call(xs).slice(8, -1) === 'String') {
      return result.join('');
    } else {
      return result;
    }
  };
  exports.sum = sum = function(xs){
    var result, i$, yet$, x, j$, len$;
    result = 0;
    if (toString$.call(xs).slice(8, -1) === 'Object') {
      for (i$ in yet$ = true, xs) {
        x = xs[i$];
        yet$ = false;
        result += x;
      } if (yet$) {
        for (j$ = 0, len$ = xs.length; j$ < len$; ++j$) {
          x = xs[j$];
          result += x;
        }
      }
    }
    return result;
  };
  exports.product = product = function(xs){
    var result, i$, yet$, x, j$, len$;
    result = 1;
    if (toString$.call(xs).slice(8, -1) === 'Object') {
      for (i$ in yet$ = true, xs) {
        x = xs[i$];
        yet$ = false;
        result *= x;
      } if (yet$) {
        for (j$ = 0, len$ = xs.length; j$ < len$; ++j$) {
          x = xs[j$];
          result *= x;
        }
      }
    }
    return result;
  };
  exports.mean = mean = exports.average = average = function(xs){
    return sum(xs) / length(xs);
  };
  exports.concat = concat = function(xss){
    return fold(append, [], xss);
  };
  exports.concatMap = concatMap = curry$(function(f, xs){
    return concat(map(f, xs));
  });
  exports.listToObj = listToObj = function(xs){
    var result, i$, len$, x;
    result = {};
    for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
      x = xs[i$];
      result[x[0]] = x[1];
    }
    return result;
  };
  exports.maximum = maximum = function(xs){
    return fold1(max, xs);
  };
  exports.minimum = minimum = function(xs){
    return fold1(min, xs);
  };
  exports.scan = scan = exports.scanl = scanl = curry$(function(f, memo, xs){
    var last, x;
    last = memo;
    if (toString$.call(xs).slice(8, -1) === 'Object') {
      return [memo].concat((function(){
        var i$, ref$, results$ = [];
        for (i$ in ref$ = xs) {
          x = ref$[i$];
          results$.push(last = f(last, x));
        }
        return results$;
      }()));
    } else {
      return [memo].concat((function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = xs).length; i$ < len$; ++i$) {
          x = ref$[i$];
          results$.push(last = f(last, x));
        }
        return results$;
      }()));
    }
  });
  exports.scan1 = scan1 = exports.scanl1 = scanl1 = curry$(function(f, xs){
    return scan(f, xs[0], xs.slice(1));
  });
  exports.scanr = scanr = curry$(function(f, memo, xs){
    xs.reverse();
    return scan(f, memo, xs).reverse();
  });
  exports.scanr1 = scanr1 = curry$(function(f, xs){
    xs.reverse();
    return scan(f, xs[0], xs.slice(1)).reverse();
  });
  exports.replicate = replicate = curry$(function(n, x){
    var result, i;
    result = [];
    i = 0;
    for (; i < n; ++i) {
      result.push(x);
    }
    if (toString$.call(x).slice(8, -1) === 'String') {
      return result.join('');
    } else {
      return result;
    }
  });
  exports.take = take = curry$(function(n, xs){
    switch (false) {
    case !(n <= 0):
      if (toString$.call(xs).slice(8, -1) === 'String') {
        return '';
      } else {
        return [];
      }
      break;
    case !!xs.length:
      return xs;
    default:
      return xs.slice(0, n);
    }
  });
  exports.drop = drop = curry$(function(n, xs){
    switch (false) {
    case !(n <= 0):
      return xs;
    case !!xs.length:
      return xs;
    default:
      return xs.slice(n);
    }
  });
  exports.splitAt = splitAt = curry$(function(n, xs){
    return [take(n, xs), drop(n, xs)];
  });
  exports.takeWhile = takeWhile = curry$(function(p, xs){
    var result, i$, len$, x;
    if (!xs.length) {
      return xs;
    }
    if (toString$.call(p).slice(8, -1) !== 'Function') {
      p = objToFunc(p);
    }
    result = [];
    for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
      x = xs[i$];
      if (!p(x)) {
        break;
      }
      result.push(x);
    }
    if (toString$.call(xs).slice(8, -1) === 'String') {
      return result.join('');
    } else {
      return result;
    }
  });
  exports.dropWhile = dropWhile = curry$(function(p, xs){
    var i, i$, len$, x;
    if (!xs.length) {
      return xs;
    }
    if (toString$.call(p).slice(8, -1) !== 'Function') {
      p = objToFunc(p);
    }
    i = 0;
    for (i$ = 0, len$ = xs.length; i$ < len$; ++i$) {
      x = xs[i$];
      if (!p(x)) {
        break;
      }
      ++i;
    }
    return drop(i, xs);
  });
  exports.span = span = curry$(function(p, xs){
    return [takeWhile(p, xs), dropWhile(p, xs)];
  });
  exports.breakIt = breakIt = curry$(function(p, xs){
    return span(compose$([not$, p]), xs);
  });
  exports.zip = zip = curry$(function(xs, ys){
    var result, i, ref$, len$, zs, j, len1$, z, ref1$;
    result = [];
    for (i = 0, len$ = (ref$ = [xs, ys]).length; i < len$; ++i) {
      zs = ref$[i];
      for (j = 0, len1$ = zs.length; j < len1$; ++j) {
        z = zs[j];
        if (i === 0) {
          result.push([]);
        }
        if ((ref1$ = result[j]) != null) {
          ref1$.push(z);
        }
      }
    }
    return result;
  });
  exports.zipWith = zipWith = curry$(function(f, xs, ys){
    var i$, ref$, len$, zs, results$ = [];
    if (toString$.call(f).slice(8, -1) !== 'Function') {
      f = objToFunc(f);
    }
    if (!xs.length || !ys.length) {
      return [];
    } else {
      for (i$ = 0, len$ = (ref$ = zip.call(this, xs, ys)).length; i$ < len$; ++i$) {
        zs = ref$[i$];
        results$.push(f.apply(this, zs));
      }
      return results$;
    }
  });
  exports.zipAll = zipAll = function(){
    var xss, result, i, len$, xs, j, len1$, x, ref$;
    xss = slice$.call(arguments);
    result = [];
    for (i = 0, len$ = xss.length; i < len$; ++i) {
      xs = xss[i];
      for (j = 0, len1$ = xs.length; j < len1$; ++j) {
        x = xs[j];
        if (i === 0) {
          result.push([]);
        }
        if ((ref$ = result[j]) != null) {
          ref$.push(x);
        }
      }
    }
    return result;
  };
  exports.zipAllWith = zipAllWith = function(f){
    var xss, i$, ref$, len$, xs, results$ = [];
    xss = slice$.call(arguments, 1);
    if (toString$.call(f).slice(8, -1) !== 'Function') {
      f = objToFunc(f);
    }
    if (!xss[0].length || !xss[1].length) {
      return [];
    } else {
      for (i$ = 0, len$ = (ref$ = zipAll.apply(this, xss)).length; i$ < len$; ++i$) {
        xs = ref$[i$];
        results$.push(f.apply(this, xs));
      }
      return results$;
    }
  };
  exports.compose = compose = function(){
    var funcs;
    funcs = slice$.call(arguments);
    return function(){
      var args, i$, ref$, len$, f;
      args = arguments;
      for (i$ = 0, len$ = (ref$ = funcs).length; i$ < len$; ++i$) {
        f = ref$[i$];
        args = [f.apply(this, args)];
      }
      return args[0];
    };
  };
  exports.curry = curry = function(f){
    return __curry(f);
  };
  exports.partial = partial = function(f){
    var initArgs;
    initArgs = slice$.call(arguments, 1);
    return function(){
      var args;
      args = slice$.call(arguments);
      return f.apply(this, initArgs.concat(args));
    };
  };
  exports.id = id = function(x){
    return x;
  };
  exports.flip = flip = curry$(function(f, x, y){
    return f(y, x);
  });
  exports.fix = fix = function(f){
    return curry$(function(g, x){
      return f(g(g))(x);
    })(curry$(function(g, x){
      return f(g(g))(x);
    }));
  };
  exports.lines = lines = function(str){
    if (!str.length) {
      return [];
    }
    return str.split('\n');
  };
  exports.unlines = unlines = function(strs){
    return strs.join('\n');
  };
  exports.words = words = function(str){
    if (!str.length) {
      return [];
    }
    return str.split(/[ ]+/);
  };
  exports.unwords = unwords = function(strs){
    return strs.join(' ');
  };
  exports.max = max = curry$(function(x, y){
    if (x > y) {
      return x;
    } else {
      return y;
    }
  });
  exports.min = min = curry$(function(x, y){
    if (x > y) {
      return y;
    } else {
      return x;
    }
  });
  exports.negate = negate = function(x){
    return -x;
  };
  exports.abs = abs = Math.abs;
  exports.signum = signum = function(x){
    switch (false) {
    case !(x < 0):
      return -1;
    case !(x > 0):
      return 1;
    default:
      return 0;
    }
  };
  exports.quot = quot = curry$(function(x, y){
    return ~~(x / y);
  });
  exports.rem = rem = curry$(function(x, y){
    return x % y;
  });
  exports.div = div = curry$(function(x, y){
    return Math.floor(x / y);
  });
  exports.mod = mod = curry$(function(x, y){
    var ref$;
    return ((x) % (ref$ = y) + ref$) % ref$;
  });
  exports.recip = recip = function(x){
    return 1 / x;
  };
  exports.pi = pi = Math.PI;
  exports.tau = tau = pi * 2;
  exports.exp = exp = Math.exp;
  exports.sqrt = sqrt = Math.sqrt;
  exports.ln = ln = Math.log;
  exports.pow = pow = curry$(function(x, y){
    return Math.pow(x, y);
  });
  exports.sin = sin = Math.sin;
  exports.tan = tan = Math.tan;
  exports.cos = cos = Math.cos;
  exports.asin = asin = Math.asin;
  exports.acos = acos = Math.acos;
  exports.atan = atan = Math.atan;
  exports.atan2 = atan2 = curry$(function(x, y){
    return Math.atan2(x, y);
  });
  exports.truncate = truncate = function(x){
    return ~~x;
  };
  exports.round = round = Math.round;
  exports.ceiling = ceiling = Math.ceil;
  exports.floor = floor = Math.floor;
  exports.isItNaN = isItNaN = function(x){
    return x !== x;
  };
  exports.even = even = function(x){
    return x % 2 === 0;
  };
  exports.odd = odd = function(x){
    return x % 2 !== 0;
  };
  exports.gcd = gcd = curry$(function(x, y){
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
  exports.lcm = lcm = curry$(function(x, y){
    return Math.abs(Math.floor(x / gcd(x, y) * y));
  });
  exports.installPrelude = function(target){
    var ref$;
    if (!((ref$ = target.prelude) != null && ref$.isInstalled)) {
      import$(target, exports);
      target.prelude.isInstalled = true;
    }
  };
  window.prelude = exports;
  function curry$(f, args){
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      return params.push.apply(params, arguments) < f.length && arguments.length ?
        curry$.call(this, f, params) : f.apply(this, params);
    } : f;
  }
  function in$(x, arr){
    var i = 0, l = arr.length >>> 0;
    while (i < l) if (x === arr[i++]) return true;
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
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);



/*
 * src/ls/init/setup.ls - File number: 1
 *
 */


(function(){
  var isLocal, isDev, ref$, log, that, slice$ = [].slice;
  isLocal = !!(window.location.host + '').match('localhost');
  isDev = !!(window.location.host + '').match(/\.dev$/);
  Config.ALLOW_LOG = (ref$ = typeof Config != 'undefined' && Config !== null ? Config.DEBUG_OVERRIDE : void 8) != null
    ? ref$
    : isLocal || isDev;
  log = function(){
    if (!Config.ALLOW_LOG || (typeof console != 'undefined' && console !== null ? console.log : void 8) == null) {
      return function(){
        return arguments[0];
      };
    } else if (typeof console.log !== 'function') {
      return function(){
        var args;
        args = slice$.call(arguments);
        if (Config.ALLOW_LOG !== false) {
          console.log(args.join(' '));
          return arguments[0];
        }
      };
    } else {
      return function(){
        var args;
        args = slice$.call(arguments);
        if (Config.ALLOW_LOG !== false) {
          console.log.apply(console, args);
          return arguments[0];
        }
      };
    }
  }();
  if ((that = Config) != null) {
    log('Configuration Detected:', that);
  }
  window.log = log;
  window.Helpers = {};
  window.Controllers = {};
  import$(window, prelude);
  jQuery.support.cors = true;
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);



/*
 * src/ls/helpers/assert.ls - File number: 2
 *
 */


(function(){
  Helpers.Assert = {
    assert: {
      eq: function(a, e){
        if (a !== e) {
          throw new Error("Assertion::Equal - Expected " + e + ", but got " + a);
        }
      }
    }
  };
}).call(this);



/*
 * src/ls/helpers/lists.ls - File number: 3
 *
 */


(function(){
  var contains;
  Helpers.Lists = [
    contains = function(list, needle){
      var i$, len$, x;
      for (i$ = 0, len$ = list.length; i$ < len$; ++i$) {
        x = list[i$];
        if (x === needle) {
          return true;
        }
      }
      return false;
    }, {
      mash: prelude.listToObj,
      unmash: function(obj){
        var k, v, results$ = [];
        for (k in obj) {
          v = obj[k];
          results$.push([k, v]);
        }
        return results$;
      }
    }
  ];
}).call(this);



/*
 * src/ls/helpers/dates.ls - File number: 4
 *
 */


(function(){
  Helpers.Date = function(){
    var months_short, months_long, month;
    months_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    months_long = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    month = function(x, short){
      short == null && (short = false);
      if (x > 12 || x < 1) {
        return void 8;
      } else {
        if (short) {
          return months_short[x];
        } else {
          return months_long[x];
        }
      }
    };
    return {
      month: month,
      toHumanDate: function(date){
        var ref$, p;
        p = [(ref$ = date.match(/(\d{4})\W(\d{2})\W(\d{2})/))[1], ref$[2], ref$[3]];
        p[1] = month(p[1]);
        return p.reverse().join(' ');
      }
    };
  }();
}).call(this);



/*
 * src/ls/helpers/misc.ls - File number: 5
 *
 */


(function(){
  Helpers.Types = function(){
    var ofType;
    ofType = curry$(function(t, x){
      return typeof x === t;
    });
    return {
      isObject: ofType('object'),
      isFunction: ofType('function'),
      isString: ofType('string')
    };
  }();
  Helpers.Timers = {
    delay: flip(setTimeout),
    defer: function(λ){
      return delay(0, λ);
    },
    repeat: function(t, λ, now){
      var timer;
      now == null && (now = false);
      timer = setInterval(λ, t);
      if (now) {
        λ();
      }
      return {
        stop: function(){
          return clearInterval(timer);
        }
      };
    }
  };
  Helpers.Keys = {
    KEY: {
      RETURN: 13,
      ESC: 27,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40
    },
    showKeycodes: function(){
      return $(document).keydown(function(it){
        return log(it.which);
      });
    }
  };
  Helpers.Dom = {
    tween: function(start, end, time, cb){
      var z;
      z = {
        val: start
      };
      return $(z).animate({
        val: end
      }, {
        duration: time,
        step: cb
      });
    },
    scroll: function(dest, time){
      time == null && (time = 400);
      return tween($(document).scrollTop(), dest, time, function(x){
        return $(document).scrollTop(x);
      });
    },
    put: function(code, host){
      if (host != null) {
        $(host).append(code);
      }
      return code;
    }
  };
  Helpers.Numbers = {
    limit: curry$(function(low, high, ix, wrap){
      wrap == null && (wrap = false);
      if (ix < low) {
        if (wrap) {
          return high;
        } else {
          return low;
        }
      } else if (ix > high) {
        if (wrap) {
          return low;
        } else {
          return high;
        }
      } else {
        return ix;
      }
    })
  };
  function curry$(f, args){
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      return params.push.apply(params, arguments) < f.length && arguments.length ?
        curry$.call(this, f, params) : f.apply(this, params);
    } : f;
  }
}).call(this);



/*
 * src/ls/helpers/pubsub.ls - File number: 6
 *
 */


(function(){
  Helpers.PubSub = function(){
    var PUB_SPY, channels, check, pub, sub;
    PUB_SPY = false;
    channels = {};
    check = function(ch){
      if (channels[ch] == null) {
        return channels[ch] = [];
      }
    };
    pub = function(ch, msg){
      var i$, ref$, len$, fn, results$ = [];
      check(ch);
      if (PUB_SPY) {
        log(' >>', ch, '->', msg);
      }
      for (i$ = 0, len$ = (ref$ = channels[ch]).length; i$ < len$; ++i$) {
        fn = ref$[i$];
        results$.push(fn(msg));
      }
      return results$;
    };
    sub = function(ch, fn){
      check(ch);
      return channels[ch].push(fn);
    };
    return {
      pub: pub,
      sub: sub,
      subMany: function(obj){
        var ch, fn, results$ = [];
        for (ch in obj) {
          fn = obj[ch];
          results$.push(sub(ch, fn));
        }
        return results$;
      },
      PubSub: {
        enableSpying: function(toggle){
          toggle == null && (toggle = true);
          return PUB_SPY = toggle;
        }
      }
    };
  }();
}).call(this);



/*
 * src/ls/helpers/strings.ls - File number: 7
 *
 */


(function(){
  Helpers.Strings = function(){
    var pad, splat, smush;
    pad = curry$(function(length, input, char){
      var leading;
      char == null && (char = '0');
      if (String(input).length < length) {
        leading = strpad(length - String(input).length, char);
        return leading + input;
      } else {
        return input;
      }
    });
    splat = function(obj, d){
      var k, v;
      d == null && (d = 0);
      if (isObject(obj)) {
        return '{ ' + (function(){
          var ref$, results$ = [];
          for (k in ref$ = obj) {
            v = ref$[k];
            results$.push(k + " : " + smush(v, d));
          }
          return results$;
        }()).join(', ') + ' }';
      } else {
        return obj;
      }
    };
    smush = function(x, d){
      if (d < 1) {
        if (Helpers.Type.isFunction(x)) {
          return '( function )';
        } else if (Helpers.Type.isObject(x)) {
          return '( object )';
        } else if (Helpers.Type.isString(x)) {
          return "\"" + x + "\"";
        } else {
          return x;
        }
      } else {
        return splat(x, d - 1);
      }
    };
    return {
      padtwo: function(input){
        if (String(input).length < 2) {
          return "0" + input;
        } else {
          return input;
        }
      },
      linkify: function(text){
        return text.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1'>$1</a>");
      },
      serialise: function(opt){
        var res$, k, v, s;
        res$ = [];
        for (k in opt) {
          v = opt[k];
          res$.push(k + "=" + v);
        }
        s = res$;
        return "?" + s.join('&');
      },
      deserialise: function(str){
        var map;
        map = {};
        str.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value){
          return map[key] = value;
        });
        return map;
      },
      strpad: function(times, char){
        var i;
        char == null && (char = ' ');
        return join('', (function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = (fn$())).length; i$ < len$; ++i$) {
            i = ref$[i$];
            results$.push(char);
          }
          return results$;
          function fn$(){
            var i$, to$, results$ = [];
            for (i$ = 0, to$ = times; i$ <= to$; ++i$) {
              results$.push(i$);
            }
            return results$;
          }
        }()));
      },
      truncate: curry$(function(txt, l, e){
        e == null && (e = "...");
        return take(l, unwords(lines(txt))) + e;
      }),
      pad: pad,
      splat: splat
    };
  }();
  function curry$(f, args){
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      return params.push.apply(params, arguments) < f.length && arguments.length ?
        curry$.call(this, f, params) : f.apply(this, params);
    } : f;
  }
}).call(this);



/*
 * src/ls/helpers/install.ls - File number: 8
 *
 */


(function(){
  window.installHelpers = function(target, groups){
    var name, ref$, group, i$, len$, results$ = [];
    target == null && (target = window);
    groups == null && (groups = []);
    if (groups.length === 0) {
      log('Helpers::Install -', join(' + ', keys(Helpers)));
      for (name in ref$ = Helpers) {
        group = ref$[name];
        results$.push(import$(target, group));
      }
      return results$;
    } else {
      log('Helpers::Install -', join(' + ', groups));
      for (i$ = 0, len$ = groups.length; i$ < len$; ++i$) {
        group = groups[i$];
        results$.push(import$(target, Helpers[group]));
      }
      return results$;
    }
  };
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);



/*
 * src/ls/pages/home.ls - File number: 9
 *
 */


(function(){
  Controllers.home = function($page, $$){
    return log('Page::Home - Initilaised', $page);
  };
}).call(this);



/*
 * src/ls/init/jquery-ext.ls - File number: 10
 *
 */


(function(){
  (function($){
    $.fn.exists = function(){
      return this.length > 0;
    };
    $.fn.replace = function($c){
      return this.parent().html($c);
    };
    $.fn.mutuallyExclusive = function(activeClass, setFirst){
      var $all;
      activeClass == null && (activeClass = 'active');
      setFirst == null && (setFirst = false);
      $all = this;
      if (setFirst) {
        $all.first().addClass(activeClass);
      }
      this.on('click', function(){
        var $t;
        $t = $(this);
        $all.removeClass(activeClass);
        if (!$t.hasClass(activeClass)) {
          return $t.addClass(activeClass);
        }
      });
      return this;
    };
    $.fn.coordsOn = function(arg$, λ){
      var pageX, pageY, x, y;
      pageX = arg$.pageX, pageY = arg$.pageY;
      x = pageX - this.offset().left;
      y = pageY - this.offset().top;
      return λ(x, y, x / this.outerWidth(), y / this.outerHeight());
    };
    $.fn.reduce = function(λ, s){
      s == null && (s = 0);
      this.each(function(){
        return s = λ($(this), s);
      });
      return s;
    };
    $.fn.groupBy = function(ƒ_groupKey){
      var sets, jqGroup;
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
    };
    $.fn.event = function(){
      log("JQX::js-event", this.length);
      return this.on('click', function(){
        var ref$, event, eventData, dataArgs;
        ref$ = $(this).data(), event = ref$.event, eventData = ref$.eventData;
        dataArgs = eventData != null
          ? String(eventData).split(',')
          : [];
        return pub.apply(this, [event].concat(dataArgs));
      });
    };
    $.fn.reveal = function(){
      log("JQX::js-reveal", this.length);
      return this.each(function(){
        var $this, targetEvent;
        $this = $(this);
        targetEvent = $this.data('show-event');
        return sub(targetEvent, function(){
          return $this.show();
        });
      });
    };
    $.fn.collapse = function(speed){
      speed == null && (speed = 300);
      log('JQX::js-collapse', this.length);
      this.each(function(){
        return $(this).data('state', 'closed');
      });
      return this.on('click', function(){
        var $this, selector, $target, state;
        $this = $(this);
        selector = $this.data('collapse');
        $target = $(selector);
        state = $target.data('state');
        if (state !== 'open') {
          $target.slideDown(speed);
          return $target.data('state', 'open');
        } else {
          $target.slideUp(speed);
          return $target.data('state', 'closed');
        }
      });
    };
    $.fn.swap = function(){
      var swapSets, get, show, name, set, results$ = [];
      log('JQX::js-swap', this.length);
      swapSets = this.groupBy(function(el){
        return $(el).data('swap-id');
      });
      get = function(name){
        var that;
        if (that = swapSets[name]) {
          return that;
        } else {
          throw new Error('JQX::js-swap - No such grouping: ' + name);
        }
      };
      show = function(groupName, targetId){
        var $group, $target;
        $group = get(groupName);
        $target = targetId != null
          ? $group.filter('#' + targetId)
          : $group.first();
        $group.hide();
        return $target.show();
      };
      sub('swap', show);
      for (name in swapSets) {
        set = swapSets[name];
        if (set.first().data('swap-option') !== 'no-default') {
          results$.push(set.first().show());
        }
      }
      return results$;
    };
    $(function(){
      var sets, name, $group, results$ = [];
      sets = $('[class*="js-"]').groupBy(function(el){
        var that;
        if (that = el.className.match(/js-([-\w]*)/)) {
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
    });
  }.call(this, jQuery));
}).call(this);



/*
 * src/ls/init/onready.ls - File number: 11
 *
 */


(function(){
  installHelpers();
  Controllers.runPageControllers = function(){
    var $page, ctrlName;
    $page = $('[data-page-controller]').last();
    ctrlName = $page.data('page-controller');
    if (ctrlName != null) {
      log("PageController '" + ctrlName + "' requested");
      return typeof Controllers[ctrlName] === 'function' ? Controllers[ctrlName]($page, function(it){
        return $page.find(it);
      }) : void 8;
    }
  };
  $(function(){
    log("--------------------\n    INITIALISING\n--------------------");
    PubSub.enableSpying();
    Controllers.runPageControllers();
  });
}).call(this);



