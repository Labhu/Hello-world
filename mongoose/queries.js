const {mongooes} = require ('./db/create-db');
const{User}=require('./model/create-model');

var id = '5c7e142e16925e32163ae8ad';

// User.find( {
//     _id : id
// }).then( (user) => {
//    console.log('User data', user);
// }).catch( (e) => {
//     console.log('Unable to find data', e);
// });

// User.findOne( {
//     _id: id
// }).then( (users) => {
//    console.log('User data', users);
// }).catch( (err) => {
//     console.log('Unable to find data', err);
// });

User.findById(id).then( (userr) => {
   console.log('User data', userr);
}).catch( (e) => {
    console.log('Unable to find data', e);
});