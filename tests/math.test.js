const {calculateTip} = require("../src/math.js")
test("Should caclculate total with tip", () => {
  const total = calculateTip(10, .3)
  expect(total).toBe(13)
})
/* 
Why jest?
  - saves time
  - Create reliable software
  - Gives flexibility to developers
    - Refactoring
    - Collaborating
    - Profiling
  - Peace of mind
  */