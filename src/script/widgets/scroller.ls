
# Helpers

{ log, defer, maximum, px-at-date } = _
{ pub } = App.PubSub


# Widget Definition

class App.Widgets.Scroller extends App.Widgets.Base

  ($dom, config) ->

    super ...

    @dom.main.css overflow : \hidden
    @dom.rail = $( '.rail', $dom )
    @update-width!

    @iscroll = new IScroll @dom.main.0, {
      # snap : '.date'
      scroll-x: yes
      scroll-y: no
      scrollbars : yes
      interactive-scrollbars: yes
      # event-passthrough: \vertical
    }

    @iscroll.on \bump, (dir) -> pub \scroller-bump, dir

    # @dom.main.parent!on \mousemove, -> it.preventDefault!

  reset : ->

    # Scroll to latest monday
    @iscroll.scroll-to -1 * (px-at-date App.State.monday), 0, 500

  longest-child : ->
    maximum @dom.rail.children!map -> $(this).width!

  update-width : ->
    @dom.rail.width @longest-child!
    defer ~> @iscroll.refresh

  scroll-by : (px) ->
    @iscroll.scroll-by px, 0, 500

