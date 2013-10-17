
# Helpers

{ log, map, sort-by } = _
{ pub } = App.PubSub


# Widget Definition

class App.Widgets.RowHover extends App.Widgets.Base

  ($dom, config) ->

    $dom.css position: \relative

    super ...

    $hl = $( App.Templates.row-hover.highlight! )

    @dom.main.append $hl
    @dom.highlight = $hl
    @dom.sidebar = $( 'menu', @dom.main )

    # XXX: WARNING! - MAGICAL - need to find proper way to specify this
    @config.inner-offset  = $('[data-widget=datebar]').height! + @config.row-height
    @config.outer-offset  = $dom.offset!top
    @config.master-offset = @dom.main.offset!top

    # Add listeners
    @dom.main.on \mouseout, this~highlight-none
    @dom.main.on \mousemove, ({ target, pageY }) ~>
      $it = @find-sidebar-candidate-at pageY - @config.master-offset
      if not $it? then @highlight-none!; return
      if @is-eligible $it
        @highlight-none!
      else
        @highlight-offset $it.offset!top - @config.master-offset

  offset-unit : (el) ~>
    el : $(el)
    offset : $(el).offset!top - @config.master-offset

  find-sidebar-candidate-at : (px) ->
    $candidates = $( 'group-name, .channel-name, .event-name', @sidebar )
    offsets   = map @offset-unit, $candidates.to-array!
    candidate = { offset: px }
    offsets.push candidate
    sorted = sort-by (.offset), offsets
    pos    = sorted.index-of candidate
    offsets[pos - 1]?.el

  is-eligible : ($it) ->
    has-collapsed-parent = not $it.parents('.channel').has-class 'is-open'
    is-group-name        = $it.has-class 'group-name'
    is-collapsed-event   = ( $it.has-class 'event-name'   ) and has-collapsed-parent
    is-open-channel      = ( $it.has-class 'channel-name' ) and not has-collapsed-parent
    return is-group-name or is-collapsed-event or is-open-channel

  highlight-offset : (px) ->
    @dom.highlight.css do
      opacity : 1
      top : px

  highlight-none : ->
    @dom.highlight.css opacity : 0

