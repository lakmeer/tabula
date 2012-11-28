
log "--------------------\n    INITIALISING\n--------------------"


# -----------------------
#    jQuery Extensions
# -----------------------


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


# JS Confirm Submit
#
# js- prefix implies automatic invocation
#
# For normal forms
# Confirm submission with a custom message

$.fn.confirmsubmit = ->

  log 'JQX::js-confirmsubmit', @length

  @each ->
    $(this).on \submit, ->
      confirm $(this).data 'confirm-message'

$.fn.submitform = ->

  log 'JQX::js-submitform', @length

  @each ->
    $(this).on \click, ->
      $('#'+$(this).data('submit-form')).submit()
      false


# JS Like Button
#
# js- prefix implies automatic invocation
#
# Creates a 'Like' button out of this element to report likes to server

$.fn.like = ->

  log 'JQX::js-like', @length

  updateVisualState = (url, state, count, likedClass = 'liked') ->

    # Get group of identical buttons from group (usually one)
    $targets = urlGroups[ url ]

    # Change state of all based on returned state from server
    if state is \true
      log "JQX::Like - Liked entity at", url
      $targets.addClass likedClass
    else
      log "JQX::Like - Unliked entity at", url
      $targets.removeClass likedClass

    # Check for like counters
    $targets.each -> $(this).prev!filter '.likecount' .html count

  # Group all discovered like buttons by their destination URL
  # Includes groups of one
  urlGroups = @groupBy (-> $(it).data \url)

  # For each button on click
  @on \click, ->
    $.ajax {
      url: $(this).data \url
      type: \GET
      success: (data) ~>
        if data.success isnt \true
          return new Flash "Unable to Like this", { type : \error }
        else
          updateVisualState $(this).data(\url), data.fLiked, data.cLikers
      error : (err) ~>
        new Flash "Unable to send this Like to our server", { type : \error }
    }


# Masked
#
# When selecting an editable field, optionally enforce a prefix
# to the field value to prompt the user to coform their input.
# If the prefix is all that remains when done, remove it to show
# the effectively blank field.

$.fn.masked = ->

  log 'JQX::js-masked', @length

  @each ->

    $this = $(this)
    mask = $this.data 'mask-init'

    $this
      .on \focus, 'input' -> if @value is ''   then @value = mask
      .on \blur,  'input' -> if @value is mask then @value = ''


# AjaxButton
#
# A Button that knows how to submit to a particluar URI with certain
# params and wait for a response

$.fn.ajaxbutton = ->

  log 'JQX::js-ajaxbutton', @length

  @each ->
    $this = $(this)
    { params = {}, url  = '', done = 'ajax-button-done', type = 'get' } = $this.data!

    $this.on \click, ->
      emit = (result) -> pub done, result
      $.ajax {
        url     : url
        type    : type
        data    : params
        success : emit
        error   : emit
      }



# -----------------------
#         Helpers
# -----------------------

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
#      Init Dispatch
# -----------------------


# Run jQuery Extensions
#
# Invoke auto-invoke functions as determined by js- prefix classes
#
# eg: detects any existing <div class="js-whatever"> and then runs
# $('.js-whatever').whatever() on them.

runJQueryExtensions = ->

  # Group by classes matching 'js-...'
  sets = $('[class*="js-"]').groupBy (el) ->
    if el.className.match /js-([-\w]*)/
      that[1]
    else
      ''

  # Activate respective JQX functions for each group
  for name, $group of sets
    $group[name]?!


# Run Page Controllers
#
# Each page of the site can define the name of a controller that sets
# up page-specific event listeners or behaviours. It is set in the
# page markup at the #main element with data-page-controller="<name>"

runPageControllers = ->

  $page = $('[data-page-controller]').last!
  ctrlName = $page.data 'page-controller'

  if ctrlName?
    log "PageController '#ctrlName' requested"
    Controllers[ctrlName]? $page, -> $page.find it



# -----------------------
#          Boot
# -----------------------

$ ->

  $('form').each -> new FormController $(this)

  runPageControllers!
  runJQueryExtensions!

  $('.collapse').css('display','none') #delayed so widget plugin knows the width of things

