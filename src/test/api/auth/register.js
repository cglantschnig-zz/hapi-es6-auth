import api from '../../request.js';
import chai from 'chai';

let expect = chai.expect;

describe('POST /api/v1/register', function() {

  it('should create a user successfully',function(done){
    api
      .post('/api/v1/register')
      .send({
        email: 'test@mail.com',
        password: 'password',
        username: 'username'
      })
      .end(function(err,res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.ownProperty('token_type');
        expect(res.body).to.have.ownProperty('access_token');
        expect(res.body).to.have.ownProperty('refresh_token');
        expect(res.body).to.have.ownProperty('expires_in');
        done();
      });
  });

  it('should return status 409 if there already exists a user with the given email',function(done){
    api
      .post('/api/v1/register')
      .send({
        email: 'user1@test.com',
        password: 'password',
        username: 'username'
      })
      .end(function(err,res) {
        expect(res.status).to.equal(409);
        done();
      });
  });

  it('should return status 409 if there already exists a user with the given username',function(done){
    api
      .post('/api/v1/register')
      .send({
        email: 'test@test.com',
        password: 'password',
        username: 'username1'
      })
      .end(function(err,res) {
        expect(res.status).to.equal(409);
        done();
      });
  });

  it('should have status 400 for missing username', function(done){
    api
      .post('/api/v1/register')
      .send({
        email: 'test@mail.com',
        password: 'password'
      })
      .end(function(err,res) {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should have status 400 for missing email', function(done){
    api
      .post('/api/v1/register')
      .send({
        password: 'password',
        username: 'username'
      })
      .end(function(err,res) {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should have status 400 for missing password', function(done){
    api
      .post('/api/v1/register')
      .send({
        grant_type: 'password',
        username: 'username'
      })
      .end(function(err,res) {
        expect(res.status).to.equal(400);
        done();
      });
  });

});
