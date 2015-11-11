import Hapi from 'hapi';
import { union, values } from 'lodash';
import promisify from 'es6-promisify';
import config from '../shared/config';
import models from '../shared/models/';
import { up, dropTables } from '../shared/utils/migrate';
import { validateToken } from './utils/auth';

export var server = new Hapi.Server();
server.connection({
  host: config.host,
  port: config.port
});

// disable logging for tests
if (config.environment === 'test') {
  server.log = function() {};
}

// get all routes which are located in the routes directory
let unformatedRoutes = require('require-dir')('./routes');
let routes = union(...values(unformatedRoutes));


let register = promisify(server.register.bind(server));

export var ready = register(require('./plugins'))
  .then(function() {
    return models.sequelize.authenticate();
  })
  .then(function() {
    server.log('info', 'Connection to Database successfully tested!');
    return up();
  })
  .then(function () {
    return register(require('hapi-auth-bearer-token'));
  })
  .then(function () {

    server.auth.strategy('simple', 'bearer-access-token', {
        allowQueryToken: false,              // optional, true by default
        allowMultipleHeaders: false,        // optional, false by default
        accessTokenName: 'access_token',    // optional, 'access_token' by default
        validateFunc: validateToken
    });

    server.route(routes);

    server.start(function () {
      server.log('info', 'Server running at: ' + server.info.uri);
    });
    return server;
  })
  .catch(function(error) {
    console.error(error);
  });

process.on('uncaughtException', function(err) {
  console.error('Caught exception: ', err);
});

export default server;
