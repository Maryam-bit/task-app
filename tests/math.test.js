const {calculateTip, farenheitToCelsius, celciusToFahrenheit, add} = require("../src/math.js")

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

test("Async test demo", (done) => {
  setTimeout(() => {
    expect(1).toBe(1);
    done()
  }, 2000);
})

test("Should add too numbers", (done) => {
  add(2, 3).then((sum) => {
    expect(sum).toBe(5)
    done()
  })
})

test("Should add too numbers async/await", async () => {
  const sum = await add(2, 3)
  expect(sum).toBe(5)
})