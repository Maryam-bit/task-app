// crud operations

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }
    console.log("connected succesfully")
    const db = client.db(databaseName)

    // insert one document
    // db.collection('users').insertOne({
    //     name: "Maryam Noor",
    //     age: "18"
    // }, (error, result) => {
    //     if(error) {
    //         return console.log("Unable to insert user");
    //     }
    //     console.log(result);
    // })

    // insert multiple documents
    // db.collection("users").insertMany([
    //     {
    //         name: "Jen",
    //         age: 28
    //     },
    //     {
    //         name: 'Gunder',
    //         age: 22
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log("unable to insert documents!");
    //     }
    //     console.log(result);
    // })



    // // tasks collection
    // db.collection("tasks").insertMany([
    //     {
    //         description: "task1",
    //         completed: true
    //     },
    //     {
    //         description: "task2",
    //         completed: false
    //     },
    //     {
    //         description: "task3",
    //         completed: true
    //     },
    // ], (error, result) => {
    //     if(error) {
    //         return console.log("unable to create task");
    //     }
    //     console.log(result)
    // })
})