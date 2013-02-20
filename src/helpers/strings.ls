
#
# Tabula String helpers
#
# Requires: prelude, Helpers.Type
#

Helpers.Strings = do ->

  # Functional shortcuts for string methods

  uppercase = (msg) -> String(msg).toUpperCase!
  lowercase = (msg) -> String(msg).toLowerCase!


  # Titlecase

  capitalize = (msg) ->
    µ_titleCase = (word) ->
      chars = letters word
      unletters [ uppercase head chars ] +++ map lowercase, tail chars
    unwords map µ_titleCase, words msg


  # Hyphencase - camel-to-hyphenated transform

  breakAtCaps = (word) -> breakIt (-> it is it.toUpperCase!), word
  hyphencase = (msg) -> join '-', filter id, map lowercase, breakAtCaps msg


  # Pad - Append given char to front until length is reached

  pad = (length, input, char='0') -->
    if String input .length < length
      leading = strpad (length - String(input).length), char
      leading + input
    else
      input

  # Splat - Generate snapshot into an object as a multiline string

  splat = (obj, d=0) ->
    if isObject obj
      '{ ' + [ "#{ k } : #{ smush v, d }" for k, v of obj ].join(', ') + ' }'
    else
      obj

  # Smush - determines representation of data at given level.
  #         Recursive partner to splat.

  smush = (x, d) ->
    if d < 1
      if      Helpers.Type.isFunction x then '( function )'
      else if Helpers.Type.isObject   x then '( object )'
      else if Helpers.Type.isString   x then "\"#{ x }\""
      else x
    else
      splat x, d - 1


  # Export

  return
    padtwo      : (input) -> if String(input).length < 2 then "0" + input else input
    linkify     : (text)  -> text.replace /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1'>$1</a>"
    serialise   : (opt)   -> s = ( for k,v of opt then k + "=" + v ); "?" + s.join '&'
    deserialise : (str)   -> map = {}; str.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m,key,value) -> map[key] = value); map

    strpad      : (times, char=' ') -> join '', [ char for i in [0 to times] ]
    truncate    : (txt, l, e="...") --> take(l, unwords lines txt) + e

    pad   : pad
    splat : splat

    uppercase  : uppercase
    lowercase  : lowercase
    capitalize : capitalize
    hyphencase : hyphencase


