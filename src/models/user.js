const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})


userSchema.virtual("tasks", {
    ref: "Task",
    localField: "_id",
    foreignField: "owner"
})

// accessible on models
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if(!user) {
        throw new Error("Unable to login")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw new Error("Unable to login")
    }
    return user;
}

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject;
}

// accessible on instances
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user.id.toString() }, "thisistoken")

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token;
}

// hash the plain text password before saving
userSchema.pre("save", async function (next) {
    // this = document we are saving
    const user = this;
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model("User", userSchema)
User.createIndexes();
module.exports = User