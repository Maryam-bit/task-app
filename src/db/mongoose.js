const mongoose = require("mongoose")
mongoose.connect('mongodb://172.24.255.195:27017/task-manager-api', {
    useNewUrlParser: true,
})