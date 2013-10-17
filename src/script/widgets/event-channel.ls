
# Helpers

{ log, px-range, px-at-date, reverse, group-by, obj-to-pairs, suppress } = _
{ pub } = App.PubSub

to-date-groups = obj-to-pairs . group-by (.start)


# Templates

template = App.Templates.events


# Mixins

{ Appendable, Installable } = App.Modules


# Class Definition

class App.Widgets.Channel implements Appendable, Installable
  (@data, config) ->

    # Although we were passed Events as children, because thats how
    # the data is structured, the renderer's structure is based on
    # how many Events belong to each *day*. Therefore, rearrange the
    # data we were just given to create a grouping keyed by the common
    # start date of the grouped events.

    dates = to-date-groups data.events

    # Now create Dates as children, passing along groups of Events
    @make-children App.Widgets.Date, dates, config

    @dom = $( template.channel data )
    @install-all @dom
    @update-view!

    @state = open : no

    # Here we listen for click events on child events, for reasons
    # described in the event-event widget file.
    @dom.on \click, '[data-id]', suppress ({ target }, a, b, c) ~>
      # Change behaviour based on whether channel is already open
      if @state.open
        $this = $( target )
        # Click target could either the event itself or the button
        # at the front. Check for existance of a [data-id] to use.
        event-id =
          if $this.data \id
            that
          else
            $this.parents('[data-id]').data \id
        pub 'event-clicked', event-id
      else
        pub 'open-channel', @data.name

    @dom.on \click, \.duration,  ({ target }) ~>
      if not @state.open
        pub 'open-channel', @data.name


  # Update view

  update-view : ->
    @update-duration!
    @set-z-order!

  set-z-order : ->
    # Z-order dates backwards so overflowing events look correct
    for child, ix in reverse @children
      child.dom.css z-index : ix

  update-duration : ->

    # The grey bar that shows when closed. Show/hide is handled by CSS
    $duration = $( '.duration', @dom )

    # Fix min/max range of all children recursively using Appendable
    range-descriptor = @find-range!

    if not range-descriptor
      $duration.hide!
    else
      $duration.css do
        left  : px-at-date range-descriptor.0
        width : px-range range-descriptor


  # Open/close reach all the way down to this channel's children's children
  # (Events), because this is the level at which we may know the index ordering
  # of all the events *by channel*. The Events' natural parent, a Date, cannot
  # know it's childrens' group-index.

  open : ->
    @state.open = yes
    @dom
      .swap-class \is-closed, \is-open
      .css height: App.Config.row-height * (@grandchildren!length + 1)
      # + 1 is for the bit that's equivalent to the channel heading in the sidebar
    for child, ix in @grandchildren!
      child.dom.css top : App.Config.row-height * (ix + 1)

  close : ->
    @state.open = no
    @dom
      .swap-class \is-open, \is-closed
      .css height: App.Config.row-height
    for child, ix in @grandchildren!
      child.dom.css top : 0


