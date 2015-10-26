import Hapi from 'hapi';
import { union, values } from 'lodash';
import promisify from 'es6-promisify';
import config from '../shared/config';
import models from '../shared/models/';
import {up, dropTables} from '../shared/utils/migrate';

export var server = new Hapi.Server();
server.connection({
  host: config.host,
  port: config.port
});

// get all routes which are located in the routes directory
let unformatedRoutes = require('require-dir')('./routes');
let routes = union(...values(unformatedRoutes));

server.route(routes);

let register = promisify(server.register.bind(server));

export var ready = register(require('./plugins'))
  .then(function() {
    return models.sequelize
      .authenticate();
  })
  .then(function() {
    console.log('Connection to Database successfully tested!');
    return up();
  })
  /*
  .then(function () {
    return models.sequelize.sync();
  })
  */
  .then(function () {
    server.start(function () {
      server.log('info', 'Server running at: ' + server.info.uri);
    });
    return server;
  })
  .catch(function(error) {
    console.error(error);
  });

export default server;
