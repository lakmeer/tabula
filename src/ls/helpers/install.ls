
# Install Prelude
window <<< prelude

# Maximum permissiveness for XDXHR in IE
jQuery.support.cors = on


# Debug Environment

# Debug flag - turns log output on or off
#
# Defaults to on if the server hostname matches 'localhost' or '*.dev'
# Manually override debug mode in page source using DEBUG_OVERRIDE before the main file

isLocal = (window.location.host + '') is 'localhost'
isDev   = (window.location.host + '').match /\.dev$/
isMcx   = (window.location.host + '').match /12241/

DEBUG = DEBUG_OVERRIDE ? isLocal or isDev or isMcx

log = do ->
  if not DEBUG or not console?.log?
    -> &0
  else if typeof console.log isnt 'function'
    (...args) -> unless DEBUG is off then console.log args.join ' '; &0
  else
    (...args) -> unless DEBUG is off then console.log.apply console, args; &0


# Keycode enum
KEYS =
  RET : 13
  ESC : 27


# Export Global Namespaces
window <<< { log, Controllers : {}, Widgets : {}, KEYS }

