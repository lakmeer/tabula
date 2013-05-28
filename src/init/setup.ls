
# Debug Environment

# Debug flag - turns log output on or off
#
# Defaults to on if the server hostname matches 'localhost' or '*.dev'
# Manually override debug mode in page source using ENABLE_LOGGING before the main file

isLocal = !!(window.location.host + '').match 'localhost'
isDev   = !!(window.location.host + '').match /\.dev$/

Config.ALLOW_LOG = Config?.ENABLE_LOGGING ? isLocal or isDev

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

# jQuery Root node shortcuts

jQuery.D = $(document)
jQuery.W = $(window)
jQuery.B = $('body')


# Run Page Controllers
#
# Each page of the site can define the name of a controller that sets
# up page-specific event listeners or behaviours. It is set in the
# page markup at the #main element with data-page-controller="<name>"

Controllers.runPageControllers = ->

  $pages = $('[data-page-controller]')

  $pages.each ->
    $page = $(this)
    ctrlName = $page.data 'page-controller'
    if ctrlName?
      log "PageController '#ctrlName' requested"
      Controllers[ctrlName]? $page, -> $page.find it


# Install Prelude
window <<< prelude

# Maximum permissiveness for XDXHR in IE
jQuery.support.cors = on

