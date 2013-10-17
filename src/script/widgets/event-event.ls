
# Helpers

{ suppress } = _
{ pub } = App.PubSub


# Templates

template = App.Templates.events


# Mixins

{ Installable } = App.Modules


# Class Definition

class App.Widgets.Event implements Installable

  (data, config) ->
    @dom = $( template.event data )
    @remember data

    # Emit event when touched
    # If you're here looking for the event-click handler, it's
    # in the Channel widget. This is because only the Channel
    # can tell whether it's expanded or not, and that will be
    # used to determine whether clicking an event emits an
    # 'event-edit' or a 'open-channel' event


  remember : (data) ->
    @data = data
    @data.duration = 1 + (moment @data.end).diff @data.start, \days
    @update-view!

  update-view : (width = App.Config.day-width) ->
    @dom.css do
      width : width * @data.duration


  # This class doesn't need to implement Appendable fully, so just mock
  # this method so it's parent can collect it's ranges like it does.

  find-range: -> [ @data.start, @data.end ]


