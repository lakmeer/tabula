
# Number helpers

Helpers.Numbers =
  limit : (low, high, ix, wrap=no) -->
    if ix < low
      if wrap then high else low
    else if ix > high
      if wrap then low else high
    else
      ix


