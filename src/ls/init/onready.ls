

# Install Helpers into global namespace

installHelpers!



# Run Page Controllers
#
# Each page of the site can define the name of a controller that sets
# up page-specific event listeners or behaviours. It is set in the
# page markup at the #main element with data-page-controller="<name>"

Controllers.runPageControllers = ->

  $page = $('[data-page-controller]').last!
  ctrlName = $page.data 'page-controller'

  if ctrlName?
    log "PageController '#ctrlName' requested"
    Controllers[ctrlName]? $page, -> $page.find it




# -----------------------
#      Program Start
# -----------------------

$ ->

  log "--------------------\n    INITIALISING\n--------------------"


  # Initialise the environment

  PubSub.enableSpying!
  Controllers.runPageControllers!


  # Site-wide, project-specific stuff goes here

  void

