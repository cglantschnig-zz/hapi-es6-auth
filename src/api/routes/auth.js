/**
 * Routes about Authentication
 */
import * as controller from '../controllers/auth';
import { tokenSchema, authenticationSchema } from '../schema/authSchema';
import { userRegisterSchema, resetPasswordSchema } from '../schema/userSchema';


var routes = [
  {
    method: 'POST',
    path: '/api/v1/auth/token',
    handler: controller.authenticate,
    config: {
      auth: false,
      validate: {
        payload: authenticationSchema
      },
      response: {
        schema: tokenSchema
      }
    }
  },
  {
    method: 'POST',
    path: '/api/v1/register',
    handler: controller.register,
    config: {
      auth: false,
      validate: {
        payload: userRegisterSchema
      },
      response: {
        schema: tokenSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/api/v1/users',
    handler: controller.getAllUsers
  },
  {
    method: 'POST',
    path: '/api/v1/reset-password',
    handler: controller.resetPassword,
    config: {
      auth: 'simple',
      validate: {
        payload: resetPasswordSchema
      }
    }
  }
];

export default routes;
