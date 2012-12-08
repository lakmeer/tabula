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
    "src/ls/init/prelude.ls"
    "src/ls/init/setup.ls"

    # Include helpers as required
    "src/ls/helpers/assert.ls"
    "src/ls/helpers/lists.ls"
    "src/ls/helpers/dates.ls"
    "src/ls/helpers/misc.ls"
    "src/ls/helpers/pubsub.ls"
    "src/ls/helpers/strings.ls"
    "src/ls/helpers/install.ls"

    # 3rd Party Libs
    # src/js/...

    # Class Definitions
    # src/ls/classes/...

    # Page Controllers etc
    "src/ls/pages/home.ls"

    # Program Start
    "src/ls/init/jquery-ext.ls"
    "src/ls/init/onready.ls"

  ]
