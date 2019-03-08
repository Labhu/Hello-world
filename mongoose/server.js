const _ = require('lodash');
var express = require('express');
var bodyParser = require ('body-parser');

var {mongodb} =require('./../mongodb/mongodb-connect');
var{User} = require('./../mongoose/model/create-model');
//var {private} = require('./../mongodb/private-model');
const {authenticate} = require('./../middleware/authenticate');


 
//var{Student} = require('./model/model1');


var {ObjectID} = require('mongodb'); 

 var app=express();

 const port= process.env.PORT || 3000; 

app.use(bodyParser.json());

//save data in Student...........

app.post('/stu', (req, res) => {
//     console.log(req.body);
// });
    var ss = new Student( {
      name : req.body.name,
      adress : req.body.adress
    
     });

    ss.save().then ((doc) => {
        res.send(doc);
    }, (err) => {
    res.status(400).send(err);
});
}); 


//save data in user...........

app.post('/data', (req, res) => {
    //     console.log(req.body);
    // });
        var user = new User( {
          email : req.body.email,
          password  : req.body.password
        
         });
    
        user.save().then ((doc) => {
            res.send(doc);
        }, (err) => {
        res.status(400).send(err);
    });
    }); 


// save data in private model...
app.post('/private', authenticate, (req, res) => {
    //     console.log(req.body);
    // });
        var user = new User( {
          email : req.body.email,
          password  : req.body.password,
          _creator : req.user._id
        
         });
    
        user.save().then ((doc) => {
            res.send(doc);
        }, (err) => {
        res.status(400).send(err);
    });
    }); 

    app.post('/sut',  authenticate,  (req, res) => {
        //     console.log(req.body);
        // });
            var ss = new Student( {
              name : req.body.name,
              address : req.body.address,
              branch : req.body.branch,
              age : req.body.age ,
              _creator : req.ss._id
            
             });
        
            ss.save().then ((doc) => {
                res.send(doc);
            }, (err) => {
            res.status(400).send(err);
        });
        }); 


//get data...........
app.get('/stu' , (req,res) => {
    
Student.find().then ((data) => {
            res.send({data});
        },
         (e) =>{ res.status(400).send(e) 
    })
});

//get data in to private model....

app.get('/private' , authenticate , (req,res) => {
    
    User.find({_creator : req.user._id} ).then ((data) => {
                res.send({data});
            },
             (e) =>{ res.status(400).send(e) 
        })
    });   
    
    
    app.get('/stu' , authenticate , (req,res) => {
    
        Student.find({ _creator : req.user._id} ).then ((data) => {
                    res.send({data});
                },
                 (e) =>{ res.status(400).send(e) 
            })
        });
        

//get find by ID
app.get('/stu/:id', (req,res) => {

    var id = req.params.id;

   if(!ObjectID.isValid(id)) 
   {
    return res.status(404).send();
   } 


 Student.findById(id).then( (sss) => 
    {

         if ( !sss)
           {
             return res.status(404).send();
           }
        res.send({sss});

    }).catch( (error) => 
    {
          res.status(400).send();
    });
});
 
//delete data...........

app.delete('/ss/:id' ,  (req,res) => { 

    var id = req.params.id;
    if(!ObjectID.isValid(id)) 
   {
    return res.status(404).send();
   } 

   Student.findByIdAndRemove(id).then( (stu) => {

    if ( !stu)
    {
      return res.status(404).send();
    }

     res.send(stu)
   }).catch ( (e) => {
    res.status(400).send();
   });  
   });  
   
   
//update data by id ...........
   app.patch('/qqq/:id' , (req,res) => {
       var id = req.params.id;
       var body = _.pick(req.body, ['name', 'age']);
 
       if(!ObjectID.isValid(id)) 
       {
        return res.status(404).send();
       } 
    

   Student.findByIdAndUpdate(id, {$set : body}, {new: true}).then((data) => {
       if(!data)
        {
            return res.status(404).send();
        }
     res.send({data});
   }).catch( (err) => {
       res.status(400).send();
   });
});


//validator...
//  token generate

app.post('/users', (req,res) => { 
    var body = _.pick (req.body , ['email', 'password']);
    var user = new User(body);

    user.generateAuthToken().then( (result) => {
        res.header('x-auth' ,result).send(user); 
     }).catch( (err) => {
               res.status(400).send(err)
     })
})


// token find....
app.get ('/i/am' ,(req, res) => {
    var token= req.header('x-auth');

    User.findByToken(token).then((user) => {
        if(!user)
        {
            console.log('token not found');
        }
        res.send(user);
    })

});


//login..
 app.post('/login' ,(req, res) => {
     var body= _.pick(req.body, ['email' , 'password']);
     res.send(body);  
 })

 //Logging in post.....
 app.post('/post/login' ,(req, res) => {

    var body= _.pick(req.body, ['email' , 'password']);
    
    User.findByCredentials(body.email, body.password).then ((user) => {
 console.log(user);
        res.send(body);
        

    }).catch( (e) => {
 
        res.status(400).send();

    });
})

// log out...

app.delete('/log/out' , authenticate, (req,res) => {
    req.user.removeToken(req.token).then ( () => {
        res.status(200).send();

    }).catch( (e) => {
        console.log(e);
        res.status(400).send();
    })
     
})



app.listen(port, () => {
    console.log(`Started up to port ${port}`);
});
