var mongoose =require ('mongoose');

const {db} = require ('./../db/create-db');

var Student =mongoose.model('Student', {

    name : {
        type : String,
        required : true,
        minlength : 3,
        trim : true
    },
    address : {
        type : String,
        required : true,
        minlength : 3,
        trim : true
    },

    branch : {
        type : String,
        required : true,
        minlength : 3,
        trim : true
    },

    age : {
        type: Number,
        required : true,
    }

});

module.exports ={Student}

// var stu= new Student ( {
//     name :'mnp',
//     address : 'raiya telephone exchange',
//     branch : 'electricle',
//     age: 24
// })

// stu.save().then( (sdata) => {
//     console.log('student data', sdata)
// },(err) => {
//     console.log('Unable to save data', err);
// });