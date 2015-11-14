/**
 * Routes about the user obejct
 */
import * as controller from '../controllers/user';
import { resetPasswordSchema, forgotPasswordSchema, forgotPasswordResponseSchema } from '../schema/userSchema';


var routes = [
  {
    method: 'POST',
    path: '/api/v1/reset-password',
    handler: controller.resetPassword,
    config: {
      auth: {
        strategies: ['simple']
      },
      plugins: {
        hapiAuthorization: {
          roles: ['user', 'admin']
        }
      },
      validate: {
        payload: resetPasswordSchema
      }
    }
  },
  {
    method: 'POST',
    path: '/api/v1/forgot-password',
    handler: controller.forgotPassword,
    config: {
      auth: false,
      validate: {
        payload: forgotPasswordSchema
      },
      response: {
        schema: forgotPasswordResponseSchema
      }
    }
  }
];

export default routes;
