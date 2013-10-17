
# Import Helpers

{ log } = _
{ pub, sub } = App.PubSub


# Templates

template = App.Templates.sidebar


#
# Widget Definition
#

class App.Widgets.Sidebar extends App.Widgets.Base

  ($dom, config) ->

    super ...

    # Edit event directly from sidebar
    @dom.main.on \click, '.event-name', ->
      pub 'event-clicked', @id

    # Dispatch open\close based on current state
    @dom.main.on \click, '.channel-name', ({ target }) ->
      $this = $(target).parents('.channel')
      type  = $this.data \type

      if $this.has-class \is-open
        pub \close-channel, type
      else
        pub \open-channel, type


  # Visual channel states

  select-channel : (channel) ->
    $( '.channel', @dom.main ).filter (ix, el) -> channel is $(el).data \type

  close-channel : (channel) ->
    $ch = @select-channel channel
    $ch.remove-class 'is-open'
    # $ch.height  App.Config.row-height

  open-channel : (channel) ->
    $ch = @select-channel channel
    $ch.add-class 'is-open'
    # num-children = $ch.find('.event-name').length
    # $ch.height App.Config.row-height * (num-children + 1)


  # Render some campaign data

  render : (groups) ->

    # Render template with grouped event data
    sidebar-html = template.sidebar groups

    # Inject into dom
    @dom.main.html sidebar-html

