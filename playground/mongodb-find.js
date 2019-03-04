const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);


 

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        console.log('Unable to connect Mongodb server');
    }
    console.log('connected Mongodb server');

    // db.collection('Todos').find({ completed: false}).toArray().then( (docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs));},
    //     (err) => {
    //         console.log('Unable to find data..');
    //     }
    //     );



        db.collection('Todos').find().count().then( (count) => {
            console.log(`Todos Count ::: ${count}`);},
            (err) => {
                console.log('Unable to find data..');
            }
            );
    //db.close(); 
} );


