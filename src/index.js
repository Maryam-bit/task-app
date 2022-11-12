const express = require("express")
require("./db/mongoose")


const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")
const app = express()
const port = process.env.PORT || 3000

// automatically parse incomming json into an object
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})