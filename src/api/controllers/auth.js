import Boom from 'boom';
import { assign } from 'lodash';
import { Sequelize, User } from '../../shared/models/';
import { checkSchema } from '../utils/schemaHelper';
import { validateRefreshTokenType, validatePasswordType, createToken } from '../utils/auth';
import { passwordTypeSchema, refreshTokenTypeSchema } from '../schema/authSchema';

/**
 * This function is about to authenticate the user. It returns an access token.
 * The user can use different grant types with the according data to login.
 * Available Grant Types:
 * - password --> (username, password)
 * - refresh_token --> (refresh_token)
 */
export function authenticate(request, reply) {
  let schema, validateMethod;
  switch (request.payload.grant_type) {
    case 'password':
      schema = passwordTypeSchema;
      validateMethod = validatePasswordType;
      break;
    case 'refresh_token':
      schema = refreshTokenTypeSchema;
      validateMethod = validateRefreshTokenType;
      break;
    default:
      throw new Error('Invalid grant_type (' + request.payload.grant_type + ')');
  }

  let promise = checkSchema(request.payload, schema)
    .then(function() {
      return validateMethod(request.payload);
    })
    .then(function(userInstance) {
      return createToken(userInstance);
    })
    .catch(function(err) {
      return err;
    });

  reply(promise);
}

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
          Sequelize.where(Sequelize.fn('lower', Sequelize.col('username')), Sequelize.fn('lower', request.payload.username))
        ]
      }
    })
    .then(function(userInstance) {
      // we found a user with the given email or username. Warn the user!
      if (userInstance) {
        throw Boom.create(409, "Username or Email are already used");
      }
      var user = assign(request.payload, {
        role: 'user'
      });
      return User.build(user).hashPassword();
    })
    .then(function(userInstance) {
      return userInstance.save();
    })
    .then(function(userInstance) {
      return createToken(userInstance);
    });
  reply(promise);
}
