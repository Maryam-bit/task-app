const {calculateTip} = require("../src/math.js")
test("Should caclculate total with tip", () => {
  const total = calculateTip(10, .3)
  if(total != 13) {
    throw new Error("total tip should be 13. Got " + total)
  }
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