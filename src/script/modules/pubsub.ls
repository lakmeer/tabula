
# Internal state

PUB_SPY  = no

channels = {}


# Export

module.exports =

  pub : (ch, ...msg) ->
    if PUB_SPY then log.apply null, [" >> #ch ->"].concat msg
    for fn in channels[][ch] => fn?apply this, msg
    if channels.all? then for fn in that => fn?apply this, [ ch ] ++ msg
  sub : (...chs, fn) -> for ch in chs => channels[][ch].push fn
  sub-many : (obj) -> for ch, fn of obj => @sub ch, fn
  enable-spying : (toggle=yes) -> PUB_SPY := toggle

