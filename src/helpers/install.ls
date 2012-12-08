
window.installHelpers = (target=window, groups=[]) ->

  if groups.length is 0
    log 'Helpers::Install -', join ' + ', keys Helpers
    for name, group of Helpers
      target <<< group

  else
    log 'Helpers::Install -', join ' + ', groups
    for group in groups
      target <<< Helpers[group]

