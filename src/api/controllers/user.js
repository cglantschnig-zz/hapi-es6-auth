import crypto from 'crypto';
import Boom from 'boom';
import { Sequelize, User } from '../../shared/models/';
import MailService from '../../shared/services/MailService';
import { createToken } from '../utils/auth';


/**
 * sets a new password for the logged in user.
 */
export function resetPassword(request, reply) {
  let userInstance = request.auth.credentials.user;
  let promise = userInstance
    .comparePassword(request.payload.oldPassword)
    .then(function(samePassword) {
      if (!samePassword) {
        throw Boom.create(401, 'Old password doesnt matches with the current password');
      }
      userInstance.password = request.payload.newPassword;
      return userInstance.hashPassword();
    })
    .then(function(userInstance) {
      return userInstance.save();
    })
    .then(function(userInstance) {
      return {};
    });
  reply(promise);
}


/**
 * writes an email with an reset link. The given username can either be an email or username
 */
export function forgotPassword(request, reply) {
  let promise = User
    .find({
      where: {
        email: request.payload.email
      }
    })
    .then(function(userInstance) {
      if (!userInstance) {
        throw Boom.create(404, 'No User found');
      }
      // set a reset token and its validity
      userInstance.resetToken = crypto.randomBytes(8).toString('base64');
      userInstance.resetTokenValidity = new Date((new Date()).getTime() + 3600);
      return userInstance.save();
    })
    .then(function(userInstance) {
      let service = new MailService();
      return service
        .sendPasswordForgot(userInstance)
        .then(() => {
          return userInstance;
        });
    })
    .then(function(userInstance) {
      return {
        resetTokenValidity: userInstance.resetTokenValidity
      };
    });
  reply(promise);
}

/**
 * sets a new password with a given token.
 * 1. checks if there is a valid user with the given token
 * 2. see if the token is still valid
 * 3. logs in the user and returns new valid token
 */
export function setForgottenPassword(request, reply) {
  let promise = User
    .find({
      where: {
        resetToken: request.payload.resetToken,
        resetTokenValidity: {
          $gt: new Date()
        }
      }
    })
    .then(function(userInstance) {
      if (!userInstance) {
        throw Boom.create(404, 'No User found!');
      }
      // set the new password and hash the password
      userInstance.password = request.payload.newPassword;
      return userInstance.hashPassword();
    })
    .then(function(userInstance) {
      // remove the reset token
      userInstance.resetToken = null;
      userInstance.resetTokenValidity = null;
      return userInstance.save();
    })
    .then(function(userInstance) {
      return createToken(userInstance);
    });
  reply(promise);
}
