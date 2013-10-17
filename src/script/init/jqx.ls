
{ log } = _
{ pub, sub } = App.PubSub


#
# jQuery Extensions
#
# Some behaviours make sense as dom-native extensions and therefore go here
#

let $ = jQuery

  # Exists
  #
  # Check whether a sizzle selection resulted in more than zero nodes

  $.fn.exists = ->
    @length > 0

  # Swap class
  #
  # Shorthand for remove + add class. Remove goes first - think "swap X for Y"

  $.fn.swap-class = (remove, add) ->
    @remove-class(remove).add-class(add)


  # Set Class If
  #
  # Saves us having to use the 'if this then add-class else remove-class' pattern

  $.fn.set-class-if = (cname, test) ->
    @each ->
      if test
        $(this).add-class cname
      else
        $(this).remove-class cname


  # MutuallyExclusive
  #
  # Out of a given collection, clicking any of the collection pulls an
  # active class from the rest and gives it to this one.

  $.fn.mutually-exclusive = (active-class = 'active', setFirst = no) ->

    $all = this

    if setFirst then $all.first!add-class active-class

    @on 'click', ->
      $this = $(this)
      $all.remove-class active-class
      if not $t.has-class active-class
        $this.add-class active-class

    return this


  # GroupBy
  #
  # Returns object with key as name given by grouping function,
  # and value as JQO collecting the respective elements as a JQC

  $.fn.groupBy = (ƒ_groupKey) ->

    # ƒ_groupKey should return a string that
    # is suitable as the name to group items

    { map } = _.Obj
    sets = {}

    jqGroup = (items) ->
      g = null
      for item in items
        if g?
          g = g.add item
        else
          g = $(item)
      return g

    @each -> sets[][ƒ_groupKey this].push this

    map jqGroup, sets



  # Declarative Event Dispatch
  #
  # jq- prefix implies automatic invocation
  #
  # Any items tagged with data-event will dispatch given event
  # with data as defined by data-event-data when clicked.

  $.fn.event = ->

    log "JQX::jq-event", @length

    @on \click, ->
      { event, eventData } = $(this).data!
      dataArgs = if eventData? then String(eventData).split ',' else []
      pub.apply this, [ event ] ++ dataArgs
      return false



  # -----------------------
  #          Boot
  # -----------------------

  $ ->

    # Run jQuery Extensions
    #
    # Invoke auto-invoke functions as determined by jq- prefix classes
    #
    # eg: detects any existing <div class="jq-whatever"> and then runs
    # $('.jq-whatever').whatever() on them.

    # Group by classes matching 'jq-...'
    sets = $('[class*="jq-"]').groupBy (el) ->
      if el.className.match /jq-([-\w]*)/
        that[1]
      else
        ''

    # Activate respective JQX functions for each group
    for name, $group of sets
      $group[name]?!

