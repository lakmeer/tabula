#
# Project make process specification
#

project =

  minify : off

  monitor : [
    "src/classes"
    "src/helpers"
    "src/lib"
    "src/init"
    "src/pages"
    "build/project.coffee"
  ]

  target : "bin/app.js"

  source : [

    # Set up program structure and environment
    "src/init/prelude.ls"
    "src/init/setup.ls"

    # Include helpers as required
    # "src/helpers/assert.ls"
    # "src/helpers/dates.ls"
    # "src/helpers/dom.ls"
    # "src/helpers/keycodes.ls"
    # "src/helpers/lists.ls"
    # "src/helpers/numbers.ls"
    # "src/helpers/pubsub.ls"
    # "src/helpers/strings.ls"
    # "src/helpers/timers.ls"
    # "src/helpers/types.ls"
    # "src/helpers/install.ls"

    # 3rd Party Libs
    # src/lib/...

    # Class Definitions
    # src/classes/...

    # Page Controllers
    "src/pages/home.ls"

    # Program Start
    "src/init/jquery-ext.ls"
    "src/init/onready.ls"

  ]
