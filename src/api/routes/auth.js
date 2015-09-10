/**
 * Routes about Authentication
 */
import * as controller from '../controllers/auth';


var routes = [
  {
    method: 'POST',
    path: '/auth/token',
    handler: controller.authenticate
  }
];

export default routes;
