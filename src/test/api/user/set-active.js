import api from '../../request.js';
import chai from 'chai';

let expect = chai.expect;


describe('PATCH /api/v1/users/{user_id}/set-active', function() {

  it('should return 403 for an user account (not admin)', function() {
    return api
      .patch('/api/v1/users/10003/set-active')
      .set('Authorization', 'Bearer ' + 'daa32876-80fc-44a7-be8c-e09804001626')
      .send({
        isActive: true
      })
      .catch(function(res) {
        expect(res.status).to.equal(403);
      });
  });

  it('should not allow to reset another admins activity', function() {
    return api
      .patch('/api/v1/users/10004/set-active')
      .set('Authorization', 'Bearer ' + '74dd9ed7-31e3-4dc8-91a6-b6e3e87b08d0')
      .send({
        isActive: false
      })
      .catch(function(res) {
        expect(res.status).to.equal(403);
      });
  });

  it('should set user3 inactive and login should then return status 423', function() {
    return api
      .patch('/api/v1/users/10003/set-active')
      .set('Authorization', 'Bearer ' + '74dd9ed7-31e3-4dc8-91a6-b6e3e87b08d0')
      .send({
        isActive: false
      })
      .then(function(res) {
        expect(res.status).to.equal(200);
        return api
          .post('/api/v1/auth/token')
          .send({
            password: 'password',
            username: 'username2',
            grant_type: 'password'
          });
      })
      .catch(function(res) {
        expect(res.status).to.equal(423);
      });
  });

  it('should return 400 if payload was sent', function() {
    return api
      .patch('/api/v1/users/10003/set-active')
      .set('Authorization', 'Bearer ' + '74dd9ed7-31e3-4dc8-91a6-b6e3e87b08d0')
      .send({ })
      .catch(function(res) {
        expect(res.status).to.equal(400);
      });
  });

  it('should allow to access a secure route after activation', function() {
    return api
      .post('/api/v1/reset-password')
      .set('Authorization', 'Bearer ' + '2f976bd9-b982-4276-8783-2fc9e175dc4a')
      .send({
        oldPassword: 'password',
        newPassword: 'password2'
      })
      .catch(function(res) {
        expect(res.status).to.equal(401);
        return api
          .patch('/api/v1/users/10005/set-active')
          .set('Authorization', 'Bearer ' + '74dd9ed7-31e3-4dc8-91a6-b6e3e87b08d0')
          .send({
            isActive: true
          });
      })
      .then(function(res) {
        expect(res.status).to.equal(200);
        return api
          .post('/api/v1/reset-password')
          .set('Authorization', 'Bearer ' + '2f976bd9-b982-4276-8783-2fc9e175dc4a')
          .send({
            oldPassword: 'password',
            newPassword: 'password2'
          });
      })
      .then(function(res) {
        expect(res.status).to.equal(200);
      });
  });

  it('should not allow to access a secure route with an inactive account', function() {
    return api
      .post('/api/v1/reset-password')
      .set('Authorization', 'Bearer ' + '2f976bd9-b982-4276-8783-2fc9e175dc4a')
      .send({
        oldPassword: 'password',
        newPassword: 'password2'
      })
      .catch(function(res) {
        expect(res.status).to.equal(401);
      });
  });

});
