import path from 'path';
import Umzug from 'umzug';
import config from '../config';
import { sequelize, Sequelize } from '../models/';

var umzug = new Umzug({
  // The logging function.
  // A function that gets executed everytime migrations start and have ended.
  logging: function(info) {
    console.log(info);
  },

  migrations: {
    // The params that gets passed to the migrations.
    // Might be an array or a synchronous function which returns an array.
    params: [sequelize.getQueryInterface(), Sequelize],

    // The path to the migrations directory.
    path: path.resolve(process.cwd(), 'src/shared/migrations'),

    // The pattern that determines whether or not a file is a migration.
    pattern: /^\d+[\w-]+\.js$/
  }
});

/**
 * executes all migrations
 */
export function up() {
  return umzug
    .executed()
    .then(function(executedMigrations) {
      console.log(executedMigrations);
      return umzug.pending();
    })
    .then(function(pendingMigrations) {
      if (pendingMigrations > 0) {
        return umzug.up();
      }
      console.log('All migrations set!');
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
        console.log('Migration are already dropped!');
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
