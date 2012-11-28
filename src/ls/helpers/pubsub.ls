
# Pubsub

[ pub, sub ] = do ->

  channels = {}

  check = (ch) ->
    if !channels[ch]?
      channels[ch] = []

  pub = (ch, msg) ->
    check ch
    # if DEBUG then log ' >>', ch, '->', msg
    for fn in channels[ch]
      fn msg

  sub = (ch, fn) ->
    check ch
    channels[ch].push fn

  [ pub, sub ]


# Subscribe many handlers at once

subMany = (obj) ->
  for ch, fn of obj
    sub ch, fn


window <<< { pub, sub, subMany }
