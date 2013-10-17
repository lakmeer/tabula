
# Group initialisation logging, if possible

console?.group-collapsed? 'App Setup'


# Chaining Log - returns its first argument so it can be inserted into
# function calls for debuggind without upsetting the call chain

log =
  if not console?.log?
    -> &0
  else if typeof console.log isnt 'function'
    (...args) -> console.log args.join ' '; &0
  else
    -> console.log.apply console, &; &0


log "App::Setup - Created logging function"


# Detect Config Object

if window.Config?
  log 'App::Setup - Configuration detected:', that
else
  log 'App::Setup - No external configuration'


#
# Set Up Global App Structure
#
# Functions and other things will belong to this structure, or be attached
# to it before dom-ready hits. At that stage, the onready function will run
# and make reference to the things which have been attached here to create
# the program.
#

App =

  Config : window.Config or {}

  Helpers :
    log : log
    prelude : require \prelude-ls
    helpers : {}
    meta : {}

  Controllers : {}
  Modules : {}
  Widgets : current : {}
  Templates : {}
  State : {}

  PubSub : do ->
    PUB_SPY  = no
    channels = {}
    pub : (ch, ...msg) ->
      if PUB_SPY then log.apply null, [" >> #ch ->"].concat msg
      for fn in channels[][ch] => fn?apply this, msg
      if channels.all? then for fn in that => fn?apply this, [ ch ] ++ msg
    sub : (...chs, fn) -> for ch in chs => channels[][ch].push fn
    sub-many : (obj) -> for ch, fn of obj => @sub ch, fn
    enable-spying : (toggle=yes) -> PUB_SPY := toggle

  Program : {}


log "App::Setup - Established app structure"


#
# Set up lib or plugin defaults
#

# jQuery Root node shortcuts
jQuery.D = jQuery(document)
jQuery.W = jQuery(window)
jQuery.B = jQuery('body')

# Maximum permissiveness for XDXHR in IE
jQuery.support.cors = on

# Install Prelude to _
window._ = App.Helpers.prelude
window._ <<< { log }

# Expose App to global scope
window.App = App


log "App::Setup - Installed helpers:", App.Helpers


#
# Finally, bind program start to dom-ready
#

jQuery -> App.Program.start!


# Done initialising

console?.group-end?!

