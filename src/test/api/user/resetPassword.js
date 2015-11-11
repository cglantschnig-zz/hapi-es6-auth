import api from '../../request.js';
import chai from 'chai';

let expect = chai.expect;


describe('POST /api/v1/reset-password', function() {

  it('should reset a password successfully',function(done){
    api
      .post('/api/v1/reset-password')
      .set('Authorization', 'Bearer ' + 'daa32876-80fc-44a7-be8c-e09804001626')
      .send({
        oldPassword: 'password',
        newPassword: 'password2'
      })
      .end(function(err,res) {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should reset the password successfully and login the user with the new password / decline the old one',function(done){
    api
      .post('/api/v1/reset-password')
      .set('Authorization', 'Bearer ' + 'daa32876-80fc-44a7-be8c-e09804001626')
      .send({
        oldPassword: 'password',
        newPassword: 'password2'
      })
      .then(function(res) {
        expect(res.status).to.equal(200);
        return api
          .post('/api/v1/auth/token')
          .send({
            username: 'username1',
            password: 'password2',
            grant_type: 'password'
          });
      })
      .then(function(res) {
        expect(res.status).to.equal(200);
        return api
          .post('/api/v1/auth/token')
          .send({
            username: 'username1',
            password: 'password',
            grant_type: 'password'
          });
      })
      .then(function(res) {
        expect(res.status).to.equal(401);
        done();
      })
      .catch(done);
  });



  it('should decline a user with wrong old password',function(done){
    api
      .post('/api/v1/reset-password')
      .set('Authorization', 'Bearer ' + 'daa32876-80fc-44a7-be8c-e09804001626')
      .send({
        oldPassword: 'wrongpassword',
        newPassword: 'password2'
      })
      .end(function(err,res) {
        expect(res.status).to.equal(401);
        done();
      });
  });

  it('should return 400 for a missing old password',function(done){
    api
      .post('/api/v1/reset-password')
      .set('Authorization', 'Bearer ' + 'daa32876-80fc-44a7-be8c-e09804001626')
      .send({
        newPassword: 'password2'
      })
      .end(function(err,res) {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should return 400 for a missing new password',function(done){
    api
      .post('/api/v1/reset-password')
      .set('Authorization', 'Bearer ' + 'daa32876-80fc-44a7-be8c-e09804001626')
      .send({
        oldPassword: 'password'
      })
      .end(function(err,res) {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should return 400 for a too short new password',function(done){
    api
      .post('/api/v1/reset-password')
      .set('Authorization', 'Bearer ' + 'daa32876-80fc-44a7-be8c-e09804001626')
      .send({
        oldPassword: 'password',
        newPassword: 'bad'
      })
      .end(function(err,res) {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should return 400 for a too short old password',function(done){
    api
      .post('/api/v1/reset-password')
      .set('Authorization', 'Bearer ' + 'daa32876-80fc-44a7-be8c-e09804001626')
      .send({
        oldPassword: 'bad',
        newPassword: 'password2'
      })
      .end(function(err,res) {
        expect(res.status).to.equal(400);
        done();
      });
  });


});
