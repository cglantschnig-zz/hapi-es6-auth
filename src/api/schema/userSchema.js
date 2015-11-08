import Joi from 'joi';

export var userRegisterSchema = Joi
  .object()
  .keys({
    email: Joi.string().email().required(),
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });
