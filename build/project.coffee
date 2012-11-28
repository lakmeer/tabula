#
# Project make process specification
#

project =

  minify : off

  monitor : [
    "src/js"
    "src/cs"
    "src/ls/classes"
    "src/ls/helpers"
    "src/ls/pages"
    "build/project.coffee"
  ]

  target : "bin/app.js"

  source : [

    # Setup
    "src/ls/prelude.ls"
    "src/ls/setup.ls"

    # Include helpers as required
    "src/ls/helpers/assert.ls"
    "src/ls/helpers/arrays.ls"
    "src/ls/helpers/dates.ls"
    "src/ls/helpers/dom.ls"
    "src/ls/helpers/jquery.ls"
    "src/ls/helpers/misc.ls"
    "src/ls/helpers/numbers.ls"
    "src/ls/helpers/pubsub.ls"
    "src/ls/helpers/strings.ls"
    "src/ls/helpers/install.ls"

    # 3rd Party Libs

    # Class Definitions

    # Page Controllers etc
    "src/ls/pages/home.ls"

    # Program
    "src/ls/jquery-ext.ls"
    "src/ls/onready.ls"

  ]
