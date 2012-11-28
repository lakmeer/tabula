
#
# Tabula Misc Helpers
#
# Requires: prelude
#

# Type checkers

Helpers.Types = do ->
  ofType = (t, x) --> typeof x is t
  return
    isObject   : ofType 'object'
    isFunction : ofType 'function'
    isString   : ofType 'string'


# Timers

Helpers.Timers =
  delay  : flip setTimeout
  defer  : (λ) -> delay 0, λ
  repeat : (t, λ, now=no) ->
    timer = setInterval λ, t
    if now then λ!
    return { stop : -> clearInterval timer; }


# Keycode Reference

Helpers.Keys =
  KEY :
    RETURN : 13
    ESC    : 27
    LEFT   : 37
    UP     : 38
    RIGHT  : 39
    DOWN   : 40

  showKeycodes : ->
    $(document).keydown -> log it.which


# Dom relates helpers

Helpers.Dom =

  tween : (start, end, time, cb) ->
    z = { val : start }
    $(z).animate { val : end }, { duration : time, step : cb }

  scroll : (dest, time = 400) ->
    tween $(document).scrollTop(), dest, time, (x) -> $(document).scrollTop x

  put : (code, host) ->
    if host? then $(host).append(code)
    code


# Number helpers

Helpers.Numbers =
  limit : (low, high, ix, wrap=no) -->
    if ix < low
      if wrap then high else low
    else if ix > high
      if wrap then low else high
    else
      ix

