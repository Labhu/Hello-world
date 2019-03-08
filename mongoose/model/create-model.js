const mongoose =require ('mongoose');
const {mongooes} = require ('./../db/create-db');
const _= require ('lodash');
const bcrypt= require('bcryptjs');

const jwt =require('jsonwebtoken');

const validator=require('validator');

var UserSchema = new mongoose.Schema({

  email :{
    type : String,
    required : true, 
    minlength : 3,
    trim : true,
    unique : true,
    validator: {
        validate : validator.isEmail,
        message : '{value} is not valid email'
    }
},

password : {
type : String,
required : true,
 minlength : 5,
},

tokens : [
{ access : { type : String,  required: true } ,
  token : { type: String , required: true }
}]
});

UserSchema.methods.toJSON = function() {
  var user= this;
  var Objectuser =user.toObject();
   return _.pick(Objectuser, ['_id','email']);
}


UserSchema.methods.generateAuthToken = function() {
  var user =this;
  var access= 'auth';
  var token = jwt.sign({ _id: user._id.toHexString(), access} ,'abc123').toString();

  user.tokens.push({ access , token});

  return user.save().then( () => {
    return token;
  }) 
};


UserSchema.statics.findByToken = function(token) {
   var User =this;
   var decoded;

   try{
    decoded= jwt.verify(token , '123abc');
   }catch(e) {

   }
   return User.findOne({
     //'_id': decoded._id,
     'tokens.token' : token,
     'tokens.access' : 'auth'
   });
};

// hashing password...........


UserSchema.pre('save',function(next) {
  var user=this;

  if(user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password ,salt, (err ,hash) => {
         user.password=hash;
         next();
      })
    })

  }else{
    next();
  }
});

//logging in post..........

UserSchema.statics.findByCredentials =  function(email, password) {
  var User=this;
   

   return  User.findOne({email}).then ( (user) => {
   if(!user) {
           
      return  Promise.reject(); 
  }

    return new Promise( (resolve, reject) => { 
      bcrypt.compare(password, user.password, (err,res) => {

        if(res) {
          resolve(User);

        } else{ reject (); }

      })

    });

  })

}


//log out..remove token...
UserSchema.methods.removeToken=function(token) {
  var user =this;
  return user.update({
    $pull : {
      tokens : {token }
    }
})

}
 


var User =mongoose.model('User', UserSchema);
   
module.exports ={
    User
}; 

// var aaa= new UserData( {
//    // email: ''
//     //email: 'a'
//     email : '  aa@gmail.com  ',
//     name :' Kismat'
// });


// aaa.save().then((doc) => {
//     console.log('User data save ', doc);
// }, (err) => {
//     console.log('Unable to save data::', err );
// });
