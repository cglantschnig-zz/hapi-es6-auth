import Joi from 'joi';
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
 * - client_credentials --> (user_id)
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
