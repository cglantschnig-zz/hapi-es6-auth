import Boom from 'boom';
import config from '../../shared/config';
import { Sequelize, RefreshToken, AccessToken, User } from '../../shared/models/';


/**
 * requires as input {refresh_token}. The given refresh token will be
 * checked if it is a valid one. If yes a sequelize user instance will get returned
 */
export function validateRefreshTokenType(payload) {
  return RefreshToken
    .find({
      where: {
        token: payload.refresh_token
      }
    })
    .then(function(refreshTokenInstance) {
      if (!refreshTokenInstance) {
        throw Boom.create(401, 'Invalid refresh token!');
      }
      return User
        .find({
          where: {
            id: refreshTokenInstance.user_id
          }
        });
    })
    .then(function(userInstance) {
      if (!userInstance) {
        throw Boom.create(404, 'User not found!');
      }
      return userInstance;
    });
}

/**
 * takes {username, password} and checks if the username is a valid username or
 * email and then validates it with the given password. If it is correct we
 * return the sequelize user instance
 */
export function validatePasswordType(payload) {
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
export function createToken(userInstance) {
  return Promise
    .all([
      RefreshToken.destroy({ where: { user_id: userInstance.id }}),
      AccessToken.destroy({ where: { user_id: userInstance.id }}),
      RefreshToken.clear(),
      AccessToken.clear()
    ])
    .then(function() {
      return Promise.all([
        RefreshToken.create({ user_id: userInstance.id }),
        AccessToken.create({ user_id: userInstance.id })
      ]);
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

/**
 * validates a given access token and adds the userInstance to the request object
 */
export function validateToken(token, callback) {
  User
    .find({
      include: [
        {
          model: AccessToken,
          where: {
            token: token
          }
        }
      ]
    })
    .then(function(userInstance) {
      if (!userInstance) {
        return callback(null, false, { token: token });
      }
      return callback(null, true, {
        user: userInstance,
        role: userInstance.role
      });
    });
}
