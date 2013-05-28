
# -----------------------
#    jQuery Extensions
# -----------------------

let $ = jQuery

  # Exists
  #
  # Check whether a sizzle selection resulted in more than zero nodes

  $.fn.exists = ->
    @length > 0


  # Replace - incomplete
  #
  # Replace node with new code - incomplete implementation clobbers siblings

  $.fn.replace = ($c) ->
    @parent!html $c


  # Map
  #
  # Transform JQC into array via map function which operates in the jquery
  # style using 'this'

  $.fn.map = (λ) ->
    [ λ.apply item, [ ix ] for item in @to-array! ]


  # MutuallyExclusive
  #
  # Out of a given collection, clicking any of the collection pulls an
  # active class fro the rest and gives it to this one.

  $.fn.mutuallyExclusive = (activeClass = 'active', setFirst = no) ->

    $all = this

    if setFirst then $all.first!addClass activeClass

    @on 'click', ->
      $t = $(this)
      $all.removeClass activeClass
      if not $t.hasClass activeClass
        $t.addClass activeClass

    this


  # Coords On
  #
  # Get mouse position relative to target element

  $.fn.coordsOn = ({ pageX, pageY }, λ) ->
    x = pageX - this.offset!left
    y = pageY - this.offset!top
    λ x, y, x / @outerWidth!, y / @outerHeight!


  # Reduce
  #
  # Functional reduce pattern for jQCollections.
  # Optionally accepts a starting value.
  # Iterator takes two args, the element being
  # iterated and the current reduction.

  $.fn.reduce = (λ, s=0) ->
    @each -> s := λ $(this), s
    s


  # GroupBy
  #
  # Returns object with key as name given by grouping function,
  # and value as JQO collecting the respective elements as a JQC

  $.fn.groupBy = (ƒ_groupKey) ->

    # ƒ_groupKey should return a string that
    # is suitable as the name to group items

    sets = {}

    jqGroup = (items) ->
      g = null
      for item in items
        if g?
          g = g.add item
        else
          g = $(item)
      g

    @each -> sets@@[ƒ_groupKey this].push this

    map jqGroup, sets




  # -----------------------
  #     Auto-Dispatch
  # -----------------------


  # Auto-invoking JQ Extensions are triggered by the presence
  # of classes in the dom with the prefix 'js-'. See bottom
  # for invocation details.



  # Custom Event Dispatch Engine
  #
  # js- prefix implies automatic invocation
  #
  # Any items tagged with data-event will dispatch given event
  # with data as defined by data-event-data when clicked.

  $.fn.event = ->

    log "JQX::js-event", @length

    @on \click, ->
      { event, eventData } = $(this).data!
      dataArgs = if eventData? then String(eventData).split ',' else []
      pub.apply this, [ event ] +++ dataArgs
      return false


  # JS Reveal
  #
  # js- prefix implies automatic invocation
  #
  # Don't show an element until the specified event has been emmitted

  $.fn.reveal = ->

    log "JQX::js-reveal", @length

    @each ->
      $this       = $(this)
      targetEvent = $this.data \show-event

      sub targetEvent, -> $this.show!


  # JS Collapse
  #
  # js- prefix implies automatic invocation
  #
  # Element triggers animated hide/display other sections

  $.fn.collapse = (speed=300) ->

    log 'JQX::js-collapse', @length

    @each ->
      $(this).data \state, \closed

    @on \click, ->
      $this    = $(this)
      selector = $this.data \collapse
      $target  = $(selector)
      state    = $target.data \state

      if state isnt \open
        $target.slideDown speed
        $target.data \state, \open
      else
        $target.slideUp speed
        $target.data \state, \closed


  # JS Swap
  #
  # js- prefix implies automatic invocation
  #
  # Sets up a group of elements to respond to a 'swap' event
  # such that when one is shown, the others become hidden

  $.fn.swap = ->

    log 'JQX::js-swap', @length

    swapSets = @groupBy (el) -> $(el).data 'swap-id'

    get = (name) ->
      if swapSets[name]
        that
      else
        throw new Error 'JQX::js-swap - No such grouping: ' + name

    # Show a given option by name, to respond to events with
    show = (groupName, targetId) ->
      $group  = get groupName
      $target = if targetId? then $group.filter '#' + targetId else $group.first!
      $group.hide!
      $target.show!

    # Subscribe to swap events
    sub 'swap', show

    # Show first option unless configured not to
    for name, set of swapSets
      # set.hide! # Shouldn't need this due to CSS pre-hiding
      unless set.first!data(\swap-option) is 'no-default'
        set.first!show!




  # -----------------------
  #          Boot
  # -----------------------

  $ ->

    # Run jQuery Extensions
    #
    # Invoke auto-invoke functions as determined by js- prefix classes
    #
    # eg: detects any existing <div class="js-whatever"> and then runs
    # $('.js-whatever').whatever() on them.

    # Group by classes matching 'js-...'
    sets = $('[class*="js-"]').groupBy (el) ->
      if el.className.match /js-([-\w]*)/
        that[1]
      else
        ''

    # Activate respective JQX functions for each group
    for name, $group of sets
      $group[name]?!

