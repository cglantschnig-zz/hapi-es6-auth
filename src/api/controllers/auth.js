import Joi from 'joi';
import Boom from 'boom';
import { User } from '../../shared/models/';
import {
  passwordTypeSchema,
  clientCredentialsTypeSchema,
  refreshTokenTypeSchema
} from '../schema/authSchema';

/**
 * This function is about to authenticate the user. It returns an access token.
 * The user can use different grant types with the according data to login.
 * Available Grant Types:
 * - password --> (username, password)
 * - refresh_token --> (refresh_token)
 */
export function authenticate(request, reply) {
  var promise = null;
  switch (request.payload.grant_type) {
    case 'password':
      Joi.assert(request.payload, passwordTypeSchema);
      promise = validatePasswordType();
      break;
    default:
      throw new Error('Invalid grant_type (' + request.payload.grant_type + ')');
  }
  promise = promise
    .then(function(userInstance) {
      return {
        grant_type: 'Bearer',
        access_token: 'test',
        refresh_token: 'test',
        expires_in: 3600
      };
    });

  reply(promise);
}

function validatePasswordType() {
  return Promise.resolve();
}

export function getAllUsers(request, reply) {
  var promise = User.findAll();
  reply(promise);
}

/**
 * This call is creating a new user account.
 * 1. we check if there is already a user with the given username/email
 * 2. create a user-object
 * 3. hash the password and create a salt
 * 4. save the user object
 * 5. set access and refresh token
 */
export function register(request, reply) {
  var promise = User
    .find({
      where: {
        $or: [
          {
            email: request.payload.email
          },
          {
            username: request.payload.username
          }
        ]
      }
    })
    .then(function(userInstance) {
      // we found a user with the given email or username. Warn the user!
      if (userInstance) {
        throw Boom.create(422, "Username or Email are already used");
      }
      return User.build(request.payload).hashPassword();
    })
    .then(function(userInstance) {
      return userInstance.save();
    })
    .then(function(userInstance) {
      return {
        email: userInstance.email,
        username: userInstance.username
      };
    })
    .catch(function(err) {
      console.log(err);
    });
  reply(promise);
}
