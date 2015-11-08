import api from '../../request.js';
import chai from 'chai';

let expect = chai.expect;

describe('POST /api/v1/auth/token', function() {

  it('should get a token for a valid username/password',function(done){
    api
      .post('/api/v1/auth/token')
      .send({
        password: 'password',
        username: 'username1',
        grant_type: 'password'
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
  
  it('should get a token for a valid email/password',function(done){
    api
      .post('/api/v1/auth/token')
      .send({
        password: 'password',
        username: 'user1@test.com',
        grant_type: 'password'
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

  it('should return status 401 for a wrong password', function(done){
    api
      .post('/api/v1/auth/token')
      .send({
        password: 'wrongpassword',
        username: 'username1',
        grant_type: 'password'
      })
      .end(function(err,res) {
        expect(res.status).to.equal(401);
        done();
      });
  });

  it('should return status 404 for a not existing account', function(done){
    api
      .post('/api/v1/auth/token')
      .send({
        password: 'wrongpassword',
        username: 'notExistingUser',
        grant_type: 'password'
      })
      .end(function(err,res) {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('should have status 400 for missing username', function(done){
    api
      .post('/api/v1/auth/token')
      .send({
        password: 'password',
        grant_type: 'password'
      })
      .end(function(err,res) {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should have status 400 for missing password',function(done){
    api
      .post('/api/v1/auth/token')
      .send({
        username: 'username',
        grant_type: 'password'
      })
      .end(function(err,res) {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should have status 400 for missing grant_type', function(done){
    api
      .post('/api/v1/auth/token')
      .send({
        username: 'username',
        password: 'password'
      })
      .end(function(err,res) {
        expect(res.status).to.equal(400);
        done();
      });
  });

});
