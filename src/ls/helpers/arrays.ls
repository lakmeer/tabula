
# Check for non-negative index for item in list

contains = (list, needle) ->
  for x in list
    if x is needle then return true
  return false


# use prelude:listToObj

mash = (list) ->
  ƒ_mash = (sig, x) -> sig[ x[0] ] = x[1]; sig
  fold ƒ_mash, {}, list


# Un-mash objects back into lists of pairs

unmash = (obj) -> [ [ k, v ] for k, v of obj ]

window <<< { mash, unmash }
