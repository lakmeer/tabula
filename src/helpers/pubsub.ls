
# Pubsub

Helpers.PubSub = do ->

  PUB_SPY = no

  channels = {}

  check = (ch) ->
    if !channels[ch]?
      channels[ch] = []

  pub = (ch, ...msg) ->
    check ch
    if PUB_SPY then log.apply null, [" >> #ch ->"].concat msg
    for fn in channels[ch]
      fn?apply window, msg

  sub = (ch, fn) ->
    check ch
    channels[ch].push fn

  return

    # PubSub
    pub : pub
    sub : sub

    # Assign hash of listeners at once
    subMany : (obj) ->
      for ch, fn of obj
        sub ch, fn

    # Enable auto-logging
    PubSub : { enableSpying : (toggle=yes) -> PUB_SPY := toggle }

