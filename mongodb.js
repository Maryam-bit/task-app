// crud operations
const {MongoClient, ObjectID} = require("mongodb")

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }
    console.log("connected succesfully")
    const db = client.db(databaseName)

    // read data
    // ******* findOne **********
    // db.collection("users").findOne({name: "Jen"}, (error, user) => {
    //     if(error) {
    //         return console.log("unable to fetch")
    //     }
    //     console.log(user)
    // })

    // ******* find ***********
    // db.collection("users").find({age: "18"}).toArray((error, users) => {
    //     console.log(users)
    // })
    // db.collection("users").find({age: "18"}).count((error, count) => {
    //     console.log(count)
    // })




    // challenge
    // ***** findone *****
    // db.collection("tasks").findOne({_id: new ObjectID("6366c86cacd2c76dbd2906c0")}, (error, task) => {
    //     if(error) {
    //         return console.log("unable to fetch")
    //     }
    //     console.log(task)
    // })

    // ***** find multiple *****
    // db.collection("tasks").find({completed: false}).toArray((error, tasks) => {
    //     console.log(tasks)
    // })
    // db.collection("tasks").find({completed: false}).count((error, count) => {
    //     console.log(count)
    // })
})