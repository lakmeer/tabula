
#
# Tabula Date Helpers
#
# Deals with yyyy-mm-dd format dates unless otherwise specified,
# cos I've decided that how I want to represent dates when doing
# stuff with them internally.
#

Helpers.Date = do ->

  months_short = <[ Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec ]>
  months_long  = <[ January February March April May June July August September October November December ]>

  month = (x, short=no) ->
    if x > 12 or x < 1
      undefined
    else
      if short then months_short[x] else months_long[x]

  return {

    month : month

    toHumanDate : (date) ->
      p = date.match(/(\d{4})\W(\d{2})\W(\d{2})/)[1 to 3]
      p[1] = month p[1]
      p.reverse!join(' ')

  }

