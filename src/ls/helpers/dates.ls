

# Date helpers

months = (x) -> if x > 12 or x < 1 then 0 else [ undefined, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ][x]

rehydrateDate = (date) ->
  p = date.match(/(\d{4})(\d{2})(\d{2})/)[1 to 3]
  p[1] = months p[1]
  p.reverse!join(' ')

