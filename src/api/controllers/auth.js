import Joi from 'joi';
import Boom from 'boom';
import uuid from 'node-uuid';
import promisify from 'es6-promisify';
import config from '../../shared/config';
import { Sequelize, User, AccessToken, RefreshToken } from '../../shared/models/';
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
  let schema, validateMethod;
  switch (request.payload.grant_type) {
    case 'password':
      schema = passwordTypeSchema;
      validateMethod = validatePasswordType;
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

function checkSchema(payload, schema) {
  let result = Joi.validate(payload, schema);
  if (result.error) {
    return Promise.reject(Boom.wrap(result.error, 400));
  }
  return Promise.resolve(result.value);
}

function validatePasswordType(payload) {
  return User
    .find({
      where: {
        $or: [
          {
            email: payload.username.toLowerCase()
          },
          Sequelize.where(Sequelize.fn('lower', Sequelize.col('username')), Sequelize.fn('lower', payload.username))
        ]
      }
    })
    .then(function(userInstance) {
      if (!userInstance) {
        throw Boom.create(404, 'No user with the given username found!');
      }
      return userInstance
        .comparePassword(payload.password)
        .then(function(samePasswords) {
          if (!samePasswords) {
            throw Boom.create(401, 'Wrong Password!');
          }
          return userInstance;
        });
    });
}

/**
 * invalidates the old tokens and create a new one for the given user
 */
function createToken(userInstance) {
  return Promise
    .all([
      RefreshToken.destroy({ where: { UserId: userInstance.id }}),
      AccessToken.destroy({ where: { UserId: userInstance.id }})
    ])
    .then(function() {
      return Promise.all([
        RefreshToken.create({ UserId: userInstance.id }),
        AccessToken.create({ UserId: userInstance.id })
      ])
    })
    .then(function(instances) {
      return {
        token_type: 'Bearer',
        access_token: instances[1].token,
        refresh_token: instances[0].token,
        expires_in: config.token_validity
      };
    });
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
      return User.build(request.payload).hashPassword();
    })
    .then(function(userInstance) {
      return userInstance.save();
    })
    .then(function(userInstance) {
      return createToken(userInstance);
    });
  reply(promise);
}
