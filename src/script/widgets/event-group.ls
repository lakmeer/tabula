
# Helpers

{ px-range, px-at-date } = _


# Templates

template = App.Templates.events


# Mixins

{ Appendable, Installable } = App.Modules
{ Channel } = App.Widgets


# Class Definition

class App.Widgets.Group implements Appendable, Installable

  (@data, config) ->

    @make-children Channel, data.channels, config
    @dom = $( template.group data )
    @install-all @dom
    @update-view!

  update-view : ->
    @update-range!

  update-range : ->

    $range = $( '.range', @dom )

    # Fix min/max range of all children recursively using Appendable
    range-descriptor = @find-range!

    if not range-descriptor
      $range.hide!
    else
      $range.css do
        left  : px-at-date range-descriptor.0
        width : px-range range-descriptor


