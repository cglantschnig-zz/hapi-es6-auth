import api from '../../request.js';
import should from 'should';

describe('Basic Tests',function() {

  // #1 should return home page

  it('should create a user',function(done){

    api
      .post('/api/v1/register')
      .send({
        email: 'test@mail.com',
        password: 'password',
        username: 'test'
      })
      .expect('Content-type',/json/)
      .end(function(err,res){
        res.status.should.equal(200);
        done();
      });
  });

});
