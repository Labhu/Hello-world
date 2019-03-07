const _ = require('lodash');
var express = require('express');
var bodyParser = require ('body-parser');

var {mongodb} =require('./../mongodb/mongodb-connect');
 
//var{Student} = require('./model/model1');
var{User} = require('./model/create-model');

var {ObjectID} = require('mongodb'); 

 var app=express();

 const port= process.env.PORT || 3000; 

app.use(bodyParser.json());

//save data...........

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


//get data...........
app.get('/stu' , (req,res) => {
    
Student.find().then ((data) => {
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




app.listen(port, () => {
    console.log(`Started up to port ${port}`);
});
