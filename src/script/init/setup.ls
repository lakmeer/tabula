
# jQuery Root node shortcuts
exports.use-jquery-shortcuts = ->
  jQuery.D = jQuery(document)
  jQuery.W = jQuery(window)
  jQuery.B = jQuery('body')

# Maximum permissiveness for XDXHR in IE
exports.use-jquery-cors = ->
  jQuery.support.cors = on

# Tweenmax defaults
exports.set-default-easing = ->
  TweenMax.default-easing = Power2.ease-in-out

