const request = require("supertest")
const app = require("../src/app")
const User = require("../src/models/user")

const userOne = {
    name: "user1",
    email: "user1@gmail.com",
    password: "user123"
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test("Should signup a new user", async () => {
    await request(app).post("/users").send({
        name: "user2",
        email: "user2@gmail.com",
        password: "user123"
    }).expect(201)
})

test("Should login existing user", async () => {
    await request(app).post("/users/login").send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test("Should not login nonexisting user", async () => {
    await request(app).post("/users/login").send({
        email: userOne.email,
        password: "thisisnotmypass"
    }).expect(400)
})