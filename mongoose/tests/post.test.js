const expect =require('expect');
const request = require ('supertest');

const{app} =require('./../server.js');
const {User} = require('./model/create-model.js');

beforeEach( (done) => {
    User.remove({}).then (() =>
    done() )
});

describe ('POST /userdatas', () =>{
    it('should create new data of user', (done) => {
        var email = 'abc@gmail.com';

        request(app).post('/userdatas').send({email}).expect(200).
        expect((res) => { expect(res.body.email).toBe(email)
        }).end( ( err, res) => {
            if(err){
                return done(err);
            }
        });

        User.find().then((userdatas) => {
            expect(userdatas.length).toBe(1);
            expect(userdatas[0].email).toBe(email);
            done();
        }).catch( (e) => done(e ) ) ;
        
    })
}
)