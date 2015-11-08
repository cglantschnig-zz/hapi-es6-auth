import requireDir from 'require-dir';
import { ready } from '../api/api.js';
import { up, dropTables } from '../shared/utils/migrate';
import initialData from './initialData';


let server;

/**
 * will get called by mocha before all tests start to run.
 * this function must make sure that the server started before the tests can run
 */
before(function(done) {
  this.timeout(0); // disable the timeout, the server startup takes as long as it needs
  ready
    .then(function(_server) {
      server = _server;
      done();
    });
});

/**
 * will get called my mocha before each single test. We will clear the database
 * each time and set the initial data for the same environment in all tests.
 */
beforeEach(function(done) {
  this.timeout(0); // disable the timeout, database reset can take time
  dropTables()
    .then(function() {
      return up();
    })
    .then(function() {
      return initialData();
    })
    .then(function(data) {
      done();
    });
})

/**
 * after all tests have been run, we need to stop the server
 */
after(function(done) {
  // just stop the server if the server started successfully
  if (server && server.stop) {
    server.stop({ timeout: 1000 }, done);
  }
});

/**
 * require all tests in specific folders to be running
 */
requireDir('./api', { recurse: true });
