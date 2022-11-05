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

    // delete data
    // ********* delete many **********
    db.collection("users").deleteMany({
        age: "18"
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    // ********** delete One **********
    db.collection("tasks").deleteOne({
        description: "task1"
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})