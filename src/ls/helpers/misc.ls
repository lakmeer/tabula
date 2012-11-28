
# Type checkers

ofType     = (t, x) --> typeof x is t
isObject   = ofType 'object'
isFunction = ofType 'function'
isString   = ofType 'string'



# Timers

delay  = flip setTimeout
defer  = (λ) -> delay 0, λ
repeat = (t, λ, now) ->
  timer = setInterval λ, t
  if now then λ!
  return stop : -> clearInterval timer;



window <<< { isObject, isFunction, isString, delay, defer, repeat }
