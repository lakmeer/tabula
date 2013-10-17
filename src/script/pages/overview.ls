
# Helpers

{ log, map, sort-by, select, filter, flatten, concat-map } = _


#
# In-closure helpers
#

# Merge Groups
#
# Merge incoming group-less campaign data with channel grouping config

select-channel = (data, name) -->
  select (.name is name), data.channels

get-channel-events = (data, name) -->
  events = select-channel data, name |> (.events)
  { name, events : events |> map set-elapsed |> sort-by (.start) }

populate-channels = (data, { name, channels }) -->
  { name, channels : map (get-channel-events data), channels }

merge-groups = (data, groups) ->
  map (populate-channels data), groups


# See if event is elapsed

set-elapsed = (event) ->

  # Oddly, diff will be negative here cos we want to reuse the
  # already contructed 'today' moment, whereas this comparison
  # would usually be done the other way around. (* -1) to fix.

  diff = -1 * App.State.today.diff event.end
  event.elapsed = diff < 0
  return event


# Select event by ID

select-event = (id, data) ->
  all-events = data.groups |> concat-map (.channels) |> concat-map (.events)
  select (.id ~= id), all-events


# Find most recently elapsed monday from given date

last-monday = (date) ->
  monday      = moment date
  day-of-week = Number monday.format \d

  if day-of-week < 2
    monday.subtract day-of-week + 6, \days
  else
    monday.subtract day-of-week - 1, \days

  return monday


#
# Page Controller
#

App.Controllers.overview = ($page, $$) ->

  # Import widget constructors
  { Scroller, Sidebar, Datebar, Events, TimeButtons, RowHover } = App.Widgets
  { Spinner } = App.Modules

  # Get event broadcaster
  { pub, sub } = App.PubSub

  # Set moment.js default formatting
  moment.default-format = "YYYY-MM-DD"


  log 'Page::Overview - Initialised'


  # 'Non-configurable' config - this stuff belong in Config, but we don't want
  # the user changing it (in this case, cos it will ruin the graphics)

  App.Config <<< do
    day-width : 37
    row-height : 48


  # Save important dates for comparisons across the board

  App.State.zero   = (moment App.Config.start-date).start-of \day
  App.State.today  = (moment Date.now!).start-of \day
  App.State.monday = last-monday App.State.today


  # Instantiate component widgets

  widgets =
    sidebar  : new Sidebar     $$('[data-widget=sidebar]')
    datebar  : new Datebar     $$('[data-widget=datebar]'),   App.Config
    events   : new Events      $$('[data-widget=events]'),    App.Config
    scroller : new Scroller    $$('[data-widget=scroller]')
    buttons  : new TimeButtons $$('[data-widget=time-buttons]')
    rowhover : new RowHover    $$('[data-widget=row-hover]'), App.Config
    spinner  : new Spinner     App.Config


  # Pseudo-widget - row highlighter

  unless Modernizr.touch
    void


  # Event Listeners

  sub \open-channel, ->
    widgets.sidebar.open-channel it
    widgets.events.open-channel it

  sub \close-channel, ->
    widgets.sidebar.close-channel it
    widgets.events.close-channel it

  sub \event-clicked, (event-id) ->
    event = select-event event-id, App.State.current-data

    $.fancybox do
      href: "http://vmob.co" + "?event-id=#{ event.id }&campaign-id=#{ event.campaign-id }"
      type: \iframe
      padding: 0
      after-close : ->
        pub \lightbox-flow-complete

  sub \lightbox-flow-complete, ->
    widgets.spinner.show "Refreshing campaign data..."

  sub \time-button-clicked, (dir) ->
    switch dir
    | \left  => widgets.scroller.scroll-by 7 * App.Config.day-width
    | \right => widgets.scroller.scroll-by 7 * App.Config.day-width * -1
    | _ => console?.error "No such time direction:", dir


  # Methods

  render = (campaign) ->
    widgets.scroller.reset!
    widgets.sidebar.render campaign.groups
    widgets.events.render  campaign.groups

  receive-data = (raw, config = App.Config) ->
    log "Page::Overview - Campaign data received:", raw

    # Merge with grouping scheme and save
    App.State.current-data =
      name : raw.name
      groups : merge-groups raw, config.groups

    # TODO: Get start date from data, falling back to getting from config

    log "Page::Overview - Zeroth day is:   ", App.State.zero.format 'dddd DD MMMM HH:mm:ss'
    log "Page::Overview - Latest monday is:", App.State.monday.format 'dddd DD MMMM HH:mm:ss'

    # Draw
    log "Rendering campaign data for '#{ App.State.current-data.name }'"
    render App.State.current-data


  # MOCK: Get simluated campaign data
  receive-data JSON.parse $('#campaign-data').text!


