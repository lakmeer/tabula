
{ log, id, delay } = _


template = ->
  """
    <div class="spinner">
      <div class="inner">
        <div class="spin"> </div>
        <p>
        Refreshing campaign data...
        </p>
        <div class="options">
          <button> Cancel </button>
        </div>
      </div>
    </div>
  """


class App.Modules.Spinner

  (config) ->

    log "Spinner:New -", config

    @dom = main : $( template! )
    @dom.msg = $( '.inner p',   @dom.main )
    @dom.opt = $( '.options', @dom.main )
    @dom.main.append-to $('body')

    @dom.main.on \click, \button, ~> @hide!


  show : (msg, options = {}) ->
    @dom.msg.text msg
    @dom.main.fade-in 200
    #delay 2000, ~> @hide!

  hide : ->
    @dom.main.fade-out 200

