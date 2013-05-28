
window.Scroller = ->

  log 'Scroller::New'


  # State

  subs = []


  # Private Methods

  get-updated-scroll-progress = (scroll-top) ->
    doc-height = $.D.height! - $.W.height!
    [ scroll-top / doc-height, scroll-top, $.D.height! ]

  dispatch-subscribers = (scroll-top) ->
    for λ in subs
      λ?.apply null, get-updated-scroll-progress scroll-top


  # Listen to page scroll event

  $.W.on \scroll, -> dispatch-subscribers $.D.scroll-top!


  # Public Methods

  return {

    # Subscribe new listenter
    on : (λ) -> subs.push λ

  }

