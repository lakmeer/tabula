
{ id, flip, min, max, log, keys, head, filter, map, abs } = _
{ break-str } = _.Str


β = id
α = map -> it?.slice -2


_ <<< {

  #
  # Specifically for VMOB
  #

  select : head . filter

  # Named-pair
  # Given a string, make a pair whose key is that string and whose value
  # is some lambda applied to that string. Use with mash (pairs-to-obj)

  named-pair : (λ, a) --> [ a, λ a ]

  # Calculate pixel meaning of time intervals
  px-at-date : (date, zero = App.State.zero) ->
    diff = (moment date).diff zero, \days
    # log "Days from #{ zero.format! } to #date is", diff
    App.Config.day-width * diff
  px-range   : (range) -> App.Config.day-width * (1 + abs (moment range.0).diff range.1, \days)

  #
  # General Purpose
  #

  # Return false on event handlers
  suppress : (λ) -> -> λ.apply null, &; return false

  # Delay: Flip timer api for arrow-function friendliness
  delay : delay = flip setTimeout

  # Defer: Knock function to next stack frame
  defer : defer = (λ) -> delay 0, λ

  # Every: Simple abstraction around repeating intervals, returns object with 'stop' method
  every : every = (t, λ, now=no) ->
    timer = set-interval λ, t
    if now then λ!
    return { stop : -> clear-interval timer; }

  # Limit: restrict value to given range
  limit : limit = (low, high, ix) -->
    if ix < low
      low
    else if ix > high
      high
    else
      ix

  # Wrap: restrict value to given range, wrapping from high to low bound
  wrap : wrap = (low, high, ix) -->
    if ix < low
      high
    else if ix > high
      low
    else
      ix

  # Random: get random integer inside a given range
  random : random = (a, b = 0) ->
    (min a, b) + floor Math.random! * ( 1 + abs (b - a) )

  # Contains - Check for non-negative index for item in list
  contains : contains = (list, needle) ->
    for x in list
      if x is needle then return true
    return false

  /*
  # Functional shortcuts for string methods
  uppercase : uppercase = (.toUpperCase)
  lowercase : lowercase = (.toLowerCase)

  # Extra string transform utilities
  hyphencase : hyphencase = (msg) ->
    join '-', filter id, map lowercase, split-on-caps msg

  titlecase : capitalize = (msg) ->
    tc = (word) ->
      chars = letters word
      unletters [ uppercase head chars ] ++ map lowercase, tail chars
    unwords map tc, words msg

  split-on-caps : split-on-caps = (word) ->
    break-str (-> it is it.toUpperCase!), word
  */

}
