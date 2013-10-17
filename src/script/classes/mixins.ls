
# Helpers

{ log, fold, map, each, min, max, concat-map } = _


# Compare date-range
#
# Given that a range is a pair of form [ "YYYY-MM-DD", "YYYY-MM-DD" ] (or null),
# compares two ranges giving the greater range which includes the extremes of both.
# Null compared to any range is the real range. Null compared to null is null.
# This allows lack-of-range to bubble up the nested comparisons, which is correct.

compare-daterange = (a, b) ->
  if !a
    b
  else if !b
    a
  else
    [ (min a.0, b.0), (max a.1, b.1) ]


# Mixins

App.Modules <<< do

  Installable :
    dom     : null
    install : -> @dom.append-to it

  Appendable :
    make-children : (λ, xs, y) -> @children = [ new λ x, y for x in xs ]
    install-all   : ($host) -> each (.install $host), @children
    find-range    : -> fold compare-daterange, null, map (.find-range!), @children
    grandchildren : -> concat-map (.children), @children

