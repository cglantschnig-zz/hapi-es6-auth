/**
 * Routes about Authentication
 */
import * as controller from '../controllers/auth';
import { tokenSchema, authenticationSchema } from '../schema/authSchema';
import { userRegisterSchema } from '../schema/userSchema';


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
  }
];

export default routes;
