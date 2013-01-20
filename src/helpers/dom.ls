
#
# Tabula DOM Helpers
#
# Requires: prelude, jquery
#

# Dom relates helpers

Helpers.Dom =

  tween : (start, end, time, λ_step, λ_cb = id) ->
    z = { val : start }
    $(z).animate { val : end }, { duration : time, step : λ_step, complete : λ_cb }

  scroll : (dest, time = 400) ->
    tween $(document).scrollTop(), dest, time, (x) -> $(document).scrollTop x

  put : (code, host) ->
    if host? then $(host).append(code)
    code

