
# Require

require! 'log'

{ log, concat, union } = require 'helpers/index'


# Helpers

id-gen = do -> i = 0; -> i := i + 1

# find-json-config = ($host) ->
#   $script = $host.find 'script[type="application/json"]'
#   if $script.exists!
#     try
#       JSON.parse $script.text!
#     catch e
#       console.error "Failed to parse JSON config\n#{ e.name } '#{ e.message }' in\n", $script.text!
#     finally
#       {}
#   else
#     {}


#
# Widget base class
#

module.exports = class Widget

  ($host, config = {}) ->

    # Generate unique ID
    @id    = id-gen!

    # Record widget type
    @type  = $host.data \widget

    # Save dom reference as 'main' (replaced later by template if required
    @dom   = main : $host

    # Some explicit state for general use
    @state = {}

    # Self-logging function output identifying info automatically
    @log = -> log.apply null, union [ "Widget[#{ @type }](#{ @id }) -" ], &

    # Check for internal JSON config from <script> tag
    # @json = find-json-config $host

    # Copy config object to self
    @config = ^^(@defaults or {}) <<< @json <<< config

    # Done
    @log 'created', @config

