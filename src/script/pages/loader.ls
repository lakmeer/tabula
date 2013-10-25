
require! \log

{ map, filter, id } = require \helpers/index


#
# Detect Page Controllers
#
# Find elements with data-page-controller set on this page
#

exports.detect-page-controllers = ->
  scopes = $('[data-page-controller]').to-array!
  names  = filter id, map (-> $(it).data \page-controller), scopes
  if names.length
    log "App::Setup - detecting page controllers", names
    { [ $(el).data('page-controller'), $(el) ] for el in scopes }


#
# Load Page
#
# Initialise a specific page controller
#

exports.load-page = (name) ->
  $scope = $("[data-page-controller=#name]")

  if not name? or name is ""
    log "No controller name given: '#name'."

  else if $scope.exists! and
    page = require "pages/#name"
    page $scope, $

  else
    log "No such page controller: '#name'."


#
# Auto Load
#
# Find and instantiate any page controllers automatically
#

exports.auto-load = ->
  for name, _ of exports.detect-page-controllers!
    exports.load-page name


