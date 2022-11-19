const {calculateTip, farenheitToCelsius, celciusToFahrenheit} = require("../src/math.js")

test("Should caclculate total with tip", () => {
  const total = calculateTip(10, .3)
  expect(total).toBe(13)
})

test("Should caclculate total with default tip", () => {
  const total = calculateTip(10);
  expect(total).toBe(12.5)
})

test("Should convert 32 F to 0 C", () => {
  const tempInCelcius = farenheitToCelsius(32)
  expect(tempInCelcius).toBe(0)
})

test("Should convert 0 C to 32 F", () => {
  const tempInCelcius = celciusToFahrenheit(0)
  expect(tempInCelcius).toBe(32)
})
