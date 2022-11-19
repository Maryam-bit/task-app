const request = require("supertest")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const app = require("../src/app")
const User = require("../src/models/user")

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

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test("Should signup a new user", async () => {
    const response = await request(app).post("/users").send({
        name: "user2",
        email: "user2@gmail.com",
        password: "user123"
    }).expect(201)

    // assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // assertions about the response 
    expect(response.body).toMatchObject({
        user: {
            name: "user2",
            email: "user2@gmail.com"
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe("user123")
})

test("Should login existing user", async () => {
    const response = await request(app).post("/users/login").send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    const user = await User.findById(response.body.user._id)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test("Should not login non existing user", async () => {
    await request(app).post("/users/login").send({
        email: userOne.email,
        password: "thisisnotmypass"
    }).expect(400)
})

test("should get profile for user", async () => {
    await request(app)
    .get("/users/me")
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test("should not get profile for unauthenticated user", async () => {
    await request(app)
    .get("/users/me")
    .send()
    .expect(401)
})

test("should delete account for user", async () => {
    await request(app)
    .delete("/users/me")
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test("should not delete account for unauthorized user", async () => {
    await request(app)
    .delete("/users/me")
    .send()
    .expect(401)
})