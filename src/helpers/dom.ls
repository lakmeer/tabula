
#
# Tabula DOM Helpers
#
# Requires: prelude, jquery
#

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

