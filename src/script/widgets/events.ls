
# Helpers

{ log, id, select, concat-map, div } = _
{ pub } = App.PubSub


# Mixins

{ Appendable } = App.Modules
{ Base, Group } = App.Widgets


# Templates

template = App.Templates.events


# Widget Definition

class App.Widgets.Events extends Base implements Appendable

  ($dom, @config) ->
    super ...

    @dom.origin = $( template.groups! )
    @dom.main.append @dom.origin

    @set-bg-day!

  set-bg-day : ->
    # -1  means 0 => monday, cos our background image starts at monday
    day-of-week = 1 - Number App.State.zero.format \d
    @dom.main.css background-position : "#{ day-of-week * App.Config.day-width }px 0"

  render : (groups) ->
    @dom.origin.html ''
    @make-children Group, groups, @config
    @install-all @dom.origin

  all-channels   : -> concat-map (.children), @children
  select-channel : (name) -> select (.data.name is name), @all-channels!
  open-channel   : (name) -> (@select-channel name)?.open!
  close-channel  : (name) -> (@select-channel name)?.close!

