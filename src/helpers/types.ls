
#
# Tabula Type Detectors
#
# Requires: prelude, jquery
#

# Type checkers

Helpers.Types = do ->

  #  From Crockford's "Remedial Javascript"
  #  javascript.crockford.com/remedial.html

  detect = (value, type = (typeof value)) ->
    if type isnt \object then return type
    if value instanceof Array then return \array
    if not value then \null else \object

  ofType = (type, x) --> type is detect x

  return
    typeOf     : detect
    isObject   : ofType 'object'
    isFunction : ofType 'function'
    isString   : ofType 'string'
    isArray    : ofType 'array'

