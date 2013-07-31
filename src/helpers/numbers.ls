
# Number helpers

Helpers.Numbers =
  limit : (low, high, ix, wrap=no) -->
    if ix < low
      if wrap then high else low
    else if ix > high
      if wrap then low else high
    else
      ix

  wrap : (low, high, ix) -->
    if ix < low
      high
    else if ix > high
      low
    else
      ix

  random : (a, b = 0) ->
    (min a, b) + floor Math.random! * ( 1 + abs (b - a) )

