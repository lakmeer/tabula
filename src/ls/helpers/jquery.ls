
# Handy jQuery Extensions

let $ = jQuery

  # Check whether selected node exists
  $.fn.exists = -> this.length > 0

  # Replace node with new code - incomplete implementation clobbers siblings
  $.fn.replace = ($c) -> @parent!html $c

  # Move active state on collection of items when clicked
  $.fn.mutuallyExclusive = (activeClass = 'active', setFirst = no) ->

    # Cache collection
    $all = this

    # Set activeclass on first item if required
    if setFirst then $all.first!addClass activeClass

    # Bind to click
    @on 'click', ->
      $t = $(this)
      $all.removeClass activeClass
      if not $t.hasClass activeClass
        $t.addClass activeClass

    # jQ Chaining
    this

  # Get mouse position relative to target element
  $.fn.coordsOn = ({ pageX, pageY }, λ) ->
    x = pageX - this.offset!left
    y = pageY - this.offset!top
    λ x, y, x / @outerWidth!, y / @outerHeight!

  # Functional reduce for jQCollections
  $.fn.reduce = (op, sum=0) ->
    @each -> sum := op $(this), sum
    sum
