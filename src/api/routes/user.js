/**
 * Routes about the user obejct
 */
import * as controller from '../controllers/user';
import { resetPasswordSchema } from '../schema/userSchema';


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
          roles: ['user']
        }
      },
      validate: {
        payload: resetPasswordSchema
      }
    }
  }
];

export default routes;
