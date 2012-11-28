
# DOM

tween = (start, end, time, cb) ->
  surrogate = { val : start }
  $(surrogate).animate { val : end }, { duration : time, step : cb }

scroll = (dest, time = 400) ->
  tween $(document).scrollTop(), dest, time, (x) ->
    $(document).scrollTop x

put = (code, host) ->
  if host? then $(host).append(code)
  code

setTitle = (title) -> delay 0, -> window.title  = title

wrapHtml = (el, list, opts={}) ->
  stringOpts = [ "#{ k }='#{ v }'" for k, v of opts ]
  log stringOpts
  "<#{ el } #{ stringOpts }>\n" + list.join('\n')+ "\n<#{ el }>"

redraw = (el) ->
  $el = $(el);
  $blank = document.createTextNode ' '
  $el.append $blank
  defer -> $blank.parentNode.removeChild $blank

window <<< { scroll, tween, redraw }
