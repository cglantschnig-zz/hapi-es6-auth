/**
 * Routes about Authentication
 */
import * as controller from '../controllers/auth';
import { tokenSchema, authenticationSchema } from '../schema/authSchema';


var routes = [
  {
    method: 'POST',
    path: '/auth/token',
    handler: controller.authenticate
  }
];

export default routes;
