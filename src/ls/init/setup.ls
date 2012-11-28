
# Debug Environment

# Debug flag - turns log output on or off
#
# Defaults to on if the server hostname matches 'localhost' or '*.dev'
# Manually override debug mode in page source using DEBUG_OVERRIDE before the main file

isLocal = !!(window.location.host + '').match 'localhost'
isDev   = !!(window.location.host + '').match /\.dev$/

Config.ALLOW_LOG = Config?.DEBUG_OVERRIDE ? isLocal or isDev

log = do ->
  if not Config.ALLOW_LOG or not console?.log?
    -> &0
  else if typeof console.log isnt 'function'
    (...args) -> unless Config.ALLOW_LOG is off then console.log args.join ' '; &0
  else
    (...args) -> unless Config.ALLOW_LOG is off then console.log.apply console, args; &0


# Detect Config Object

log 'Configuration Detected:', that if Config?


#
# Set Up Global Namespaces
#

window <<<

  # Log
  #
  # Log is universal. I use it so much, it's
  # not worth putting it in the Helper namespace
  # as I use it before the helpers are even made
  log         : log

  # Helpers
  #
  # Namespace to attach my functional atoms and
  # helper functions to. These functions are
  # designed to be exported to the global level
  # and used in a composing style, but it's nice
  # to have somwhere to keep them

  Helpers     : {}

  # Controllers
  #
  # Namespace for keeping page controllers on.
  # One per page, dividing the 'loose' javascript
  # that performs specific page functions into
  # sensible chunks. Invoked automatically.

  Controllers : {}


#
# Set up environment and config
#

# Install Prelude
window <<< prelude

# Maximum permissiveness for XDXHR in IE
jQuery.support.cors = on

