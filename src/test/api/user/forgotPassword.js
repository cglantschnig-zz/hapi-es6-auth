import api from '../../request.js';
import chai from 'chai';

let expect = chai.expect;


describe('POST /api/v1/forgot-password', function() {

  it('should send an forget password email', function(done){
    api
      .post('/api/v1/forgot-password')
      .send({
        email: 'user1@test.com'
      })
      .end(function(err,res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.ownProperty('resetTokenValidity');
        done();
      });
  });

  it('should return 404 if there is no user with the given email', function(done) {
    api
      .post('/api/v1/forgot-password')
      .send({
        email: 'notexistingemail@test.com'
      })
      .end(function(err,res) {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('should return 400 if no email was sent', function(done) {
    api
      .post('/api/v1/forgot-password')
      .send({ })
      .end(function(err,res) {
        expect(res.status).to.equal(400);
        done();
      });
  });

});
