
# Timers

Helpers.Timers =
  delay  : flip setTimeout
  defer  : (λ) -> delay 0, λ
  repeat : (t, λ, now=no) ->
    timer = setInterval λ, t
    if now then λ!
    return { stop : -> clearInterval timer; }


