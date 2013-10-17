
# Helpers

{ log } = _
{ pub } = App.PubSub


# Templates

template = App.Templates.time-buttons


# Class Definition

class App.Widgets.TimeButtons extends App.Widgets.Base

  ($dom, config) ->
    super ...

    @dom.buttons = $ template.buttons!
    @dom.main.append @dom.buttons

    @dom.buttons.on \click, ({ target }) ->
      $this = $( target )
      pub \time-button-clicked, $this.attr \class

