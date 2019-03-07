const {mongooes} = require ('./db/create-db');
var {ObjectID} = require('mongodb'); 

var{Student} = require('./model/model1');

// Student.remove( {}).then((result) => {
//     console.log(result);
// });

// Student.findOneAndRemove('5c7faa4c2c4b89dbb9c0614e').then((user) => {
//     console.log(user);
// });
 
Student.findByIdAndRemove('5c7faa4c2c4b89dbb9c0614e').then((user) => {
    console.log(user);
});
