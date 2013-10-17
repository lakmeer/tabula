
# Helpers

{ log, map, unlines } = _


# Add sidebar templates to Templates

App.Templates.sidebar =

  sidebar : (groups) ->
    unlines map this~group, groups

  group : ({ name, channels }) ->
    """
      <div class="group">
        <h4 class="group-name"> #name </h4>
        #{ unlines map this~channel, channels }
      </div>
    """

  channel : ({ name, events }) ->
    """
      <div class="channel" data-event-count="#{ events.length }" data-type="#name">
        <label class="channel-name" data-type="#name"> #{ name }s </label>
        <div class="event-names">
          #{ unlines map this~event-name, events }
        </div>
      </div>
    """

  event-name : (event) ->
    """
      <button class="event-name" id="#{ event.id }"> #{ event.name } </button>
    """

