const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const User = require("../../src/models/user")
const Task = require("../../src/models/task")

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    name: "user1",
    email: "user1@gmail.com",
    password: "user123",
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }],
    _id: userOneId
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    name: "user2",
    email: "user2@gmail.com",
    password: "user123",
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }],
    _id: userTwoId
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: "First Task",
    completed: false,
    owner: userOne._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: "Second Task",
    completed: true,
    owner: userOne._id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: "Third Task",
    completed: true,
    owner: userTwo._id
}

const taskFour = {
    _id: new mongoose.Types.ObjectId(),
    description: "Fourth Task",
    completed: true,
    owner: userTwo._id
}
const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
    await new Task(taskFour).save()
}
module.exports = {
    setupDatabase,
    userOne,
    userOneId,
    userTwoId,
    userTwo,
    taskOne,
    taskThree,
    taskTwo,
    taskFour
}