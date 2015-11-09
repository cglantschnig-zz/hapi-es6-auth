import Umzug from 'umzug';
import config from '../config';
import { sequelize, Sequelize } from '../models/';
import server from '../../api/api';

var umzug = new Umzug({
  // The logging function.
  // A function that gets executed everytime migrations start and have ended.
  logging: function(info) {
    // if we are in the test environment we want to disable logging
    if (config.environment !== 'test') {
      console.log(info);
    }
  },

  // The storage.
  // Possible values: 'json', 'sequelize', an object
  storage: 'sequelize',

  // The options for the storage.
  // Check the available storages for further details.
  storageOptions: {
    sequelize: sequelize
  },

  migrations: {
    // The params that gets passed to the migrations.
    // Might be an array or a synchronous function which returns an array.
    params: [sequelize.getQueryInterface(), sequelize.constructor],

    // The path to the migrations directory.
    path: './src/shared/migrations',

    // The pattern that determines whether or not a file is a migration.
    pattern: /\.js$/
  }
});

/**
 * executes all migrations
 */
export function up() {
  return umzug
    .executed()
    .then(function(executedMigrations) {
      return umzug.pending();
    })
    .then(function(pendingMigrations) {
      if (pendingMigrations.length > 0) {
        return umzug.up();
      }
      server.log('info', 'All migrations set!');
    });
}

/**
 * Deletes all migrations. A clear database will be established
 */
export function dropMigration() {
  return umzug
    .executed()
    .then(function (migrations) {
      // "migrations" will be an Array of already executed migrations.
      if (migrations.length === 0) {
        server.log('info', 'Migration are already dropped!');
        return;
      }
      return umzug.down({ to: migrations[0] });
    });
}

/**
 * Drops all tables
 */
export function dropTables() {
  return sequelize.drop();
}
