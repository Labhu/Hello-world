//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);


 

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        console.log('Unable to connect Mongodb server');
    }
    console.log('connected Mongodb server');

    // db.collection('Todos').insertOne( {
    //     text :' something',
    //     completed: false
    // }, (err,result)  => {
    //     if(err){
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined,2 ));

    // });

    //Insert document in User collection


    // db.collection('User').insertOne({
    //     name : 'abc',
    //     age : 23,
    //     location :'Rajkot'

    // }, (err , result) => {

    //     if(err){
    //         return console.log('Unable to insert todo', err);
    //      }

    //      console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
    // });
    db.close();
});

