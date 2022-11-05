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

    // update data
    // *********** updateOne ***********
    db.collection("users").updateOne({
        _id: new ObjectID("6366ce18e78139f0cae8c7a6")
    },
    {
        $set: {
            name: "Mike"
        }
    }).then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.log(error)
    })

    // ********** update multiple **********
    db.collection("tasks").updateMany({
        completed: false
    },
    {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.log(error)
    })
})