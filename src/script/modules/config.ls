
require! \log

if window.Config?
  log 'App::Setup - Configuration detected:', that
else
  log 'App::Setup - No external configuration'

module.exports = window.Config

