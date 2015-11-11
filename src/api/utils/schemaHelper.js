import Joi from 'joi';
import Boom from 'boom';

/**
 * Takes an object (payload) and checks if it follows a given schema
 * It returns a Promise
 */
export function checkSchema(payload, schema) {
  let result = Joi.validate(payload, schema);
  if (result.error) {
    return Promise.reject(Boom.wrap(result.error, 400));
  }
  return Promise.resolve(result.value);
}
