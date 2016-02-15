import api from '../../request.js';
import chai from 'chai';

let expect = chai.expect;

describe('POST /api/v1/register', function() {

  it('should create a user successfully', function(){
    return api
      .post('/api/v1/register')
      .send({
        email: 'test@mail.com',
        password: 'password',
        username: 'username'
      })
      .then(function(res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.ownProperty('token_type');
        expect(res.body).to.have.ownProperty('access_token');
        expect(res.body).to.have.ownProperty('refresh_token');
        expect(res.body).to.have.ownProperty('expires_in');
      });
  });

  it('should return status 409 if there already exists a user with the given email', function() {
    return api
      .post('/api/v1/register')
      .send({
        email: 'user1@test.com',
        password: 'password',
        username: 'username'
      })
      .catch(function(res) {
        expect(res.status).to.equal(409);
      });
  });

  it('should return status 409 if there already exists a user with the given username', function() {
    return api
      .post('/api/v1/register')
      .send({
        email: 'test@test.com',
        password: 'password',
        username: 'username1'
      })
      .catch(function(res) {
        expect(res.status).to.equal(409);
      });
  });

  it('should have status 400 for missing username', function() {
    return api
      .post('/api/v1/register')
      .send({
        email: 'test@mail.com',
        password: 'password'
      })
      .catch(function(res) {
        expect(res.status).to.equal(400);
      });
  });

  it('should have status 400 for missing email', function() {
    return api
      .post('/api/v1/register')
      .send({
        password: 'password',
        username: 'username'
      })
      .catch(function(res) {
        expect(res.status).to.equal(400);
      });
  });

  it('should have status 400 for missing password', function() {
    return api
      .post('/api/v1/register')
      .send({
        grant_type: 'password',
        username: 'username'
      })
      .catch(function(res) {
        expect(res.status).to.equal(400);
      });
  });

  it('should have a password longer than 6 letters', function() {
    return api
      .post('/api/v1/register')
      .send({
        grant_type: 'password',
        username: 'username',
        password: 'a'
      })
      .catch(function(res) {
        expect(res.status).to.equal(400);
      });
  });

  it('should have a username longer than 6 letters', function() {
    return api
      .post('/api/v1/register')
      .send({
        grant_type: 'password',
        username: 'a',
        password: 'password'
      })
      .catch(function(res) {
        expect(res.status).to.equal(400);
      });
  });

});
