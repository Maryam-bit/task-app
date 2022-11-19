const e = require("express")
const request = require("supertest")
const app = require("../src/app")
const User = require("../src/models/user")
const { setupDatabase, userOne, userOneId } = require("./fixtures/db")

beforeEach(setupDatabase)

test("Should signup a new user", async () => {
    const response = await request(app).post("/users").send({
        name: "user",
        email: "user@gmail.com",
        password: "user123"
    }).expect(201)

    // assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // assertions about the response 
    expect(response.body).toMatchObject({
        user: {
            name: "user",
            email: "user@gmail.com"
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe("user123")
})

test("should not signup user with invalid name/email/password format", async () => {
    await request(app)
        .post("/users")
        .send({
            email: "invalid email format",
            name: "abc",
            password: "abc"
        })
        .expect(400)
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

test("Should upload avatar image", async () => {
    await request(app)
        .post("/users/me/avatar")
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test("Should update valid user fields", async () => {
    await request(app)
        .patch("/users/me/")
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: "Jess"
        })
        .expect(200)

        const user = await User.findById(userOneId)
        expect(user.name).toBe("Jess")
})

test("Should not update invalid user fields", async () => {
    await request(app)
        .patch("/users/me/")
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: "Philadelphia"
        })
        .expect(400)
})

test("Should not update unauthorized users", async () => {
    await request(app)
        .patch("/users/me/")
        .send({
            name: "Jess2"
        })
        .expect(401)
})


test("Should not update user with invalid name/email/password", async () => {
    await request(app)
        .patch("/users/me/")
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            email: "invalid email format"
        })
        .expect(400)
})
