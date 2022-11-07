const mongoose = require("mongoose")
const validator = require("validator")
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
})

const User = mongoose.model("User", {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email")
            }
        }
    }, 
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error("age must be a positive number")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: 7,
        validate(value) {
            if(value.toLowerCase().includes("password")) {
                throw new Error("password cannot contain 'password'")
            }
        }
    }
})

const user = new User({
    name: "Maryam",
    email: "maryam@gmail.com",
    age: 18,
    password: "abcdefg"
})

user.save().then(() => {
    console.log(user)
}).catch((error) => {
    console.log(error, "error")
})

const Task = mongoose.model("Task", {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const task = new Task({
    description: "        Task B",
    completed: false
})

task.save().then(() => {
    console.log(task)
}).catch((error) => {
    console.log(error, "error")
})