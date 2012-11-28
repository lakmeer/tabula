
# Assertions

assert =
  eq : (a, e) -> if a isnt e then throw new Error "Assertion::Equal - Expected #{ e }, but got #{ a }"

