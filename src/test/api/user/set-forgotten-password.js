import api from '../../request.js';
import chai from 'chai';

let expect = chai.expect;


describe('PATCH /api/v1/forgot-password', function() {

  it('should call the password forgotten and reset the password', function() {
    return api
      .patch('/api/v1/forgot-password')
      .send({
        resetToken: '111222333',
        newPassword: 'password2'
      })
      .then(function(res) {
        expect(res.status).to.equal(200);
        return api
          .post('/api/v1/auth/token')
          .send({
            grant_type: 'password',
            username: 'username2',
            password: 'password2'
          });
      })
      .then(function(res) {
        expect(res.status).to.equal(200);
      });
  });

  it('should return 404 if the token is not valid anymore', function() {
    return api
      .patch('/api/v1/forgot-password')
      .send({
        resetToken: '12345678',
        newPassword: 'password'
      })
      .then(function(res) {
        expect(res.status).to.equal(404);
      });
  });

  it('should return 404 if there is no user with the given email', function() {
    return api
      .patch('/api/v1/forgot-password')
      .send({
        resetToken: 'invalidtoken',
        newPassword: 'password'
      })
      .then(function(res) {
        expect(res.status).to.equal(404);
      });
  });

  it('should return 400 if no resetToken was sent', function() {
    return api
      .patch('/api/v1/forgot-password')
      .send({
        newPassword: 'password'
      })
      .then(function(res) {
        expect(res.status).to.equal(400);
      });
  });

  it('should return 400 if no newPassword was sent', function() {
    return api
      .patch('/api/v1/forgot-password')
      .send({
        resetToken: 'invalidtoken'
      })
      .then(function(res) {
        expect(res.status).to.equal(400);
      });
  });

});
