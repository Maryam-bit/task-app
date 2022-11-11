const mongoose = require("mongoose")
mongoose.connect('mongodb://172.19.124.213:27017/task-manager-api', {
    useNewUrlParser: true,
})