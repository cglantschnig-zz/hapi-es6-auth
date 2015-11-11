import Joi from 'joi';

export var tokenSchema = Joi
  .object()
  .keys({
    token_type: Joi.string().required(),
    access_token: Joi.string().guid().required(),
    refresh_token: Joi.string().guid().required(),
    expires_in: Joi.number().integer().required()
  });

export var authenticationSchema = Joi
  .object()
  .unknown(true)
  .keys({
    grant_type: Joi.string().required().valid('password', 'refresh_token')
  });

export var passwordTypeSchema = authenticationSchema
  .keys({
    username: Joi.string().required(),
    password: Joi.string().required()
  });

export var clientCredentialsTypeSchema = authenticationSchema
  .keys({
    user_id: Joi.string().guid().required()
  });

export var refreshTokenTypeSchema = authenticationSchema
  .keys({
    refresh_token: Joi.string().guid().required()
  });
