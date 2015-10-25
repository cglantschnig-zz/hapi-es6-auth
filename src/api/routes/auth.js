/**
 * Routes about Authentication
 */
import * as controller from '../controllers/auth';
import { tokenSchema, authenticationSchema } from '../schema/authSchema';


var routes = [
  {
    method: 'POST',
    path: '/api/v1/auth/token',
    handler: controller.authenticate
  },
  {
    method: 'POST',
    path: '/api/v1/register',
    handler: controller.register
  },
  {
    method: 'GET',
    path: '/api/v1/users',
    handler: controller.getAllUsers
  }
];

export default routes;
