

# Require

log = require 'log'

setup  = require 'init/setup'
jqx    = require 'init/jqx'
pages  = require 'pages/loader'


#
# Main setup
#
# Set up environment in any particular way, eg: set defaults
# for plugins or frameworks
#

console?.group? "Setup"

setup.use-jquery-shortcuts!
setup.use-jquery-cors!
setup.set-default-easing!

jqx.use-extension \exists \mutuallyExclusive

console?.group-end?!


#
# DOM Ready
#
# Load whatever code needs to run on this particular page.
#

$ ->

  console?.group? "DOM"

  # Run jq- actions
  jqx.auto-invoke yes

  # Load any page controllers
  pages.auto-load!

  # Define any global behaviours
  void

  console?.group-end?!



  # Bootup complete. Await user interaction.
  console?.group? "Ready"

