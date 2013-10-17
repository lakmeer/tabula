
# Helpers

{ log, concat-map, unlines } = _


# Add sidebar templates to Templates

App.Templates.datebar =

  date : (date, width, is-today) ->
    """ <span class="#{ if is-today then \today else '' }"
           style="width: #{ width }px"> #date </span> """

  dates : (dates, width, is-this-month, today) ->
    """
      <div class="dates" style="width: #{ dates.length * width }px">
        #{ unlines [ @date i, width, (is-this-month and Number(today) is i) for i in dates ] }
      </div>
    """

  month : (month, width, today) ->
    """
      <span style="width: #{ month.dates.length * width }px">
        <label> #{ month.month } </label>
        #{ @dates month.dates, width, (month.month is today.0), today.1 }
      </span>
    """

  months : (months, width, today) ->
    dates-length = (concat-map (.dates), months).length * width
    """
      <div class="months" style="width: #{ dates-length }px">
        #{ unlines [ @month month, width, today for month in months ] }
      </div>
    """
