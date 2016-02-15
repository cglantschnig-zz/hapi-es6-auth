import api from '../../request.js';
import chai from 'chai';

let expect = chai.expect;

describe('POST /api/v1/auth/token', function() {

  describe('grant_type: refresh_token', function() {

    it('should have status 400 for missing refresh_token', function() {
      return api
        .post('/api/v1/auth/token')
        .send({
          grant_type: 'refresh_token'
        })
        .catch(function(res) {
          expect(res.status).to.equal(400);
        });
    });

    it('should have status 423 for inactive user', function() {
      return api
        .post('/api/v1/auth/token')
        .send({
          refresh_token: '2f976bd9-b982-4276-8783-2fc9e175dc4a',
          grant_type: 'refresh_token'
        })
        .catch(function(res) {
          expect(res.status).to.equal(423);
        });
    });

    it('should get a token for a valid refresh_token', function() {
      return api
        .post('/api/v1/auth/token')
        .send({
          grant_type: 'refresh_token',
          refresh_token: 'daa32876-80fc-44a7-be8c-e09804001626'
        })
        .then(function(res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.ownProperty('token_type');
          expect(res.body).to.have.ownProperty('access_token');
          expect(res.body).to.have.ownProperty('refresh_token');
          expect(res.body).to.have.ownProperty('expires_in');
        });
    });

    it('should create an new account and then be able to login into it via refresh_token', function() {
      return api
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
              grant_type: 'refresh_token',
              refresh_token: res.body.refresh_token
            });
        })
        .then(function(res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.ownProperty('token_type');
          expect(res.body).to.have.ownProperty('access_token');
          expect(res.body).to.have.ownProperty('refresh_token');
          expect(res.body).to.have.ownProperty('expires_in');
        });
    });

  });

  describe('grant_type: password', function() {

    it('should get a token for a valid username/password', function() {
      return api
        .post('/api/v1/auth/token')
        .send({
          password: 'password',
          username: 'username1',
          grant_type: 'password'
        })
        .then(function(res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.ownProperty('token_type');
          expect(res.body).to.have.ownProperty('access_token');
          expect(res.body).to.have.ownProperty('refresh_token');
          expect(res.body).to.have.ownProperty('expires_in');
        });
    });

    it('should get a token for a valid email/password', function() {
      return api
        .post('/api/v1/auth/token')
        .send({
          password: 'password',
          username: 'user1@test.com',
          grant_type: 'password'
        })
        .then(function(res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.ownProperty('token_type');
          expect(res.body).to.have.ownProperty('access_token');
          expect(res.body).to.have.ownProperty('refresh_token');
          expect(res.body).to.have.ownProperty('expires_in');
        });
    });

    it('should have status 423 for inactive user', function() {
      return api
        .post('/api/v1/auth/token')
        .send({
          password: 'password',
          username: 'user3@test.com',
          grant_type: 'password'
        })
        .catch(function(res) {
          expect(res.status).to.equal(423);
        });
    });

    it('should accept an login with uppercase letters email', function() {
      return api
        .post('/api/v1/auth/token')
        .send({
          password: 'password',
          username: 'USER1@test.com',
          grant_type: 'password'
        })
        .then(function(res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.ownProperty('token_type');
          expect(res.body).to.have.ownProperty('access_token');
          expect(res.body).to.have.ownProperty('refresh_token');
          expect(res.body).to.have.ownProperty('expires_in');
        });
    });

    it('should create an new account and then be able to login into it', function() {
      return api
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
        });
    });

    it('should accept an login with uppercase letters username', function() {
      return api
        .post('/api/v1/auth/token')
        .send({
          password: 'password',
          username: 'Username1',
          grant_type: 'password'
        })
        .then(function(res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.ownProperty('token_type');
          expect(res.body).to.have.ownProperty('access_token');
          expect(res.body).to.have.ownProperty('refresh_token');
          expect(res.body).to.have.ownProperty('expires_in');
        });
    });

    it('should return status 401 for a wrong password', function() {
      return api
        .post('/api/v1/auth/token')
        .send({
          password: 'wrongpassword',
          username: 'username1',
          grant_type: 'password'
        })
        .catch(function(res) {
          expect(res.status).to.equal(401);
        });
    });

    it('should return status 404 for a not existing account', function() {
      return api
        .post('/api/v1/auth/token')
        .send({
          password: 'wrongpassword',
          username: 'notExistingUser',
          grant_type: 'password'
        })
        .catch(function(res) {
          expect(res.status).to.equal(404);
        });
    });

    it('should have status 400 for missing username', function() {
      return api
        .post('/api/v1/auth/token')
        .send({
          password: 'password',
          grant_type: 'password'
        })
        .catch(function(res) {
          expect(res.status).to.equal(400);
        });
    });

    it('should have status 400 for missing password', function() {
      return api
        .post('/api/v1/auth/token')
        .send({
          username: 'username',
          grant_type: 'password'
        })
        .catch(function(res) {
          expect(res.status).to.equal(400);
        });
    });

  });

  it('should have status 400 for missing grant_type', function() {
    return api
      .post('/api/v1/auth/token')
      .send({
        username: 'username',
        password: 'password'
      })
      .catch(function(res) {
        expect(res.status).to.equal(400);
      });
  });

  it('should have status 400 for invalid grant_type', function() {
    return api
      .post('/api/v1/auth/token')
      .send({
        grant_type: 'invalid'
      })
      .catch(function(res) {
        expect(res.status).to.equal(400);
      });
  });

});
