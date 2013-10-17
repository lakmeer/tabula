
# Helpers

{ log, unwords, unlines, map } = _


# Templates

App.Templates.events =

  data-attr: (data) -> unwords [ "data-#k='#v'" for k, v of data ]

  badge: (text, status) ->
    """<div class="badge" data-status="#status">#text</div>"""

  event: (event) ->
    """
      <div class="event" #{ @data-attr event } title="#{ event.name }">
        <button></button>
      </div>
    """

  date: (date) ->
    """
      <div class="date" data-date="#date">
      </div>
    """

  channel: ({ name }) ->
    """
      <div class="channel is-closed" data-type="#name">
        <div class="duration"> </div>
      </div>
    """

  group : ({ name }) ->
    """
      <div class="group" data-title="#name">
        <div class="range"> </div>
      </div>
    """

  groups : (groups) ->
    """
      <div class="origin">
        #{ unlines [ @group group, width for name, group of groups ] }
      </div>
    """

