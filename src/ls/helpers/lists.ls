
#
# Tabula List Helpers (Array and Objects)
#
# Requires: prelude
#


Helpers.Lists =

  # Contains - Check for non-negative index for item in list

  contains = (list, needle) ->
    for x in list
      if x is needle then return true
    return false


  # Mash - turn a list of key-value pairs into an object
  #        I used to implement this but prelude's listToObj
  #        is the same.
  #
  # Old version:
  #   mash = (list) ->
  #     ƒ_mash = (sig, x) -> sig[ x[0] ] = x[1]; sig
  #     fold ƒ_mash, {}, list

  mash : prelude.listToObj


  # Unmash - decompose objects back into lists of pairs

  unmash : (obj) -> [ [ k, v ] for k, v of obj ]

