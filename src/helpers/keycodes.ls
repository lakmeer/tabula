
# Keycode Reference

Helpers.Keys =
  KEY :
    RETURN : 13
    ESC    : 27
    LEFT   : 37
    UP     : 38
    RIGHT  : 39
    DOWN   : 40

  showKeycodes : ->
    $(document).keydown -> log it.which

