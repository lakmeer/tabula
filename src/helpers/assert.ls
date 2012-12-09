
# Tabula Assertion Helpers

class AssertionError extends Error
  (@message) ->
  name : 'AssertionError'


Helpers.Assert =
  assert :
    eq : (a, e) ->
      if a isnt e
        throw new AssertionError "Equal - Expected #{ e }, but got #{ a }"

