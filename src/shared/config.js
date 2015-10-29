/**
 * Config file, which is interpreting all the environment variables
 */

import path from 'path';

var allowedEnvironments = [
  'development',
  'test'
];
var environment = process.env.NODE_ENV;

// test if the given environment is a valid one
if ( allowedEnvironments.indexOf(environment) < 0 ) {
  console.error('Invalid Environment');
  process.exit(1);
}

console.log('Using ' + environment + ' environment');

var config = {
    host: process.env.APP_HOST || '0.0.0.0',
    port: process.env.APP_PORT || 3000,
    base_path: path.join(__dirname, '../'), // ~/src/
    api_database: {
      version:  process.env.DB_ENV_PG_MAJOR,
      lang:     process.env.DB_ENV_LANG,
      host:     'db', // defined host in the docker-compose file
      dbname:   process.env.DB_NAME,
      user:     process.env.DB_ENV_POSTGRES_USER,
      password: process.env.DB_ENV_POSTGRES_PASSWORD
    },
    test_database: {
      version:  process.env.DB_TEST_ENV_PG_MAJOR,
      lang:     process.env.DB_TEST_ENV_LANG,
      host:     'db_test', // defined host in the docker-compose file
      dbname:   process.env.DB_TEST_NAME,
      user:     process.env.DB_TEST_ENV_POSTGRES_USER,
      password: process.env.DB_TEST_ENV_POSTGRES_PASSWORD
    }
};

// set the database which is about to be used
config.database = config.api_database;

// make test specific changes
if (environment === 'test') {
  config.database = config.test_database;
}

export default config;
