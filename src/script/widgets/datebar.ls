
# Constants

SECONDS = 1000
MINUTES = 60 * SECONDS
HOURS   = 60 * MINUTES
DAYS    = 24 * HOURS


# Helpers

{ log, abs, last, id, words } = _
{ pub } = App.PubSub

make-date-range = (start-date, end-date) ->
  iterator     = moment start-date
  months       = []
  range-length = abs iterator.diff end-date, \days

  for i in [0 to range-length]
    day-text   = iterator.date!
    month-text = iterator.format \MMMM
    last-month = last months

    if month-text isnt last-month?.month
      months.push { month: month-text, dates : [ day-text ] }
    else
      last-month.dates.push day-text

    iterator.add(1 \d)

  return months


# Templates

template = App.Templates.datebar


#
# Datebar Widget
#

class App.Widgets.Datebar extends App.Widgets.Base

  ($dom, config) ->
    super ...

    date-range = make-date-range App.State.zero, config.end-date
    today      = words App.State.today.format "MMMM D"

    @dom.months = $( template.months date-range, config.day-width, today )
    @dom.main.append @dom.months

    # Set width explicitly to prevent wrapping, also so scroller can measure it
    @dom.main.width @dom.months.width!


