
# Chaining Log - returns its first argument so it can be inserted into
# function calls for debuggind without upsetting the call chain

module.exports = log =
  if not console?.log?
    -> &0
  else if typeof console.log isnt 'function'
    (...args) -> console.log args.join ' '; &0
  else
    -> console.log.apply console, &; &0

