import api from '../../request.js';
import chai from 'chai';

let expect = chai.expect;

describe('POST /api/v1/auth/token', function() {

  it('should get a token for a valid username/password', function(done){
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

  it('should accept an login with uppercase letters email', function(done){
    api
      .post('/api/v1/auth/token')
      .send({
        password: 'password',
        username: 'USER1@test.com',
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

  it('should create an new account and then be able to login into it', function(done) {
    api
      .post('/api/v1/register')
      .send({
        username: 'testuser',
        password: 'password',
        email: 'testuser@test.com'
      })
      .then(function(res) {
        expect(res.status).to.equal(200);
        return api
          .post('/api/v1/auth/token')
          .send({
            grant_type: 'password',
            username: 'testuser',
            password: 'password'
          });
      })
      .then(function(res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.ownProperty('token_type');
        expect(res.body).to.have.ownProperty('access_token');
        expect(res.body).to.have.ownProperty('refresh_token');
        expect(res.body).to.have.ownProperty('expires_in');
        done();
      })
      .catch(done);
  });

  it('should accept an login with uppercase letters username', function(done){
    api
      .post('/api/v1/auth/token')
      .send({
        password: 'password',
        username: 'Username1',
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

  it('should have status 400 for missing password', function(done){
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
