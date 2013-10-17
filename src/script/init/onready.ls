
# Helpers

{ log, contains, reject, union } = _
{ pub, sub } = App.PubSub


# Move to JQX

$.fn.click-toggle = (cname) -> @on \click, -> $(this).toggle-class cname


# -----------------------
#      Program Start
# -----------------------

App.Program.start = ->

  # The is the entry point to the program.
  # It first runs the function which detects the page controller and then
  # establishes any controller-like behaviours that run on EVERY page.

  console?.group? "DOM Ready"


  # Initialise the environment

  App.PubSub.enable-spying!
  App.Helpers.meta.hydrate-state!
  App.Helpers.meta.run-page-controllers!


  # Finished bootstrapping, await user interaction

  console?.group-end?!
  console?.group? "App Ready"

