
#
# Page Controller
#
# $$    - jQuery selector scoped to relevant chunk of the page
# $page - the page chunk itself
#
# Invoked automatically if element discovered with 'data-controller'
# attribute matching name of this function.
#

Controllers.home = ($page, $$) ->

  log 'Page::Home - Initilaised', $page

