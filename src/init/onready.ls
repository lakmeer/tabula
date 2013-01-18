



# -----------------------
#      Program Start
# -----------------------

$ ->

  # Initialise the environment

  Helpers.installHelpers!
  PubSub.enableSpying!
  Controllers.runPageControllers!

  log "--------------------\n       READY\n--------------------"


  # Site-wide, project-specific stuff goes here

  void

