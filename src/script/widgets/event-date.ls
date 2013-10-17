
# Helpers

{ px-at-date, last, map, sort-with } = _
{ pub } = App.PubSub

status-rank  = {[ word, ix ] for word, ix in <[ approved pending draft rejected ]> }
status-precedence = (a, b) -> status-rank[ a.data.status ] - status-rank[ b.data.status ]

most-pressing = last . map (.data.status)


# Templates

template = App.Templates.events


# Mixins

{ Appendable, Installable } = App.Modules


# Class Definition

class App.Widgets.Date implements Appendable, Installable
  ([ @date, events ], config) ->

    @make-children App.Widgets.Event, events, config
    @dom = $( template.date @date )

    # Before installing children, sort them by status
    # for displaying preferentially based on status
    @children = sort-with status-precedence, @children

    @install-all @dom
    @update-view!


  update-view : ->

    # Set left offfset
    @dom.css left: px-at-date @date

    # Create badge
    if @children.length > 1
      @badge = $( template.badge @children.length, most-pressing @children )
      @dom.append @badge

