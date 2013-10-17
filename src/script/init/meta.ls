
# Helpers

{ log } = _


# Meta Helpers
#
# These functions assist with the infrastructure that runs the program, as
# opposed to the program itself. It should not be necessary to modify these.

App.Helpers.meta =

  # Auto-invoker for Page Controllers
  run-page-controllers : ->
    $('[data-page-controller]').each ->
      $page = $(this)
      ctrl-name = $page.data 'page-controller'
      if ctrl-name?
        log "Page - Controller '#ctrl-name' requested"
        if App.Controllers[ctrl-name]?
          that $page, -> $( it, $page )
        else
          log "  ... '#ctrl-name' not found"

  # Auto-invoker for widgets
  initialise-widgets : ->
    $('[data-widget]').each ->
      $host = $(this)
      type  = $host.data \widget
      if type?
        log "Widget[#type]::Init"
        if App.Widgets[ type ]?
          widget = new that $host
          App.Widgets.current[ widget.id ] = widget
        else
          log "  ... no constructor for widget type '#type' found."

  # State handlers
  persist-state : ->
    log 'App::Persisting...', App.State
    local-storage.setItem 'App.State', JSON.stringify App.State

  hydrate-state : ->
    App.State <<< JSON.parse local-storage.getItem 'App.State'
    log 'App::Hydrating...', App.State

