
# String helpers

pad = (length, input, char='0') -->
  if String input .length < length
    leading = strpad (length - String(input).length), char
    leading + input
  else
    input

strpad      = (times, char=' ') -> [ char for i in [0 to times] ].join ''
padtwo      = (input) -> if String(input).length < 2 then "0" + input else input
linkify     = (text)  -> text.replace /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1'>$1</a>"
serialise   = (opt)   -> s = ( for k,v of opt then k + "=" + v ); "?" + s.join '&'
deserialise = (str)   -> map = {}; str.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m,key,value) -> map[key] = value); map

splat = (obj, d=0) ->
  if isObject obj
    '{ ' + [ "#{ k } : #{ smush v, d }" for k, v of obj ].join(', ') + ' }'
  else
    obj

smush = (x, d) ->
  if d < 1
    if    isFunction x then '( function )'
    else if isObject x then '( object )'
    else if isString x then "\"#{ x }\""
    else x
  else
    splat x, d - 1

rehydrateBody = (text) ->
  ƒ_wrapP = (input) -> "<p>#{ input.replace /\n/g, '<br />' }</p>"
  p = text.split '\n\n'
  map( ƒ_wrapP, p ).join '\n'

escapeAttr = (text) ->
  text.replace /\n/g, '\\n'
  text

truncate = (text, ellipses="...") -> take(30, unwords lines text) + ellipses


window <<< { splat, pad, padtwo, strpad, truncate }
